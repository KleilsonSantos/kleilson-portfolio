# Guia — Testes (unit, E2E, Lighthouse)

## Vitest + Testing Library (#3)

Config: `vite.config.ts` (`test`) · setup: `src/test/setup.ts`  
Specs: `src/**/*.{test,spec}.{ts,tsx}`

```bash
npm run test
npm run test:watch
```

Cobertura inicial: `validation`, `sanitize` e componente `Footer`.

## Playwright (#4)

Config: `playwright.config.ts`  
Specs: `e2e/`

```bash
npm run build
npm run test:e2e
```

O preview Vite sobe automaticamente; o mock `/api/contact` também funciona em preview.

## Lighthouse CI (#5)

Config: `lighthouserc.cjs` (coleta via `staticDistDir` — Home).

```bash
npm run build
npm run lighthouse
```

Asserts iniciais são conservadores (a11y error ≥ 0.9; performance/SEO warn). Rotas SPA profundas podem ser adicionadas depois com server SPA-aware.

## CI

Jobs em `.github/workflows/ci.yml`: `quality` (typecheck + lint + **unit** + build) → `e2e` + `lighthouse` em paralelo.
