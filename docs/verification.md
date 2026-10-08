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
- Vercel's manual Cron Run retried all ten previously queued QA events. Supabase now reports all
  ten sent at attempt 2; all 19 events in the new end-to-end QA session were sent at attempt 1.
  Sheet UUID checks confirmed no duplicate event rows.

## Verified live delivery

Commit 880f4ff reached Ready on the production domain. The live health endpoint accepts inquiries;
robots allows indexing and references the 952-URL root-host sitemap. A request to www with a path
returns a 308 redirect preserving that path on erledigt-team.de.

The owner-authorized TEST inquiry 6c2e1318-a0ba-4995-8465-d065aa4e1bda returned HTTP 201 and reference
6C2E1318. It appears once in leads and once in Anfragen. Both delivery jobs are sent at attempt 1,
with matching Zustellung rows. Resend reports Delivered to info@erledigt-team.de; this confirms the
recipient server accepted it, not that a person opened the message. No second test email was sent.

Live browser inspection found zero optional analytics requests before consent and after withdrawal.
With consent, first-party events returned 204 and GA collection returned 204. The generate_lead event
contained a clean /anfrage URL and no contact details or internal lead UUID. GA4 Realtime displayed
the page views, form steps and exactly one generate_lead key event. Marketing performance is now
the reports snapshot template.

A follow-up tracking refinement adds the matched public city slug to form events. Local browser
inspection verifies saterland for a known town and omission of an unknown free-text city. Production
build and TypeScript pass after that refinement. Screenshots and detailed browser measurements are
in the workspace proofs directory, outside the repository.
