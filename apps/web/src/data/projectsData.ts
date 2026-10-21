import type { Project, ProjectKind } from '../types'
import data from '../../content/projects.json'

/** Fonte: `apps/web/content/projects.json` (Decap CMS / Content-as-Code). */

export const PROJECTS = data.projects as Project[]

export const PROJECT_KIND_LABEL: Record<ProjectKind, string> = {
  'open-source': 'Open source',
  lab: 'Laboratório',
}
