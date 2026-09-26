// Shared content types. Every file in /content is typed against these,
// so a missing or misspelled field fails `npm run build`.

import type { TechKey } from './tech'

export type Link = {
    label: string
    href: string
}

export type Proficiency = 'Basic' | 'Advanced' | 'Expert'

export const SKILL_CATEGORIES = [
    'Languages',
    'Backend',
    'Frontend',
    'Storage',
    'Security',
    'AWS',
    'Testing',
    'Monitoring',
    'Project Management',
    'Others'
] as const
export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

export type Tech = {
    /** Display name */
    name: string
    /**
     * Icon path inside /public. Defaults to `/icons/<key>.png`.
     * Set to `null` when there is no icon; a monogram badge is shown instead.
     */
    icon?: string | null
    /** Only technologies with a proficiency are listed on the Skills page. */
    proficiency?: Proficiency
    categories?: SkillCategory[]
    description?: string
}

export type ProjectCategory = 'Personal' | 'Commercial' | 'Open Source' | 'Hackathon'
export type ProjectStatus = 'Live' | 'Active Development' | 'Maintained' | 'Completed' | 'Prototype'

export type ProjectImage = {
    /** Path inside /public, e.g. /projects/maze/1.webp */
    src: string
    caption: string
}

export type Project = {
    /** URL segment: /projects/<slug> */
    slug: string
    name: string
    /** One sentence shown on cards */
    tagline: string
    category: ProjectCategory
    /** Company / context shown next to the category, e.g. "GoodRequest" */
    client?: string
    featured?: boolean
    role: string
    duration: string
    team: string
    status: ProjectStatus
    overview: string
    responsibilities: string[]
    impact: string[]
    tech: TechKey[]
    links: Link[]
    /** Square icon inside /public */
    icon?: string
    images?: ProjectImage[]
    /** YouTube embed URL */
    videoUrl?: string
}

export type BookCategory =
    | 'AI'
    | 'Programming Languages'
    | 'Software Development'
    | 'Web Development'
    | 'Backend & Databases'
    | 'Embedded & Operating Systems'

export type Book = {
    title: string
    author: string
    category: BookCategory
    /** Path inside /public */
    cover: string
    summary: string
    takeaways: string
}
