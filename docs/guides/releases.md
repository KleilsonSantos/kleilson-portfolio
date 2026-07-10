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
| `v0.2.2` | 2026-07-09 | ADR-0003 — estratégia canônica de documentação (evidence-based) |
| `v0.3.0` | 2026-07-10 | Qualidade (Vitest/Playwright/Lighthouse), visual ADR-0004 V1–V5, AI agents, Fastify API (#6) |

## Criar uma nova release

```bash
# 1. Garantir main atualizada após merge sandbox → main
git checkout main && git pull origin main

# 2. Tag anotada
git tag -a vX.Y.Z -m "vX.Y.Z — descrição da release"

# 3. Push da tag
git push origin vX.Y.Z

# 4. GitHub Release (notas a partir do CHANGELOG da versão)
gh release create vX.Y.Z \
  --title "vX.Y.Z — título" \
  --notes-file - <<'EOF'
Notas curtas + link para CHANGELOG seção [X.Y.Z]
EOF
```

## Alinhamento com ROADMAP

| Fase ROADMAP | Versão | Status |
|--------------|--------|--------|
| Fase 1 — Frontend | `v0.1.0` | ✅ |
| Git workflow | `v0.1.1` | ✅ |
| Fase 2 — TypeScript | `v0.2.0` | ✅ |
| Docs sync | `v0.2.1` | ✅ |
| Docs strategy (ADR-0003) | `v0.2.2` | ✅ |
| Fase 2 — Qualidade + visual + AI; início Fase 3 (Fastify) | `v0.3.0` | ✅ |
| Fase 3 — Persistência (Supabase) | `v0.4.0` (sugerido) | 📋 #7 |
| Fase 4 — Deploy produção | `v1.0.0` (sugerido) | 📋 #8/#9 |
| Fase 5 — Monorepo | `v2.0.0` (sugerido) | 📋 #10 |
