# Contributing

Obrigado por considerar contribuir com o portfólio open source de Kleilson dos Santos.

## Fluxo Git (obrigatório)

Leia o guia completo: [`docs/guides/git-workflow.md`](./docs/guides/git-workflow.md)

```text
feature/* | fix/* | docs/* | chore/* | ci/* ...
                    │
                    ▼ PR #1
                sandbox
                    │
                    ▼ PR #2
                  main  →  tag vX.Y.Z
```

**Nunca commite diretamente em `main` ou `sandbox`.**

## Como contribuir

1. Faça fork (ou trabalhe no repo com permissão)
2. Atualize `sandbox`: `git checkout sandbox && git pull`
3. Crie branch semântica: `feature/nome`, `fix/nome`, `docs/nome`, etc.
4. Commits com [Conventional Commits](https://www.conventionalcommits.org/) + Gitmoji
5. `npm run lint` e `npm run build` antes do PR
6. Abra **PR para `sandbox`** → após merge, abra **PR `sandbox` → `main`**
7. Releases: tag SemVer após merge em `main` (ver [`docs/guides/releases.md`](./docs/guides/releases.md))

## Prefixos de branch

`feature/` · `fix/` · `bugfix/` · `hotfix/` · `refactor/` · `docs/` · `test/` · `chore/` · `build/` · `ci/` · `perf/` · `style/`

## Padrões

- Escopo mínimo por PR
- Textos de interface em pt-BR
- Não inventar informações profissionais
- Consulte `docs/adr/` antes de mudanças arquiteturais

## Código de conduta

Este projeto segue o [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
