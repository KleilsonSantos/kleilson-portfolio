import type { ContactCategory, ContactInfo, SocialLink } from '../types'
import { PROFILE } from './profileData'
import data from '../../content/contact.json'

/** Fonte: `apps/web/content/contact.json` (+ campos derivados do profile). */

export const COMPANY = {
  name: PROFILE.shortName,
  legalName: PROFILE.name,
  siteUrl: PROFILE.siteUrl,
}

export const MESSAGE_MAX_LENGTH: number = data.messageMaxLength
export const CATEGORIES: ContactCategory[] = data.categories
export const CONTACT_INFO: ContactInfo[] = data.channels
export const SOCIAL_LINKS: SocialLink[] = data.social
