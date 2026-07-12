# Guia — Testes (unit, E2E, Lighthouse)

Tudo sob `apps/web` no monorepo. Na raiz use os scripts `pnpm` (orquestram o package).

## Vitest + Testing Library

Config: `apps/web/vite.config.ts` · setup: `apps/web/src/test/setup.ts`  
Specs: `apps/web/src/**/*.{test,spec}.{ts,tsx}`

```bash
pnpm test
pnpm --filter @kleilson/web test:watch
```

## Playwright

Config: `apps/web/playwright.config.ts` · specs: `apps/web/e2e/`

```bash
pnpm test:e2e
```

O script de E2E faz o build do package web (`tsc` + `vite`) e sobe o preview; mock `/api/contact` funciona em preview.

## Lighthouse CI

Config: `apps/web/lighthouserc.cjs` (coleta via `staticDistDir` — Home).

```bash
pnpm lighthouse
```

Asserts iniciais conservadores (a11y; performance/SEO em warn).

## CI

`.github/workflows/ci.yml`: `quality` (typecheck + lint + unit + build) → `e2e` + `lighthouse` em paralelo.

## Relacionados

- [onboarding.md](./onboarding.md) — setup
- [api.md](./api.md) — health / contact sob teste
- [deploy.md](./deploy.md) — o que o Lighthouse mede em produção
- [git-workflow.md](./git-workflow.md) — CI no PR
