import { z } from 'zod'

const nonEmpty = z.string().trim().min(1)

export const profileSchema = z.object({
  name: nonEmpty,
  shortName: nonEmpty,
  title: nonEmpty,
  headline: nonEmpty,
  location: nonEmpty,
  remote: nonEmpty,
  email: z.string().email(),
  phone: nonEmpty,
  linkedin: z.string().url(),
  github: z.string().url(),
  siteUrl: z.string().url(),
  yearsOfExperience: nonEmpty,
  currentCompany: nonEmpty,
  certification: nonEmpty,
  photo: nonEmpty,
  photoFallback: nonEmpty,
})

export const skillGroupSchema = z.object({
  title: nonEmpty,
  skills: z.array(nonEmpty).min(1),
})

export const experienceSchema = z.object({
  company: nonEmpty,
  role: nonEmpty,
  period: nonEmpty,
  client: nonEmpty,
  highlights: z.array(nonEmpty).min(1),
})

export const profileContentSchema = z.object({
  profile: profileSchema,
  summary: z.string().min(40),
  highlights: z.array(nonEmpty).min(1),
  softSkills: z.array(nonEmpty).min(1),
  skillGroups: z.array(skillGroupSchema).min(1),
  experience: z.array(experienceSchema).min(1),
})

export const projectSchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  tagline: nonEmpty,
  description: nonEmpty,
  impact: nonEmpty,
  stack: z.array(nonEmpty).min(1),
  url: z.string().url(),
  featured: z.boolean(),
})

export const projectsContentSchema = z
  .object({
    projects: z.array(projectSchema).min(1),
  })
  .superRefine((data, ctx) => {
    const ids = data.projects.map((p) => p.id)
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'projects: ids duplicados',
        path: ['projects'],
      })
    }
    if (!data.projects.some((p) => p.featured)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'projects: ao menos um featured: true',
        path: ['projects'],
      })
    }
  })

export const certificationSchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  issuer: nonEmpty,
  year: nonEmpty,
  credentialId: z.string().optional(),
  verificationUrl: z.string().url().optional(),
})

export const educationSchema = z.object({
  id: nonEmpty,
  institution: nonEmpty,
  program: nonEmpty,
  status: nonEmpty,
})

export const courseItemSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  provider: z.literal('Udemy'),
})

export const courseGroupSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  courses: z.array(courseItemSchema).min(1),
})

export const credentialsContentSchema = z
  .object({
    certifications: z.array(certificationSchema).min(1),
    education: z.array(educationSchema).min(1),
    courseGroups: z.array(courseGroupSchema).min(1),
    sourceNote: nonEmpty,
  })
  .superRefine((data, ctx) => {
    if (data.certifications[0]?.issuer !== 'Microsoft') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'certifications[0].issuer deve ser Microsoft (certificação vendor)',
        path: ['certifications', 0, 'issuer'],
      })
    }
  })

export const contactCategorySchema = z.object({
  value: nonEmpty,
  label: nonEmpty,
})

export const contactChannelSchema = z.object({
  id: nonEmpty,
  label: nonEmpty,
  value: nonEmpty,
  detail: nonEmpty,
  href: z.string().nullable(),
  icon: nonEmpty,
})

export const socialLinkSchema = z.object({
  id: nonEmpty,
  label: nonEmpty,
  href: z.string().url(),
  icon: nonEmpty,
})

export const contactContentSchema = z.object({
  messageMaxLength: z.number().int().positive(),
  categories: z.array(contactCategorySchema).min(1),
  channels: z.array(contactChannelSchema).min(1),
  social: z.array(socialLinkSchema).min(1),
})

export const contentFiles = {
  'profile.json': profileContentSchema,
  'projects.json': projectsContentSchema,
  'credentials.json': credentialsContentSchema,
  'contact.json': contactContentSchema,
} as const
