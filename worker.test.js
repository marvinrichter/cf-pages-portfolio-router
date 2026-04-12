import { describe, it, expect, vi, beforeEach } from 'vitest';
import worker from './worker.js';

const env = { TARGET_DOMAIN: 'pages.dev', DEFAULT_SERVICE: 'my-service' };

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('ok')));
});

describe('root redirect', () => {
  it('redirects to DEFAULT_SERVICE with trailing slash', async () => {
    const res = await worker.fetch(new Request('https://example.com/'), env);
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('https://example.com/my-service/');
  });

  it('returns 500 when DEFAULT_SERVICE is not configured', async () => {
    const res = await worker.fetch(new Request('https://example.com/'), {
      TARGET_DOMAIN: 'pages.dev',
      DEFAULT_SERVICE: '',
    });
    expect(res.status).toBe(500);
  });

  it('returns 500 when DEFAULT_SERVICE is undefined', async () => {
    const res = await worker.fetch(new Request('https://example.com/'), {
      TARGET_DOMAIN: 'pages.dev',
    });
    expect(res.status).toBe(500);
  });
});

describe('trailing slash redirect', () => {
  it('adds trailing slash to bare service slug', async () => {
    const res = await worker.fetch(new Request('https://example.com/my-service'), env);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://example.com/my-service/');
  });

  it('does not redirect when trailing slash already present', async () => {
    const res = await worker.fetch(new Request('https://example.com/my-service/'), env);
    expect(res.status).toBe(200);
  });
});

describe('path routing', () => {
  it('routes service root to {slug}.{TARGET_DOMAIN}', async () => {
    await worker.fetch(new Request('https://example.com/my-service/'), env);
    expect(fetch).toHaveBeenCalledWith('https://my-service.pages.dev/');
  });

  it('forwards subpaths', async () => {
    await worker.fetch(new Request('https://example.com/my-service/og.png'), env);
    expect(fetch).toHaveBeenCalledWith('https://my-service.pages.dev/og.png');
  });

  it('forwards query strings', async () => {
    await worker.fetch(new Request('https://example.com/my-service/?q=test'), env);
    expect(fetch).toHaveBeenCalledWith('https://my-service.pages.dev/?q=test');
  });

  it('respects custom TARGET_DOMAIN', async () => {
    await worker.fetch(new Request('https://example.com/my-service/'), {
      TARGET_DOMAIN: 'netlify.app',
      DEFAULT_SERVICE: 'my-service',
    });
    expect(fetch).toHaveBeenCalledWith('https://my-service.netlify.app/');
  });

  it('defaults TARGET_DOMAIN to pages.dev when not set', async () => {
    await worker.fetch(new Request('https://example.com/my-service/'), {
      DEFAULT_SERVICE: 'my-service',
    });
    expect(fetch).toHaveBeenCalledWith('https://my-service.pages.dev/');
  });
});
