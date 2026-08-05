# Repository Rationalization Audit — 2026-08

## Summary

O repositório está em boa forma estrutural e apresenta uma arquitetura coerente para um portfolio monorepo moderno. A maior parte do que aparenta ser "lixo" é, na verdade, artefato legítimo de build, documentação operacional ou fluxo de publicação.

A auditoria encontrou poucos problemas críticos. Os principais pontos de limpeza estão concentrados em:

- ativos não utilizados,
- folhas de estilo de admin legadas,
- documentação parcialmente duplicada,
- excesso de material de auditoria sem indexação simples.

## Findings by priority

### 1. High — unused starter assets in the web app

- Location: [apps/web/src/assets](apps/web/src/assets)
- Evidence: the directory contains [apps/web/src/assets/hero.png](apps/web/src/assets/hero.png), [apps/web/src/assets/react.svg](apps/web/src/assets/react.svg), and [apps/web/src/assets/vite.svg](apps/web/src/assets/vite.svg). A repository-wide search did not find active references to those files in the app source.
- Impact: visual noise, onboarding confusion, and unnecessary clutter in the source tree.
- Recommendation: remove the unused assets unless they are intentionally kept as examples or future placeholders.

### 2. Medium — legacy admin stylesheet likely not used by the current shell

- Location: [apps/web/public/admin/admin.css](apps/web/public/admin/admin.css)
- Evidence: the current admin entrypoint uses [apps/web/public/admin/index.html](apps/web/public/admin/index.html), which wires [apps/web/public/admin/admin-chrome.css](apps/web/public/admin/admin-chrome.css) and [apps/web/public/admin/admin-preview.css](apps/web/public/admin/admin-preview.css), not the generic [apps/web/public/admin/admin.css](apps/web/public/admin/admin.css).
- Impact: maintenance ambiguity and an extra stylesheet that contributors may assume is active.
- Recommendation: remove it or clearly archive it with a note if it is kept for backward compatibility.

### 3. Medium — documentation overlap between core guidance files

- Location: [README.md](README.md), [AGENTS.md](AGENTS.md), [.github/copilot-instructions.md](.github/copilot-instructions.md), and [docs/guides/ai-agentic.md](docs/guides/ai-agentic.md)
- Evidence: these files describe overlapping concepts such as project purpose, AI-agent behavior, workflow, and contribution expectations.
- Impact: duplicated context increases drift risk and makes it harder to know which file is the canonical source.
- Recommendation: keep one canonical source of truth for policy and link to it from the others instead of repeating the same guidance.

### 4. Medium — audit documentation volume is high and not easily browsed

- Location: [docs/audits](docs/audits)
- Evidence: the repository contains several audit reports from different periods, each with substantial content.
- Impact: the documentation set becomes heavier to navigate for new contributors and reviewers.
- Recommendation: maintain a short index file and archive historical reports in a clearly labeled subfolder or move only the current summary to the main docs surface.

### 5. Low — generated artifacts are already mostly kept out of the repo

- Location: [dist](dist), [apps/web/dist](apps/web/dist), [test-results](test-results), [.lighthouseci](.lighthouseci), and [.turbo](.turbo)
- Evidence: the repository already ignores those paths in [.gitignore](.gitignore).
- Impact: low risk during normal development; the main concern is keeping the working tree clean before publishing.
- Recommendation: keep the current ignore rules and add a small cleanup command if desired, but no structural change is required.

## Architecture assessment

The overall architecture is healthy for the current scope:

- the monorepo split between app, API, worker API, shared package, and docs is sensible;
- the content-as-code approach via [apps/web/content](apps/web/content) and the wrappers under [apps/web/src/data](apps/web/src/data) is coherent;
- the web app organization under [apps/web/src/pages](apps/web/src/pages), [apps/web/src/components](apps/web/src/components), [apps/web/src/hooks](apps/web/src/hooks), and [apps/web/src/utils](apps/web/src/utils) is simple and maintainable.

No large-scale architectural reorganization is necessary right now. The best approach is to keep the current layout and reduce only the sources of confusion and duplication.

## Quick wins

1. Remove the unused assets from [apps/web/src/assets](apps/web/src/assets).
2. Remove or archive [apps/web/public/admin/admin.css](apps/web/public/admin/admin.css) if it is not used by a current route or fixture.
3. Add a brief documentation index in [docs/audits](docs/audits) so the audit corpus is easier to scan.
4. Consolidate overlapping guidance among [README.md](README.md), [AGENTS.md](AGENTS.md), and [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Structural improvements

- Keep the current package boundaries.
- Avoid introducing a more complex layered architecture for this app unless it grows into a multi-domain product.
- Continue using the existing content-driven structure for portfolio data.

## Documentation improvements

- Make [README.md](README.md) the high-level entrypoint.
- Keep [AGENTS.md](AGENTS.md) as the canonical policy file for agents.
- Keep [.github/copilot-instructions.md](.github/copilot-instructions.md) as a thin wrapper or pointer rather than a duplicate policy document.

## Performance and DX

- The current structure is already lean enough for the project size.
- The main DX gains will come from less documentation duplication and fewer confusing unused assets rather than a major folder rewrite.

## Recommended roadmap

| Priority | Item | Difficulty | Risk | Expected impact |
| --- | --- | --- | --- | --- |
| 1 | Remove unused starter assets | S | Low | Medium |
| 2 | Remove or archive legacy admin stylesheet | S | Low | Medium |
| 3 | Consolidate guidance between docs and agent files | M | Low | Medium |
| 4 | Add an index for audit history | S | Low | Low |

## Conclusion

The repository is already well-structured for its current maturity. The best rationalization step is not a disruptive architecture rewrite, but a disciplined cleanup of duplicated guidance, unused assets, and legacy admin assets.
