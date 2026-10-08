# Verification — 8 October 2026

## Current code checks

- `pnpm test`: all 15 tests pass. Coverage includes request origins, input validation, webhook
  authentication, exact record acknowledgements, persistent deduplication, formula neutralization,
  event-field allowlisting, sheet growth and rate-limit addressing.
- `pnpm typecheck` and `pnpm build`: pass; 962 framework routes including metadata are generated.
- `pnpm audit:build`: all 953 public static pages pass, with at least 359 words inside main,
  one h1, unique titles, canonical URLs, valid internal links/anchors and available local images.
- `pnpm audit:http`: all 11 preparation-build checks pass, including both retry methods rejecting
  unauthenticated calls, invalid inputs, no false success, the prefilled form, 404 and robots.
- The unchanged editorial content previously passed `audit:content`: 947 articles, minimum 301
  body words, maximum normalized six-word shingle similarity 0.523 and no exact duplicates.

Earlier responsive checks covered six pages at 320, 375, 768, 1440 and 1920 CSS px in both themes:
all 60 checks had no horizontal overflow or broken loaded images. The checks also exercised combined
filters, empty results, radius exclusion, city/service navigation, prefilled inquiry fields, selected
contact-channel validation, review step and keyboard focus on errors. Current integration changes
receive additional targeted image and live checks below.

Targeted checks after the ImgBB integration passed at 375 and 1440 px in both themes, without
horizontal overflow. Normal CDN images, including the lazy solar image, loaded successfully.
Blocking every `i.ibb.co` request exposed an error before React hydration; the image component now
also checks failed images when attached. Repeating the same blocked-network test loaded all four
rendered images from local files. Network blocking and viewport overrides were cleared afterwards.

## Verified external configuration

- Vercel project remains on Hobby. Root and www show Valid Configuration. Public HTTPS responds;
  www redirects to https://erledigt-team.de/. Microsoft 365 mail DNS remains unchanged.
- Production-only Vercel Secrets are saved for Supabase, webhook authentication, rate limiting and
  cron authentication. Commit `fecd975` reached Ready and Current on the production domain;
  public HTML includes the new ImgBB sources and its health endpoint keeps form submissions closed.
- Vercel's Cron Jobs panel confirms `/api/internal/retry` at `0 5 * * *`, enabled on Hobby.
- The live Chrome journey made no analytics requests after refusal. After consent, five observed
  `/api/events` requests returned 204; the same event UUIDs were read back from Supabase. Ten total
  QA events (including scrolling and opening the consent settings) carry source `launch-check`,
  medium `qa` and campaign `integration-test`. They remain queued for Sheet delivery with
  `sheet_not_configured`, accurately reflecting the pending Apps Script deployment. No lead or
  email was created. Navigation after withdrawing consent made zero further analytics requests.
- ImgBB serves the three intended public website assets with HTTP 200 and image/jpeg or image/webp
  content types. The source retains local fallbacks. No customer photo upload is enabled.
- The Google Sheet headers were read back and visually inspected: separate colors group identity,
  status, contact, object, attribution and follow-up fields. Header text remains white and bold,
  row 1 is frozen, filters remain present and the inquiry status dropdown is preserved.
- Apps Script contains the updated record-ID acknowledgements. The saved editor text was copied
  back and compared to the intended edit. Its deployment dialog is prepared, not authorized.
- Public legal identity was verified against supplied business documents. Private identifiers and
  scans remain outside the repository.

## Pending live proof

The form remains intentionally unavailable until launch configuration is complete. Resend sender
verification/key creation and Apps Script's new Google permission are awaiting the consolidated
approval. No live customer inquiry, email receipt or successful Sheet delivery is claimed. GA4 is
not configured. Final processor/retention disclosures and the end-to-end delivery check precede
launch and search indexing.

Proof screenshots are kept outside the repository in the workspace `proofs/` directory; earlier
responsive measurements and screenshots are in the local ignored `artifacts/` directory.
