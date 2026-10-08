-- Additive initial schema. No destructive statements and no public read policies.
create table if not exists public.leads (
 id uuid primary key, created_at timestamptz not null default now(), status text not null default 'Neu', payload jsonb not null
);
create table if not exists public.events (
 id uuid primary key, created_at timestamptz not null default now(), name text not null, payload jsonb not null
);
create table if not exists public.delivery_outbox (
 id uuid primary key default gen_random_uuid(), entity_id uuid not null, kind text not null check (kind in ('sheet','email')),
 payload jsonb not null, status text not null default 'pending' check (status in ('pending','sending','sent')),
 attempts integer not null default 0, created_at timestamptz not null default now(), claimed_at timestamptz, sent_at timestamptz, last_error text,
 unique(entity_id,kind)
);
create table if not exists public.rate_limits (key text primary key, started_at timestamptz not null default now(), hits integer not null default 1);
alter table public.leads enable row level security;
alter table public.events enable row level security;
alter table public.delivery_outbox enable row level security;
alter table public.rate_limits enable row level security;
revoke all on public.leads, public.events, public.delivery_outbox, public.rate_limits from anon, authenticated;
grant all on public.leads, public.events, public.delivery_outbox, public.rate_limits to service_role;
create index if not exists outbox_pending on public.delivery_outbox(created_at) where status='pending';

create or replace function public.save_lead(p_lead jsonb) returns uuid language plpgsql security invoker set search_path=public as $$
declare inserted_id uuid;
begin
 insert into leads(id,payload) values((p_lead->>'id')::uuid,p_lead) on conflict(id) do nothing returning id into inserted_id;
 if inserted_id is not null then
  insert into delivery_outbox(entity_id,kind,payload) values(inserted_id,'sheet',jsonb_build_object('kind','lead','lead',p_lead)),(inserted_id,'email',jsonb_build_object('kind','lead','lead',p_lead));
 end if;
 return (p_lead->>'id')::uuid;
end;$$;
create or replace function public.save_event(p_event jsonb) returns uuid language plpgsql security invoker set search_path=public as $$
declare inserted_id uuid;
begin
 insert into events(id,name,payload) values((p_event->>'id')::uuid,p_event->>'name',p_event) on conflict(id) do nothing returning id into inserted_id;
 if inserted_id is not null then insert into delivery_outbox(entity_id,kind,payload) values(inserted_id,'sheet',jsonb_build_object('kind','event','event',p_event));end if;
 return (p_event->>'id')::uuid;
end;$$;
create or replace function public.check_rate_limit(p_key text,p_limit int,p_window_seconds int) returns boolean language plpgsql security invoker set search_path=public as $$
declare count_now int;
begin
 delete from rate_limits where started_at < now()-interval '2 days';
 insert into rate_limits(key) values(p_key) on conflict(key) do update set
 hits=case when rate_limits.started_at<now()-make_interval(secs=>p_window_seconds) then 1 else rate_limits.hits+1 end,
 started_at=case when rate_limits.started_at<now()-make_interval(secs=>p_window_seconds) then now() else rate_limits.started_at end
 returning hits into count_now;
 return count_now<=p_limit;
end;$$;
create or replace function public.claim_delivery(p_id uuid) returns boolean language plpgsql security invoker set search_path=public as $$
declare claimed uuid;
begin
 update delivery_outbox set status='sending',claimed_at=now(),attempts=attempts+1 where id=p_id and status='pending' returning id into claimed;
 return claimed is not null;
end;$$;
create or replace function public.release_stale_deliveries() returns void language sql security invoker set search_path=public as $$
 update delivery_outbox set status='pending' where status='sending' and claimed_at<now()-interval '5 minutes';
$$;
revoke execute on function public.save_lead(jsonb),public.save_event(jsonb),public.check_rate_limit(text,int,int),public.claim_delivery(uuid),public.release_stale_deliveries() from public,anon,authenticated;
grant execute on function public.save_lead(jsonb),public.save_event(jsonb),public.check_rate_limit(text,int,int),public.claim_delivery(uuid),public.release_stale_deliveries() to service_role;
