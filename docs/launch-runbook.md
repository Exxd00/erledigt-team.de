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
- Search Console: https://erledigt-team.de/ URL-prefix property verified by the public HTML meta tag
  under erledigt.team.de@gmail.com. Linked to GA4 stream 16061549557; its Queries and Google organic
  search traffic reports are available. Keep the verification meta tag in the root layout.

## Production environment

Secrets: SUPABASE_SECRET_KEY, RATE_LIMIT_SECRET, SHEETS_WEBHOOK_TOKEN, CRON_SECRET and RESEND_API_KEY.
Config: SUPABASE_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_LAUNCH_READY, LEAD_EMAIL_FROM,
LEAD_EMAIL_TO, SHEETS_WEBHOOK_URL and NEXT_PUBLIC_GA_ID. All are scoped to Production.
New environment values only take effect with a new deployment. Never put secrets in Preview,
client variables, Git, screenshots or reports.

NEXT_PUBLIC_LAUNCH_READY=true is saved and the deployed health endpoint confirms acceptingRequests.
Indexing and inquiry submission are enabled. Preserve Microsoft 365 mail DNS while adding any
Search Console TXT record.

## Completed live checks

One owner-authorized TEST inquiry returned reference 6C2E1318. It exists once in the database and
Sheet; both delivery jobs are sent and Resend reports Delivered to info@erledigt-team.de. Inbox
reading remains an owner check. Consent refusal/withdrawal create no optional analytics requests;
approval sends events and generate_lead after save. GA4 Realtime displays that key event. Live
sitemap (952 URLs), robots, root canonical, HTTPS and www redirection are verified.

New jobs dispatch immediately. Vercel's enabled Hobby cron retries queued jobs at 05:00 UTC within
the daily scheduling window. /api/internal/retry is protected by the cron bearer secret. A manual
Cron Run delivered all ten earlier labelled QA events without duplicates. Supabase is the
authoritative queue when Sheets is unavailable; the Zustellung audit mirror is best-effort.

## Search verification and owner input

The owner approved Search Console ownership and the GA4 link on October 9. Checkdomain's login
expired before the TXT save, so verification was completed with an HTML tag for the canonical HTTPS
URL-prefix property. This covers all public site pages. DNS login is no longer required for this
setup. The older unverified Domain property is unused; no DNS or Microsoft 365 records were changed.

https://erledigt-team.de/sitemap.xml was submitted and resubmitted once. Google still reports
Couldn't fetch in Sitemaps despite its own live URL test successfully fetching the correct XML and
the public endpoint returning 200 with 952 URLs. No manual actions are reported. Check this result
again later; do not call it Success or claim all URLs are indexed. A manual homepage indexing
request also returned Google's generic error. These are outstanding Google processing results,
not a request for further owner credentials or approval.

The owner confirmed WhatsApp on the published number; the website now includes that channel and
its consent-controlled click event. The owner has no additional photos or testimonials to supply.

## Verified public identity

Ashraf Kadoura, trading as Erledigt-Team Gebäudeservice, Eschstraße 70, 26683 Saterland;
VAT ID DE465229918; Gebäudereiniger registered with Handwerkskammer Oldenburg.
Phone from supplied brochure: +49 155 67451482. Private scans and tax identifiers remain outside Git.
No unconfirmed opening hours, insurance, certifications, branches or reviews are claimed.
