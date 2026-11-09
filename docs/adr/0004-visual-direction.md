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
- Playwright visual / Lighthouse CI (V4 / #4 / #5) — **scaffold entregue**
- Blog / newsletter

## V2 — Projetos (slice)

Hierarquia: 1 featured primary + grid de destaques + lista compacta dos demais.
Campos `tagline` e `impact` no modelo `Project` (dados verificáveis do CV/GitHub).
Inspiração: Anthony Fu (apresentação) + Brittany Chiang (hierarquia) + Lee Robinson (clareza).

## V3 — Motion (slice)

- Fade-up escalonado nas seções da página (`prefers-reduced-motion` respeitado)
- Hover sutil em featured cards e linhas da lista compacta
- Sem WebGL / parallax / timeline (fora do escopo enterprise)

## V4 — Guardrails + polish de componentes

- Cards interativos (`card--interactive`, highlight cards, skill panels) alinhados ao teal dark-first
- Playwright smoke E2E (`e2e/smoke.spec.ts`) no CI (#4)
- Lighthouse CI (`lighthouserc.cjs`) com asserts conservadores (#5)

## V5 — View Transitions + tema controlável

- Navegação com `viewTransition` (React Router 7 oficial) + CSS `::view-transition-*`
- Toggle dark/light com `data-theme` + `localStorage` (sem lib de tema)
- `prefers-reduced-motion` desativa view transitions
- **Não** adotar MUI/Chakra/Motion: redundante com tokens ADR-0004 e motion CSS existente

## V6 — Hero com status, métricas e container por tipo de conteúdo

- **Data:** 2026-10-20 · **Issue:** #209 · **Protótipo:** Figma "Portfólio Kleilson — UX audit" (página "Depois — proposta B")
- Não reverte nenhuma decisão acima (dark-first, Sora + IBM Plex Sans, teal): é extensão incremental, como V2–V5.

**Emenda à tabela de Direção (Hero):** o hero continua com brand + headline + lead + CTAs e passa a incluir (1) um pill de status (`availability` + `remote`, mesmos textos do perfil) e (2) links externos GitHub/LinkedIn ao lado dos CTAs. Saem os chips de stack do hero, que repetiam a seção Competências. "Sem cards no 1º viewport" passa a valer **para o bloco do hero**: as métricas começam logo abaixo dele e, em desktop, já aparecem na primeira tela.

**Destaques:** 4 métricas (valor + descrição) seguidas de lista compacta. Os números vêm do texto já verificado (50%, 20+, ≥ 80%, 330+); entram em `profile.json › metrics` e saem de `highlights` para não duplicar conteúdo.

**Container por tipo de conteúdo** (`WIDE_PAGES` em `Layout.tsx`):

| Tipo | Container | Páginas |
| --- | --- | --- |
| Vitrine em grade (hero em colunas, cards/métricas) | `--container-wide`, alinhado à navegação | Home, Projetos, Contatos |
| Leitura longa (texto corrido, listas) | `--container-narrow` | Sobre, 404 |

**Contraste (sem mudar a paleta):** no tema claro, texto do botão primário branco e teal `#0d6b64`; `text-muted` `#566980` — ver #207 / PR #208.

**Alternativa rejeitada:** manter a Home estreita. O conteúdo (hero em 2 colunas, 4 métricas) é de vitrine, e a navegação já é larga; o container estreito deixava o logo desalinhado do conteúdo e quebrava o título em 6 linhas.

## V7 — Home com prova de trabalho e copy curta

- **Data:** 2026-10-20 · **Protótipo:** Figma "Portfólio Kleilson — Proposta A1–A6 (v0.10)" · Extensão incremental; não reverte nenhuma decisão acima.
- **Hero:** H1 passa a declarar a função alinhada ao headline do LinkedIn (backend e full stack sênior, microsserviços Java, AppSec/DevSecOps, IA aplicada e governança); o lead usa `profile.lead` (2 frases, só PT). O parágrafo longo (`summary`) sai da Home e fica em Sobre. `profile.metaDescription` (≤ 160) substitui o `summary` como meta description.
- **Home:** seção "Projetos em destaque" (até 3 `featured`, componente `ProjectTeaser`) entre Destaques e Competências; em Competências o primeiro grupo ocupa a linha inteira (sem painel órfão).
- **Projetos:** novo campo `kind` (`open-source` | `lab`) e rótulo "Por que importa" no lugar de "Resultado" (o texto descreve propósito, não resultado medido).
- **Copy:** removidas as frases "não é o eixo da carreira" (nota de bastidor). IA aplicada e governança passam a fazer parte do núcleo do posicionamento (AIOS é destaque principal em Home e Projetos); o backend segue à frente na ordem das competências.
- **Processo:** o protótipo Figma (página "Proposta v2 (canônica)") é o contrato da implementação; usa as medidas do CSS e os dados reais dos JSONs.
- **Alternativa rejeitada:** manter o `summary` na Home. O card ocupava a primeira tela com 8 linhas antes de qualquer projeto.

## V8 — Hierarquia visual, ícones reais e âncora do hero

- **Data:** 2026-11-08 · **Motivação:** auditoria de UI/UX end-to-end (Home, Sobre, Projetos, Contatos); extensão incremental, não reverte nenhuma decisão acima.
- **Sobre:** "Resumo profissional" e "Experiência profissional" saem do `.card` padrão — viram `.section-heading` + texto/timeline soltos (mesmo padrão já usado em "Destaques"/"Projetos em destaque" na Home), criando 2 níveis de leitura em vez de 7 caixas idênticas. `.card` fica só para blocos de referência (Informações, Habilidades, Certificações, Educação, Cursos).
- **Home — Destaques:** o bloco de marcos ganha heading próprio ("Marcos recentes", `.subsection-heading`) separado dos 4 cards de métrica; item órfão na última linha da grade de 2 colunas passa a ocupar a linha inteira (sem buraco), limitado à faixa 768–1279px — em ≥1280px (3 colunas) aceita-se 1 coluna livre em vez de esticar 1 card pelas 3 colunas.
- **Home — Competências:** `.skill-panel--lead` (grupo "Backend & Arquitetura") ganha gradiente teal sutil além da borda, pra ler como grupo principal de fato.
- **Projetos:** cada linha de "Outros projetos" mostra o rótulo de `kind` (Open Source/Laboratório) acima do título — mesma informação que já aparecia nos cards de destaque, agora também na lista compacta.
- **Contatos:** canais diretos (e-mail, telefone, WhatsApp, localização) ganham ícone — o campo `icon` do `content/contact.json` já existia no modelo de dados e nunca tinha sido renderizado.
- **Ícones reais de tecnologia e marca:** chips de stack/competência que correspondem a um produto real (Java, Spring, Docker, Kubernetes, React, PostgreSQL etc.) passam a mostrar o logo oficial da marca (Simple Icons, CC0, auto-hospedado em `public/icons/tech/`) em vez de só texto; chips de conceito/prática (Microsserviços, DevSecOps, Spec-Driven Development, MCP) continuam em texto puro — não é todo chip que vira ícone, só os que são produto reconhecível. A mesma lógica cobre links de GitHub/LinkedIn (hero da Home, rodapé, CTAs "Ver no GitHub" em Projetos, "Redes" em Contatos), o provedor "Udemy" dos cursos em Sobre e o emissor "Azure" da certificação AI-900.
- **Hero — âncora visual, em todas as páginas:** o token `--hero-glow` (já existia, a 10–14% de opacidade, quase imperceptível) sobe pra 16–26% e ganha uma segunda camada sutil; toda hero do site (Home, Sobre, Projetos, Contatos, 404) ganha uma grade de nós/linhas decorativa (`HeroMesh`, SVG compartilhado) — tema de microsserviços/sistemas distribuídos, não gradiente genérico de "produto de IA" (sem roxo/indigo, mantendo a proibição da V1). Pulsação lenta nos nós (4.5s), desativada por `prefers-reduced-motion` e oculta em `@media print`.
- **Emenda à V1:** "Motion V1: apenas transitions de hover/focus" passa a admitir, nas heroes do site, uma animação ambiente contínua e de baixa amplitude (pulsação de opacidade nos nós), sempre condicionada a `prefers-reduced-motion: no-preference`. "Sem âncora imagética full-bleed ainda (hero tipográfico)" (Consequences, abaixo) deixa de ser verdade como estava escrita: o hero segue tipográfico (sem foto/ilustração full-bleed), mas ganha uma âncora decorativa sutil.
- **Alternativa rejeitada:** gradiente mesh genérico (blob roxo/azul) no hero, no estilo "AI-default" — rejeitado por contrariar a Decision Driver #2 (evitar look AI-default) e por não ter relação com o conteúdo; a grade de nós foi escolhida por referenciar diretamente a área de atuação (microsserviços, sistemas distribuídos).

## Consequences

### Positivas

- Identidade visual distinta do scaffold
- Base de tokens para V2–V3
- Alinhamento documentado às referências escolhidas

### Negativas / limitações

- Light mode é secundário (dark-first)
- Hero segue tipográfico, sem foto/ilustração full-bleed; ganhou âncora decorativa sutil (glow + grade de nós) na V8, mas não é imagem real do trabalho
- Tipografia via Google Fonts (latência; aceitável na V1)

## Confirmation

- Hero Home sem cards no primeiro bloco visual
- Contraste primary/secondary legível em dark
- `prefers-reduced-motion: reduce` desativa animações não essenciais
- ADR-0003: docs/CHANGELOG no mesmo PR

## More Information

- Issue #25
- Referências: brittanychiang.com, leerob.com, joshwcomeau.com, antfu.me, kentcdodds.com
