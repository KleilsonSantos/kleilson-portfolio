import { describe, expect, it } from 'vitest'
import { PROFILE, SUMMARY, EXPERIENCE } from '../data/profileData'
import { PROJECTS } from '../data/projectsData'
import { CERTIFICATIONS, COURSE_GROUPS } from '../data/credentialsData'
import { CATEGORIES, CONTACT_INFO } from '../data/contactData'

describe('content JSON (Decap source)', () => {
  it('carrega profile mínimo', () => {
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
