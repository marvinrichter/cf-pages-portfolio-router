# redundant-services-router

Cloudflare Worker that routes `redundant.services/{service}/*` to the corresponding CF Pages project at `{service}.pages.dev/*`.

Part of the [redundant.services](https://redundant.services) portfolio — a growing collection of satirical "X-as-a-Service" landing pages for senior developers.

## How it works

```
redundant.services/standup-as-a-service        → standup-as-a-service.pages.dev/
redundant.services/standup-as-a-service/og.png → standup-as-a-service.pages.dev/og.png
redundant.services/                            → redirects to first service (meta-page coming in Phase 2)
```

Each service lives in its own CF Pages project. The router derives the target from the URL path — no config changes needed here when adding a new service.

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

Requires a Cloudflare account with the `redundant.services` zone configured.

## Services

| Service | Live |
|---|---|
| [standup-as-a-service](https://github.com/marvinrichter/standup-as-a-service) | [redundant.services/standup-as-a-service](https://redundant.services/standup-as-a-service) |

## License

MIT
