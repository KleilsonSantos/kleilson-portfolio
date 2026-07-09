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

### Passo 7 — Ao concluir a integração

1. Merge PR → `sandbox` (Workflow: **Review** → **Done** na issue se entregue isoladamente)
2. Quando fase/milestone completo: PR `sandbox` → `main` + tag SemVer
3. Mover issue para **Done** no Project

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
