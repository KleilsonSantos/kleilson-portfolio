import { PROFILE } from './profileData'

export const COMPANY = {
  name: PROFILE.shortName,
  legalName: PROFILE.name,
  siteUrl: PROFILE.siteUrl,
}

export const MESSAGE_MAX_LENGTH = 2000

export const CATEGORIES = [
  { value: 'oportunidade', label: 'Oportunidade profissional' },
  { value: 'projeto', label: 'Projeto / Consultoria' },
  { value: 'colaboracao', label: 'Colaboração open source' },
  { value: 'outro', label: 'Outro assunto' },
]

export const CONTACT_INFO = [
  {
    id: 'email',
    label: 'E-mail',
    value: PROFILE.email,
    detail: 'Resposta em até 48 horas úteis',
    href: `mailto:${PROFILE.email}`,
    icon: 'mail',
  },
  {
    id: 'phone',
    label: 'Telefone',
    value: PROFILE.phone,
    detail: 'Disponível para contato profissional',
    href: `tel:${PROFILE.phone.replace(/\s/g, '')}`,
    icon: 'phone',
  },
  {
    id: 'location',
    label: 'Localização',
    value: PROFILE.location,
    detail: PROFILE.remote,
    href: null,
    icon: 'location',
  },
]

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: PROFILE.github,
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: PROFILE.linkedin,
    icon: 'linkedin',
  },
]
