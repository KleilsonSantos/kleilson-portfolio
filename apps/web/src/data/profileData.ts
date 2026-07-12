import type { Experience, Profile, SkillGroup } from '../types'
import data from '../../content/profile.json'

/** Fonte: `apps/web/content/profile.json` (Decap CMS / Content-as-Code). */

export const PROFILE: Profile = data.profile
export const SUMMARY: string = data.summary
export const HIGHLIGHTS: string[] = data.highlights
export const SOFT_SKILLS: string[] = data.softSkills
export const SKILL_GROUPS: SkillGroup[] = data.skillGroups
export const EXPERIENCE: Experience[] = data.experience
