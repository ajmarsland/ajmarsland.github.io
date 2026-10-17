# Security fixes

This change addresses the three findings on the original master commit:

1. Dependabot #5: replaces vendored jQuery 3.3.1 with 3.7.1, preserving its license. This stays within the existing major version for plugin compatibility.
2. CodeQL #1: string panel targets use `$(document).find(selector)` so HTML cannot be interpreted as element creation. Existing jQuery objects and DOM nodes remain supported; invalid selectors are rejected.
3. CodeQL #2: replaces runtime CDN scripts with local, pinned copies of Vue 2.7.16, RxJS 6.4.0 and Kentico Cloud Delivery 5.7.2. Source URLs and SHA-256 checksums are recorded in vendor-scripts.json. License notices are in licenses/.

The runtime no longer downloads executable JavaScript from third-party CDNs. CMS data and photos still come from the existing Kentico services. Version upgrades beyond the fixes above are separate work: Vue 2 is end-of-life and the retained CMS SDK/RxJS versions are old. Vendoring does not resolve vulnerabilities inside these dependencies. CMS rich text rendering is now sanitized at both Vue sinks; see CMS-SANITIZATION.md for the policy and regression checks.

## Verification

Serve the repository with a static HTTP server, then open `/tests/security.html` for seven regression checks covering CVE-2019-11358 prototype pollution, the patched HTML prefilter, selector/jQuery/DOM target compatibility, and an HTML-injection probe. Also verify `/` with the real CMS: gallery thumbnails, opening and closing a lightbox, About panel, and mobile layout. Check the full post-merge master scan as well as PR checks: a passing "no new alerts" check does not prove pre-existing alerts are fixed.

The production branch and GitHub Pages deployment are not changed until this branch is merged.
