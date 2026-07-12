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
| Custom agents (aba Agents) | `.github/agents/*.agent.md` | Copilot cloud agent / [Agents tab](https://github.com/KleilsonSantos/kleilson-portfolio/agents) |
| Cursor (projeção fina) | `.cursor/rules/*.mdc` | Só `globs` / `@`-mention; **aponta** para os arquivos acima |

**Regra:** se divergirem, atualize `AGENTS.md` primeiro. Não clonar `.github/prompts` / `agents` / `instructions` para dentro de `.cursor/`. Os `*.agent.md` **apontam** para `AGENTS.md` + prompts — não duplicam o contrato.

**Deprecado:** `.cursorrules` na raiz — não usar.

**Wiki GitHub:** hub de links apenas ([Wiki Home](https://github.com/KleilsonSantos/kleilson-portfolio/wiki)). Fonte canônica = `docs/` + README (ADR-0003). Custom agents aparecem no **dropdown** do prompt na [aba Agents](https://github.com/KleilsonSantos/kleilson-portfolio/agents) (não na lista `?author=` de sessões).

## Origem do padrão

Inspirado no ecossistema `purchase-*` (curso Spring Boot / Kafka), adaptado para React/TypeScript — sem copiar stacks Java.

Evidências: [Cursor Docs — Rules / AGENTS.md](https://cursor.com/docs/rules); prompts/instructions = formato nativo GitHub Copilot.

## Como usar

1. Antes de uma feature: `@prompt-task-planner` ou agente **task-planner** na [aba Agents](https://github.com/KleilsonSantos/kleilson-portfolio/agents)
2. Após o diff: `@prompt-code-reviewer` ou agente **code-reviewer**
3. Antes do PR: `@prompt-docs-writer` ou agente **docs-writer**
4. Em qualquer IDE: referencie `AGENTS.md`

Custom agents no GitHub: `.github/agents/{task-planner,code-reviewer,docs-writer}.agent.md` (após merge em `main`).

## O que não fazer

- Duplicar o corpo dos prompts/instructions no `.cursor/rules`
- Manter políticas só no Cursor sem espelhar em `AGENTS.md`
- Inventar fatos do CV ou trocar visual sem ADR-0004
- Ativar MCP fora da matriz (`docs/guides/mcp-tooling.md`) ou empilhar APM redundante

## MCP

Matriz canônica: [`mcp-tooling.md`](./mcp-tooling.md). Preferir Supabase / Postman / Grafana opcional; **não** Vercel deploy, Datadog ou GitLab neste repo.
