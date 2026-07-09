# Guia — Política de Sincronização de Documentação

Este guia operacionaliza o [ADR-0003](../adr/0003-documentation-strategy.md).  
**Natureza:** how-to (Diátaxis). A política normativa está no ADR.

## Quando atualizar docs (obrigatório)

Atualize documentação **no mesmo Pull Request** se a mudança alterar qualquer um destes pontos:

| Gatilho | Exemplos | Evidência |
|---------|----------|-----------|
| Build / install | scripts npm, Node version, monorepo | [Google eng-practices — Documentation](https://google.github.io/eng-practices/review/reviewer/looking-for.html) |
| Testes | como rodar testes, CI | idem |
| Uso / UX | rotas, formulários, fluxos | idem |
| Release | SemVer, tags, pipeline de release | [OpenSSF release_notes](https://www.bestpractices.dev/en/criteria/0) |
| Contribuição | fluxo de PR, branches | [OpenSSF contribution](https://www.bestpractices.dev/en/criteria/0) |
| Arquitetura | stack, ADRs | [Nygard ADR](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) |

## Quando NÃO é obrigatório

- Refatoração interna sem mudança de comportamento observável
- Tipagem/estilo sem impacto em build/uso
- Correção ortográfica isolada (pode ser PR `docs/*` próprio)

**Não atualize docs em todo commit.** Changelog ≠ git log ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).

## Checklist do autor (Definition of Done parcial)

Baseado em [Microsoft DoD](https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-done/) + Google review:

- [ ] Docs afetadas atualizadas (README / ROADMAP / guides / ADR)
- [ ] `CHANGELOG.md` → seção `[Unreleased]` preenchida se mudança **notável**
- [ ] Se decisão arquitetural → novo ADR ou atualização de ADR existente
- [ ] Template de PR marca o item de documentação
- [ ] `npm run typecheck && npm run lint && npm run build` passam

## Checklist do revisor

Baseado em [Google — What to look for](https://google.github.io/eng-practices/review/reviewer/looking-for.html):

- [ ] Se o PR muda build/test/uso/release → docs correspondentes mudaram?
- [ ] Se remove/depreca algo → docs removidas/atualizadas?
- [ ] Changelog descreve impacto humano (não lista de commits)?

## Fluxo Git (alinhado ao ADR-0002)

```text
feature/* (código + docs + Unreleased)
        → PR → sandbox
        → PR → main
        → tag vX.Y.Z (promove Unreleased → versão + GitHub Release)
```

## Mapa Diátaxis neste repositório

| Tipo Diátaxis | Onde vive |
|---------------|-----------|
| How-to | `docs/guides/` |
| Explanation / Reference de sistema | `docs/architecture/`, `docs/adr/` |
| Reference de API | `docs/api/` (quando existir API) |
| Tutorial | sob demanda (evitar misturar com how-to) |

Fonte: [Diátaxis](https://diataxis.fr/start-here/) — framework, **não** especificação ISO.

## Automação (maturidade)

| Nível | Controle | Status normativo |
|-------|----------|------------------|
| Atual | CI typecheck/lint/build | Obrigatório no projeto |
| Próximo | markdown lint / link check | Consenso indústria (não oficial único) |
| Contínuo | OpenSSF Scorecard / Best Practices Badge | Oficial OpenSSF |

## Anti-padrões (proibidos)

| Anti-padrão | Por quê | Fonte |
|-------------|---------|-------|
| Changelog = `git log` | Ruído; não é humano | Keep a Changelog |
| Docs só no release final | Drift; review não vê docs | Google + Microsoft DoD |
| Docs em todo commit | Sem padrão oficial; custo sem benefício | — |
| Inventar pastas sem ADR | Overengineering | Google (complexity / over-engineering) |
