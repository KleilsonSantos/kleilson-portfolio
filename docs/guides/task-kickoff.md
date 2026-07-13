# Kickoff de Tarefa (Fluxo Canônico)

Este é o **procedimento obrigatório** para iniciar qualquer tarefa no repositório — humano ou agente de IA.

## Checklist canônico

```text
Issue (GitHub)          Project Board           Git
──────────────          ─────────────           ───
Backlog / Todo    →     In Progress      →    feature/* from sandbox
```

### Passo 1 — Selecionar a issue

- Escolha a issue no [GitHub Project](https://github.com/users/KleilsonSantos/projects/6) ou em [Issues](https://github.com/KleilsonSantos/kleilson-portfolio/issues).
- Confirme milestone e labels (`phase-N`, `enhancement`, etc.).

### Passo 2 — Mover para **In Progress** no Project

Atualize os campos do board:

| Campo | Valor |
|-------|-------|
| **Workflow** | `In Progress` |
| **Status** | `In Progress` |

Via CLI (referência):

```bash
# Requer gh autenticado — ver docs/guides/git-workflow.md
# Atualizar item da issue no Project #6
```

### Passo 3 — Criar branch semântica a partir de `sandbox`

```bash
git checkout sandbox
git pull origin sandbox
git checkout -b feature/<slug-da-tarefa>
```

**Convenção de nome:** `feature/<descricao-curta>` alinhada ao título da issue.

Exemplos:

```text
feature/typescript-migration    ← issue #2
feature/vitest-setup            ← issue #3
fix/contact-form-validation     ← issue futura
```

### Passo 4 — Comentar na issue (rastreabilidade)

```bash
gh issue comment <NUMERO> --repo KleilsonSantos/kleilson-portfolio \
  --body "🚀 Kickoff: branch \`feature/<slug>\` criada a partir de \`sandbox\`."
```

### Passo 5 — Desenvolver

Implemente na branch. **Ainda não faça push.**

### Passo 5b — Gate QA local (obrigatório antes do push)

Validar **localmente** o que a tarefa mudou — funcional **e** visual — **antes** de `git push` / `gh pr create`.

```text
código pronto
    │
    ▼
QA local (typecheck · lint · testes da área · smoke visual das telas tocadas)
    │
    ▼ OK → commit + push + PR
    │
    ▼ FAIL → corrigir na branch (não “subir para ver no CI/Pages”)
```

| Tipo de mudança | Mínimo local |
| --- | --- |
| App / UI | `pnpm typecheck` · `pnpm lint` · smoke no browser (`pnpm --filter @kleilson/web dev` ou `preview`) nas rotas tocadas |
| Visual / CSS / admin | Conferir contraste, spacing, tokens ADR-0004; hard refresh; screenshots se a UI for o aceite |
| API / Worker | Hit local/`wrangler` health + fluxo crítico (ex. OAuth allowlist) |
| Conteúdo JSON | Build + página que consome o conteúdo |
| Só docs | Review do markdown; sem inventar comandos |

Comandos de referência (monorepo):

```bash
pnpm typecheck && pnpm lint
# testes da área tocada, ex.:
pnpm --filter @kleilson/web exec playwright test e2e/admin.spec.ts
# Após rebuild: encerrar preview antigo antes do smoke (Playwright reuseExistingServer)
pkill -f 'vite preview' || true
pnpm --filter @kleilson/web build && pnpm --filter @kleilson/web preview
```

**Agentes:** não abrir PR / não pedir merge com “CI vai validar” no lugar deste gate. Evidência local first; CI é rede de segurança, não substituo de QA local.

### Passo 5c — Commitar e push

```bash
git add .
git commit -m "feat: ✨ descrição semântica com contexto técnico"
git push -u origin feature/<slug>
```

### Passo 6 — Abrir PR para `sandbox`

```bash
gh pr create --base sandbox --head feature/<slug> \
  --title "feat: ✨ título alinhado à issue" \
  --body "Closes #<NUMERO>

## Summary
...

## Test plan
- [ ] QA local (Passo 5b) executado — funcional + visual das áreas tocadas
- [ ] pnpm typecheck && pnpm lint
- [ ] testes / preview relevantes
- [ ] CI verde"
```

### Passo 7 — Integração e promoção

1. Merge PR → `sandbox` com subject `merge: 🔀 PR #<n> — <branch>` (e delete a branch)
2. PR `sandbox` → `main` (após CI verde)
3. Merge em `main` com subject `merge: 🔀 PR #<n> — sandbox`
4. **Atualizar checkboxes da issue:** o que a PR entregou → `[x]` no corpo (`gh issue edit`). Não deixar Aceite “aberto” pedindo clique manual do humano no que já está feito. O que **não** entrou na entrega permanece `[ ]`.
5. **Release canônica (obrigatória quando a entrega for releaseable):** ver Passo 8
6. Mover issue para **Done** no Project (quando Aceite de implementação estiver completo)

### Passo 8 — Tag SemVer + GitHub Release (canônico)

Após **todo** merge `sandbox` → `main` que conclua um marco (fase, feature user-facing, ou sync documental de versão):

```bash
git checkout main && git pull origin main

# 1) CHANGELOG: promover [Unreleased] → [X.Y.Z] - YYYY-MM-DD (mesmo PR ou PR de release)
# 2) package.json version = X.Y.Z
# 3) Tag anotada (nunca tag leve)
git tag -a vX.Y.Z -m "vX.Y.Z — resumo em uma linha"
git push origin vX.Y.Z

# 4) GitHub Release apontando para a seção do CHANGELOG
gh release create vX.Y.Z \
  --title "vX.Y.Z — título humano" \
  --notes "Ver CHANGELOG [X.Y.Z]. Highlights: …"
```

| Quando taggear | Exemplo |
| --- | --- |
| Fim de fase / marco SemVer | `v0.4.0` persistência Supabase; `v0.3.0` qualidade + Fastify |
| Patch de correção em produção | `v0.4.1` |
| Só chore interno sem impacto user-facing | Pode adiar até o próximo minor (documentar no Unreleased) |

Guia completo: [`releases.md`](./releases.md)

## Exemplo real — Fase 2 / Issue #2

| Item | Valor |
|------|-------|
| Issue | [#2 — Migrar codebase para TypeScript](https://github.com/KleilsonSantos/kleilson-portfolio/issues/2) |
| Milestone | Fase 2 — TypeScript e Testes |
| Branch | `feature/typescript-migration` |
| Project | `In Progress` |
| PR alvo | `sandbox` |

```bash
git checkout sandbox && git pull origin sandbox
git checkout -b feature/typescript-migration
gh issue comment 2 --repo KleilsonSantos/kleilson-portfolio \
  --body "🚀 Kickoff: branch \`feature/typescript-migration\` criada. Fase 2 iniciada."
git push -u origin feature/typescript-migration
```

## O que NUNCA fazer no kickoff

- ❌ Criar branch a partir de `main` (sempre `sandbox`)
- ❌ Iniciar código sem mover a issue para **In Progress**
- ❌ Branch sem prefixo semântico (`feature/`, `fix/`, etc.)
- ❌ PR direto para `main`
- ❌ Push/PR sem QA local do que foi implementado (funcional + visual) — Passo 5b

## Relacionados

- [git-workflow.md](./git-workflow.md) — fluxo completo
- [documentation-sync.md](./documentation-sync.md) — docs no PR
- [ai-agentic.md](./ai-agentic.md) — agentes no kickoff
- [ADR-0002](../adr/0002-git-branching-strategy.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
