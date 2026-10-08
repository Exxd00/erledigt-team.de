# Launch runbook

## Existing resources

- GitHub: `Exxd00/erledigt-team.de`, branch `main`.
- Vercel Hobby: `erledigt-teamde/erledigt-team.de`. Stay on this host and plan; no paid upgrade.
- Production domain: https://erledigt-team.de. Both root and www show Valid Configuration;
  www is a 308 redirect to root. Checkdomain website DNS is applied; Microsoft 365 mail is preserved.
- Supabase: `evefmhpnaqprergslqfr`, London, Free. Four tables with RLS and service-only RPC access.
- Google Sheet: `1bHaLp8KEP-AjMfPA7p0gToRlajS27d6zDJmcbZDOOig`. Tabs Anfragen, Ereignisse,
  Zustellung and Hinweise have frozen colored headers, filters and an inquiry-status dropdown.
- Apps Script: `ERLEDIGT TEAM – Anfrage & Ereignisse`, project
  `18uks7sjjJFBQv2QIAVaQFOsYSlFO9Z_PhWDrXDHisrTeIq9-DvvVdRvo`, under the existing Sheet account.
  Spreadsheet ID and webhook token are configured. Authorization and deployment are pending.
- Resend: `erledigt-team.de`, Ireland (eu-west-1). Sender records are prepared, not yet applied.
- ImgBB: the supplied logo and two generated website images are uploaded. URLs and local fallbacks
  are in `src/lib/assets.ts`. This integration does not upload customer photos or need a runtime key.

## Production environment

Already stored as Production-only Vercel Secrets: `SUPABASE_SECRET_KEY`, `RATE_LIMIT_SECRET`,
`SHEETS_WEBHOOK_TOKEN` and `CRON_SECRET`. Existing Supabase server access was used; no new key was
created. Non-secret production configuration: `SUPABASE_URL`, `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_LAUNCH_READY=false`, `LEAD_EMAIL_FROM` and `LEAD_EMAIL_TO`.

Still required: `SHEETS_WEBHOOK_URL` and a domain-restricted `RESEND_API_KEY`. GA4 is optional and is
not configured; consented first-party events have their own database and Sheet pipeline.
Environment changes require a new deployment. Keep production secrets out of Preview, client
variables, logs, screenshots, the repository and this document.

## Remaining connection steps

1. Complete the pending action-time approval for Apps Script's Sheets permission and Resend sending
   access. Google grants a Sheets-wide scope, while the script opens only the configured Sheet.
2. Save the current `integrations/google-apps-script/Code.gs` and manifest in the existing project.
   Deploy the web app executing as its owner, accessible to requests with the server-held token.
   Invalid tokens are rejected. Store its `/exec` URL in the Vercel production environment.
3. Apply the exact prepared Resend records in checkdomain after approval, preserving Microsoft 365
   MX/SPF and nameservers. Verify the domain and create a Sending-only key restricted to this domain.
   Save that key as a Vercel Production Secret. Disable open/click tracking for internal notifications.
4. Verify that `info@erledigt-team.de` receives mail. Public Microsoft 365 MX records alone do not
   establish that the individual mailbox exists. The authorized test must be clearly labelled.
5. Complete the factual processor, retention and transfer disclosures. Keep GA4 disabled unless its
   actual property configuration and disclosures are completed. Do not claim unverified contracts.
6. Complete controlled delivery checks, then enable `NEXT_PUBLIC_LAUNCH_READY=true` and rebuild.
   Until launch is ready, the public version keeps indexing and final form submission disabled.
7. Confirm the daily Vercel Cron job from `vercel.json` is present. It uses the secret Authorization
   header, runs at 05:00 UTC within Hobby's scheduling window, and does nothing before launch.
   Immediate delivery runs after each accepted request; the daily job only retries queued failures.
   An authenticated manual `POST /api/internal/retry` returns 202 for acceptance, not completion.

## Verify the complete chain

With the owner's pending test authorization, send one clearly labelled request to the business
mailbox. Confirm its reference, one database lead, one inquiry row, actual email receipt and both
delivery jobs marked sent. Repeat the same UUID and verify no duplicate inquiry. Exercise a retry
with test configuration without removing real production secrets. Check the exact Sheet
`record_id` acknowledgement for leads, events and delivery history.

Verify refusal creates no analytics records, consent records a journey, and withdrawal stops new
collection. Phone clicks measure clicks, not completed calls. Inspect the mobile menu, search/filter
combinations, prefilled forms, both themes, image fallbacks and keyboard operation. Finally check
canonical host, sitemap, robots, HTTPS and www redirection.

## Verified public identity

Ashraf Kadoura, trading as Erledigt-Team Gebäudeservice, Eschstraße 70, 26683 Saterland;
VAT ID DE465229918; Gebäudereiniger in the directory of zulassungsfreie Handwerksbetriebe at
Handwerkskammer Oldenburg. Telephone from the supplied brochure: +49 155 67451482.
No private business-document scans or personal tax identifiers are committed. Do not invent
opening hours, certifications, insurance, branches or customer reviews.
