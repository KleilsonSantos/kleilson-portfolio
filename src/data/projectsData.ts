import type { Project } from '../types'

export const PROJECTS: Project[] = [
  {
    id: 'purchase-ecosystem',
    name: 'purchase-ecosystem',
    description:
      'Ecossistema de quatro microsserviços event-driven com Saga distribuída, DLQ, idempotência e deploy GitOps (ArgoCD, Gitea, k3d). Observabilidade com Prometheus, Grafana e Spring Actuator. Inclui camada SDD com agentes Copilot.',
    stack: ['Java 21', 'Spring Boot 4.x', 'Kafka', 'PostgreSQL 16', 'k3d', 'ArgoCD'],
    url: 'https://github.com/KleilsonSantos/purchase-ecosystem',
    featured: true,
  },
  {
    id: 'banking',
    name: 'banking',
    description:
      'Banking Platform — Monorepo workspace com Java 21, Spring Boot, Angular 18, observabilidade e pipelines CI/CD.',
    stack: ['Java 21', 'Spring Boot', 'Angular 18', 'Kubernetes', 'Prometheus'],
    url: 'https://github.com/KleilsonSantos/banking',
    featured: true,
  },
  {
    id: 'copilot-java21-springboot',
    name: 'copilot-java21-springboot',
    description:
      'Projeto de referência demonstrando Spec-Driven Development com GitHub Copilot, agentes customizados e prompt engineering em Spring Boot.',
    stack: ['Java 21', 'Spring Boot', 'GitHub Copilot', 'SDD'],
    url: 'https://github.com/KleilsonSantos/copilot-java21-springboot',
    featured: true,
  },
  {
    id: 'infra-devtools',
    name: 'infra-devtools',
    description:
      'Stack DevSecOps pronta para times de desenvolvimento, com SonarQube, Portainer, Prometheus, Grafana e OWASP Dependency-Check.',
    stack: ['Docker', 'SonarQube', 'Prometheus', 'Grafana', 'Makefile'],
    url: 'https://github.com/KleilsonSantos/infra-devtools',
    featured: false,
  },
  {
    id: 'vaultspring',
    name: 'VaultSpring',
    description:
      'Aplicação Spring Boot para gestão segura de segredos com HashiCorp Vault e testes de integração com Testcontainers.',
    stack: ['Spring Boot', 'HashiCorp Vault', 'Testcontainers'],
    url: 'https://github.com/KleilsonSantos/VaultSpring',
    featured: false,
  },
  {
    id: 'mongo-restfull-api',
    name: 'Mongo-RestFull-API',
    description:
      'API RESTful com CRUD completo, autenticação JWT, middlewares e práticas de segurança aplicadas.',
    stack: ['Node.js', 'TypeScript', 'Express', 'MongoDB', 'JWT'],
    url: 'https://github.com/KleilsonSantos/Mongo-RestFull-API',
    featured: false,
  },
  {
    id: 'appsec-daily-hub',
    name: 'appsec-daily-hub',
    description:
      'Central de notícias diárias, vulnerabilidades críticas, ferramentas OWASP e tutoriais sobre segurança de software.',
    stack: ['HTML', 'OWASP', 'DevSecOps'],
    url: 'https://github.com/KleilsonSantos/appsec-daily-hub',
    featured: false,
  },
  {
    id: 'ai-driven',
    name: 'ai-driven',
    description:
      'Toolkit open-source de automações AI-driven e fluxos de produtividade para desenvolvedores.',
    stack: ['Shell Script', 'AI Workflows', 'Automação'],
    url: 'https://github.com/KleilsonSantos/ai-driven',
    featured: false,
  },
]
