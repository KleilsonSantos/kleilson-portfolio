import { describe, expect, it } from 'vitest'
import contactJson from '../../content/contact.json'
import credentialsJson from '../../content/credentials.json'
import profileJson from '../../content/profile.json'
import projectsJson from '../../content/projects.json'
import {
  contactContentSchema,
  credentialsContentSchema,
  profileContentSchema,
  projectsContentSchema,
} from '../schemas/content'
import { CATEGORIES, CONTACT_INFO } from './contactData'
import { CERTIFICATIONS, COURSE_GROUPS } from './credentialsData'
import { PROJECTS } from './projectsData'
import { EXPERIENCE, PROFILE, SUMMARY } from './profileData'

const contentEntries = [
  ['profile.json', profileContentSchema, profileJson],
  ['projects.json', projectsContentSchema, projectsJson],
  ['credentials.json', credentialsContentSchema, credentialsJson],
  ['contact.json', contactContentSchema, contactJson],
] as const

describe('content JSON (Decap source)', () => {
  it('valida todos os JSON com Zod (erros agregados)', () => {
    const failures: string[] = []

    for (const [filename, schema, data] of contentEntries) {
      const result = schema.safeParse(data)
      if (!result.success) {
        const details = result.error.issues
          .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
          .join('\n')
        failures.push(`${filename}:\n${details}`)
      }
    }

    expect(failures, failures.join('\n\n')).toEqual([])
  })

  it('carrega profile mínimo via wrappers', () => {
    expect(PROFILE.name.length).toBeGreaterThan(3)
    expect(PROFILE.siteUrl).toMatch(/^https:\/\//)
    expect(SUMMARY.length).toBeGreaterThan(40)
    expect(EXPERIENCE.length).toBeGreaterThan(0)
  })

  it('carrega projetos com ids únicos', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(PROJECTS.some((p) => p.featured)).toBe(true)
  })

  it('não trata cursos Udemy como única certificação vendor', () => {
    expect(CERTIFICATIONS[0]?.issuer).toBe('Microsoft')
    expect(COURSE_GROUPS.length).toBeGreaterThan(0)
  })

  it('carrega contato', () => {
    expect(CATEGORIES.length).toBeGreaterThan(0)
    expect(CONTACT_INFO.some((c) => c.id === 'email')).toBe(true)
  })
})
