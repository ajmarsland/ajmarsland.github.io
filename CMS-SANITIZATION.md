# CMS rich-text sanitization

Gallery captions and About content are sanitized at their DOM rendering points through the shared `CmsHtml.sanitize` helper. Production renderers live in `assets/js/cms-components.js` and are exercised directly by the browser regression page. Titles and link labels are assigned with `textContent`.

The pinned, locally served DOMPurify 3.4.17 library implements sanitization. Its source URL and SHA-256 are recorded in vendor-scripts.json; its license is in licenses/dompurify.txt. No runtime CDN script is used.

The allowlist permits ordinary paragraphs, headings, emphasis, lists, links, code, images, figures and tables. It removes scripts, inline event handlers, dangerous URL schemes, SVG/MathML, frames, forms, style attributes, classes, IDs, names and custom data attributes. CMS presentation using those removed features intentionally loses them. Lightbox captions copy the already-sanitized rendered caption markup.

Missing or non-string fields produce empty HTML. Missing DOMPurify or an unsupported browser also produces empty HTML: raw CMS HTML is never used as a fallback.

## Verification

Serve the repository over HTTP, then open `/tests/cms-sanitization.html`. All 20 checks cover formatting, script/handler removal, encoded JavaScript URLs, foreign namespaces, active embeds/forms/templates, clobbering attributes, missing/non-string data, missing/unsupported sanitizer, both actual renderers, handler execution, photo/social URL validation, LinkedIn field mapping, editorial photo order, independent loading and error handling. `/tests/security.html` covers the seven earlier jQuery/panel regressions.

The real-CMS local preview loaded all twelve photos and preserved the About HTTPS link, About text, and Denis Gardens lightbox caption without browser console errors.

Photo and social-link URL policy outside rich text is documented in [MAINTENANCE.md](MAINTENANCE.md). Rich-text links still follow the DOMPurify allowlist; they are not restricted to the photo or social host lists.
