# Security policy

Only the current `master` version is maintained. This is a static public gallery; its browser code and public content environment ID are visible to everyone. Do not commit passwords, API management keys, preview keys or other private credentials.

## Report a vulnerability

Use [Report a vulnerability](https://github.com/ajmarsland/ajmarsland.github.io/security/advisories/new) for a private report to the repository owner. Include the affected page, reproduction steps and likely impact. Do not publish sensitive exploit details in a public issue.

Reports are reviewed by the owner; no response-time commitment or security certification is implied.

## Existing controls

CMS rich text is sanitized with pinned local DOMPurify. Titles are rendered as text. Photo and social URLs have explicit policies. GitHub secret scanning, push protection, Dependabot and CodeQL provide additional checks. See CMS-SANITIZATION.md, SECURITY-FIXES.md and MAINTENANCE.md for implementation details and limits.
