/**
 * redundant.services — Path Router
 *
 * Routes redundant.services/{service}/* to the corresponding
 * CF Pages project at {service}.pages.dev/*
 *
 * Adding a new service: zero config needed here.
 * Deploy the CF Pages project with the same name as the slug.
 *
 * Examples:
 *   redundant.services/standup-as-a-service        → standup-as-a-service.pages.dev/
 *   redundant.services/standup-as-a-service/og.png → standup-as-a-service.pages.dev/og.png
 *   redundant.services/                            → 302 to DEFAULT_SERVICE (meta-page in Phase 2)
 *
 * Config:
 *   DEFAULT_SERVICE — set in wrangler.toml [vars] or override in CF dashboard
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);

    // Root — redirect to default service until meta-page launches in Phase 2
    if (segments.length === 0) {
      const defaultService = env.DEFAULT_SERVICE ?? 'standup-as-a-service';
      return Response.redirect(`${url.origin}/${defaultService}/`, 302);
    }

    // Redirect service root without trailing slash
    // Required: relative assets in HTML resolve correctly only with trailing slash
    // e.g. /standup-as-a-service → /standup-as-a-service/
    if (segments.length === 1 && !url.pathname.endsWith('/')) {
      return Response.redirect(`${url.origin}${url.pathname}/`, 301);
    }

    const service = segments[0];
    const subPath = segments.length > 1
      ? '/' + segments.slice(1).join('/')
      : '/';

    const targetUrl = `https://${service}.pages.dev${subPath}${url.search}`;
    return fetch(targetUrl);
  },
};
