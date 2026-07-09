# ADR-0001: Frontend-first com React + Vite (Fase 1)

- **Status:** Aceito
- **Data:** 2026-07-09
- **Decisores:** Kleilson dos Santos + agente de arquitetura

## Contexto

O portfólio definitivo deve nascer production-ready, evoluindo a base visual do `cursor-ai-playground` (React 19, Vite, design tokens, Router) com conteúdo profissional verificável do CV.

Alternativas avaliadas:

| Opção | Prós | Contras |
|-------|------|---------|
| **React + Vite (escolhida Fase 1)** | Base existente, DX rápida, deploy estático simples | SEO depende de prerender/SSR futuro |
| Next.js 16 App Router | SSR/SSG nativo, SEO superior | Mudança maior de stack na Fase 1 |
| Astro + React islands | Performance excelente | Menos alinhado à base atual |

## Decisão

Adotar **React 19 + Vite 8 + React Router 7** na Fase 1 (frontend-only), com conteúdo em `src/data/` derivado exclusivamente do CV e GitHub público.

Backend, banco e monorepo Turborepo ficam para fases posteriores, conforme aprovação explícita.

## Consequências

### Positivas

- Reaproveita design system e padrões já validados
- Entrega rápida de valor visual para recrutadores
- Deploy estático imediato (GitHub Pages / Cloudflare Pages)

### Negativas

- Formulário de contato usa mock em dev (`/api/contact`)
- TypeScript adiado para Fase 2
- SEO avançado requer fase dedicada (sitemap, OG images)

## Referências

- [Vite Guide](https://vite.dev/guide/)
- [React Router](https://reactrouter.com/)
- Base arquitetural: `cursor-ai-playground`
