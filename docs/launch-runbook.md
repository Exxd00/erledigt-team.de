# Launch runbook

## Prepared

- Target repository: `Exxd00/erledigt-team.de`.
- Existing Vercel project: `erledigt-teamde/erledigt-team.de`, linked to the repository.
- Review deployment is live at https://erledigt-teamde.vercel.app. The root domain is assigned to
  Production and www is configured as a 308 redirect to the root. Registrar DNS was never changed.
- The owner declined a paid subscription. Netlify Free is the new production target. Build and
  scheduled retry configuration are in the repository; account connection and deployment are pending.
- Existing Supabase project: `evefmhpnaqprergslqfr`, London region. Initial migration was executed
  successfully through its SQL editor. Four tables have RLS and no anon/authenticated access.
- Existing Google Sheet has the four configured tabs, frozen colored headers, filters and an inquiry
  status dropdown. The delivery-key header was added for idempotent attempt history.
- Generated images and the original supplied logo are local website assets.
- A dedicated Apps Script project, `ERLEDIGT TEAM – Anfrage & Ereignisse`, has been created under
  the Sheet's existing Google account. The webhook code was saved and compared with the local source.
  Its spreadsheet property and explicit Sheets-only manifest are saved. The web-app dialog is
  prepared; authorization, secret and final deployment are pending.
- Resend's domain configuration is prepared in Ireland; the exact displayed public DNS values are
  recorded in `dns-preparation.md`. Verification and a domain-restricted sending key are pending.
- The domain is registered at checkdomain and dashboard access is restored. Public MX/SPF currently
  point to Microsoft 365; the individual receiving mailbox still needs verification. The hosting
  section displayed offers to buy a plan, not an existing hosting package.

## Verified legal details and remaining owner input

The supplied business documents identify proprietor Ashraf Kadoura, trading as Erledigt-Team
Gebäudeservice, VAT ID DE465229918 and registration as Gebäudereiniger in the directory of
zulassungsfreie Handwerksbetriebe at Handwerkskammer Oldenburg. These public details are in
`src/lib/legal.ts`; no private document scans or personal tax identifiers are in this repository.
Still needed: confirmation that `info@erledigt-team.de` is an existing receiving mailbox, or the
destination for creating it. The telephone number is taken from the supplied brochure:
`+49 155 67451482`. Do not invent opening hours, certifications, insurance or legal registration.

Use Netlify **Free**, not Personal or Pro. It explicitly allows commercial projects and supports
the existing Next.js application. Its monthly allowance has a hard cap; see
[hosting setup and limits](netlify-hosting.md). Do not purchase, upgrade, or enable automatic recharge.
No subscription or payment has been made. Vercel Hobby remains a review environment and is not
the selected commercial launch host.

## Connect the existing accounts

1. Chrome Zen is available. Check the selected service account before edits. Netlify's login page is
   open for the owner; sign-in includes acceptance of its terms. Import only `Exxd00/erledigt-team.de`
   after the necessary account and repository permission is authorized. Use the Free plan.
2. Obtain action-time authorization for new security-sensitive access: a Resend sending key restricted
   to this domain, server-side Supabase access in the Netlify project, and Apps Script authorization for
   Google Sheets. Do not reveal or commit keys. Password creation must be completed by the owner.
3. Continue the prepared script for the existing spreadsheet with `integrations/google-apps-script/Code.gs`
   and the manifest. Verify `SPREADSHEET_ID` and set a random `WEBHOOK_TOKEN`. The script's declared
   Sheets OAuth scope is broader than one file, while its code opens only the configured spreadsheet.
   Review that scope with the owner before authorization. Deploy as a web app executing as owner;
   unauthenticated requests are rejected unless the server-held token matches. Store the deployed `/exec`
   URL and token only in Netlify server variables. Keep them out of browser bundles and the repository.
4. Add/verify `erledigt-team.de` in Resend. Read its actual DKIM/SPF records and the current domain DNS;
   preserve existing MX and SPF configuration. Configure `LEAD_EMAIL_FROM`/`LEAD_EMAIL_TO` as the supplied
   info address once its receiving mailbox exists.
5. Set the variables in `.env.example` for this project only. Use independently generated random
   `RATE_LIMIT_SECRET`, `SHEETS_WEBHOOK_TOKEN` and `CRON_SECRET`. No Supabase service key is public.
6. If GA4 is desired, complete the property's actual consent/terms flow with the owner as required.
   Configure the measurement ID and disable enhanced measurement that could collect automatic query
   strings or form events outside this site's allowlist. Finish the privacy disclosure before activation.
7. Add the root and www domains to the actual Netlify site. Read its generated DNS instructions and
   update only the necessary website records in checkdomain, preserving Microsoft 365 mail routing
   and the existing nameservers. Verify HTTPS and www-to-root redirection. The historical Vercel values
   in `dns-preparation.md` must not be applied.
8. Finalize the legal pages, processors, retention periods and transfer disclosures. Set
   `NEXT_PUBLIC_LAUNCH_READY=true` only after live configuration is complete. Rebuild after changes to
   public or prerendered legal environment values.
9. Verify Netlify's `retry-deliveries` function is marked Scheduled on the published deployment.
   It runs every five minutes, does nothing until launch is enabled, and calls the authenticated
   `POST /api/internal/retry`. The endpoint returns 202 for acceptance and uses `after()` for processing;
   202 is not a delivery confirmation. Run Now and inspect the database/Sheet delivery state.
   The old `vercel.production.example.json` is not used for this hosting choice.

## Verify the actual chain

With explicit authorization, submit a clearly labeled test request for the owner's business mailbox.
Check the success reference, one database lead, one Sheet inquiry row, an actual received email and
both delivery jobs marked sent. Repeat the same request UUID and confirm no duplicate inquiry row.
Test a notification failure/retry using test configuration, without removing real production secrets.
Confirm consent refusal causes no analytics writes, acceptance records a journey, and withdrawal stops
new collection. Inspect mobile widths 320/375/390/768 and desktop 1440/1920 in both themes, keyboard
navigation, filters, prefilled forms and every request step. Then verify sitemap, robots, canonical host,
DNS, SSL, and actual domain email receipt.

Production-build browser checks passed for six pages at five widths in both themes. Service/category
search, location/radius filtering, mobile navigation, prefilled inquiry and contact-channel validation
were exercised. The four Sheet tabs were visually inspected. Domain binding, authorized integrations,
and actual delivery tests remain pending; local checks cannot replace them.
