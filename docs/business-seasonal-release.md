# Business and seasonal services — 17 October 2026

## Delivered scope

- `/geschaeftskunden`: primary, searchable business directory in desktop and mobile navigation.
- Four distinct audience pages: property management and housing, offices and practices, retail and commercial property, industry and logistics.
- Three regional service pages: winter service and snow clearing, lawn and grounds care, hedge and woody-plant care.
- New services appear on the homepage, in the service directory, in relevant business and city pages, and in the inquiry form.
- Business inquiry links preselect the relevant property type. The selected service exposes practical preparation hints. The existing lead, receipt, sheet and five contact-event pipelines are retained; new slugs are accepted by lead and analytics validation and have readable email labels.
- Sitemap, canonical metadata, business offer catalog, Service/FAQ schema and `llms.txt` include the expansion. Thank-you indexing rules remain unchanged.

The eight new articles each have 347–362 words of original body copy, excluding navigation, FAQs and repeated components. They are not city-name substitutions. New services use one complete regional page each; no unreviewed city/service permutations were generated.

Own winter-service vehicles are a user-confirmed fact. No fleet size, vehicle model, certification, automatic dispatch, immediate-response guarantee or specialist arboricultural capability has been invented. Tree work is limited to suitable, safely accessible maintenance after checking applicable requirements. Felling, climbing, major crown work and formal tree inspections are outside the published offer.

## Verification

- Next.js production build and TypeScript: successful.
- Content audit: 955 editorial pages, minimum 301 body words; highest six-word similarity score after normalizing place names 0.548; no near-duplicate failures.
- Built-site audit: 966 static HTML pages; no broken internal links/anchors, duplicate titles, missing local images or canonical errors.
- Structured-data/discovery audit: no errors; 965 sitemap URLs, 19 FAQ pages, 51 questions.
- Local HTTP integration: all eight pages return 200, use the apex canonical and appear in the sitemap; all three seasonal inquiry links preserve service, city and property type. Valid new-service submissions reach the intentionally unconfigured local backend and return 503 rather than false success. No production test leads were created.
- Browser: mobile menu and business links, search/filter/reset/empty state, business property preselection, winter hints and all three form stages verified. Light/dark views and widths 320, 390, 1024 and 1440 checked; no horizontal overflow found. No browser console errors observed.
- Images were inspected and compressed to WebP. Three distinct seasonal images avoid duplicated adjacent card photos. Existing ImgBB-hosted images and local fallbacks remain; the new images are served directly from this site's `public/images` directory.

## Official references reviewed

- [BNatSchG §39](https://www.gesetze-im-internet.de/bnatschg_2009/__39.html): gentle maintenance cuts versus restricted major interventions.
- [Landesbetrieb Landwirtschaft Hessen: seasonal pruning](https://llh.hessen.de/ueber-uns/presse/gehoelzschnitt-im-fruehling-und-sommerwas-im-garten-erlaubt-ist/): check protected habitats independently of pruning season.
- [Saterland local law](https://www.saterland.de/Verwaltung-und-Politik/Politik-/Ortsrecht-/): object-specific local winter obligations; no universal times or salt-use rules asserted.

## Original image assets

Created with the built-in image-generation tool, then copied into the project and optimized as WebP. Images are illustrative and do not document actual company vehicles, employees or completed work.

### `public/images/winterdienst.webp`

Prompt: Use case: photorealistic-natural. Create a premium editorial website image, landscape 1536x1024, for a German property maintenance company. A compact unbranded blue municipal-style utility vehicle with a front snow plough clearing a broad paved approach outside a modest modern commercial building in northern Germany. Shallow fresh snow, realistic cleared pavement and snow pushed neatly to a safe side, no blocked doors, no people near moving machinery. Natural cool winter morning light, restrained navy and pale blue palette, calm professional atmosphere, authentic vehicle proportions. No text, no logos, no watermark, no exaggerated blizzard. This is an illustrative service scene, not a photograph of a specific company's actual fleet.

### `public/images/gruenpflege.webp`

Prompt: Use case: photorealistic-natural. Premium editorial website photograph-style illustration, landscape 1536x1024. Professional grounds maintenance at a modest modern north German commercial property: foreground carefully mown healthy lawn with a compact professional walk-behind lawn mower parked on the grass, a neatly shaped green hedge and small ornamental trees beside a paved entrance, light brick and glass building in soft background. No people necessary, realistic natural green, crisp grass texture and quiet overcast spring daylight, restrained cool blue-gray building tones. Honest small-business scale, not a luxury resort. Composition attractive when cropped to portrait, equipment at lower right but visible, hedge in middle distance. No text, no logos, no watermark, no website UI. Illustration for lawn and gentle hedge care, not proof of an actual completed customer project.

### `public/images/heckenpflege.webp`

Prompt: Use case: photorealistic-natural. Original premium editorial website service illustration, landscape 1536x1024. Close-to-medium view of professional gentle hedge care at a modest north German property in early autumn. An adult worker seen partly from behind, face not prominent, wearing navy workwear, protective glasses and gloves, using a compact cordless hedge trimmer horizontally to trim only the fresh outer growth of a waist-high dense green hedge beside a clean walkway. Secure stance on level ground, no ladder, no chainsaw, no felled trees, no birds or nests in cutting area. Distinct from a lawn-mowing scene: hedge texture and careful hands are the focal point, lawn only a small background accent, simple light brick building in soft background. Natural soft daylight, cool navy clothing, realistic fresh green foliage. No visible brand, no text, no watermark. Illustrative scene, not a documented customer project.
