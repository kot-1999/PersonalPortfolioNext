import { projects } from '@/content/projects'
import { tech, type TechKey } from '@/content/tech'
import type { Proficiency, Tech } from '@/content/types'

export const LEVELS: Proficiency[] = ['Expert', 'Advanced', 'Basic']

export const LEVEL_META: Record<Proficiency, { bars: number, text: string, bg: string, hint: string }> = {
    Expert: { bars: 3, text: 'text-accent', bg: 'bg-accent', hint: 'Daily driver, used in production' },
    Advanced: { bars: 2, text: 'text-teal', bg: 'bg-teal', hint: 'Shipped real projects with it' },
    Basic: { bars: 1, text: 'text-coral', bg: 'bg-coral', hint: 'Learned and experimented' }
}

export type Skill = Tech & { key: TechKey, proficiency: Proficiency }

const levelRank = (p: Proficiency) => LEVELS.indexOf(p)

/** Technologies listed on the Skills page, strongest first. */
export const skills: Skill[] = (Object.entries(tech) as [TechKey, Tech][])
    .filter((entry): entry is [TechKey, Tech & { proficiency: Proficiency }] => Boolean(entry[1].proficiency))
    .map(([key, t]) => ({ ...t, key }))
    .sort((a, b) => levelRank(a.proficiency) - levelRank(b.proficiency) || a.name.localeCompare(b.name))

export type ProjectRef = { slug: string, name: string }

/** Projects that list a technology, in project order. */
export function projectsUsing(key: TechKey): ProjectRef[] {
    return projects.filter((p) => p.tech.includes(key)).map(({ slug, name }) => ({ slug, name }))
}
