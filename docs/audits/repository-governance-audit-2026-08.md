# Auditoria — Governança Git, continuidade e automações

| Campo | Valor |
| --- | --- |
| **Data** | 2026-08-16 |
| **HEAD (antes dos commits desta slice)** | `feature/ux-visual-excellence` = `sandbox` @ `1704d0c` + working tree misto |
| **Tracked** | 188 arquivos (`git ls-files`) |
| **Staged** | nenhum |
| **Natureza** | Evidência Git + decisão. Sem limpeza de tracked “antigos”. |

## Repository State (working tree auditado)

Dois grupos **sem dependência técnica**:

| Grupo | Tipo | Arquivos (resumo) |
| --- | --- | --- |
| A — produto | UI / a11y / CSS | `apps/web/**` (páginas, Layout, Footer, CSS, `index.html`, `Contatos.test.tsx`) + audit UX |
| B — engenharia | CI / Git / tooling | `scripts/merge-pr.sh`, `check-merge-tip.sh`, `check-semver-alignment.sh`, `.cursor/sandbox.json`, hooks, `.github/**`, guias Git |

`git add .` **não** faria sentido: misturaria PRODUCT CHANGE com ENGINEERING CHANGE.

Branches locais antigas (`feature/typescript-migration`, etc.) são histórico de slices já mergeadas — **KEEP**; não apagar.

## Git Strategy (aplicada)

```text
sandbox
├── feature/ux-visual-excellence     → slice A (UI visível)
└── ci/github-delivery-chain         → slice B (gates + merge canónico)
```

Commits: Conventional + Gitmoji do repositório (`type: <emoji>`, não `feat(ui):` do prompt genérico).

## Automation Audit

| Item | Estado atual | Problema | Valor | Risco | Decisão |
| --- | --- | --- | --- | --- | --- |
| NEXT / OK / GREEN | Inexistente como chat cadence | Continuidade informal (issue + Unreleased) | Clarificar DoD | Workflow paralelo = ruído | **DOCUMENT** GREEN = CI existente. **DEFER** cadence `next`/`ok`/`green` de chat (AIOS) |
| `.trae/` | Ausente | N/A | Portfólio já tem `AGENTS.md` + `.cursor/rules` | Duplicar políticas | **DEFER** |
| Sonar | Ausente | Qualidade estática extra | Baixo: oxlint + tsc + Vitest + Playwright + LHCI + CodeQL | Free plan só `main`; ruído | **DEFER** |
| Codecov | `@vitest/coverage-v8` instalado; **sem** `test:coverage` no CI | Coverage não visível em PR | Baixo até haver gate interno | Token + ruído em PRs pequenos | **DEFER** (gerar coverage local primeiro) |
| lint-staged | Só `commit-msg` | Commits com lint óbvio | Médio | Nova dep; oxlint já é rápido no CI | **DEFER** (pre-commit pesado já rejeitado no AIOS copy) |
| `pnpm audit` em todo push | Não | Supply chain | Médio | Lento / falsos positivos no hook | **DEFER**; Dependabot + alerts **KEEP** |
| Email Git `kdsddesign1@gmail.com` | Autoria em AGENTS/CONTRIBUTING/hooks | Confusão com `kdsdesign1` (AIOS) e `kleilson@icloud.com` (público) | Identidade Git estável | Mudar quebra atribuição | **KEEP** |
| Email público `kleilson@icloud.com` | `profile.json`, `contact.json`, SECURITY.md | Nenhum | Contato do produto | — | **KEEP** (função diferente) |
| Workflows | `ci`, `codeql`, `deploy-pages`, `deploy-decap-oauth`, `legacy-github-pages-redirect` | Overlap baixo | Cada um tem trigger/propósito | Novo workflow “green” duplicaria `ci.yml` | **KEEP**; **ADD** só jobs no `ci.yml` existente (merge-tip, semver-align) |
| Tracked 188 | Estrutura OSS | Não é “sujeira” | Docs + CI + app | Delete sem evidência | **KEEP** |

### GREEN (fonte de verdade)

GREEN **não** é um job novo. É o conjunto **já existente** (e o que o job `CI` passar a incluir):

```text
PR → sandbox/main:  commitlint + quality (typecheck, lint, test, build) + e2e + lighthouse
push sandbox/main:  merge-tip
PR/push → main:     semver-align
```

NOT GREEN = qualquer check required falhou. Branch protection no GitHub é o enforcement; o repositório só declara os jobs.

NEXT = próxima issue/slice após merge — não um comando de chat.

## Email Audit

| Identidade | Onde | Função | Decisão |
| --- | --- | --- | --- |
| `Kleilson Santos <kdsddesign1@gmail.com>` | AGENTS, CONTRIBUTING, git-workflow, commit-lint | **Git author/committer** | KEEP |
| `kleilson@icloud.com` | content JSON, SECURITY.md | **Contato público / security** | KEEP |
| `kdsdesign1@gmail.com` | só no AIOS, não neste repo | Outro produto | Não copiar |

Não alterar `user.email` local. Não unificar com iCloud.

## Visual Audit

| Esperado visível | Cadeia arquivo → render | Build |
| --- | --- | --- |
| Skip link, hero chips, kickers Contexto/Resultado, form a11y, spacing | `App.tsx` importa `App.css`; rotas importam páginas; **USED** | Build ≠ visível |
| `merge-pr.sh`, sandbox.json, workflows | Não entram no bundle da UI | Build verde **esperado** sem mudança visual |

Validação visual: `pnpm --filter @kleilson/web dev` + rotas `/` `/sobre` `/projetos` `/contatos` (Passo 5b). `pnpm build` só prova compilação.

## Implementation Plan

```text
feature/ux-visual-excellence
  → commit UI
  → typecheck/lint/test web
  → PR → sandbox
  → GREEN = CI
  → NEXT = ci/github-delivery-chain (se ainda não mergeado)

ci/github-delivery-chain
  → commit scripts + CI + docs Git
  → bash -n scripts
  → PR → sandbox
  → GREEN = CI
  → NEXT = smoke visual + merge-pr.sh no primeiro merge humano
```

## Final Recommendation

Não adicionar Sonar, Codecov, lint-staged, audit-on-push, `.trae/`, nem cadence de chat. Separar as duas intenções já no working tree. Preservar os 188 tracked.
