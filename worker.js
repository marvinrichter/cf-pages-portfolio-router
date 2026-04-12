/**
 * CF Pages Portfolio Router
 *
 * Routes {your-domain}/{service}/* to the corresponding
 * project at {service}.{TARGET_DOMAIN}/*
 *
 * Adding a new service: zero config needed here.
 * Deploy the project with the same name as the slug.
 *
 * Examples (default config, TARGET_DOMAIN=pages.dev):
 *   your-domain.com/standup-as-a-service        → standup-as-a-service.pages.dev/
 *   your-domain.com/standup-as-a-service/og.png → standup-as-a-service.pages.dev/og.png
 *   your-domain.com/                            → 302 to DEFAULT_SERVICE
 *
 * Config (wrangler.toml [vars] or CF dashboard):
 *   TARGET_DOMAIN    — subdomain suffix for service projects (default: pages.dev)
 *   DEFAULT_SERVICE  — slug to redirect to from root (default: first service slug)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);
    const targetDomain = env.TARGET_DOMAIN ?? 'pages.dev';

    // Root — redirect to default service
    if (segments.length === 0) {
      const defaultService = env.DEFAULT_SERVICE ?? '';
      if (!defaultService) {
        return new Response('DEFAULT_SERVICE is not configured.', { status: 500 });
      }
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

    const targetUrl = `https://${service}.${targetDomain}${subPath}${url.search}`;
    return fetch(targetUrl);
  },
};
