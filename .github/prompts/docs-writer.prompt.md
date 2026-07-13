---
description: Atualizar docs/CHANGELOG após mudança no código — sync PR + cadência de release
---

# Docs writer — kleilson-portfolio

Com base no diff (e no estado do repositório):

## Cadência A — mesmo PR (obrigatório se gatilho ADR-0003)

1. Atualize `CHANGELOG.md` `[Unreleased]` (Added/Changed/Fixed/Deprecated/Removed/Security — [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)).
2. Se houve decisão arquitetural, proponha ADR ou atualize o existente.
3. Se build/test/uso/contribuição/estrutura mudou: ajuste guides/`README` afetados ([documentation-sync.md](../../docs/guides/documentation-sync.md)).
4. Não invente versões/tags; use apenas o que existir no repositório.
5. Tom direto e factual (ADR-0003). Wiki GitHub = mapa, não canônico.

## Cadência B — verificar se a documentação acompanha o **projeto** (release)

Além do diff pontual, valide:

| Check | Ação se falhar |
| --- | --- |
| Última tag SemVer (`git tag` / GitHub) vs `package.json` `version` | Reportar drift; **não** inventar tag — humano segue [`releases.md`](../../docs/guides/releases.md) |
| Itens em `[Unreleased]` cujo código já está em `main` há tempo sem promote | Sinalizar necessidade de release / promote CHANGELOG |
| Guides citando comportamento removido ou URLs mortas tocadas pelo diff | Corrigir no mesmo PR |
| Deprecações no código sem entrada `Deprecated`/`Removed` | Completar CHANGELOG |

**Não** atualizar docs cosméticas em todo commit. **Não** deixar sync “só para a próxima release” quando o gatilho A dispara no PR ([Google eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html); DoD).

## Contrato

Obedeça [`AGENTS.md`](../../AGENTS.md). Em conflito: `AGENTS.md` + ADRs.
