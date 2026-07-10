# Guia — Conteúdo do portfólio (Content-as-Code)

How-to operacional do [ADR-0007](../adr/0007-content-as-code.md).  
Política normativa: ADR-0007 + `AGENTS.md` + `.github/instructions/content-data.instructions.md`.

## Fonte de verdade

| Domínio | Arquivo | Página |
|---------|---------|--------|
| Perfil, summary, skills, soft skills, experiência | `src/data/profileData.ts` | Home, Sobre |
| Projetos públicos | `src/data/projectsData.ts` | Projetos, Home (featured) |
| Certificações, educação, cursos | `src/data/credentialsData.ts` | Sobre |
| Contato, categorias, redes | `src/data/contactData.ts` | Contatos |

Tipos: `src/types/index.ts`.

**Não** gravar narrativa profissional no Supabase. Postgres (ADR-0006) = apenas mensagens de contato.

## Fluxo canônico para alterar conteúdo

1. Abrir/usar issue no GitHub (milestone adequado).
2. Kickoff: Issue → Project **In Progress** → branch `feature/*` a partir de `sandbox` ([task-kickoff.md](./task-kickoff.md)).
3. Editar só os arquivos em `src/data/` (e tipos se necessário).
4. Evidência: CV ATS, README/repo GitHub ou LinkedIn — anotar na descrição do PR se o fato for novo.
5. PR → `sandbox` → `main` → tag se releaseable.

## Checklist antes do PR

- [ ] Fato profissional tem fonte verificável?
- [ ] Datas/cargos/clientes não inventados (eDOX = interno Capgemini, não Bradesco)?
- [ ] Cursos Udemy **não** listados como certificação vendor?
- [ ] Links (`url`, `verificationUrl`, WhatsApp, social) abrem e estão atualizados?
- [ ] `npm run lint` / `npm run typecheck` / `npm run build` OK?

## O que não fazer

- ❌ Recriar `/admin` com JWT/`localStorage` ou Firebase keys no frontend
- ❌ `PUT` de conteúdo em API que publique sem PR
- ❌ Misturar classes CSS / layout dentro dos dados (apresentação fica no CSS/componentes)
- ❌ Copiar e-mails/URLs do site antigo sem validar (`kdsdesign1@…`, GitHub legado)

## Evolução futura (não implementar neste guia)

CMS Git-backed (ex.: [Decap CMS](https://decapcms.org/docs/intro/)) **após** deploy (#8), com auth GitHub e commits/PRs no mesmo fluxo. Ver ADR-0007 § Evolução opcional.

## Referências

- [ADR-0007](../adr/0007-content-as-code.md)
- [ADR-0002](../adr/0002-git-branching-strategy.md)
- [OpenGitOps](https://opengitops.dev/)
