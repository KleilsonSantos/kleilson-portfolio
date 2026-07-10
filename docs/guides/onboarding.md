# Guia de Onboarding

## 1. Clone e instale

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
git checkout sandbox
npm install
npm run dev
```

## 2. Estrutura mental

- **Páginas** em `src/pages/` — uma rota por arquivo (`.tsx`)
- **Dados** em `src/data/` — única fonte de conteúdo estático (`.ts`)
- **Tipos** em `src/types/` — contratos TypeScript compartilhados
- **Decisões** em `docs/adr/` — leia antes de mudanças grandes
- **IA** em [`AGENTS.md`](../../AGENTS.md) + [`.cursor/rules/`](../../.cursor/rules/) — ver [`ai-agentic.md`](./ai-agentic.md)
- **Kickoff** em [`task-kickoff.md`](./task-kickoff.md) — procedimento obrigatório
- **Project board:** https://github.com/users/KleilsonSantos/projects/6

## 3. Fluxo de trabalho (canônico)

1. Mover issue para **In Progress** no GitHub Project
2. Branch a partir de **`sandbox`** (nunca de `main`)
3. Implementar com escopo mínimo
4. `npm run typecheck && npm run lint && npm run build`
5. PR para `sandbox` → após merge, PR `sandbox` → `main`
6. CI deve passar (typecheck + lint + build)

## 4. Atualizar conteúdo profissional

1. Edite o CV fonte (`cv-kleilson-2026-ats.md`)
2. Propague mudanças para `src/data/profileData.ts` e `projectsData.ts`
3. **Nunca invente** experiências ou métricas

## 5. Status atual

- Release: **`v0.2.2`** (+ Unreleased: visual ADR-0004, Playwright, Lighthouse, camada AI)
- Project: [kleilson-portfolio #6](https://github.com/users/KleilsonSantos/projects/6)

Consulte [ROADMAP.md](../../ROADMAP.md) e aguarde validação antes de iniciar backend/monorepo.
