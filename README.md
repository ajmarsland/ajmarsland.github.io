# DOBRE BRNO

A photo journal of Brno, Czech Republic, by Andrew Marsland, featuring original photographs from a January 2019 visit.

**[Visit the live gallery](https://ajmarsland.github.io/)**

The site combines a static HTML5 UP gallery with content delivered by Kentico Cloud (now Kontent.ai). Small browser-native JavaScript modules fetch and render the photos, captions and About content; jQuery/Poptrox provides the lightbox. GitHub Pages hosts the site.

## Run locally

No build step or npm install is required. With Git and Python 3 installed:

```sh
git clone https://github.com/ajmarsland/ajmarsland.github.io.git
cd ajmarsland.github.io
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. Internet access is required for the existing CMS content and photos. Stop the server with Ctrl+C.

The delivery project ID is configured in `assets/js/kenticocloud.js`. Treat it as the public content identifier used by this browser application. Never put management keys or other private credentials in client-side code. A Git checkout does not back up the remote CMS content or original photos.

## How to review a change

1. Open the pull request and read its description to understand the behavior being changed.
2. In **Files changed**, start with the application code and policy documentation. Large pinned vendor files are accompanied by download URLs, checksums and license notices.
3. In **Checks**, confirm the automated scans have finished successfully. A passing "no new alerts" check does not prove every older alert is fixed; verify the full default-branch scan after merging.
4. Preview the proposed branch locally and check the visible behavior below. Changes on a feature branch are not the live website.
5. Leave questions or feedback on the pull request. Merge only when satisfied: merging to `master` triggers publication to GitHub Pages.

To preview a proposed change, fetch its branch and switch to it in your clone before starting the local server. Use the branch named in the pull request.

For the gallery, check that all photos load; open and close a photo; check its caption; open and close **About**; follow the expected links; and inspect a narrow browser window. For CMS sanitization, ordinary formatting and safe links should remain, while scripts, event handlers, dangerous URLs and embedded active content should be removed.

## Browser regression checks

With the local server running:

| Page | Coverage |
| --- | --- |
| `/tests/security.html` | Seven checks for the jQuery security upgrade and panel target handling. |
| `/tests/cms-sanitization.html` | Twenty checks for unsafe CMS markup, rendering, URL validation, LinkedIn, CMS response mapping and failure handling. |

Each page displays PASS/FAIL results. These are manual browser checks, not an automated CI gate. The CMS sanitization tests use local fixtures; the real gallery preview uses the existing CMS.

## Project files

| Path | Purpose |
| --- | --- |
| `index.html` | Page structure and script loading. |
| `assets/js/kenticocloud.js` | Native fetch client, CMS response mapping, timeouts and independent section loading. |
| `assets/js/cms-components.js` | Gallery, About and contact DOM renderers and URL policies. |
| `assets/js/cms-html.js` | Shared rich-text sanitization policy. |
| `assets/js/main.js` | Gallery/lightbox and panel behavior. |
| `assets/css/`, `assets/sass/` | Presentation styles and Sass sources. |
| `vendor-scripts.json` | Pinned vendor versions, original download URLs and SHA-256 checksums. |
| `licenses/` | Third-party license notices. |

## Security and maintenance

CMS captions and About rich text are sanitized at their rendering points using a locally served, pinned DOMPurify build. If sanitization is missing or unsupported, no raw CMS HTML is rendered. See [CMS-SANITIZATION.md](CMS-SANITIZATION.md) for the allowlist, intentional formatting restrictions and test coverage.

See [SECURITY-FIXES.md](SECURITY-FIXES.md) for the earlier dependency and panel fixes. Vue 2, RxJS and the old delivery SDK have been removed. The gallery uses the public Delivery REST API directly. Photo URLs must use HTTPS on a Kontent asset host within this environment; social fields must be profile identifiers on fixed service hosts. See [MAINTENANCE.md](MAINTENANCE.md) for the migration, URL policy and verification.

See [SECURITY.md](SECURITY.md) for reporting guidance. Report sensitive issues through this repository's **Security → Report a vulnerability** option rather than posting exploit details publicly.

## Publishing

GitHub Pages publishes the `master` branch from the repository root at <https://ajmarsland.github.io/>. Pull requests provide the review boundary. Check the Pages deployment and the live gallery after merging.

The repository name is intentional: renaming `ajmarsland.github.io` changes its role as the account's Pages site and can affect the public address. Keep hosting changes separate from routine code maintenance.

## Credits and reuse

- Photographs and original content: Andrew Marsland.
- Gallery design: **Multiverse by [HTML5 UP](https://html5up.net/)**. Preserve its attribution and follow the license referenced in the template source.
- Third-party JavaScript licenses are retained in `licenses/` and the vendor files.

The template and library licenses do not automatically grant permission to reuse the photographs or CMS content.
