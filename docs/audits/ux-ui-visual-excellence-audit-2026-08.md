# Auditoria UX/UI & Visual Excellence — kleilson-portfolio

| Campo | Valor |
| --- | --- |
| **Data** | 2026-08-16 |
| **Branch** | `feature/ux-visual-excellence` |
| **Natureza** | Inspeção de código + implementação P0/P1 (ADR-0004) |
| **Complementa** | [usability-functional-quality-audit-2026-07.md](./usability-functional-quality-audit-2026-07.md) |

## Veredito

O sistema visual **já existia** (tokens em `public/design-tokens.css`, Sora + IBM Plex Sans, teal dark-first). O gap não era “falta de design system”, e sim **execução inconsistente**: estilos inline no formulário, hover em cards não clicáveis, recorte estranho do `#root`, e projetos que não rotulavam Contexto vs Resultado.

Não houve redesign de marca nem novas bibliotecas de UI/motion.

## KEEP

- Tokens ADR-0004, tipografia, accent teal
- Hierarquia de projetos (featured + grid + lista)
- Nav sticky, view transitions, fade-up de seções
- Foto WebP no hero, tema `data-theme`
- Conteúdo profissional em JSON (sem alteração de fatos)

## IMPROVE (entregue nesta slice)

| Área | Problema | Decisão |
| --- | --- | --- |
| A11y teclado | Sem skip link | Link “Ir para o conteúdo” → `#conteudo-principal` |
| Form | Sem `aria-invalid` / live region; inline styles | Tokens + associação de erros + `aria-live` |
| Cards | `card--interactive` em seções estáticas | Hover só em highlight/skill/credential/project com `hover: hover` |
| Hero | Stack só no bloco Competências | 10 chips derivados de `SKILL_GROUPS` |
| Projetos | Texto corrido | Kickers Contexto/Resultado; CTA `button-link secondary` |
| Performance fontes | `@import` no CSS | `preconnect` + stylesheet no `index.html` |
| Viewport | `border-radius: 50px` em `#root` | Removido |

## Remaining (deliberadamente fora)

- `robots.txt` / `sitemap.xml` estáticos (débito SEO conhecido)
- Campos novos de arquitetura nos JSON de projetos (exigiria evidência/README)
- CV download, `tel:` no contato
- Lighthouse CI rebaseline nesta máquina (medir no CI após merge)
- Motion L4 (parallax, magnetic cursor) — fora do ADR-0004 V3
- Issue GitHub / Project board (criar no kickoff humano)

## Dependências

Nenhuma adicionada, removida ou substituída. Stack UI permanece React + CSS tokens.
