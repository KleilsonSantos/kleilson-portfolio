# AGENTS.md — Kleilson Portfolio

Contrato único para qualquer agente de IA (Cursor, GitHub Copilot, Claude Code, Windsurf, ChatGPT, etc.).
Não depende de IDE nem de modelo específico.

## Missão

Manter um portfólio profissional **enterprise-ready**, com conteúdo **100% verificável** e fluxo Git canônico.

## Fontes de verdade (nesta ordem)

1. Código e dados em `src/` (especialmente `src/data/`)
2. ADRs em `docs/adr/`
3. Guias em `docs/guides/`
4. `CHANGELOG.md` + issues/PRs no GitHub
5. CV ATS (`cv-kleilson-2026-ats.md`), GitHub e LinkedIn do autor

Se houver conflito: **código + ADR vencem** sobre sugestões do modelo.

## Regras invioláveis

1. **Não inventar** experiência, empresa, cargo, data, stack ou credencial.
2. **Não alterar** fatos profissionais sem evidência no CV / GitHub / LinkedIn.
3. **Fluxo Git canônico:** Issue → Project In Progress → `feature/*` a partir de `sandbox` → PR → `sandbox` → PR → `main` → tag SemVer.
4. **Não fazer push direto** em `main` ou `sandbox`.
5. **Docs sincronizados** com o código (ADR-0003): README, CHANGELOG, ADRs quando a decisão mudar.
6. **Visual:** seguir ADR-0004 (dark-first, Sora + IBM Plex Sans, accent teal). Evitar look genérico “AI default” (roxo/indigo, Inter, glow excessivo).
7. **TypeScript strict** — sem `any` desnecessário; tipar props e dados.
8. **Commits** só quando o humano pedir; mensagens `type: <gitmoji> …` (obrigatório). Merges: `merge: 🔀 PR #n — branch`.
9. **Releases:** após merge releaseable `sandbox` → `main`, alinhar CHANGELOG + `package.json` e publicar tag anotada + GitHub Release (`docs/guides/releases.md`). Não deixar docs/versão à frente da última tag.

## Escopo típico de mudanças

| Área | Onde | Cuidado |
| --- | --- | --- |
| Conteúdo do site | `src/data/*.ts` | Só fatos verificáveis |
| UI / CSS | `src/index.css`, pages, components | ADR-0004 |
| Rotas | `src/App.tsx`, `src/pages/` | Manter 404 e meta SEO |
| Docs | `docs/`, `README.md`, `CHANGELOG.md` | Keep a Changelog |
| AI / agents | `AGENTS.md`, `.github/`, `.cursor/rules/` | Manter alinhados entre si |
| CI / qualidade | `.github/workflows/`, Playwright, Lighthouse | Não enfraquecer gates |

## O que NÃO fazer

- Inventar projetos ou métricas de impacto
- Trocar a direção visual sem ADR
- Adicionar dependências sem necessidade clara
- Bypass de hooks Git (`--no-verify`)
- Force-push em `main` / `sandbox`

## Checklist antes de concluir uma tarefa

- [ ] Conteúdo profissional tem fonte verificável?
- [ ] Lint / typecheck / testes relevantes passam?
- [ ] CHANGELOG `[Unreleased]` atualizado se houver mudança user-facing?
- [ ] Docs/ADR atualizados se houve decisão arquitetural?
- [ ] PR segue o fluxo `feature → sandbox → main`?
- [ ] **Checkboxes da issue:** itens de Aceite **cumpridos** → `gh issue edit` com `[x]` (não deixar `[ ]` esperando o humano). Itens **não** feitos permanecem `[ ]`. Separar “Planejamento/docs” de “Aceite/implementação” quando a issue misturar os dois.

## Referências rápidas

- Git: `docs/guides/git-workflow.md`
- Docs: `docs/adr/0003-documentation-strategy.md`
- Visual: `docs/adr/0004-visual-direction.md`
- Observabilidade (Fase 4): `docs/guides/observability.md`
- AI detalhado: `docs/guides/ai-agentic.md`
- Copilot: `.github/copilot-instructions.md`
