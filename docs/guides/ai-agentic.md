# Agentes de IA (IDE-agnóstico)

Como este repositório governa assistentes de IA **independente da IDE e do modelo**.

## Por que existe

O mesmo contrato deve valer em Cursor, GitHub Copilot, Claude Code, Windsurf ou chat genérico.
A fonte canônica é [`AGENTS.md`](../../AGENTS.md) na raiz.

## Camadas

| Camada | Onde | Quem consome |
| --- | --- | --- |
| Contrato canônico | `AGENTS.md` | Qualquer agente / humano |
| Copilot | `.github/copilot-instructions.md` | GitHub Copilot |
| Regras por path | `.github/instructions/*.instructions.md` | Copilot / ferramentas com `applyTo` |
| Prompts reutilizáveis | `.github/prompts/*.prompt.md` | Copilot Chat / humanos |
| Cursor | `.cursor/rules/*.mdc` | Cursor (projeção do mesmo contrato) |

**Regra:** se divergirem, atualize `AGENTS.md` primeiro e depois as projeções.

## Origem do padrão

Inspirado no ecossistema `purchase-*` (curso Spring Boot / Kafka), adaptado para React/TypeScript e regras de conteúdo verificável do portfólio — sem copiar stacks Java.

## Como usar

1. Antes de uma feature: abra `.github/prompts/task-planner.prompt.md`.
2. Após o diff: `.github/prompts/code-reviewer.prompt.md`.
3. Antes do PR: `.github/prompts/docs-writer.prompt.md`.
4. Em qualquer IDE: cole ou referencie `AGENTS.md` no system prompt.

## O que não fazer

- Duplicar políticas conflitantes só no `.cursor/rules` sem espelhar em `AGENTS.md`.
- Confiar no modelo para inventar fatos do CV.
- Trocar direção visual sem ADR-0004.
