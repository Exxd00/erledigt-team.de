# Image loading and layout repair - 28 October 2026

An initial production request to the ImgBB logo timed out after 20 seconds while
the identical bundled file returned in 359 ms. A browser check with ImgBB held
unresponsive reproduced 18 pending image elements on the homepage; only the three
locally hosted seasonal images appeared. An error-only fallback cannot resolve a
request that is still pending.

All eleven assets now load from this site's bundled originals first. The eight
existing ImgBB uploads remain backups. No image account, subscription or original
artwork was changed. Article image metadata uses the primary local source, and
the privacy notice describes ImgBB as a backup connection.

The service figure also imposed a 4:5 crop on 3:2 photographs. At 1440 px, the lawn
image occupied 441 x 551 px and cut off most of the mower. Guide figures combined
that ratio with a fixed 220 px height, producing a 176 px wide image inside a
roughly 397 px card. Figures now fill their container at the image's natural
ratio. Captions sit below the photograph with the current theme's foreground and
background colors. Guide cards retain their existing hidden-caption treatment.

## Validation

- 25 tests pass, including bundled-image signatures and backup-source checks.
- Production build, TypeScript and the built-page audit pass; 966 static HTML
  pages have no broken internal links, missing image references or canonical errors.
- Structured-data and discovery audit: 965 sitemap URLs, no errors.
- 47 browser views across widths 320, 390, 768, 1024 and 1440 and both themes:
  all images load, no horizontal overflow or page exceptions, and all service
  figures use the native image ratio and full container width.
- The same browser checks leave ImgBB unresponsive: zero external image requests
  are needed. A forced local hero-image 404 successfully selects its ImgBB backup.
- The hero and logo also render with application JavaScript disabled.
- Mobile navigation, theme switching, service search and reset, inquiry service
  preselection and phone/WhatsApp/email dialogs work. Dialogs were dismissed without
  confirming external navigation. No test lead or API POST was submitted.

Browser evidence is kept locally under ignored `artifacts/` as
`after-local-verification.json` and before/after screenshots. The browser harness
is `artifacts/verify-image-fix.cjs` and accepts `AUDIT_ORIGIN` and `AUDIT_TAG` for
the final production smoke check.
