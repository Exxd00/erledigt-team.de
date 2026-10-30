# Compact homepage — 30 October 2026

The homepage now uses a brochure-style service grid and compact business cards.
Visitors can compare the main areas without scrolling through repeated full-size
service, seasonal, company and guide sections.

## Layout

- Six linked service cards: two columns on phones and three from 700px. Below
  360px each card becomes a compact image/text row. Relative minimum widths let
  the grid reduce its columns when visitors enlarge text.
- Eight further cleaning services remain server-rendered in a native details
  element, which works with touch, keyboard and JavaScript disabled.
- Four business destinations use a compact two-column grid.
- Company information and the three inquiry steps share a two-panel section.
- A shorter regional section links to four places and the full location finder.
- The four homepage questions remain; the FAQ library and guides have direct
  links. The visible company answer and structured page data remain consistent.
- Existing local images keep their original proportions. No new image host,
  client dependency, tracking event type or API change was introduced.
- Existing glass buttons, vertical contact dock, confirmation dialogs, navigation,
  all service/business/location pages and protected thank-you flow are preserved.

## Measurements

Measured after fonts and images loaded, in light mode with necessary-only consent.
The baseline was the live deployment of commit `87c2497` on 30 October.

| Viewport | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| 390 × 844 | 19,446px | 6,935px | 64.3% |
| 1440 × 900 | 11,326px | 4,986px | 56.0% |

The page has eight sections instead of thirteen. Measurements include the header
and footer. These are layout measurements, not claims about conversion lift.

## Verification

- Production build and TypeScript pass; existing 25 unit tests pass.
- Built-page audit: 966 pages, valid internal links/anchors, images and canonicals.
- AEO audit: 965 sitemap URLs, 19 FAQ pages, 51 questions, no errors. Local
  production verification explicitly uses the existing public launch-ready flag.
- Sixteen browser views: 320, 375, 390, 520, 768, 1024, 1440px and 844px landscape,
  each in light and dark. No page errors, horizontal overflow or clipped new cards.
- Text enlarged to 200%, reduced motion, keyboard expansion and no-JavaScript
  disclosure checked. New interactive targets meet the 44px minimum; sampled
  primary and secondary text contrast exceeds 4.5:1 in both themes.
- All fourteen service links and four business links return 200. Winter service
  navigation retains the selected service in the inquiry form.
- Menu, theme switching, anchor navigation and contact dialogs checked. Dialogs
  were dismissed without confirming contact or submitting a lead.
- Local consented analytics check intercepts all event requests and blocks Google
  analytics traffic: service selection fires once with the correct service and
  placement; expanding further services records the existing interaction event.
- Browser reports and screenshots are kept in ignored `artifacts/home-*` files.
