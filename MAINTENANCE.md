# Maintenance and dependency migration

## Changes

- Removed the end-of-life Vue 2 runtime and legacy RxJS/Kentico Cloud Delivery SDK files from the repository and runtime manifest. Plain DOM rendering and native `fetch` replace them without introducing a build system or a new framework dependency.
- Kept the same public CMS environment, original photo order, captions, About content, gallery template and jQuery/Poptrox lightbox.
- Fetches use the documented Kontent.ai Delivery REST API. Home-page linked photos resolve through `modular_content` in the order of the home-page `photos.value` list. About and contact are independent requests; each request has a 15-second timeout, uses no browser credentials and handles errors without rendering raw responses.
- Gallery/panel initialization runs once, after the three section requests settle, including failures. This replaces repeated plugin initialization on every Vue update. A slow CMS request can delay initialization by up to the timeout.
- Fixed LinkedIn to use its own field rather than Facebook. Empty or invalid profile fields do not render links.
- Enabled browser zoom, declared the document language, updated template attribution to HTTPS and named the photographer in the copyright line. Added JavaScript-disabled and loading/error notices.

## URL policy

Photo links and thumbnails accept absolute HTTPS URLs only, with no credentials or nonstandard port. The host must match `assets-xx-00.kc-usercontent.com` and the path must start with this site's public environment ID. The current `assets-au-01.kc-usercontent.com` photos remain valid. A future CMS asset-domain migration will need an intentional policy update; unrecognized URLs are omitted. Thumbnail sizing uses URL search parameters, preserving other query values. Background-image URLs are quoted through JSON serialization before assignment.

Social CMS fields are profile identifiers, not arbitrary URLs. Only letters, digits, period, underscore and hyphen are accepted, up to 100 characters; dot-only traversal values are rejected. Each network has a fixed HTTPS prefix. Full URLs, whitespace, credentials, slashes, query strings and fragments are rejected.

Rich text remains protected by DOMPurify's separate allowlist. See CMS-SANITIZATION.md. Management and preview credentials must never appear in this static application.

## Verification and compatibility

Run the seven checks at `/tests/security.html` and the twenty checks at `/tests/cms-sanitization.html` using the README's local server instructions. The CMS suite includes mock API responses for ordering, missing records, partial request failure and empty responses, plus the actual production renderers. These manual browser tests are not a CI gate.

The real CMS preview was checked for all twelve loaded photos, the Denis Gardens lightbox caption, About text/link, corrected LinkedIn destination and desktop gallery/panel layout. A fresh narrow-screen preview could not be verified because the browser viewport override was not applied by the preview tool; responsive styles are unchanged. Check the full default-branch CodeQL scan and GitHub Pages deployment after merge.

The site now requires a current browser with native fetch, AbortController, URL, async functions and modern DOM APIs. It does not support Internet Explorer. No CMS content or original photos are edited by this migration.

## Maintenance

Keep DOMPurify and jQuery pinned, review upstream security releases and update their hashes/licenses when upgrading. The existing template plugins also need periodic review. Repository backups do not include remote CMS data or originals; export those through the CMS account for a complete content backup.

Official API references: [Delivery SDK alternatives](https://kontent.ai/learn/docs/apis/delivery-api/sdks), [filtering](https://kontent.ai/learn/docs/apis/delivery-api/filtering-parameters), and [linked content](https://kontent.ai/learn/docs/apis/delivery-api/linked-content-and-components).
