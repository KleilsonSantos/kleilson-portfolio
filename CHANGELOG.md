# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/) e [Conventional Commits](https://www.conventionalcommits.org/).

## [Unreleased]

## [0.2.1] - 2026-07-09

### Changed

- 📝 Sincronização da documentação com o status real do projeto (`v0.2.0` + TypeScript)
- 📝 README, ROADMAP, onboarding, architecture e releases atualizados
- 📝 package.json version alinhada a `0.2.1`

## [0.2.0] - 2026-07-09

### Added

- ✨ Migração completa para TypeScript (strict mode)
- ✨ Tipos compartilhados em `src/types/`
- 👷 `npm run typecheck` integrado ao CI

### Changed

- ♻️ Todos os módulos `.js`/`.jsx` convertidos para `.ts`/`.tsx`
- ♻️ `vite.config.ts` com tipagem do mock de contato
- 📝 Regras Cursor atualizadas para Fase 2

## [0.1.1] - 2026-07-09

### Added

- 📝 ADR-0002: estratégia de branches, sandbox e SemVer
- 📝 Guia completo de fluxo Git (`docs/guides/git-workflow.md`)
- 📝 Guia de releases e tags (`docs/guides/releases.md`)
- 🌿 Branch `sandbox` como ambiente de integração
- 🏷️ Tag `v0.1.0` retroativa para Fase 1

### Changed

- 👷 CI e CodeQL executam em `sandbox` e PRs para `main`/`sandbox`
- 📝 CONTRIBUTING.md atualizado com fluxo enterprise de PRs

## [0.1.0] - 2026-07-09

### Added

- ✨ Fase 1: frontend foundation com React 19, Vite 8 e React Router 7
- ✨ Páginas Home, Sobre, Projetos, Contatos e 404
- ✨ Conteúdo profissional derivado do CV ATS verificável
- 📝 Documentação OSS: README, ROADMAP, ADR-0001, guias
- 🔧 Regras Cursor (`.cursor/rules/`)
- 🚀 CI GitHub Actions (lint + build)
- 🔒 CodeQL para JavaScript/TypeScript
