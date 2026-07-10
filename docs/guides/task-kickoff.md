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

### Passo 5 — Desenvolver e commitar

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
- [ ] npm run lint
- [ ] npm run build"
```

### Passo 7 — Integração e promoção

1. Merge PR → `sandbox` com subject `merge: 🔀 PR #<n> — <branch>` (e delete a branch)
2. PR `sandbox` → `main` (após CI verde)
3. Merge em `main` com subject `merge: 🔀 PR #<n> — sandbox`
4. **Release canônica (obrigatória quando a entrega for releaseable):** ver Passo 8
5. Mover issue para **Done** no Project

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

## Referências

- [git-workflow.md](./git-workflow.md)
- [ADR-0002](../adr/0002-git-branching-strategy.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
