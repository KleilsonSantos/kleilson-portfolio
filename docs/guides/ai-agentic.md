# Agentes de IA (IDE-agnóstico)

Como este repositório governa assistentes de IA **independente da IDE e do modelo**.

## Por que existe

O mesmo contrato deve valer em Cursor, GitHub Copilot, Claude Code, Windsurf ou chat genérico.
A fonte canônica é [`AGENTS.md`](../../AGENTS.md) na raiz.

## Camadas (sem cópia de texto)

| Camada | Onde | Quem consome |
| --- | --- | --- |
| Contrato canônico | `AGENTS.md` | Qualquer agente (Cursor lê nativamente) |
| Copilot | `.github/copilot-instructions.md` | GitHub Copilot |
| Regras por path | `.github/instructions/*.instructions.md` | Copilot (`applyTo`) |
| Prompts reutilizáveis | `.github/prompts/*.prompt.md` | Copilot Chat + `@` no Cursor |
| Cursor (projeção fina) | `.cursor/rules/*.mdc` | Só `globs` / `@`-mention; **aponta** para os arquivos acima |

**Regra:** se divergirem, atualize `AGENTS.md` primeiro. Não clonar `.github/prompts` nem `instructions` para dentro de `.cursor/`.

**Deprecado:** `.cursorrules` na raiz — não usar.

## Origem do padrão

Inspirado no ecossistema `purchase-*` (curso Spring Boot / Kafka), adaptado para React/TypeScript — sem copiar stacks Java.

Evidências: [Cursor Docs — Rules / AGENTS.md](https://cursor.com/docs/rules); prompts/instructions = formato nativo GitHub Copilot.

## Como usar

1. Antes de uma feature: `@prompt-task-planner` ou `@.github/prompts/task-planner.prompt.md`
2. Após o diff: `@prompt-code-reviewer` ou `@.github/prompts/code-reviewer.prompt.md`
3. Antes do PR: `@prompt-docs-writer` ou `@.github/prompts/docs-writer.prompt.md`
4. Em qualquer IDE: referencie `AGENTS.md`

## O que não fazer

- Duplicar o corpo dos prompts/instructions no `.cursor/rules`
- Manter políticas só no Cursor sem espelhar em `AGENTS.md`
- Inventar fatos do CV ou trocar visual sem ADR-0004
