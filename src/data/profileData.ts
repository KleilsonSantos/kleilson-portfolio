import type { Experience, Profile, SkillGroup } from '../types'

/** Fonte: Kleilson_Santos_CV_2026.docx (e CV ATS equivalente). */

export const PROFILE: Profile = {
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
  photo: '/images/profile/kleilson-avatar-320.webp?v=14',
  photoFallback: '/images/profile/kleilson-avatar.jpg?v=14',
}

export const SUMMARY = `Desenvolvedor Full Stack com mais de 9 anos de experiência projetando e operando microsserviços event-driven em Java e Spring Boot, com forte atuação em squads de Application Security (AppSec) no setor financeiro (financial services e banking industry). Praticante de AI Agentic Engineering e Spec-Driven Development (SDD): autor de agentes customizados do GitHub Copilot, prompts reutilizáveis e arquivos de instruções (applyTo). Especialista em arquitetura hexagonal, APIs RESTful, Apache Kafka, PostgreSQL, Docker, Kubernetes e GitOps com ArgoCD. Experiência consolidada em frontend com Angular (v2 a v17+), AngularJS, React e TypeScript. Práticas DevSecOps com Mend (SCA), Fortify (SAST), SonarQube e OWASP Dependency-Check.`

export const HIGHLIGHTS: string[] = [
  'Redução de 50% em vulnerabilidades com Mend (SCA) e Fortify (SAST)',
  'Mais de 20 APIs RESTful em Spring Boot com arquitetura hexagonal',
  'Cobertura de testes JaCoCo ≥ 80% com JUnit 5 e Testcontainers',
  'GitOps end-to-end com ArgoCD, Gitea e k3d',
  '10 agentes Copilot, 7 prompts e 6 applyTo aplicando SDD',
  'Migração Spring Boot 2→3→4 sem downtime (APIs depreciadas eliminadas)',
  'Mais de 330 contribuições no GitHub no último ano',
  'Microsoft Azure AI Fundamentals (AI-900)',
]

/** Soft skills — portadas do portfólio anterior (backend-homepage), revisadas. */
export const SOFT_SKILLS: string[] = [
  'Comunicação eficaz',
  'Colaboração em equipe',
  'Proatividade na tomada de decisões',
  'Resolução eficiente de problemas',
  'Gestão e priorização de tempo',
  'Adaptabilidade a mudanças',
  'Pensamento analítico e crítico',
  'Foco em detalhes e precisão',
  'Empatia em relacionamentos profissionais',
]

export const SKILL_GROUPS: SkillGroup[] = [
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
    title: 'AI Engineering',
    skills: [
      'GitHub Copilot',
      'Spec-Driven Development',
      'Agentes customizados',
      'Prompt engineering',
      'n8n',
      'Azure AI-900',
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

export const EXPERIENCE: Experience[] = [
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Jan 2026 – Mai 2026',
    client: 'Projeto interno Capgemini — eDOX (migração e classificação documental)',
    highlights: [
      'Cadeia Angular → backend Java → ingestão → análise (fullstack com prioridade backend)',
      'Bibliotecas Java de OCR, extração de conteúdo e conversão PDF no pipeline documental',
      'Integração do motor de regras GraalVM e fluxos de CRUD/operacionais no frontend',
      'Atuação alinhada a go-live previsto para out/2026 (repos Azure DevOps: edox-services, edox-frontend, eDOX — branch feature/V1)',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: '2025',
    client: 'Setor Financeiro (Bradesco) — Projeto Renegociação Mobile',
    highlights: [
      'Desenvolvimento full stack em solução mobile de renegociação no setor bancário',
      'Integração de APIs e fluxos de negócio com foco em experiência do cliente',
      'Colaboração em squad com práticas de qualidade, code review e entrega contínua',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: '2024',
    client: 'Setor Financeiro (Bradesco) — Projeto Abertura de Contas PF',
    highlights: [
      'Desenvolvimento full stack no fluxo de abertura de contas pessoa física',
      'APIs e interfaces alinhadas a requisitos de compliance e jornada digital bancária',
      'Atuação em squad com integração a sistemas do ecossistema Bradesco',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Ago 2024 – Presente',
    client: 'Setor Financeiro (Bradesco) — Squad Application Security e Backend Java',
    highlights: [
      'Mend (SCA) e Fortify (SAST) em pipelines de CI de microsserviços Java e Node.js',
      'Integração de SonarQube e OWASP Dependency-Check como gates em pull requests',
      'APIs RESTful em Spring Boot com Kafka, Saga, DLQ e idempotência',
      'Guias e checklists AppSec em Confluence adotados por múltiplos squads',
    ],
  },
  {
    company: 'Capgemini Brasil',
    role: 'Desenvolvedor Full Stack',
    period: 'Ago 2023 – Dez 2023',
    client: 'Bradesco — Projeto Consignados',
    highlights: [
      'Interfaces responsivas com AngularJS e backend Java',
      'Integração com Apache Kafka para autenticação e autorização',
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
      'Interfaces AngularJS, HTML5, CSS3 e JavaScript',
      'Autenticação e autorização seguras em ambiente bancário',
    ],
  },
  {
    company: 'Autônomo',
    role: 'Desenvolvedor Full Stack',
    period: 'Fev 2017 – Ago 2022',
    client: 'Projetos para clientes diversos',
    highlights: [
      'Aplicações web com MVC, TDD e metodologias ágeis',
      'Backend Java/Spring Boot e frontend Angular/Node.js/Express',
      'APIs RESTful consumidas por aplicações web e mobile',
    ],
  },
  {
    company: 'Faculdade Sete de Setembro (FASETE)',
    role: 'Desenvolvedor de Sistemas',
    period: '2011 – 2016',
    client: 'Paulo Afonso, BA',
    highlights: [
      'Desenvolvimento e implantação de sistemas acadêmicos',
      'Administração de ambientes e suporte técnico',
      'Documentação técnica e coordenação de pequenos projetos de TI',
    ],
  },
]
