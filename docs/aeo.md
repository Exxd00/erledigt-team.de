# Answer engine visibility

This release improves public content retrieval and clarity. It does not promise an AI recommendation,
ranking, citation count, FAQ rich result, or inclusion in any provider's index.

## Public content and identity

- One LocalBusiness ID and one WebSite ID are defined on every page. Service providers resolve to
  that same business, with the real Saterland address and existing public contact details.
- Town pages represent service areas, not branches. No new addresses, ratings, certifications,
  opening hours, fixed prices, response-time guarantees, or project photos were invented.
- Visible answer summaries explain the company, each service and local availability. The service
  descriptions in JSON-LD use exactly the same text as the visible answer.
- BreadcrumbList follows the visible navigation. Collection pages list their linked destinations.
- /fragen contains eight visible answers, each with a stable section anchor and a next step.
- /ratgeber and three original guides explain service selection, quote comparison and preparation.
  Guides have visible organizational authorship, publication dates, tables, checklists and Article data.
- Service FAQ markup is limited to the eleven canonical service pages. Repeated questions on local
  service pages remain visible but are not marked up again. FAQ data is not a promise of Google rich results.
- All new content renders in HTML without client-side data fetching. Both themes reuse the existing
  semantic colors; mobile comparison tables scroll within their container.

## Discovery

- Wildcard crawler access was already allowed. An explicit OAI-SearchBot group preserves that access
  and the same /api/ exclusion. This is a search setting, not a new model-training authorization.
- /llms.txt is an optional public discovery summary generated from the same content sources. It is
  not a search requirement and is not presented as an established ranking factor.
- The sitemap includes the five new HTML pages and the actual revision date. /danke stays out of the
  sitemap and requires a valid signed receipt; noindex is also sent as an HTTP header.
- IndexNow uses a public file at /indexnow-key.txt. It grants no access to mail, leads or accounts.
  Run `pnpm indexnow` for a dry run, then `pnpm indexnow --submit` after verifying deployment.
  The script validates the live file, canonical host, sitemap and private-route exclusions before
  one submission. HTTP 200 acknowledges URLs; HTTP 202 leaves ownership validation pending.
  Neither response proves indexing. There is no added subscription, cron job or background poll.

## Measurement and remaining evidence

The existing consented analytics already records the referring hostname in the private event log.
AI referrals can be reviewed by source (for example chatgpt.com or perplexity.ai) together with the
five primary contact types. No sixth primary conversion or new tracking vendor is added. Visits
with no referrer, blocked analytics or no consent cannot be reliably attributed to an AI service.

Search Console remains the source for Google indexing. Bing Webmaster Tools' AI Performance report
can report citations where available; no Bing account connection or new OAuth permission was granted
by this release. Citation counts are different from referral visits and sales.

Real Google Business Profile/Bing Places listings, authentic customer reviews and permission-cleared
project photographs would provide additional external evidence. Only verified owner-provided profile
URLs should be added as sameAs; none are guessed. No outreach or review request was sent.

The optional Is Agentic baseline report is a separate technical rubric, not an AEO ranking metric.
Its generic trust-page probe missed existing German /ueber-uns and /datenschutz pages. Its Markdown
content negotiation checks do not establish that search engines need a Markdown copy of every page.
We keep one canonical HTML representation and an optional public summary instead of changing cache
negotiation merely to increase that score.

## Validation

Run `pnpm build`, `pnpm audit:build` and `pnpm audit:aeo` with launch indexing enabled.
The AEO audit parses rendered HTML across all static pages: matching visible/schema answers,
resolved business references, one actual address, breadcrumb positions, article images, public
discovery links, sitemap contents and crawler configuration. Verify the new pages in the browser
at mobile and desktop widths, in both themes, then test the deployed routes and IndexNow response.

## Primary guidance

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)
- [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- [IndexNow protocol](https://www.indexnow.org/documentation)
- [IndexNow endpoints and limitations](https://www.indexnow.org/faq)
