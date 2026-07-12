# Guia — Testes (unit, E2E, Lighthouse)

Comandos abaixo a partir da **raiz do monorepo** (`pnpm`). Pacote web: `apps/web`.

## Vitest + Testing Library (#3)

Config: `apps/web/vite.config.ts` (`test`) · setup: `apps/web/src/test/setup.ts`  
Specs: `apps/web/src/**/*.{test,spec}.{ts,tsx}`

```bash
pnpm test
pnpm --filter @kleilson/web test:watch
```

Cobertura inicial: `validation`, `sanitize` e componente `Footer`.

## Playwright (#4)

Config: `apps/web/playwright.config.ts`  
Specs: `apps/web/e2e/`

```bash
pnpm test:e2e
```

(`test:e2e` na raiz já faz build do package web antes dos testes.)

O preview Vite sobe automaticamente; o mock `/api/contact` também funciona em preview.

## Lighthouse CI (#5)

Config: `apps/web/lighthouserc.cjs` (coleta via `staticDistDir` — Home).

```bash
pnpm lighthouse
```

Asserts iniciais são conservadores (a11y error ≥ 0.9; performance/SEO warn). Rotas SPA profundas podem ser adicionadas depois com server SPA-aware.

## CI

Jobs em `.github/workflows/ci.yml`: `quality` (typecheck + lint + **unit** + build) → `e2e` + `lighthouse` em paralelo.

## Relacionados

- [onboarding.md](./onboarding.md) — setup
- [api.md](./api.md) — health / contact sob teste
- [deploy.md](./deploy.md) — o que o Lighthouse mede em produção
- [git-workflow.md](./git-workflow.md) — CI no PR
