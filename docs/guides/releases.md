# Guia de Releases e Tags

## Semantic Versioning

Este projeto segue [SemVer 2.0.0](https://semver.org/):

```text
vMAJOR.MINOR.PATCH
```

## Histórico de releases

| Tag | Data | Descrição |
|-----|------|-----------|
| `v0.1.0` | 2026-07-09 | Fase 1 — Frontend Foundation (React + Vite + páginas + docs OSS + CI) |
| `v0.1.1` | 2026-07-09 | Estratégia Git enterprise (sandbox, PRs, documentação de fluxo) |
| `v0.2.0` | 2026-07-09 | Fase 2 (parcial) — TypeScript strict + typecheck no CI |
| `v0.2.1` | 2026-07-09 | Sync de documentação alinhada ao status real do projeto |

## Criar uma nova release

```bash
# 1. Garantir main atualizada após merge sandbox → main
git checkout main && git pull origin main

# 2. Tag anotada
git tag -a vX.Y.Z -m "vX.Y.Z — descrição da release"

# 3. Push da tag
git push origin vX.Y.Z

# 4. GitHub Release
gh release create vX.Y.Z \
  --title "vX.Y.Z — título" \
  --notes-file CHANGELOG.md
```

## Alinhamento com ROADMAP

| Fase ROADMAP | Versão | Status |
|--------------|--------|--------|
| Fase 1 — Frontend | `v0.1.0` | ✅ |
| Git workflow | `v0.1.1` | ✅ |
| Fase 2 — TypeScript | `v0.2.0` | ✅ (testes ainda pendentes) |
| Docs sync | `v0.2.1` | ✅ |
| Fase 2 — Testes | `v0.3.0` (sugerido) | 📋 |
| Fase 3 — Backend | `v0.4.0` (sugerido) | 📋 |
| Fase 4 — Deploy produção | `v1.0.0` (sugerido) | 📋 |
| Fase 5 — Monorepo | `v2.0.0` (sugerido) | 📋 |
