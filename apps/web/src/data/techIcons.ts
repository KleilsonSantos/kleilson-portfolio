/**
 * Mapeia o texto de um chip (ex. "Spring Boot 4.x") para o slug de um ícone real
 * baixado do Simple Icons (CC0) em public/icons/tech/<slug>.svg.
 * Ordem importa: padrões mais específicos vêm antes dos mais genéricos que os contêm
 * (ex. "vitest" antes de "vite", "javascript" antes de "java").
 */
const TECH_ICON_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/javascript/i, 'javascript'],
  [/typescript/i, 'typescript'],
  [/\bjava\b/i, 'java'],
  [/spring/i, 'spring'],
  [/kafka/i, 'apachekafka'],
  [/node\.?js/i, 'nodedotjs'],
  [/docker/i, 'docker'],
  [/kubernetes/i, 'kubernetes'],
  [/argo/i, 'argo'],
  [/github actions/i, 'githubactions'],
  [/sonarqube/i, 'sonarqube'],
  [/azure/i, 'microsoftazure'],
  [/\baws\b/i, 'amazonaws'],
  [/github copilot/i, 'githubcopilot'],
  [/\bn8n\b/i, 'n8n'],
  [/react/i, 'react'],
  [/angular/i, 'angular'],
  [/html/i, 'html5'],
  [/css/i, 'css3'],
  [/postgresql/i, 'postgresql'],
  [/mongodb/i, 'mongodb'],
  [/redis/i, 'redis'],
  [/prometheus/i, 'prometheus'],
  [/grafana/i, 'grafana'],
  [/express/i, 'express'],
  [/flyway/i, 'flyway'],
  [/hashicorp|vault/i, 'hashicorp'],
  [/opentelemetry/i, 'opentelemetry'],
  [/vitest/i, 'vitest'],
  [/\bvite\b/i, 'vite'],
  [/turborepo/i, 'turborepo'],
  [/\bpnpm\b/i, 'pnpm'],
  [/owasp/i, 'owasp'],
  [/jwt/i, 'jsonwebtokens'],
  [/github/i, 'github'],
  [/linkedin/i, 'linkedin'],
  [/udemy/i, 'udemy'],
]

/** `null` quando o rótulo não corresponde a um produto com ícone real (ex. "Microsserviços", "DevSecOps"). */
export function getTechIconSlug(label: string): string | null {
  const rule = TECH_ICON_RULES.find(([pattern]) => pattern.test(label))
  return rule ? rule[1] : null
}
