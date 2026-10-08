# Netlify Free launch preparation

Owner direction, 8 October 2026: continue without a paid business hosting subscription.
Netlify Free is the selected preparation target because it allows commercial projects and supports
the existing Next.js App Router, static pages, API routes and `after()` without an application rewrite.
No account, paid subscription, new repository authorization or production deployment is claimed here.

## Repository configuration

- Connect `Exxd00/erledigt-team.de`, branch `main`, repository root as the base directory.
- `netlify.toml`: Node 24, `pnpm build`, publish `.next`, functions in `netlify/functions`.
- pnpm version is locked by `packageManager`. `pnpm-workspace.yaml` uses the hoisted layout so
  OpenNext can package dependencies without the Windows symlink-copy conflict observed with the
  isolated layout. The dependency versions and lockfile are unchanged. Netlify maintains its
  OpenNext adapter automatically.
- Add the values from `.env.example` through project environment settings. Values in `netlify.toml`
  are build-only and are unsuitable for server secrets. Free plans expose variables to all scopes;
  the application only references credentials in server modules, never in `NEXT_PUBLIC_*` values.
- Keep `NEXT_PUBLIC_LAUNCH_READY=false` until the domain, privacy disclosures, real delivery and
  mailbox checks pass. Keep preview environments disabled and without production secrets.
- Rebuild after changing environment variables. Netlify functions use deployment-time values.
- The privacy draft identifies Netlify on Netlify builds and Vercel on the existing Vercel preview.
  Complete the processor, transfer and retention disclosures before launch.

## Delivery retries

The scheduled function runs every five minutes on published deploys, and exits without contacting
the application while launch is disabled or the secret is absent. It uses Netlify's read-only `URL`
runtime variable and sends a Bearer secret to the existing project's internal retry route.
Redirects are rejected, and its 15-second HTTP deadline stays below the scheduler's 30-second limit.

`POST /api/internal/retry` checks the secret and backend readiness, then responds 202 and processes
the durable outbox with Next.js `after()`. The Next route has a 60-second duration budget. Work is
bounded in batches and interrupted leases are recoverable. Success is established by outbox state,
not by the scheduler's 202 response. Provider failures never log contact details or credentials.
The existing authenticated GET route remains available for explicit synchronous diagnosis.

Netlify supplies `x-nf-client-connection-ip`; rate limiting uses that value on Netlify instead of
an arbitrary forwarded list. Only a rotating HMAC is stored, not the plain address.

## Free allowance

Official rates checked 8 October 2026 for new credit-based accounts:

| Item | Allowance / consumption |
| --- | --- |
| Free monthly allowance | 300 credits, hard cap |
| Production deploy | 15 credits |
| Preview / branch deployment | 0 deployment credits; traffic and compute still count |
| Bandwidth | 20 credits / GB |
| Web requests | 2 credits / 10,000 requests |
| Compute, including scheduled functions | 10 credits / GB-hour |

All projects pause when the available credits run out. The monthly allowance renews with the billing
cycle. This is not an unlimited or uptime-guaranteed plan. Do not upgrade or enable paid recharge.
Use preview builds for iterations and publish a tested release to avoid unnecessary production
deployment consumption. Inspect actual usage after launch; do not promise a visitor quota without
measuring the site's transferred bytes and compute.

## Remaining live checks

1. Owner login / terms and any new GitHub repository permission.
2. Import and confirm Free plan, actual site identifier, generated URL and successful OpenNext build.
3. Add authorized server credentials, deploy Apps Script and verify the Resend domain.
4. Read the actual Netlify domain panel; apply its records while preserving Microsoft 365 mail.
5. Verify live page rendering, API origins, headers, health, HTTPS, canonical host and redirect.
6. With permission, submit a labeled test and confirm one database inquiry, one Sheet row, an email,
   successful delivery statuses and deduplication. Exercise Run Now and a retry in test configuration.
7. Finalize legal disclosures, enable launch, rebuild once and verify indexing plus consent behavior.

## Primary sources

- [Commercial use on Netlify Free](https://www.netlify.com/guides/netlify-vs-vercel/)
- [Credits and hard limits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)
- [Next.js and after() support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Scheduled functions, all plans and execution limit](https://docs.netlify.com/build/functions/scheduled-functions/)
- [Function environment variables and read-only URL](https://docs.netlify.com/build/functions/environment-variables/)
- [Netlify connection-address header](https://answers.netlify.com/t/upcoming-change-stripping-exposed-netlify-headers-from-function-and-proxy-requests/52665)
