# CMS rich-text sanitization

Gallery captions and About content are sanitized at their Vue v-html rendering points through the shared CmsHtml.sanitize helper. Components live in assets/js/cms-components.js so the production components can also be exercised by the browser regression page without contacting the CMS.

The pinned, locally served DOMPurify 3.4.17 library implements sanitization. Its source URL and SHA-256 are recorded in vendor-scripts.json; its license is in licenses/dompurify.txt. No runtime CDN script is added.

The allowlist permits ordinary paragraphs, headings, emphasis, lists, links, code, images, figures and tables. It removes scripts, inline event handlers, dangerous URL schemes, SVG/MathML, frames, forms, style attributes, classes, IDs, names and custom data attributes. Existing CMS presentation using those removed features will intentionally lose them. Titles still use Vue text interpolation. Lightbox captions copy the already-sanitized rendered caption markup.

Missing or non-string fields produce empty HTML. Missing DOMPurify or an unsupported browser also produces empty HTML: raw CMS HTML is never used as a fallback. This intentionally drops rich text in unsupported browsers.

## Verification

Serve the repository over HTTP, then open /tests/cms-sanitization.html. All 12 checks cover formatting, script/handler removal, encoded JavaScript URLs, foreign namespaces, active embeds/forms/templates, clobbering attributes, missing/non-string data, missing/unsupported sanitizer, both actual Vue components, and handler execution after rendering. The existing /tests/security.html suite remains available.

Local real-CMS preview loaded all twelve photos and preserved the About HTTPS link, About text, and the Denis Gardens caption in the lightbox. No console errors observed. Check GitHub CodeQL and the PR diff before merge.

This work sanitizes CMS rich-text HTML only. It does not migrate Vue 2 or the legacy delivery SDK, modify CMS content, or change photo/social-link URL handling outside rich text. The live website is unchanged until the pull request is merged.
