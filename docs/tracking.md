# Tracking and inquiry flow

## What is recorded

With analytics consent: page views, primary calls to action, telephone and email clicks, service and
town selections, filter actions, form start, step changes, confirmed form submission and submission
errors, general control/link interactions, and 25/50/75/90-percent scroll depth. General interactions
record control type and an optional public element ID, never input contents. A random session ID and
sanitized source/medium/campaign labels allow a consented journey to be connected.

No optional analytics request is made before consent. Theme and consent preferences are stored locally.
Withdrawal removes the local analytics session/attribution and the site's GA cookies and reloads the
page. GA loads only when a valid configured measurement ID and consent are present. Advertising
storage, signals and personalization are disabled. GA page URLs exclude query strings and fragments.
Approved campaign source/medium/name values are passed separately using Google's campaign fields.
The internal `form_submit_success` event becomes `generate_lead` in GA4; the lead UUID is omitted
from Google parameters. Internal events retain the UUID for the private delivery audit.

GA4 property `557969528`, web stream `16061549557`, measurement ID `G-16V9Z8RTRS`:
Germany reporting time, EUR, `generate_lead` marked as a key event. Custom event dimensions are
Leistung (`service`), Einsatzort (`city`), Kontaktposition (`position`) and Anfrageschritt (`step`).
Enhanced measurement is off to avoid automatic form and duplicate navigation collection.
Google Signals and user-provided data collection are off. Ads personalization is disallowed in
all 307 configured regions. User and event data retention is two months; reset on new activity is
off. Browser GA cookies expire after 60 days without an automatic renewal.

Inquiry fields: service, town, postcode, property type, approximate scope, frequency, optional requested
date, customer name, optional company, preferred reply method, email/phone, optional message and privacy
acknowledgement. The required contact field follows the chosen reply method. The exact street address
and photos can be obtained in follow-up; they are not mandatory for the first inquiry.

The business inquiry is stored regardless of optional analytics consent. Attribution fields are removed
server-side when analytics consent is absent. Personal details and free text are not copied to analytics.

## Data flow

1. Validate origin, body size, fields, honeypot and minimum form completion time.
2. Enforce rate limits with a daily HMAC of the connection address; do not store the raw IP in lead/event tables.
3. Insert the lead and both delivery jobs in one PostgreSQL transaction. The client keeps the same UUID
   when retrying an uncertain submission. Only confirmed persistence returns HTTP 201.
4. Send the Sheet row and internal notification independently. Claim jobs atomically so concurrent
   workers do not normally send the same job. A fixed Resend idempotency key is used. The Sheet must
   acknowledge the exact lead/event ID or delivery-attempt key before a job is marked sent.
5. Keep failures queued and recover expired leases. `/api/internal/retry` requires the cron bearer secret.
   Vercel Hobby runs the configured retry once daily at 05:00 UTC within its scheduling window.
   New requests start delivery immediately; the schedule only handles unsuccessful attempts.
6. Mirror lead delivery attempts into `Zustellung`. This mirror is best-effort; the Supabase queue is
   authoritative when Sheets itself is unavailable.

Google Sheet tabs: `Anfragen` (customer inquiries/status), `Ereignisse` (consented activity), `Zustellung`
(delivery attempts) and `Hinweise` (operating notes). The first row is fixed and colored. New rows append
below it; existing status/notes are preserved. Event and lead UUIDs provide persistent deduplication.

## Operational limits

This is not a guarantee that every browser event arrives: consent refusal, blocked scripts, offline
browsers and rate limits can reduce analytics. Business records have a separate durable path. Resend
retains idempotency keys for 24 hours; an ambiguous email acceptance followed by a long database outage
may need manual inspection before a later retry. Queue monitoring is required after launch.

Sources: [Resend idempotency](https://resend.com/changelog/idempotency-keys),
[Vercel cron scheduling](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
GA configuration: [official Google tag fields](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).
