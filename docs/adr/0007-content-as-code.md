# ADR-0007: Gestão de conteúdo — Content-as-Code (Git) + editorial Git-backed opcional

- **Status:** Aceito (emenda 2026-07-12: Decap + JSON — ver ADR-0012)
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Tipo:** Conteúdo / arquitetura / segurança
- **Relacionados:** ADR-0002 (Git), ADR-0003 (docs), ADR-0005/0006 (API contato), ADR-0012 (Decap), AGENTS.md

## Emenda (2026-07-12)

A evolução opcional (#71) foi **implementada** sem abandonar este ADR:

| Princípio (mantido) | Forma atual |
| --- | --- |
| Desired state no Git + PR | `apps/web/content/*.json` (fonte) + wrappers `apps/web/src/data/*` |
| Sem JWT/`localStorage`/Firebase admin | Decap `/admin` + GitHub OAuth (`apps/decap-oauth`) |
| Postgres só contato | Inalterado (ADR-0006) |
| Branch editorial | `sandbox` (ADR-0012) |

Detalhes operacionais: [ADR-0012](./0012-decap-cms-git-backed.md), [content.md](../guides/content.md).

## Context and Problem Statement

O portfólio anterior (`homepage` + `backend-homepage`) tinha painel `/admin` com login JWT (e tentativa Firebase SSO) para editar JSON via `PUT` na API. Na decisão original deste ADR, o `kleilson-portfolio` usava só `src/data/*.ts` versionado no Git (sem UI editorial).

Precisamos decidir, com evidências oficiais/credíveis, se e como elevar a gestão de conteúdo (incluindo UI de administração) **sem** quebrar:

1. Conteúdo 100% verificável (CV / GitHub / LinkedIn)
2. Fluxo `feature/* → sandbox → main` + review (ADR-0002)
3. Separação já decidida: Postgres/Supabase só para **mensagens de contato** (ADR-0006), não para narrativa profissional
4. Roadmap: Fase 4 = deploy/observabilidade; Fase 5 = monorepo — não antecipar CMS DB-backed sem necessidade

## Decision Drivers

1. Fonte de verdade única e auditável
2. Review humano antes de publicar fatos profissionais
3. Superfície de ataque mínima (OWASP: auth admin = alto risco)
4. Alinhamento ao CV e a `AGENTS.md` (`src/data/` como fonte)
5. Elevação enterprise coerente com GitOps já praticado no projeto (ArgoCD no CV; fluxo Git canônico)
6. UX de edição no browser só se preservar o mesmo pipeline de qualidade

## Análises com evidências

### 1. O que o admin antigo fazia (e por que não portar)

| Aspecto | Antigo | Problema |
|---------|--------|----------|
| Auth | JWT em `localStorage` + Firebase keys no repo | Token XSS-exposto; secrets no cliente |
| Persistência | Mongo/JSON via API `PUT` | Bypass de PR/CI; drift vs CV |
| Escopo | Sobre/Header/Skills parciais | Incompleto; “projetos” = cursos |
| Modelo | Classes CSS no JSON | Conteúdo misturado com apresentação |

**Conclusão:** reimplementar o admin 2024 seria regressão de segurança e de governança de conteúdo.

### 2. Content-as-Code / GitOps para o *desired state* do site

Princípios OpenGitOps ([opengitops.dev](https://opengitops.dev/) / [PRINCIPLES.md](https://github.com/open-gitops/documents/blob/main/PRINCIPLES.md)):

1. **Declarative** — estado desejado declarado (não scripts imperativos de “salvar no banco”)
2. **Versioned and Immutable** — histórico completo no VCS
3. **Pulled Automatically** — deploy consome o repo (CI/CD / Pages)
4. **Continuously Reconciled** — ambiente publicado = o que está em `main`

Aplicado ao portfólio: `src/data/*.ts` **é** o desired state declarativo do conteúdo. O build Vite + deploy (#8) reconcilia o site público com esse estado.

Isso também espelha a prática de *documentation/code review* (Google eng-practices; ADR-0003): mudanças notáveis passam por PR.

### 3. CMS com banco (Supabase Auth + tabelas de profile/projects)

| Prós | Contras no nosso contexto |
|------|---------------------------|
| UI familiar; editar sem IDE | Segunda fonte de verdade (conflito com `src/data/` e AGENTS.md) |
| Já temos Supabase | ADR-0006 restringe Postgres a `contact_messages` + RLS deny-by-default |
| | Publicar fatos sem PR viola “conteúdo verificável” |
| | Auth admin + RLS mal configurado = risco crítico ([Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)) |

**Conclusão:** rejeitado para **conteúdo narrativo** do portfólio. Supabase permanece para dados **operacionais** (contato), não para CV/projetos.

### 4. CMS Git-backed (editorial UI que escreve no Git)

[Decap CMS](https://decapcms.org/docs/intro/) (ex-Netlify CMS): UI React em `/admin` que autentica via GitHub/GitLab e **commita** no repositório. Conteúdo continua no Git; versionamento, branch e CI permanecem.

TinaCMS e fluxos similares seguem o mesmo princípio (*Git as source of truth*).

| Prós | Contras |
|------|---------|
| UI de admin sem segunda DB | Setup OAuth/Git Gateway; modelagem YAML/JSON |
| Preserva PR/CI se configurado para branch `sandbox` / editorial workflow | Overhead se o único editor for o próprio autor-dev |
| Auth = identidade GitHub (já usada no repo) | Melhor após deploy estável (#8) |

**Conclusão:** opção **válida na Fase 5+**, se a dor de editar `src/data/*.ts` justificar. Não é pré-requisito do deploy.

### 5. Elevação imediata sem CMS (DX + gates)

Antes de qualquer UI admin:

- Manter TypeScript tipado em `src/data/` (já existe)
- Guia operacional de conteúdo (como adicionar projeto/experiência com evidência)
- Opcional: schema Zod + teste Vitest que falha se dados inválidos
- Checklist no PR / instructions já existentes (`.github/instructions/content-data.instructions.md`)

Isso eleva maturidade **sem** nova superfície de ataque e sem antecipar Fase 5.

## Considered Options

1. **Portar admin JWT/Mongo/Firebase do site antigo** — rejeitado (segurança + governança)
2. **CMS DB-backed (Supabase tables para profile/projects)** — rejeitado para narrativa (segunda fonte de verdade; conflita ADR-0006 / AGENTS.md)
3. **Somente Content-as-Code (`src/data/*.ts` + PR)** — **escolhido como canônico agora**
4. **Content-as-Code + CMS Git-backed (Decap/Tina) depois do deploy** — **aceito como evolução opcional** (issue futura, pós-#8)

## Decision Outcome

### Canônico (após emenda 2026-07-12)

1. **Fonte de verdade do conteúdo profissional:** `apps/web/content/*.json` (+ wrappers tipados em `apps/web/src/data/*`)
2. **Fluxo de mudança:** Issue → `feature/*` from `sandbox` → PR → `sandbox` → `main` → tag (ADR-0002); Decap também commit em `sandbox`
3. **Critério de aceite de conteúdo:** evidência no CV ATS, GitHub ou LinkedIn; sem inventar fatos
4. **Admin HTTP do site antigo (JWT/Firebase):** não será reintroduzido
5. **Supabase:** exclusivo para contato (e futuros dados operacionais), não para narrativa
6. **Editorial Git-backed:** Decap + OAuth GitHub — [ADR-0012](./0012-decap-cms-git-backed.md)

### Fora de escopo deste ADR

- Migrar conteúdo para Markdown/MDX (opcional futuro)
- Notificação e-mail no contato (issue separada)

## Consequences

### Positivas

- Alinhamento explícito a OpenGitOps + fluxo Git já adotado
- Zero regressão de segurança do admin 2024
- Conteúdo continua reviewable, tipado e CI-gated
- Caminho claro para UI editorial **sem** abandonar Git como SoT

### Negativas / limitações

- Editorial no browser ainda passa por GitHub OAuth + PR/CI (não “salvar no banco”)
- Soft skills / WhatsApp e demais campos continuam versionados no Git

## Confirmation

- [x] Este ADR referenciado em `docs/architecture/overview.md` e `docs/ROADMAP.md`
- [x] Guia `docs/guides/content.md` descreve o fluxo operacional
- [x] Sem JWT/`localStorage`/Firebase para admin; Decap + OAuth (ADR-0012)
- [x] Issue [#71](https://github.com/KleilsonSantos/kleilson-portfolio/issues/71) concluída; ADR-0012 Aceito

## More Information

- [OpenGitOps Principles](https://opengitops.dev/)
- [Decap CMS — Overview](https://decapcms.org/docs/intro/)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Google eng-practices — Documentation in review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- [OWASP — Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) (por que não reintroduzir JWT em `localStorage` para admin)
- Portfólio antigo: `Pessoal/myHome/homepage` (Admin*) + `backend-homepage` (auth/email)
