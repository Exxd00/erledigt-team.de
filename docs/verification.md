# Verification — 8 October 2026

Completed against the local production build:

- `pnpm test`: 14 tests passed (request origins, input validation, webhook authorization, durable
  deduplication, formula injection, event field allowlist and sheet growth).
- `pnpm typecheck` and `pnpm build`: passed. 962 framework routes generated, including metadata.
- `pnpm audit:content`: 947 editorial pages; minimum 301 body words; maximum city-name-normalized
  six-word shingle similarity 0.523; no exact duplicates or pairs above the audit threshold.
- `pnpm audit:build`: 953 public static pages; minimum 359 words inside main; one h1, unique titles,
  self canonical URLs, valid internal links/anchors and available images. The dynamic form is additional.
- `pnpm audit:http`: all 10 checks passed, including foreign-origin rejection, malformed requests,
  no false success without configuration, protected retry endpoint, 404 and preparation robots.
- Chrome UI: home, service directory, city directory, city/service page, inquiry and Impressum at
  320, 375, 768, 1440 and 1920 CSS px in both themes: all 60 checks had no horizontal overflow or
  broken images. Representative mobile/desktop screenshots were visually inspected.
- Chrome UI: category and text filters together, empty result state, city search and radius exclusion,
  city-to-service links, prefilled service/city/postcode, required selected contact channel, review step,
  keyboard submission and focus on errors. Final submission remains disabled without the live backend.
- Live Google Sheet: Anfragen, Ereignisse, Zustellung and Hinweise visually inspected; the eighth
  delivery column was read back with its navy fill, white bold text, wrap and explanatory note.
- Public legal identity verified from user-supplied business documents. Private identifiers and scans
  remain outside the repository.

The local test inquiry used a reserved `.invalid` email address and was not submitted. No real lead
delivery, production analytics collection, domain HTTPS or business mailbox receipt has been claimed.
These require the remaining account setup in the launch runbook.

Screenshots and responsive measurement results are in the local ignored `artifacts/` directory.
