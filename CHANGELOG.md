# Changelog

## [1.0.0](https://github.com/marvinrichter/cf-pages-portfolio-router/releases/tag/v1.0.0) (2026-04-11)

### Features

* path-based routing from a single domain to multiple CF Pages projects
* `TARGET_DOMAIN` config var — route to any subdomain-based host (`pages.dev`, `netlify.app`, `vercel.app`, …)
* `DEFAULT_SERVICE` config var — controls root redirect
* 301 trailing-slash normalisation for service roots
* 500 on missing `DEFAULT_SERVICE` (fail loud, not silent)
* GitHub Actions CI — tests run on every push and PR

### Miscellaneous Chores

* 100% test coverage enforced (statements, branches, functions, lines)
* Action SHAs pinned for supply chain security
* Dependabot enabled for npm and GitHub Actions
