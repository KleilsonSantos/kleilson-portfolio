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
- **IA** em `.cursor/rules/` — alinhado com esta documentação
- **Kickoff** em [`task-kickoff.md`](./task-kickoff.md) — procedimento obrigatório

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

- Release: **`v0.2.0`** (TypeScript strict)
- Próximo: testes (issues #3, #4, #5)

Consulte [ROADMAP.md](../../ROADMAP.md) e aguarde validação antes de iniciar backend/monorepo.
