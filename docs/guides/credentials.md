# Política de credenciais e certificados

## Princípios

1. **Separar tipos:** certificação vendor ≠ curso online (Udemy).
2. **Somente dados verificáveis:** CV ATS + inventário local de certificados.
3. **Não versionar PDFs/JPGs** de certificados no Git (PII, tamanho, risco de vazamento).
4. **Schema.org:** `EducationalOccupationalCredential` apenas para credenciais vendor.

## Onde vive no código

| Artefato | Caminho |
|----------|---------|
| Dados | `src/data/credentialsData.ts` |
| UI | `src/pages/Sobre.tsx` |
| Tipos | `src/types/index.ts` |

## Como atualizar

1. Adicione o certificado na pasta local (fora do repo).
2. Atualize `credentialsData.ts` no mesmo PR da mudança de UI (ADR-0003).
3. Se for certificação vendor, use `CERTIFICATIONS`; se for curso, use `COURSE_GROUPS`.
4. Não invente datas, IDs ou URLs de verificação pessoais sem comprovante.
