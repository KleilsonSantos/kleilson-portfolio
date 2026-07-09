export interface Profile {
  name: string
  shortName: string
  title: string
  headline: string
  location: string
  remote: string
  email: string
  phone: string
  linkedin: string
  github: string
  siteUrl: string
  yearsOfExperience: string
  currentCompany: string
  certification: string
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  client: string
  highlights: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  url: string
  featured: boolean
}

export interface ContactInfo {
  id: string
  label: string
  value: string
  detail: string
  href: string | null
  icon: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
}

export interface ContactCategory {
  value: string
  label: string
}

export interface ContactForm {
  name: string
  email: string
  category: string
  message: string
}

export type ContactFormField = keyof ContactForm

export type FormErrors = Partial<Record<ContactFormField, string>>

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface DocumentMetaOptions {
  title: string
  description: string
  canonical: string
  ogImage?: string
  jsonLd?: Record<string, unknown>
}

export interface ContactApiResponse {
  success: boolean
  id: string
}

export interface ContactApiError {
  message?: string
}
