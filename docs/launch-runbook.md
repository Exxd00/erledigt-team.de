# Launch runbook

## Resources

- GitHub: Exxd00/erledigt-team.de, main.
- Vercel Hobby: erledigt-teamde/erledigt-team.de. No paid upgrade authorized or required by this work.
- Canonical host: https://erledigt-team.de; www redirects permanently with HTTP 308.
- Supabase: evefmhpnaqprergslqfr, London Free. Four RLS-protected tables and service-only RPCs.
- Google Sheet: 1bHaLp8KEP-AjMfPA7p0gToRlajS27d6zDJmcbZDOOig, private under the existing IXA account.
  Anfragen, Ereignisse, Zustellung and Hinweise have frozen colored headers and filters.
- Apps Script project: 18uks7sjjJFBQv2QIAVaQFOsYSlFO9Z_PhWDrXDHisrTeIq9-DvvVdRvo.
  Version 3 deployed October 8. Spreadsheet ID and webhook token are configured; exact record IDs
  are acknowledged. Permission/deployment approval was completed by the owner.
- Resend: erledigt-team.de, Ireland, verified. Sending-only domain-scoped key saved in Vercel.
- ImgBB: eight public brand/illustration assets, with local fallbacks; no customer-upload flow.
- GA4: property 557969528, stream 16061549557, G-16V9Z8RTRS; settings in tracking.md.
- Search Console: Domain property for erledigt-team.de prepared in erledigt.team.de@gmail.com.
  Ownership TXT verification and the sitemap submission remain pending.

## Production environment

Secrets: SUPABASE_SECRET_KEY, RATE_LIMIT_SECRET, SHEETS_WEBHOOK_TOKEN, CRON_SECRET and RESEND_API_KEY.
Config: SUPABASE_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_LAUNCH_READY, LEAD_EMAIL_FROM,
LEAD_EMAIL_TO, SHEETS_WEBHOOK_URL and NEXT_PUBLIC_GA_ID. All are scoped to Production.
New environment values only take effect with a new deployment. Never put secrets in Preview,
client variables, Git, screenshots or reports.

The current refresh is prepared for NEXT_PUBLIC_LAUNCH_READY=true. It enables indexing and inquiry
submission only when database and delivery settings are also present. Check /api/health after the
new deployment. Preserve Microsoft 365 mail DNS while adding any Search Console TXT record.

## Final live checks

The owner approved one clearly labelled TEST inquiry and notification to info@erledigt-team.de.
Confirm one lead UUID, one Sheet inquiry row, corresponding delivery history, and both delivery
jobs marked sent. Inspect Resend's recipient-server status; inbox reading remains an owner check.
Verify consent refusal sends no optional analytics, approval sends events and generate_lead after
save, and withdrawal stops subsequent collection. Verify live sitemap, robots, root canonical,
HTTPS and www redirect. Keep QA records clearly labelled.

New jobs dispatch immediately. Vercel's enabled Hobby cron retries queued jobs at 05:00 UTC within
the daily scheduling window. /api/internal/retry is protected by the cron bearer secret. Inspect
the ten earlier labelled QA events and retry them without duplicating records. Supabase is the
authoritative queue when Sheets is unavailable; the Zustellung audit mirror is best-effort.

## Owner input at handoff

Complete Search Console ownership approval at the concrete verification step, then submit
https://erledigt-team.de/sitemap.xml. Confirm whether the published telephone number accepts
WhatsApp business messages before adding that channel. Authentic team/work photos and approved
customer testimonials can strengthen proof when available; do not invent them.

## Verified public identity

Ashraf Kadoura, trading as Erledigt-Team Gebäudeservice, Eschstraße 70, 26683 Saterland;
VAT ID DE465229918; Gebäudereiniger registered with Handwerkskammer Oldenburg.
Phone from supplied brochure: +49 155 67451482. Private scans and tax identifiers remain outside Git.
No unconfirmed opening hours, insurance, certifications, branches or reviews are claimed.
