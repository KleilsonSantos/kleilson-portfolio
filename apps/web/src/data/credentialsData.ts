import type {
  CourseGroup,
  EducationItem,
  ProfessionalCertification,
} from '../types'
import data from '../../content/credentials.json'

/** Fonte: `apps/web/content/credentials.json` (Decap CMS / Content-as-Code). */

export const CERTIFICATIONS: ProfessionalCertification[] = data.certifications
export const EDUCATION: EducationItem[] = data.education
export const COURSE_GROUPS: CourseGroup[] = data.courseGroups as CourseGroup[]
export const COURSES_SOURCE_NOTE: string = data.sourceNote
