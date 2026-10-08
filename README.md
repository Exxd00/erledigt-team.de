# ERLEDIGT TEAM · erledigt-team.de

German cleaning-service website for Eschstraße 70, 26683 Saterland. Built with Next.js, React,
TypeScript and locally hosted Manrope fonts. Original supplied logo, generated cleaning imagery,
light/dark themes, glass buttons, searchable service and location directories, and a three-step inquiry.

The content includes 11 services, 78 verified towns/municipalities within approximately 50 km
straight-line distance, and 858 service/location pages. All 947 editorial articles contain at least
300 body words. General, contact and legal pages are additional.

## Current operational status

The application is deployed for review at https://erledigt-teamde.vercel.app. The live Google Sheet
has frozen, colored headers and four tabs.
The initial Supabase schema was applied. **Live form delivery, email/domain DNS, Apps Script deployment
and analytics configuration are not yet connected.** No secret keys are committed. The default build
is a preparation version with search indexing disabled and the final form submission unavailable.
Browser QA has now covered six representative pages at 320, 375, 768, 1440 and 1920 px in both
themes. The proprietor, VAT ID and chamber information were verified from supplied business records.
The root and www domains are assigned to the Vercel project, with www set to redirect to the root.
Their DNS changes remain pending. The remaining account authorizations, suitable hosting plan and
domain login are listed in the runbook.

See [launch runbook](docs/launch-runbook.md), [reference decisions](docs/reference-audit.md),
[tracking specification](docs/tracking.md) and [verification](docs/verification.md).

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
every rendered static page for words, headings, canonical URL, internal links/anchors and images.
HTTP checks intentionally stop if the live form is enabled, to avoid creating production test requests.

## Content and integrations

- `src/data/content.json`: German service and location content.
- `src/lib/local-content.ts`: editorial modules and location/service composition.
- `scripts/build-content.mjs` / `build-cities.mjs`: reproducible content sources.
- `docs/geography-input.json`: source coordinates and approximate radius calculations.
- `supabase/migrations/`: durable leads, consented events, rate limits and delivery queue.
- `integrations/google-apps-script/`: authenticated, idempotent Google Sheets webhook.
- `src/app/api/`: validated inquiry/event endpoints and authenticated delivery retry endpoint.

The private Google Sheet is configured separately; its sharing permissions have not been expanded.
The database has RLS enabled and no public table access. A request is acknowledged only after a
successful database transaction creates both the lead and delivery jobs. Email/Sheet failures remain
visible in the database queue for retry. See the runbook for remaining configuration and validation.
