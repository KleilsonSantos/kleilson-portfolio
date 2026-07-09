import type {
  CourseGroup,
  EducationItem,
  ProfessionalCertification,
} from '../types'

/**
 * Credenciais e formação contínua.
 * Fontes verificáveis:
 * - CV ATS 2026 (`cv-kleilson-2026-ats.md`)
 * - Inventário local de certificados Udemy (`Documents/Certificado Udemy`)
 *
 * Política: PDFs/JPGs de certificados NÃO são versionados no repositório
 * (PII + tamanho). Cursos Udemy não são apresentados como certificação vendor.
 */

export const CERTIFICATIONS: ProfessionalCertification[] = [
  {
    id: 'ms-ai-900',
    name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    year: '2023',
    verificationUrl:
      'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/',
  },
]

export const EDUCATION: EducationItem[] = [
  {
    id: 'uniasselvi-licenciatura',
    institution: 'Centro Universitário Leonardo da Vinci',
    program: 'Licenciatura em Informática',
    status: 'Cursando (atualmente trancado)',
  },
  {
    id: 'fasete-tecnico',
    institution: 'Colégio Sete de Setembro',
    program: 'Curso Técnico de Nível Médio em Informática',
    status: 'Concluído',
  },
]

export const COURSE_GROUPS: CourseGroup[] = [
  {
    id: 'ia-automacao',
    title: 'IA generativa e automação',
    courses: [
      {
        id: 'n8n-agentes',
        title: 'Automação com n8n e Agentes de Inteligência Artificial',
        provider: 'Udemy',
      },
      {
        id: 'ia-buscas-python',
        title: 'Inteligência Artificial — Buscas em Textos com Python',
        provider: 'Udemy',
      },
      {
        id: 'engenharia-prompt',
        title:
          'Engenharia de Prompt — ChatGPT, Gemini, Meta AI, Grok e mais',
        provider: 'Udemy',
      },
      {
        id: 'github-copilot',
        title: 'Acelerando o Desenvolvimento com GitHub Copilot',
        provider: 'Udemy',
      },
    ],
  },
  {
    id: 'backend-arquitetura',
    title: 'Backend e arquitetura',
    courses: [
      {
        id: 'kafka-iniciantes',
        title: 'Apache Kafka para Iniciantes',
        provider: 'Udemy',
      },
      {
        id: 'mensageria-spring-cloud',
        title:
          'Domine Microsserviços e Mensageria com Spring Cloud e Docker',
        provider: 'Udemy',
      },
      {
        id: 'intro-microsservicos',
        title: 'Introdução a Microsserviços',
        provider: 'Udemy',
      },
      {
        id: 'microsservicos-spring',
        title: 'Microsserviços Java com Spring Boot e Spring Cloud',
        provider: 'Udemy',
      },
      {
        id: 'hexagonal-pratica',
        title: 'Arquitetura Hexagonal — Ports and Adapters na Prática',
        provider: 'Udemy',
      },
      {
        id: 'hexagonal-java',
        title: 'Arquitetura Hexagonal com Java',
        provider: 'Udemy',
      },
      {
        id: 'junit-mockito-tdd',
        title: 'Testes Unitários em Java — JUnit 4, Mockito e TDD',
        provider: 'Udemy',
      },
      {
        id: 'java-lambdas-streams',
        title: 'Java — Pacotes, Lambdas, Streams e Interfaces Gráficas',
        provider: 'Udemy',
      },
      {
        id: 'padroes-projeto-java',
        title: 'Padrões de Projeto em Java na Prática',
        provider: 'Udemy',
      },
      {
        id: 'nodejs-express',
        title: 'Introdução ao Node.js e Express',
        provider: 'Udemy',
      },
      {
        id: 'python-basico-avancado',
        title: 'Programação em Python do Básico ao Avançado',
        provider: 'Udemy',
      },
    ],
  },
  {
    id: 'frontend-typescript',
    title: 'Frontend e TypeScript',
    courses: [
      {
        id: 'angular-v17',
        title: 'Angular 2 (v17+) com TypeScript do Básico ao Avançado',
        provider: 'Udemy',
      },
      {
        id: 'angularjs-pratica',
        title: 'AngularJS na Prática',
        provider: 'Udemy',
      },
      {
        id: 'ts-react-express',
        title: 'TypeScript do Básico ao Avançado com React e Express',
        provider: 'Udemy',
      },
      {
        id: 'ts-7-dias',
        title: 'Aprenda TypeScript em 7 Dias com Projetos Reais',
        provider: 'Udemy',
      },
      {
        id: 'js-jquery-ajax',
        title: 'JavaScript, jQuery, Ajax e JSON do Zero na Prática',
        provider: 'Udemy',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud e DevOps',
    courses: [
      {
        id: 'ai900-exam-prep',
        title: 'Microsoft Azure AI-900 — Exam Prep',
        provider: 'Udemy',
      },
      {
        id: 'aws-iniciantes',
        title: 'Certificação Amazon AWS para Iniciantes',
        provider: 'Udemy',
      },
      {
        id: 'git-github',
        title: 'Git e GitHub do Básico ao Avançado',
        provider: 'Udemy',
      },
    ],
  },
]

export const COURSES_SOURCE_NOTE =
  'Lista baseada no CV ATS 2026 e nos certificados Udemy arquivados localmente. Artefatos PDF/JPG não são publicados no repositório.'
