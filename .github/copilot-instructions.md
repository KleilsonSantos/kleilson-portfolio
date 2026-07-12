# GitHub Copilot — Kleilson Portfolio

Instruções para GitHub Copilot Chat / coding agent.
Espelham `AGENTS.md` (fonte canônica IDE-agnóstica).

## Projeto

Portfólio React 19 + Vite 8 + TypeScript strict + React Router 7.
Deploy: Cloudflare Pages + Workers Free (ADR-0008). Conteúdo: apenas fatos verificáveis (CV, GitHub, LinkedIn).

## Sempre

- Preferir TypeScript estrito; tipar props e dados em `apps/web/src/data/`.
- Seguir Conventional Commits e fluxo: Issue → `feature/*` → PR → `sandbox` → PR → `main`.
- Atualizar `CHANGELOG.md` `[Unreleased]` em mudanças user-facing.
- Respeitar ADR-0004 (dark-first, teal, Sora + IBM Plex Sans).
- Manter docs alinhados ao código (ADR-0003).

## Nunca

- Inventar experiência profissional, empresas, datas ou stacks.
- Push direto em `main`/`sandbox`.
- Introduzir look visual genérico (roxo/indigo, Inter como display, glow).
- Usar `any` sem justificativa.

## Onde olhar

| Necessidade | Arquivo |
| --- | --- |
| Perfil / experiência | `apps/web/src/data/profileData.ts` |
| Projetos | `apps/web/src/data/projectsData.ts` |
| Credenciais | `apps/web/src/data/credentialsData.ts` |
| Estilos | `apps/web/src/index.css` |
| Rotas | `apps/web/src/App.tsx` |
| Agentes | `AGENTS.md`, `.github/instructions/`, `.github/prompts/` |
| MCP (Cursor) | `docs/guides/mcp-tooling.md` — matriz canônica |

## Idioma

- Código e identificadores: inglês.
- Docs e UI do site: português (pt-BR), salvo ADRs técnicos em inglês quando já existentes.
