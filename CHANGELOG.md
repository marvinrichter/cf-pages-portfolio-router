# Changelog

## [1.0.0] - 2026-04-11

### Added
- Path-based routing from a single domain to multiple CF Pages projects
- `TARGET_DOMAIN` config var — route to any subdomain-based host (`pages.dev`, `netlify.app`, `vercel.app`, …)
- `DEFAULT_SERVICE` config var — controls root redirect
- 301 trailing-slash normalisation for service roots
- 500 on missing `DEFAULT_SERVICE` (fail loud, not silent)
- GitHub Actions CI — tests run on every push and PR, deploy gated on passing tests
