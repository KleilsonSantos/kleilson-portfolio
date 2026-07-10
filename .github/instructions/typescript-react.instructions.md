---
applyTo: "src/**/*.{ts,tsx}"
---

# TypeScript / React — portfolio

- TypeScript strict; tipar props e exports públicos.
- Componentes funcionais; páginas em `src/pages/`, UI reutilizável em `src/components/`.
- Dados profissionais só em `src/data/` — nunca inventar fatos.
- Estilos: tokens CSS em `src/index.css` (ADR-0004). Evitar inline styles ad hoc.
- SEO: usar `useDocumentMeta` nas páginas.
- Preferir mudanças mínimas e focadas; sem refactors oportunistas.
