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

## Criar uma nova release

```bash
# 1. Garantir main atualizada após merge sandbox → main
git checkout main && git pull origin main

# 2. Tag anotada
git tag -a v0.2.0 -m "v0.2.0 — TypeScript migration and test suite"

# 3. Push da tag
git push origin v0.2.0

# 4. GitHub Release
gh release create v0.2.0 \
  --title "v0.2.0 — TypeScript migration" \
  --notes-file CHANGELOG.md
```

## Alinhamento com ROADMAP

| Fase ROADMAP | Versão sugerida |
|--------------|-----------------|
| Fase 1 — Frontend | `v0.1.0` |
| Git workflow | `v0.1.1` |
| Fase 2 — TypeScript/Testes | `v0.2.0` |
| Fase 3 — Backend | `v0.3.0` |
| Fase 4 — Deploy produção | `v0.4.0` ou `v1.0.0` |
| Fase 5 — Monorepo | `v1.1.0` ou `v2.0.0` |
