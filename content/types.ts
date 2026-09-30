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
    'DevOps',
    'Testing',
    'Monitoring',
    'AI',
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

export type ProjectCategory = 'Personal' | 'Commercial' | 'Volunteer' | 'Open Source' | 'Hackathon' | 'University'
export type ProjectStatus = 'Live' | 'Active Development' | 'Maintained' | 'Completed' | 'Archived' | 'Prototype'

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
    /** Short caveat shown under the links, e.g. that the public repo is only a beta */
    note?: string
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

export type Recommendation = {
    name: string
    role: string
    organisation: string
    /** Short excerpt of the LinkedIn recommendation, in the author's words */
    quote?: string
}
