# ADR-0003: Estratégia Canônica de Documentação (Evidence-Based)

- **Status:** Aceito
- **Data:** 2026-07-09
- **Decisores:** Kleilson dos Santos
- **Tipo:** Arquitetura documental / governança

## Context and Problem Statement

O projeto `kleilson-portfolio` visa maturidade Enterprise/Open Source. A documentação sofreu *drift* após entregas técnicas (ex.: TypeScript em `v0.2.0` sem sync imediato de README/ROADMAP). É necessário definir **quando**, **como** e **com quais artefatos** a documentação deve evoluir — **somente com base em fontes oficiais ou consenso técnico reconhecido**, sem preferência pessoal.

## Decision Drivers

1. Aderência a critérios OpenSSF Best Practices (documentação, contribuição, release notes).
2. Inclusão de documentação no code review e na Definition of Done.
3. Rastreabilidade de decisões arquiteturais (ADRs).
4. Prevenção de documentation drift.
5. Simplicidade (evitar overengineering).

---

## Análises obrigatórias (com evidências)

### 1. Quando a documentação deve ser atualizada?

| Conclusão | Tipo de evidência | Fonte |
|-----------|-------------------|-------|
| Atualizar quando a mudança altera como usuários **buildam, testam, interagem ou fazem release** | Prática oficial Google Engineering | [Google eng-practices — Documentation](https://google.github.io/eng-practices/review/reviewer/looking-for.html) |
| Atualizar como critério de conclusão de feature/user story | Playbook oficial Microsoft | [Microsoft Engineering Playbook — Definition of Done](https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-done/) (“Documentation is updated”) |
| Manter release notes humanas por release (não `git log`) | Critério OpenSSF **MUST** | [OpenSSF Best Practices — release_notes](https://www.bestpractices.dev/en/criteria/0) |
| Manter seção `Unreleased` e promover a versão no release | Convenção amplamente adotada (não ISO/RFC) | [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) |

**Decisão:** documentação **obrigatória no mesmo PR** quando o comportamento, a interface, o fluxo de contribuição, o build/test/release ou a arquitetura mudarem. Caso contrário, não forçar docs cosméticas.

---

### 2. Em quais eventos do fluxo Git?

| Evento | Ação documental | Evidência |
|--------|-----------------|-----------|
| Commit isolado | **Não** exige docs por si só | Keep a Changelog: changelog ≠ commit log |
| Pull Request (feature → sandbox) | Atualizar docs **afetadas** + `CHANGELOG` `[Unreleased]` se mudança notável | Google code review (docs no CL); Keep a Changelog (`Unreleased`) |
| Merge sandbox → main | Garantir docs consistentes com o que será releaseado | Microsoft DoD (merge + docs updated) |
| Tag / GitHub Release | Promover `Unreleased` → versão; release notes humanas | OpenSSF `release_notes`; Keep a Changelog; SemVer |

**Não existe RFC/ISO** que obrigue “docs em todo commit”.

---

### 3. A documentação deve acompanhar cada commit?

**Não.**

- **Evidência:** Keep a Changelog afirma explicitamente que usar *commit log diffs* como changelog é má prática; o propósito do commit é evolução do código, o do changelog é diferença notável para humanos ([Keep a Changelog 1.1.0 — Commit log diffs](https://keepachangelog.com/en/1.1.0/)).
- **Consenso:** commits semânticos documentam o *passo*; docs/changelog documentam o *impacto*.

---

### 4. Deve acompanhar cada Pull Request?

**Condicionalmente sim** — quando o PR altera build/test/uso/release/arquitetura/contribuição.

- **Evidência oficial:** Google: *“If a CL changes how users build, test, interact with, or release code, check to see that it also updates associated documentation”* ([eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html)).
- **Não oficial / mas alinhado:** checklist de PR do próprio GitHub Docs exige aderência a fundamentals e CI ([GitHub Docs PR template](https://github.com/github/docs/blob/main/.github/PULL_REQUEST_TEMPLATE.md)).

---

### 5. Deve ser obrigatória para merge?

**Sim, como gate de review** (não necessariamente como bot bloqueante em todos os PRs).

- **Evidência:** Google trata Documentation como dimensão explícita do code review.
- **Evidência:** Microsoft DoD inclui “Documentation is updated” antes de considerar a feature done.
- **Limitação:** não há padrão oficial único de “required status check” só para docs; a obrigatoriedade é de **processo** (review/DoD), podendo ser reforçada por automação.

---

### 6. Deve participar da Definition of Done?

**Sim.**

- **Evidência oficial:** Microsoft Engineering Fundamentals Playbook lista *Documentation is updated* no DoD de Feature/User Story ([fonte](https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-done/)).
- **Nota:** o Playbook diz que o time deve **acordar e documentar** o DoD no projeto — o que este ADR faz.

---

### 7. Deve participar do Code Review?

**Sim.**

- **Evidência oficial:** Google Engineering Practices — seção Documentation e summary item *“Code is appropriately documented”* ([fonte](https://google.github.io/eng-practices/review/reviewer/looking-for.html)).

---

### 8. Deve existir validação automática?

**Parcialmente — recomendado, não universalmente padronizado.**

| Validação | Status normativo | Fonte / nota |
|-----------|------------------|--------------|
| CI de build/lint/typecheck | Já adotado; OpenSSF sugere CI | OpenSSF `test_continuous_integration` (SUGGESTED) |
| Link checker / markdown lint | **Não há padrão oficial único** | Consenso de indústria (ex.: markdownlint, lychee) — adotar como *fitness function*, não como “padrão ISO” |
| Scorecard / Best Practices Badge | Oficial OpenSSF | [Scorecard](https://github.com/ossf/scorecard), [Best Practices criteria](https://www.bestpractices.dev/en/criteria/0) |

**Decisão:** manter CI de qualidade de código; adicionar validação documental **incremental** (links quebrados / markdown lint) como melhoria mensurável, sem bloquear o fluxo até estabilizar.

---

### 9. Lint de documentação?

**Não existe especificação oficial única.**

- **Referências existentes:** markdownlint (comunidade), Vale (style), Google Developer Documentation Style Guide / Microsoft Writing Style Guide (estilo de prosa — não lint de repo).
- **Decisão:** tratar markdown lint como **opcional Fase 2+/3**, justificado por redução de drift e consistência — **consenso de indústria**, não RFC.

---

### 10. Validação de links?

**Não existe RFC obrigatória.** É prática recomendada para evitar docs mortas (drift).

- **Decisão:** planejar checker de links no CI (ex.: lychee) como melhoria; não inventar obrigatoriedade oficial.

---

### 11. Geração automática?

| Tipo | Evidência | Decisão |
|------|-----------|---------|
| Changelog 100% gerado de commits | Keep a Changelog **desaconselha** commit logs como changelog | **Não** usar geração cega |
| Release notes humanas + SemVer | OpenSSF MUST + SemVer SUGGESTED | Manter CHANGELOG.md + GitHub Releases |
| API reference gerada (OpenAPI) | OpenAPI Initiative (quando houver API) | Fase 3+ |

---

### 12. Como evitar Documentation Drift?

| Prática | Evidência | Adoção |
|---------|-----------|--------|
| Docs no mesmo CL/PR da mudança | Google eng-practices | Alta (prática Google publicada) |
| DoD com “docs updated” | Microsoft Playbook | Alta em times ágeis enterprise |
| `CHANGELOG` Unreleased contínuo | Keep a Changelog | Alta em OSS |
| ADRs versionados no repo | Nygard (Cognitect) | Alta em arquitetura ágil |
| Separar tipos de conteúdo (tutorial/how-to/reference/explanation) | Diátaxis | Consenso crescente (não ISO) |
| Critérios OpenSSF (README, CONTRIBUTING, release notes) | OpenSSF Best Practices | Oficial OpenSSF |

---

## Estrutura de documentação

### Existe estrutura oficial única?

**Não.** Não há ISO/RFC que imponha a árvore `docs/` de um repositório de aplicação.

### O que existe (oficial ou autoritativo)

| Artefato | Natureza | Fonte |
|----------|----------|-------|
| README, CONTRIBUTING, LICENSE, SECURITY, release notes | Critérios OpenSSF (MUST/SHOULD) | [bestpractices.dev](https://www.bestpractices.dev/en/criteria/0) |
| ADRs em `doc/arch/adr-NNN.md` (ou equivalente) | Proposta autoritativa Nygard | [Cognitect — Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) |
| MADR em `docs/decisions` | Template comunitário amplamente usado | [adr/madr](https://adr.github.io/madr/) |
| Diátaxis (4 tipos de conteúdo) | Framework teórico/prático | [diataxis.fr](https://diataxis.fr/start-here/) |
| Google Developer Documentation Style Guide | Estilo de prosa (Google) | docs.developers.google.com |

### Comparativo (consenso observado, não especificação)

Projetos OSS maduros convergem em:

1. Artefatos de governança na **raiz** (README, CONTRIBUTING, LICENSE, SECURITY, CHANGELOG).
2. Documentação técnica em **`docs/`**.
3. Decisões em **`docs/adr/`** ou `docs/decisions/` (Nygard/MADR).
4. Guias operacionais separados de referência/explicação (Diátaxis).

### Decisão de estrutura (consenso técnico justificado)

Manter e formalizar (já parcialmente existente):

```text
/
├── README.md              # OpenSSF: description + obtain + contribute
├── CONTRIBUTING.md        # OpenSSF: contribution process + requirements
├── LICENSE                # OpenSSF: license_location
├── SECURITY.md            # OpenSSF: vulnerability_report_process
├── CHANGELOG.md           # Keep a Changelog + OpenSSF release_notes
├── CODE_OF_CONDUCT.md     # Governança comunitária (consenso OSS)
├── docs/ROADMAP.md        # OpenSSF silver sugere roadmap (documentation_roadmap)
└── docs/
    ├── adr/               # Nygard/MADR — decisões arquiteturais
    ├── architecture/      # Diátaxis: Explanation + Reference de sistema
    ├── guides/            # Diátaxis: How-to (onboarding, git, releases, kickoff)
    └── api/               # Diátaxis: Reference (quando houver API — Fase 3)
```

**Justificativa:** atende MUST OpenSSF na raiz; ADRs seguem Nygard; organização interna de `docs/` segue Diátaxis (how-to vs explanation/reference) — **framework reconhecido, não padrão ISO**.

**Pastas não criar sem necessidade:** wiki GitHub, site docs separado, monorepo de docs — overengineering no estágio atual (Google eng-practices alerta contra over-engineering).

---

## Considered Options

1. **Docs apenas no release** — rejeitado: viola Google (docs no CL) e Microsoft DoD.
2. **Docs em todo commit** — rejeitado: contradiz Keep a Changelog; gera ruído.
3. **Docs no PR quando impacto + Unreleased + DoD** — **escolhido**.
4. **Geração automática total do changelog** — rejeitado como fonte única (Keep a Changelog).

## Decision Outcome

Adotamos o **Documentation Sync Policy**:

1. **Trigger:** mudança em build, test, UX/uso, release, arquitetura, contribuição ou segurança.
2. **Unidade de entrega:** o **Pull Request** (não o commit).
3. **Artefatos mínimos no PR (quando aplicável):**
   - docs afetadas em `docs/` ou raiz;
   - entrada em `CHANGELOG.md` → `[Unreleased]`;
   - ADR novo/atualizado se decisão arquitetural.
4. **Code review:** checklist inclui Documentation (Google).
5. **DoD:** “Documentation is updated” (Microsoft).
6. **Release:** promover Unreleased → versão SemVer + GitHub Release notes humanas (OpenSSF).
7. **Automação:** CI de código obrigatório; lint/links de docs como melhoria incremental documentada.

## Consequences

### Positivas

- Reduz documentation drift (causa raiz do incidente pós-`v0.2.0`).
- Alinha o repo a OpenSSF Best Practices (passing).
- Torna review e DoD auditáveis.

### Negativas / limitações

- PRs com impacto exigem mais disciplina.
- Lint/link check ainda não são “padrão oficial” — risco de falsa sensação de conformidade se mal configurados.
- Diátaxis e MADR são consenso/framework, não lei — devem ser citados como tal.

### Neutras

- Estrutura `docs/` atual permanece; este ADR **formaliza política**, não reorganiza pastas desnecessariamente.

## Confirmation (fitness functions)

| Controle | Como verificar |
|----------|----------------|
| Docs no PR | Template de PR + review (já existe checklist) |
| CHANGELOG | Presença de `[Unreleased]` e seções por versão |
| OpenSSF | Critérios documentation_basics, contribution, release_notes |
| ADR | Toda decisão arquitetural nova gera ADR numerado |
| Drift | README/ROADMAP/status devem refletir última release tag |

## More Information

- Google Engineering Practices: https://google.github.io/eng-practices/
- Microsoft Engineering Playbook DoD: https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-done/
- OpenSSF Best Practices (Passing): https://www.bestpractices.dev/en/criteria/0
- Keep a Changelog 1.1.0: https://keepachangelog.com/en/1.1.0/
- SemVer 2.0.0: https://semver.org/spec/v2.0.0.html
- Nygard ADR: https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- MADR: https://adr.github.io/madr/
- Diátaxis: https://diataxis.fr/start-here/
- GitHub Docs contributing: https://docs.github.com/en/contributing
