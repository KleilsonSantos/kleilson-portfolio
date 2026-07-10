# Guia de Fluxo Git — Branches, PRs e Releases

Este documento define o fluxo oficial do repositório `kleilson-portfolio`.

## Visão geral

```text
┌─────────────────────────────────────────────────────────┐
│  Branches semânticas (trabalho isolado)                 │
│  feature/*  fix/*  docs/*  chore/*  ci/*  refactor/*   │
└───────────────────────────┬─────────────────────────────┘
                            │  Pull Request #1
                            ▼
                    ┌───────────────┐
                    │    sandbox    │  ← integração + CI
                    └───────┬───────┘
                            │  Pull Request #2 (após validação)
                            ▼
                    ┌───────────────┐
                    │     main      │  ← produção + tags SemVer
                    └───────────────┘
```

## Branches permanentes

| Branch | Papel |
|--------|-------|
| `main` | Código em produção. Apenas merges via PR de `sandbox`. |
| `sandbox` | Integração contínua. Recebe PRs de branches semânticas. |

## Branches temporárias (semânticas)

Crie a partir de `sandbox` (atualizada):

```bash
git checkout sandbox
git pull origin sandbox
git checkout -b feature/nome-da-feature
```

### Prefixos aceitos

`feature/` · `fix/` · `bugfix/` · `hotfix/` · `refactor/` · `docs/` · `test/` · `chore/` · `build/` · `ci/` · `perf/` · `style/`

### Exemplos

```text
feature/typescript-migration
fix/contact-form-validation
docs/git-workflow-guide
ci/lighthouse-pipeline
chore/dependabot-config
```

## Fluxo de trabalho (passo a passo)

> **Kickoff canônico:** todo início de tarefa segue [`task-kickoff.md`](./task-kickoff.md) — issue → Project **In Progress** → branch `feature/*` from `sandbox`.

### 1. Iniciar tarefa (canônico)

```bash
# 1. Mover issue para "In Progress" no GitHub Project #6
# 2. Branch a partir de sandbox
git checkout sandbox && git pull origin sandbox
git checkout -b feature/nome-da-tarefa
# 3. Comentar na issue com a branch criada
gh issue comment <NUMERO> --repo KleilsonSantos/kleilson-portfolio \
  --body "🚀 Kickoff: branch \`feature/nome-da-tarefa\` criada."
```

### 2. Desenvolver com commits semânticos

```bash
git add .
git commit -m "feat: ✨ descrição objetiva do que e por quê"
```

**Gitmoji de referência:** ✨ feat · 🐛 fix · ♻️ refactor · 📝 docs · 🚀 deploy · ⚡ perf · 🔒 security · ✅ test · 🎨 style · 🔥 remove · 🏗️ build · 👷 ci

### 3. Push e PR para sandbox

```bash
git push -u origin feature/minha-tarefa
gh pr create --base sandbox --head feature/minha-tarefa \
  --title "feat: ✨ título semântico" \
  --body "Resumo, contexto técnico e test plan."
```

Aguarde CI passar → revise → **merge** → delete a branch.

### 4. PR de sandbox para main

Após integração validada em `sandbox`:

```bash
gh pr create --base main --head sandbox \
  --title "release: 🚀 integração sandbox → main" \
  --body "Release notes e checklist de validação."
```

Merge após aprovação.

### 5. Tag de release (SemVer)

```bash
git checkout main && git pull origin main
git tag -a v0.2.0 -m "v0.2.0 — descrição da release"
git push origin v0.2.0
gh release create v0.2.0 --title "v0.2.0" --notes "Notas da release"
```

## Versionamento SemVer

| Versão | Significado | Exemplo neste projeto |
|--------|-------------|----------------------|
| `v0.1.0` | Fase 1 — Frontend Foundation | ✅ Publicada |
| `v0.1.1` | Git workflow enterprise | ✅ Publicada |
| `v0.2.0` | Fase 2 — TypeScript strict | ✅ Publicada |
| `v0.2.1` | Sync de documentação | ✅ Publicada |
| `v0.3.0+` | Testes / backend / deploy | 📋 Planejada |

## O que NÃO fazer

- ❌ Commit direto em `main`
- ❌ Commit direto em `sandbox` sem PR
- ❌ PR de `feature/*` direto para `main` (pular sandbox)
- ❌ Commits genéricos (`update`, `fix stuff`, `wip`)
- ❌ Tags sem mensagem anotada

## CI/CD

O pipeline roda em:

- Push para `sandbox` e `main`
- Pull Requests para `sandbox` e `main`

## Exceção histórica

Os commits iniciais da Fase 1 foram feitos diretamente em `main` durante o bootstrap. A tag `v0.1.0` marca esse marco. **A partir de v0.1.1**, todo desenvolvimento segue este guia.

## Referências

- [task-kickoff.md](./task-kickoff.md) — **kickoff canônico de tarefas**
- [ADR-0002](../adr/0002-git-branching-strategy.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [ROADMAP.md](../ROADMAP.md)
