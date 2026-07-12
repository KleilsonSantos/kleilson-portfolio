# Política de credenciais e certificados

## Princípios

1. **Separar tipos:** certificação vendor ≠ curso online (Udemy).
2. **Somente dados verificáveis:** CV 2026 (`Kleilson_Santos_CV_2026.docx`) + inventário local de certificados.
3. **Não versionar PDFs/JPGs** de certificados no Git (PII, tamanho, risco de vazamento).
4. **Schema.org:** `EducationalOccupationalCredential` apenas para credenciais vendor.

## Onde vive no código

| Artefato | Caminho |
|----------|---------|
| JSON (editável) | `apps/web/content/credentials.json` |
| Wrapper TS | `apps/web/src/data/credentialsData.ts` |
| UI | `apps/web/src/pages/Sobre.tsx` |
| Tipos | `apps/web/src/types/index.ts` |

## Como atualizar

1. Adicione o certificado na pasta local (fora do repo).
2. Atualize `apps/web/content/credentials.json` (e o wrapper só se tipos mudarem) no mesmo PR da UI (ADR-0003 · [content.md](./content.md)).
3. Se for certificação vendor, use `CERTIFICATIONS` (via JSON `certifications`); se for curso, `COURSE_GROUPS` (`courseGroups`).
4. Não invente datas, IDs ou URLs de verificação pessoais sem comprovante.

## Relacionados

- [content.md](./content.md) — Content-as-Code + Decap
- [onboarding.md](./onboarding.md) — setup
- [ADR-0007](../adr/0007-content-as-code.md)
