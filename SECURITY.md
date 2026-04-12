# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities via [GitHub Security Advisories](https://github.com/marvinrichter/cf-pages-portfolio-router/security/advisories/new) — not as a public issue.

Expect an initial response within 48 hours.

## Scope

This project is a Cloudflare Worker router. Relevant security concerns:

- Routing logic that could expose unintended upstream services
- Dependency vulnerabilities (monitored automatically via Dependabot)

## Out of scope

- Vulnerabilities in Cloudflare's infrastructure
- Issues requiring access to the deployer's CF account credentials
