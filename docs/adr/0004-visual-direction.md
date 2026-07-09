# ADR-0004: Direção Visual do Portfólio (V1 — Fundação)

- **Status:** Aceito
- **Data:** 2026-07-09
- **Decisores:** Kleilson dos Santos
- **Issue:** #25 (slice V1)
- **Tipo:** Design system / UX

## Context and Problem Statement

O layout atual é um scaffold (Inter + indigo + cards centrados). Referências alinhadas ao perfil enterprise (Brittany Chiang, Lee Robinson, Josh Comeau, Anthony Fu, Kent C. Dodds) exigem tipografia própria, hierarquia clara, dark elegante e hero enxuto — sem sacrificiar acessibilidade nem performance.

## Decision Drivers

1. Primeira impressão de recrutador em menos de 5s
2. Evitar look “AI-default” (Inter + roxo)
3. Usabilidade e contraste WCAG acima de efeitos Awwwards
4. Entrega incremental (V1 fundação → V2 projetos → V3 motion → V4 guardrails)

## Considered Options

1. **Clone Chiang** — rejeitado (layout demasiado reconhecível)
2. **Redesign Awwwards / motion pesado** — rejeitado (risco UX/manutenção)
3. **Fundação visual própria inspirada no mix Chiang+Lee+Comeau+Fu+Kent** — **escolhido**

## Decision Outcome

### Direção

| Aspecto | Decisão | Inspiração |
|---------|---------|------------|
| Tema | Dark-first; light via `prefers-color-scheme: light` | Chiang |
| Tipografia | Display **Sora** + corpo **IBM Plex Sans** (não Inter) | Lee / Kent |
| Accent | Teal `#2dd4bf` (não indigo/roxo) | Chiang (sem clonar `#64ffda`) |
| Hero | Brand (nome) + 1 headline + 1 lead + CTAs; sem cards no 1º viewport | Regras de composição |
| Nav | Sticky, minimal, underline ativo | Chiang / Lee |
| Motion V1 | Apenas transitions de hover/focus; reduced-motion respeitado | Comeau (dose mínima) |

### Fora de escopo (V1)

- Redesign completo de Projetos (V2) — **entregue**
- Animações de entrada / timeline (V3) — **entregue** (fade-up + hovers; sem timeline)
- Playwright visual / Lighthouse CI (V4 / #4 / #5)
- Blog / newsletter

## V2 — Projetos (slice)

Hierarquia: 1 featured primary + grid de destaques + lista compacta dos demais.
Campos `tagline` e `impact` no modelo `Project` (dados verificáveis do CV/GitHub).
Inspiração: Anthony Fu (apresentação) + Brittany Chiang (hierarquia) + Lee Robinson (clareza).

## V3 — Motion (slice)

- Fade-up escalonado nas seções da página (`prefers-reduced-motion` respeitado)
- Hover sutil em featured cards e linhas da lista compacta
- Sem WebGL / parallax / timeline (fora do escopo enterprise)

## Consequences

### Positivas

- Identidade visual distinta do scaffold
- Base de tokens para V2–V3
- Alinhamento documentado às referências escolhidas

### Negativas / limitações

- Light mode é secundário (dark-first)
- Sem âncora imagética full-bleed ainda (hero tipográfico)
- Tipografia via Google Fonts (latência; aceitável na V1)

## Confirmation

- Hero Home sem cards no primeiro bloco visual
- Contraste primary/secondary legível em dark
- `prefers-reduced-motion: reduce` desativa animações não essenciais
- ADR-0003: docs/CHANGELOG no mesmo PR

## More Information

- Issue #25
- Referências: brittanychiang.com, leerob.com, joshwcomeau.com, antfu.me, kentcdodds.com
