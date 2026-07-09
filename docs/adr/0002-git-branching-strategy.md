# ADR-0002: Estratégia de Branches, Sandbox e Versionamento SemVer

- **Status:** Aceito
- **Data:** 2026-07-09
- **Decisores:** Kleilson dos Santos

## Contexto

O bootstrap inicial (Fase 1) foi entregue diretamente em `main` por pragmatismo de setup. Para aderência a práticas enterprise, o repositório adota fluxo com branch de integração `sandbox`, branches semânticas e releases com SemVer + Git Tags.

## Decisão

Adotar **Git Flow simplificado com sandbox**:

```text
feature/* | fix/* | docs/* | chore/* | ci/* | ...
                    │
                    ▼
                 sandbox          ← integração contínua + CI
                    │
              Pull Request
                    │
                    ▼
                  main            ← produção / releases tagueadas
```

### Branches permitidas

| Prefixo | Uso |
|---------|-----|
| `feature/*` | Nova funcionalidade |
| `fix/*` | Correção de bug |
| `bugfix/*` | Alias aceito para correções |
| `hotfix/*` | Correção urgente em produção |
| `refactor/*` | Refatoração sem mudança de comportamento |
| `docs/*` | Documentação |
| `test/*` | Testes |
| `chore/*` | Manutenção |
| `build/*` | Build e dependências |
| `ci/*` | Pipelines CI/CD |
| `perf/*` | Performance |
| `style/*` | Formatação e estilo |

### Regras

1. **Proibido** commit direto em `main` (exceto merges via PR aprovado).
2. **Proibido** commit direto em `sandbox` sem PR de branch semântica (exceto sync inicial).
3. Toda entrega passa por **dois PRs**: `branch → sandbox` e `sandbox → main`.
4. Releases usam **Semantic Versioning** (`MAJOR.MINOR.PATCH`) com **Git Tags anotadas** (`vX.Y.Z`).
5. Commits seguem **Conventional Commits + Gitmoji**.

## Versionamento (SemVer)

| Incremento | Quando |
|------------|--------|
| `MAJOR` | Breaking changes, redesign arquitetural |
| `MINOR` | Nova feature compatível (ex.: Fase 2 TypeScript) |
| `PATCH` | Correções, docs, ajustes de CI |

### Tags existentes

| Tag | Marco |
|-----|-------|
| `v0.1.0` | Fase 1 — Frontend Foundation (bootstrap) |

## Alternativas consideradas

| Opção | Motivo de rejeição |
|-------|-------------------|
| Trunk-based só em `main` | Não atende requisito enterprise de sandbox + PRs |
| Git Flow com `develop` | `sandbox` é mais explícito para integração pré-produção |
| Reescrever histórico do bootstrap | Risco desnecessário; tag `v0.1.0` documenta o marco |

## Consequências

- CI executa em pushes para `sandbox` e PRs para `sandbox`/`main`
- Releases GitHub criadas a partir de tags
- Maior rastreabilidade para recrutadores e contribuidores

## Referências

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
