---
agent: agent
description: Auditoria periódica da arquitetura de agentes, contexto, governança de IA e aderência docs↔projeto (PR + release)
---

# AI Governance Audit (arquitetura de agentes)

Você atuará com foco em **arquitetura de agentes + Context Engineering + governança documental**, **sem** pressupor nomes de agentes (`doc-research` etc.).

## Contrato

Obedeça [`AGENTS.md`](../../AGENTS.md). Em conflito: código + ADR.

## Missão

1. **Inventariar** o que existe: `.github/agents`, `.github/prompts`, `.github/instructions`, `.cursor/rules`, `AGENTS.md`, Copilot instructions, workflows de IA, MCP (`docs/guides/mcp-tooling.md`).
2. Para cada artefato: responsabilidade, acionamento, entradas/saídas, overlap, se ainda faz sentido.
3. Auditar docs (`docs/`, ADR-0003, [`documentation-sync.md`](../../docs/guides/documentation-sync.md)) quanto a drift, duplicidade, órfãos.
4. **Docs acompanham o projeto?** Verificar as **duas cadências** (não inventar processo paralelo):
   - **Cadência A (PR):** mudanças notáveis com docs no **mesmo** PR ([Google eng-practices — Documentation](https://google.github.io/eng-practices/review/reviewer/looking-for.html); Microsoft DoD; ADR-0003).
   - **Cadência B (Release):** `[Unreleased]` → `## [X.Y.Z]`, `package.json`, tag anotada + GitHub Release ([Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); OpenSSF release notes; [`releases.md`](../../docs/guides/releases.md)).
   - Reportar drift: tag vs `package.json`; Unreleased estagnado com código já em `main`; guides desatualizados vs comportamento atual; deprecações sem entrada no CHANGELOG.
5. Propor orquestração **event-based** (só agents necessários).
6. Recomendar **novos** agents **somente** com SRP + YAGNI; preferir prompt reutilizável a proliferar agents.
7. Auditar **contexto**: precedência AGENTS vs Copilot vs rules; lazy loading; conflitos MCP IDE vs matriz do repo.

## Não fazer

- Inventar agentes inexistentes
- Duplicar texto de prompts em `.cursor/rules`
- Empilhar MCP fora de `mcp-tooling.md`
- Exigir docs em **todo** commit pontual (anti-padrão já documentado)
- Deixar sync documental **apenas** para a release quando o PR já disparou gatilho ADR-0003
- Overengineering (super-orquestrador sem ganho)
- Usar formatos deprecados (ex.: `.cursorrules`, Decap `logo_url`)

## Saída

Atualizar ou criar relatório em `docs/audits/ai-agents-governance-audit-YYYY-MM.md` com as seções do template no último audit, **incluindo** subseção explícita “Aderência docs ↔ projeto (cadências A/B)” com fatos vs recomendações.

Referência: [`docs/audits/ai-agents-governance-audit-2026-07.md`](../../docs/audits/ai-agents-governance-audit-2026-07.md).
