# cf-pages-portfolio-router

[![Test](https://github.com/marvinrichter/cf-pages-portfolio-router/actions/workflows/test.yml/badge.svg)](https://github.com/marvinrichter/cf-pages-portfolio-router/actions/workflows/test.yml)

Cloudflare Worker that routes `your-domain.com/{service}/*` to the corresponding project at `{service}.{TARGET_DOMAIN}/*`.

Zero per-service config. Deploy a new project with the matching slug — it routes automatically.

> **Reference implementation:** [redundant.services](https://redundant.services) — a collection of satirical "X-as-a-Service" landing pages for senior developers.

## How it works

```
your-domain.com/standup-as-a-service        → standup-as-a-service.pages.dev/
your-domain.com/standup-as-a-service/og.png → standup-as-a-service.pages.dev/og.png
your-domain.com/                            → 302 to DEFAULT_SERVICE
```

Convention: `{slug}` in the path maps to `{slug}.{TARGET_DOMAIN}`. Works with CF Pages, Netlify, Vercel, or any subdomain-based host.

## Configuration

Set in `wrangler.toml [vars]` or override per-environment in the CF dashboard:

| Var | Default | Description |
|---|---|---|
| `TARGET_DOMAIN` | `pages.dev` | Subdomain suffix — e.g. `netlify.app`, `vercel.app` |
| `DEFAULT_SERVICE` | _(required)_ | Slug to redirect to from root |

## Adding a new service

1. Deploy your project to `{slug}.{TARGET_DOMAIN}`
2. Done — `your-domain.com/{slug}` routes automatically

## Local development

```bash
npm install
npx wrangler dev
npm test           # run tests
npm run coverage   # tests + coverage report
```

## Deploy

```bash
npx wrangler deploy
```

A `test.yml` workflow runs on every push and PR. A `deploy.example.yml` workflow is included as a ready-to-use template — rename it to `deploy.yml` in your fork and add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repo secrets to activate auto-deploy on push to `main`.

---

## Fork this for your own portfolio

1. Buy a domain, delegate NS to Cloudflare
2. Fork this repo
3. Update `wrangler.toml`:
   ```toml
   routes = [{ pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }]

   [vars]
   TARGET_DOMAIN = "pages.dev"   # or netlify.app, vercel.app, …
   DEFAULT_SERVICE = "your-first-service"
   ```
4. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets
5. Push — the worker deploys automatically

From there: each new service is just a new project named after its slug. No router changes needed.

## License

MIT
