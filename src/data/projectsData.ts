import type { Project } from '../types'

/**
 * Projetos públicos — conteúdo alinhado ao CV 2026 (Kleilson_Santos_CV_2026.docx)
 * e repositórios GitHub. Não inventar métricas; `impact` descreve foco técnico verificável.
 */

export const PROJECTS: Project[] = [
  {
    id: 'purchase-ecosystem',
    name: 'purchase-ecosystem',
    tagline: 'Microsserviços event-driven com GitOps e Spec-Driven Development',
    description:
      'Ecossistema de quatro microsserviços event-driven (clients, orders, products e purchase-service) com Saga distribuída, DLQ, idempotência e deploy GitOps com ArgoCD, Gitea e Kubernetes (k3d). Observabilidade com Prometheus, Grafana e Spring Actuator.',
    impact:
      'Camada SDD com 10 agentes Copilot, 7 prompts reutilizáveis e 6 arquivos de instruções (applyTo) codificando arquitetura, testes e segurança.',
    stack: ['Java 21', 'Spring Boot 4.x', 'Kafka', 'PostgreSQL 16', 'k3d', 'ArgoCD'],
    url: 'https://github.com/KleilsonSantos/purchase-ecosystem',
    featured: true,
  },
  {
    id: 'banking',
    name: 'banking',
    tagline: 'Monorepo full stack com observabilidade e CI/CD',
    description:
      'Banking Platform — workspace monorepo com Java 21, Spring Boot, Angular 18, observabilidade e pipelines CI/CD.',
    impact: 'Referência de organização monorepo alinhada a práticas de plataforma bancária.',
    stack: ['Java 21', 'Spring Boot', 'Angular 18', 'Kubernetes', 'Prometheus'],
    url: 'https://github.com/KleilsonSantos/banking',
    featured: true,
  },
  {
    id: 'copilot-java21-springboot',
    name: 'copilot-java21-springboot',
    tagline: 'Spec-Driven Development com GitHub Copilot em Spring Boot',
    description:
      'Projeto de referência demonstrando Spec-Driven Development com GitHub Copilot, agentes customizados e prompt engineering aplicados a uma base Spring Boot.',
    impact: 'Demonstra AI Agentic Engineering aplicada a código Java de produção.',
    stack: ['Java 21', 'Spring Boot', 'GitHub Copilot', 'SDD'],
    url: 'https://github.com/KleilsonSantos/copilot-java21-springboot',
    featured: true,
  },
  {
    id: 'infra-devtools',
    name: 'infra-devtools',
    tagline: 'Stack DevSecOps para times de desenvolvimento',
    description:
      'Stack DevSecOps pronta para times, com SonarQube, Portainer, Prometheus, Grafana e OWASP Dependency-Check, com automação via Makefile.',
    impact: 'Ambiente local padronizado para qualidade, segurança e monitoramento.',
    stack: ['Docker', 'SonarQube', 'Prometheus', 'Grafana', 'Makefile'],
    url: 'https://github.com/KleilsonSantos/infra-devtools',
    featured: false,
  },
  {
    id: 'vaultspring',
    name: 'VaultSpring',
    tagline: 'Segredos com HashiCorp Vault e Testcontainers',
    description:
      'Aplicação Spring Boot para gestão segura de segredos em ambientes escaláveis, com autenticação robusta e testes de integração.',
    impact: 'Foco em AppSec operacional: segredos fora do código e testes de integração.',
    stack: ['Spring Boot', 'HashiCorp Vault', 'Testcontainers'],
    url: 'https://github.com/KleilsonSantos/VaultSpring',
    featured: false,
  },
  {
    id: 'mongo-restfull-api',
    name: 'Mongo-RestFull-API',
    tagline: 'API REST com JWT e práticas de segurança',
    description:
      'API RESTful com CRUD completo, autenticação por JWT, middlewares e práticas de segurança aplicadas.',
    impact: 'Base Node/TypeScript com autenticação e middlewares de proteção.',
    stack: ['Node.js', 'TypeScript', 'Express', 'MongoDB', 'JWT'],
    url: 'https://github.com/KleilsonSantos/Mongo-RestFull-API',
    featured: false,
  },
  {
    id: 'appsec-daily-hub',
    name: 'appsec-daily-hub',
    tagline: 'Hub de conteúdo AppSec e OWASP',
    description:
      'Central de notícias diárias, vulnerabilidades críticas, ferramentas OWASP e tutoriais técnicos sobre segurança de software.',
    impact: 'Material de referência alinhado à atuação em Application Security.',
    stack: ['HTML', 'OWASP', 'DevSecOps'],
    url: 'https://github.com/KleilsonSantos/appsec-daily-hub',
    featured: false,
  },
  {
    id: 'order-processing-system',
    name: 'OrderProcessingSystem',
    tagline: 'Processamento assíncrono de pedidos com Spring Batch',
    description:
      'Sistema de processamento de pedidos com processamento assíncrono e foco em performance, usando Java, Spring Boot, Spring Batch e Redis.',
    impact: 'Referência de batch e filas para cenários de alto volume.',
    stack: ['Java', 'Spring Boot', 'Spring Batch', 'Redis'],
    url: 'https://github.com/KleilsonSantos/OrderProcessingSystem',
    featured: false,
  },
  {
    id: 'ai-driven',
    name: 'ai-driven',
    tagline: 'Automações AI-driven para produtividade',
    description:
      'Toolkit open-source de automações AI-driven e fluxos de produtividade para desenvolvedores.',
    impact: 'Scripts e workflows reutilizáveis para engenharia assistida por IA.',
    stack: ['Shell Script', 'AI Workflows', 'Automação'],
    url: 'https://github.com/KleilsonSantos/ai-driven',
    featured: false,
  },
]
