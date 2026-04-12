# redundant-services-router

[![Deploy](https://github.com/marvinrichter/redundant-services-router/actions/workflows/deploy.yml/badge.svg)](https://github.com/marvinrichter/redundant-services-router/actions/workflows/deploy.yml)

Cloudflare Worker that routes `redundant.services/{service}/*` to the corresponding CF Pages project at `{service}.pages.dev/*`.

Part of the [redundant.services](https://redundant.services) portfolio — a growing collection of satirical "X-as-a-Service" landing pages for senior developers.

## How it works

```
redundant.services/standup-as-a-service        → standup-as-a-service.pages.dev/
redundant.services/standup-as-a-service/og.png → standup-as-a-service.pages.dev/og.png
redundant.services/                            → 302 to DEFAULT_SERVICE
```

Each service lives in its own CF Pages project. The router derives the target from the URL path — no config changes needed when adding a new service. Just deploy a new CF Pages project with the matching slug.

## Adding a new service

1. Create a CF Pages project named `{your-service-slug}`
2. Deploy your static site there
3. Done — `redundant.services/{your-service-slug}` routes automatically

## Local development

```bash
npm install
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

Deploys automatically on push to `main` via GitHub Actions (requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets).

## Services

| Service | Live |
|---|---|
| [standup-as-a-service](https://github.com/marvinrichter/standup-as-a-service) | [redundant.services/standup-as-a-service](https://redundant.services/standup-as-a-service) |

---

## Use this for your own portfolio

Running multiple static sites under one domain with zero per-service routing config? Fork this.

**Setup:**

1. Buy a domain, delegate NS to Cloudflare
2. Fork this repo
3. Update `wrangler.toml`:
   ```toml
   routes = [{ pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }]
   ```
4. Set `DEFAULT_SERVICE` to your first service slug
5. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets
6. Push — the worker deploys automatically

From there: each new service is just a new CF Pages project named after its slug. No router changes needed.

## License

MIT
