import type { ProjectCaseStudy } from '../types'

/**
 * Case studies derivados de projetos públicos em `content/projects.json`.
 * Mantém linguagem factual sem inventar métricas além das já verificáveis.
 */
export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  banking: {
    projectId: 'banking',
    challenge:
      'Consolidar backend, frontend e operação em uma base coerente para cenários financeiros com foco em confiabilidade.',
    architecture:
      'Monorepo com serviços Java/Spring e frontend Angular, combinado com observabilidade e práticas de GitOps.',
    quality:
      'Padronização de stack, disciplina de entrega e foco em segurança e monitoramento como parte do fluxo de desenvolvimento.',
    result:
      'Evidencia integração ponta a ponta entre arquitetura de aplicação e operação técnica em ambiente regulado.',
  },
  vaultspring: {
    projectId: 'vaultspring',
    challenge:
      'Gerenciar segredos de aplicação com previsibilidade operacional e baixo risco de exposição em pipelines.',
    architecture:
      'Aplicação Spring Boot integrada ao HashiCorp Vault com testes de integração via Testcontainers.',
    quality:
      'Validação de fluxo seguro com testes automatizados e práticas de AppSec aplicadas ao ciclo de desenvolvimento.',
    result:
      'Demonstra aplicação prática de segurança e automação em infraestrutura de desenvolvimento.',
  },
  'infra-devtools': {
    projectId: 'infra-devtools',
    challenge:
      'Oferecer um ambiente local padronizado para qualidade, segurança e observabilidade em times de desenvolvimento.',
    architecture:
      'Stack containerizada com SonarQube, Prometheus, Grafana e OWASP Dependency-Check integrada por automações de setup.',
    quality:
      'Foco em repetibilidade de ambiente, visibilidade operacional e práticas de DevSecOps desde o desenvolvimento local.',
    result:
      'Acelera a preparação de ambientes técnicos e reduz variação de setup entre integrantes do time.',
  },
  'ai-orchestration-governance': {
    projectId: 'ai-orchestration-governance',
    challenge:
      'Coordenar múltiplos agentes especializados (cada um com foco, prompts e guidelines) sem criar atrito, duplicação ou perda de contexto. Garantir traceability, validação de outputs e decisões governadas por regras explícitas.',
    architecture:
      'Arquitetura multi-camada: (1) Governance layer com AGENTS.md como contrato único; (2) Task decomposition com routing automático baseado em padrões; (3) Execution layer com agentes especializados (architeto, engenheiro, documentalista); (4) Quality gates entre fases (spec → plan → execute). Complementado por MCP para ferramental consistente entre ferramentas.',
    quality:
      'Spec-Driven Development com traceability de requirements (REQ-XXX). Quality gates validam completeness, plan coverage e task traceability. Documentação sincronizada com código (ADR-driven). Ciclo fechado: não sai da spec sem plano claro; não sai do plano sem tasks estruturadas; não sai da execution sem testes/gates validados.',
    result:
      'Modernização do portfólio (visual + case studies + experiência timeline) orquestrada por este sistema. Escalável: mesmo padrão aplica-se a migration de monólito para microsserviços ou upgrade de frameworks. Diferencia senior IC/staff: capacidade de pensar em workflows multi-agente com governança, não apenas usar ChatGPT.',
  },
}
