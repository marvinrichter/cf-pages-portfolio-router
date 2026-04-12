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
```

## Making changes

The router logic lives entirely in `worker.js` (< 50 lines). Tests are in `worker.test.js`.

Before opening a PR:
- [ ] `npm test` passes
- [ ] New behavior is covered by a test
- [ ] `wrangler.toml` placeholder values are unchanged (project-specific config goes in your fork)

## Pull requests

PRs welcome for:
- Bug fixes in routing logic
- New config vars that make the router more generally useful
- Documentation improvements

Not in scope:
- Project-specific routing rules
- Non-CF-Pages hosting targets that require code changes (use `TARGET_DOMAIN` instead)
