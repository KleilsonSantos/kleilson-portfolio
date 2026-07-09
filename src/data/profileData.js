export const PROFILE = {
  name: 'Kleilson dos Santos',
  shortName: 'Kleilson Santos',
  title: 'Software Engineer | Full Stack Developer',
  headline:
    'Microsserviços event-driven, AppSec e AI Agentic Engineering para sistemas críticos do setor financeiro.',
  location: 'Paulo Afonso, Bahia, Brasil',
  remote: 'Disponível para trabalho remoto',
  email: 'kleilson@icloud.com',
  phone: '+55 75 99161-0301',
  linkedin: 'https://www.linkedin.com/in/kleilson-dev-full-stack/',
  github: 'https://github.com/KleilsonSantos',
  siteUrl: 'https://kleilsonsantos.github.io',
  yearsOfExperience: '9+',
  currentCompany: 'Capgemini Brasil',
  certification: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
}

export const SUMMARY = `Desenvolvedor Full Stack com mais de 9 anos de experiência projetando e operando microsserviços event-driven em Java e Spring Boot, com forte atuação em squads de Application Security (AppSec) no setor financeiro. Praticante de AI Agentic Engineering e Spec-Driven Development (SDD). Especialista em arquitetura hexagonal, APIs RESTful, Apache Kafka, PostgreSQL, Docker, Kubernetes e GitOps com ArgoCD.`

export const HIGHLIGHTS = [
  'Redução de 50% em vulnerabilidades com Mend (SCA) e Fortify (SAST)',
  'Mais de 20 APIs RESTful em Spring Boot com arquitetura hexagonal',
  'Cobertura de testes JaCoCo ≥ 80% com JUnit 5 e Testcontainers',
  'GitOps end-to-end com ArgoCD, Gitea e k3d',
  '10 agentes customizados do GitHub Copilot aplicando SDD',
  'Microsoft Azure AI Fundamentals (AI-900)',
]

export const SKILL_GROUPS = [
  {
    title: 'Backend & Arquitetura',
    skills: [
      'Java 21',
      'Spring Boot 4.x',
      'Apache Kafka',
      'Arquitetura Hexagonal',
      'Microsserviços',
      'Node.js',
    ],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'DevSecOps & Cloud',
    skills: [
      'Docker',
      'Kubernetes',
      'ArgoCD',
      'GitHub Actions',
      'SonarQube',
      'OWASP Top 10',
      'Azure',
      'AWS',
    ],
  },
  {
    title: 'Dados & Observabilidade',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Prometheus',
      'Grafana',
      'Spring Actuator',
    ],
  },
]

export const EXPERIENCE = [
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Ago 2024 – Presente',
    client: 'Setor Financeiro (Bradesco) — Squad Application Security',
    highlights: [
      'Mend (SCA) e Fortify (SAST) em pipelines de CI de microsserviços Java e Node.js',
      'Integração de SonarQube e OWASP Dependency-Check como gates em pull requests',
      'APIs RESTful em Spring Boot com Kafka, Saga, DLQ e idempotência',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Ago 2023 – Dez 2023',
    client: 'Bradesco — Projeto Consignados',
    highlights: [
      'Interfaces responsivas com AngularJS e backend Java',
      'Testes automatizados com JUnit, Jasmine e Jest (95% de cobertura)',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Ago 2022 – Ago 2023',
    client: 'Banco do Brasil — Projeto PixPJ',
    highlights: [
      'APIs RESTful em Java/Spring Boot com PostgreSQL e MongoDB',
      'Autenticação e autorização seguras em ambiente bancário',
    ],
  },
]
