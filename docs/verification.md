# Verification — 8 October 2026

## Code and content

- All 15 request-validation, origin, rate-limit, Sheet acknowledgement, deduplication, formula
  neutralization and event allowlist tests pass.
- TypeScript and production build pass: 962 framework routes including metadata.
- Build audit passes for 953 static pages: minimum 358 main words, one h1, unique titles,
  self canonical URLs, valid links/anchors and available local images.
- Editorial audit: 11 services, 78 towns, 858 combinations; 947 articles with at least 301 body
  words. Maximum normalized six-word Jaccard similarity is 0.541; no flagged duplicate pairs.
- All 11 local HTTP checks pass, including rejecting invalid requests and unauthenticated retries,
  returning 503 rather than a false success without configured delivery, and prefilled-form rendering.

## Browser refresh checks

36 current checks cover the home page, service directory, town directory, a service detail, a town
detail and a town/service combination at actual browser widths 320, 768 and 1440 px in both themes.
No horizontal overflow, broken loaded images or extra h1 was found. A long German heading overflow
at 320 px was corrected and verified. Region filtering returns the expected five nearby towns for
Saterland & Umgebung, without numeric distance labels. The home finder switches content and links
for private, business and property needs. The floating contact panel focuses its first link and
returns focus to its trigger when dismissed with Escape.

Earlier checks exercised form validation, review steps, navigation, image-CDN failure and local
fallback recovery. Current production build is checked separately from the developer server.

## External configuration confirmed before this release

- Vercel remains Hobby. Both hosts show Valid Configuration; www redirects with 308 to root.
  Microsoft 365 MX and domain SPF records remain intact.
- Production-only secrets for Supabase, webhook auth, rate limits and cron were already saved.
  Apps Script Version 3 is now deployed, its exact-record acknowledgements were checked, and
  SHEETS_WEBHOOK_URL is saved in Vercel.
- Resend verifies erledigt-team.de in Ireland. A Sending-only API key restricted to this domain
  is saved as a Production Secret. No email delivery is inferred merely from these settings.
- ImgBB holds the logo and seven generated illustrations; all new assets have local fallbacks.
- The private Google Sheet has colored frozen headers, filters and an inquiry-status dropdown.
- GA4 is configured as documented in tracking.md, including the generate_lead key event and
  four dimensions. The measurement ID is saved in Vercel Production.
- Search Console's business account has an unverified Domain property prepared. DNS ownership
  verification and sitemap submission are still pending; no indexing claim is made.
- Ten labelled QA events from the previous release were persisted in Supabase before Sheet
  delivery was configured. Their retry status must be checked after the new deployment.

## Required live proof after deployment

Use the owner's already-authorized labelled test request to verify the entire browser → API →
database → Sheet → Resend chain. Check refusal, consent and withdrawal with the deployed GA tag.
Record actual delivery statuses in the workspace handoff report. Resend acceptance is not proof
that a person has seen an inbox message. Screenshots and detailed browser measurements are in
the workspace proofs directory, outside the repository.
