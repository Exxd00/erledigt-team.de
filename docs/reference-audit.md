# IXA reference and implementation decisions

Reference inspected: `Exxd00/ixa-lead.de`, commit `a7c4a5a`. The user's visual reference is
ixa-leads.de. Its Next.js App Router structure, mobile navigation, semantic theme colors,
glass-style calls to action, contact/conversion endpoints, consent-controlled analytics and
Google Apps Script integration informed this project.

The new site has its own content and identity. The five supplied blue colors are primitive tokens;
semantic tokens independently define backgrounds, text, muted text, borders, feedback and buttons
for each theme. A white plate preserves the supplied logo's actual white background in dark mode.
CSS motion respects reduced-motion preferences. Generated WebP images and local fonts avoid stock
photo imports and external font requests.

The customer decision is organized as: choose a need, check local suitability, understand preparation,
then request an individual quote. There is one primary action per hero. Phone access remains easy on
mobile. Service and town are carried into the form. Object details precede contact details, followed
by a review step. No invented reviews, client logos, certification, guaranteed yields, fixed turnaround
or unconfirmed prices are used as evidence.

All location/service pages are reachable from both directories and related pages. Location pages
describe the service area, not invented branches. Distances are approximate straight lines from the
supplied address, not driving times. Local introductions discuss planning situations rather than
asserting unverified local clients or characteristics.

The delivery flow adds a durable database transaction and an outbox before showing success. Browser
conversion tracking is kept separate from business records. A phone click is not called a completed
phone call, and a form request is not called a confirmed job. The spreadsheet webhook uses persistent
ID-column checks, a lock, literal text cells and formula neutralization. A failed notification is not
silently treated as delivered.
