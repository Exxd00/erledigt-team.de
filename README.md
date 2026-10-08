# ERLEDIGT TEAM · erledigt-team.de

German cleaning-service website for Eschstraße 70, 26683 Saterland. Built with Next.js, React,
TypeScript and locally hosted Manrope fonts. Original supplied logo, generated cleaning imagery,
light/dark themes, glass buttons, searchable service and location directories, and a three-step inquiry.

The content includes 11 services, 78 towns/municipalities within approximately 50 km straight-line
distance, and 858 service/location pages. All 947 editorial articles contain at least 300 body words.
General, contact and legal pages are additional.

## Operational status

The selected host is the existing **Vercel Hobby** project `erledigt-teamde/erledigt-team.de`.
The website DNS is connected at https://erledigt-team.de; www redirects to the root domain.
No paid plan, upgrade or new hosting subscription is authorized.

The Supabase schema is installed. Production database and webhook secrets are stored in Vercel.
The existing private Google Sheet has frozen, grouped colored headers and four tabs. Public website
images use ImgBB with local fallbacks; no client photo upload is enabled. **Apps Script authorization,
Resend verification/sending access and end-to-end lead delivery remain pending.**

`NEXT_PUBLIC_LAUNCH_READY=false` keeps search indexing and final form submission disabled while these
connections are completed. Direct contact links remain available. No secret values are committed.
The legal identity was verified from the supplied business documents; processor and delivery checks
remain part of launch preparation.

See [launch runbook](docs/launch-runbook.md), [DNS status](docs/dns-preparation.md),
[reference decisions](docs/reference-audit.md), [tracking](docs/tracking.md) and
[verification](docs/verification.md).

## Local development

Node.js 22+ and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Copy `.env.example` to `.env.local` for local backend configuration.
Keep actual secrets in server-side environment variables only.

```sh
pnpm test
pnpm typecheck
pnpm audit:content
pnpm build
pnpm audit:build
pnpm start
# Separate terminal; only against a preparation build with the backend disabled:
pnpm audit:http
```

`audit:content` measures body words and name-normalized textual similarity. `audit:build` checks
every rendered static page for words, headings, canonical URLs, internal links/anchors and images.
HTTP checks intentionally stop if the live form is enabled to avoid creating production requests.

## Content and integrations

- `src/data/content.json`: German service and location content.
- `src/lib/local-content.ts`: editorial modules and location/service composition.
- `docs/geography-input.json`: source coordinates and approximate radius calculations.
- `src/lib/assets.ts`: ImgBB images and their local fallbacks.
- `supabase/migrations/`: durable leads, consented events, rate limits and delivery queue.
- `integrations/google-apps-script/`: authenticated, idempotent Google Sheets webhook.
- `src/app/api/`: validated inquiry/event endpoints and authenticated delivery retry endpoint.
- `vercel.json`: one daily retry at 05:00 UTC, compatible with Hobby scheduling.

A request is acknowledged only after a database transaction saves both the lead and delivery jobs.
Delivery starts immediately. The daily job retries failed work; it does not delay new requests.
Sheets delivery requires an acknowledgement of the exact record ID. Failed attempts remain visible
in the database outbox. Sheet sharing permissions have not been expanded, and database tables have
RLS with no public access. See the runbook for the remaining live checks.
