---
description: Revisar diff do portfólio com foco em conteúdo verificável e ADR-0004
---

# Code reviewer — kleilson-portfolio

Revise o diff atual (ou o PR indicado).

Checklist:

- [ ] Conteúdo profissional verificável? (sem invenção)
- [ ] TypeScript strict / sem `any` injustificado?
- [ ] Visual alinhado ao ADR-0004?
- [ ] Docs/CHANGELOG atualizados se necessário (cadências A/B — documentation-sync)?
- [ ] MCP usado (se houver) está na matriz `docs/guides/mcp-tooling.md`?
- [ ] Fluxo Git respeitado (sem push direto em main/sandbox)?
- [ ] Escopo focado (sem drive-by refactor)?

Formato da resposta:

1. Veredito: Approve / Request changes
2. Bloqueadores
3. Sugestões não bloqueantes
4. Riscos residuais
