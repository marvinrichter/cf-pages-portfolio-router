# Contributing

## Prerequisites

- Node.js 20+
- A Cloudflare account (for deploy testing only)

## Setup

```bash
git clone https://github.com/marvinrichter/cf-pages-portfolio-router
cd cf-pages-portfolio-router
npm install
```

## Development

```bash
npm run dev       # local wrangler dev server
npm test          # run tests
npm run coverage  # tests + coverage report
```

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). All commits and PR titles must follow the format:

```
<type>(<optional scope>): <description>
```

| Type | When to use | Version bump |
|---|---|---|
| `feat` | New config var or routing behaviour | Minor |
| `fix` | Bug fix in routing logic | Patch |
| `docs` | README, CONTRIBUTING, comments | None |
| `chore` | Dependencies, CI, tooling | None |
| `refactor` | Code change with no behaviour change | None |
| `test` | Tests only | None |

Breaking changes append `!` to the type (`feat!:`, `fix!:`) and bump the major version.

Examples:

```
feat: add SERVICE_MAP var for explicit slug-to-URL routing
fix: preserve query string on trailing-slash redirect
feat!: require explicit TARGET_DOMAIN — remove pages.dev default
chore: update wrangler to v5
```

## Making changes

The router logic lives entirely in `worker.js` (< 50 lines). Tests are in `worker.test.js`.

Before opening a PR:
- [ ] `npm test` passes
- [ ] New behaviour is covered by a test
- [ ] PR title follows Conventional Commits format
- [ ] `wrangler.toml` placeholder values are unchanged (project-specific config goes in your fork)

## Pull requests

PRs welcome for:
- Bug fixes in routing logic
- New config vars that make the router more generally useful
- Documentation improvements

Not in scope:
- Project-specific routing rules
- Non-CF-Pages hosting targets that require code changes (use `TARGET_DOMAIN` instead)

## Deploy workflow

`.github/workflows/deploy.example.yml` is intentionally not active in this repo — it would always fail without CF credentials. In your fork: rename it to `deploy.yml` and add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository secrets.
