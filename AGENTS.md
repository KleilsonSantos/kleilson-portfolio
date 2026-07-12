# AGENTS.md — Kleilson Portfolio

Contrato único para qualquer agente de IA (Cursor, GitHub Copilot, Claude Code, Windsurf, ChatGPT, etc.).
Não depende de IDE nem de modelo específico.

## Missão

Manter um portfólio profissional **enterprise-ready**, com conteúdo **100% verificável** e fluxo Git canônico.

## Fontes de verdade (nesta ordem)

1. Código e dados: `apps/web/content/*.json` (fonte) + `apps/web/src/data/*` (wrappers)
2. ADRs em `docs/adr/`
3. Guias em `docs/guides/`
4. `CHANGELOG.md` + issues/PRs no GitHub
5. CV ATS (`cv-kleilson-2026-ats.md`), GitHub e LinkedIn do autor

Se houver conflito: **código + ADR vencem** sobre sugestões do modelo.

**Wiki GitHub:** apenas mapa de links (não fonte canônica; não editar conteúdo técnico lá).

## Regras invioláveis

1. **Não inventar** experiência, empresa, cargo, data, stack ou credencial.
2. **Não alterar** fatos profissionais sem evidência no CV / GitHub / LinkedIn. Conteúdo narrativo **não** vai para Supabase (ADR-0007).
3. **Fluxo Git canônico:** Issue → Project In Progress → `feature/*` a partir de `sandbox` → PR → `sandbox` → PR → `main` → tag SemVer.
4. **Não fazer push direto** em `main` ou `sandbox`.
5. **Docs sincronizados** com o código (ADR-0003): README, CHANGELOG, ADRs quando a decisão mudar.
6. **Não reintroduzir** admin JWT/`localStorage`/Firebase do portfólio antigo; editorial futuro só Git-backed (ADR-0007).
7. **Visual:** seguir ADR-0004 (dark-first, Sora + IBM Plex Sans, accent teal). Evitar look genérico “AI default” (roxo/indigo, Inter, glow excessivo).
8. **TypeScript strict** — sem `any` desnecessário; tipar props e dados.
9. **Commits** só quando o humano pedir; mensagens `type: <gitmoji> …` (obrigatório). Merges: `merge: 🔀 PR #n — branch`.
10. **Autoria Git:** Author/Committer = `Kleilson Santos <kdsddesign1@gmail.com>`. **Proibido** trailers ou co-autoria de IDE/agente (`Co-authored-by: Cursor`, `cursoragent@…`, etc.). Commits são do autor do projeto, não da ferramenta.
11. **Releases:** após merge releaseable `sandbox` → `main`, alinhar CHANGELOG + `package.json` e publicar tag anotada + GitHub Release (`docs/guides/releases.md`). Não deixar docs/versão à frente da última tag.

## Escopo típico de mudanças

| Área | Onde | Cuidado |
| --- | --- | --- |
| Conteúdo do site | `apps/web/content/*.json` (+ wrappers `src/data/`) | Só fatos verificáveis; Decap opcional ADR-0012 |
| UI / CSS | `apps/web/src/index.css`, pages, components | ADR-0004 |
| Rotas | `apps/web/src/App.tsx`, `apps/web/src/pages/` | Manter 404 e meta SEO |
| API local | `apps/api/` | Fastify + Drizzle |
| API prod | `apps/worker-api/` | Workers Free |
| Shared | `packages/shared/` | Schema de contato |
| Docs | `docs/`, `README.md`, `CHANGELOG.md` | Keep a Changelog |
| AI / agents | `AGENTS.md`, `.github/agents/`, `.github/prompts/`, `.cursor/rules/` | Manter alinhados; agents apontam para este arquivo |
| CI / qualidade | `.github/workflows/`, Playwright, Lighthouse | Não enfraquecer gates |

## O que NÃO fazer

- Inventar projetos ou métricas de impacto
- Trocar a direção visual sem ADR
- Adicionar dependências sem necessidade clara
- Bypass de hooks Git (`--no-verify`)
- Force-push em `main` / `sandbox`
- Reintroduzir painel admin com JWT/`localStorage` ou conteúdo narrativo no Supabase (ADR-0007)

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
- **MCP (Cursor):** `docs/guides/mcp-tooling.md` — só matriz canônica; write ops só com pedido explícito
- AI detalhado: `docs/guides/ai-agentic.md`
- Copilot: `.github/copilot-instructions.md`
- Custom agents (aba Agents): `.github/agents/*.agent.md`
