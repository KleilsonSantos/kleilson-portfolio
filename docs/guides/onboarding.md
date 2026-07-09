# Guia de Onboarding

## 1. Clone e instale

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
npm install
npm run dev
```

## 2. Estrutura mental

- **Páginas** em `src/pages/` — uma rota por arquivo
- **Dados** em `src/data/` — única fonte de conteúdo estático
- **Decisões** em `docs/adr/` — leia antes de mudanças grandes
- **IA** em `.cursor/rules/` — alinhado com esta documentação

## 3. Fluxo de trabalho

1. Branch a partir de `main`
2. Implementar com escopo mínimo
3. `npm run lint && npm run build`
4. PR com Conventional Commits
5. CI deve passar (lint + build)

## 4. Atualizar conteúdo profissional

1. Edite o CV fonte (`cv-kleilson-2026-ats.md`)
2. Propague mudanças para `src/data/profileData.js` e `projectsData.js`
3. **Nunca invente** experiências ou métricas

## 5. Próximas fases

Consulte [ROADMAP.md](../../ROADMAP.md) e aguarde validação antes de iniciar backend/monorepo.
