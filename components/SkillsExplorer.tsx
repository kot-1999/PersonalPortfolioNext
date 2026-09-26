'use client'

import { useMemo, useState } from 'react'

import FilterChips from '@/components/FilterChips'
import { TechIcon } from '@/components/TechBadge'
import { tech, techIcon, type TechKey } from '@/content/tech'
import { SKILL_CATEGORIES, type Proficiency, type SkillCategory, type Tech } from '@/content/types'

const LEVELS: Proficiency[] = ['Expert', 'Advanced', 'Basic']
const LEVEL_DOTS: Record<Proficiency, number> = { Basic: 1, Advanced: 2, Expert: 3 }

type Skill = Tech & { key: TechKey, proficiency: Proficiency }

const skills: Skill[] = (Object.entries(tech) as [TechKey, Tech][])
    .filter((entry): entry is [TechKey, Tech & { proficiency: Proficiency }] => Boolean(entry[1].proficiency))
    .map(([key, t]) => ({ ...t, key }))

export default function SkillsExplorer() {
    const [category, setCategory] = useState<'All' | SkillCategory>('All')

    const options = useMemo(
        () => ['All', ...SKILL_CATEGORIES.filter((c) => skills.some((s) => s.categories?.includes(c)))] as const,
        []
    )
    const visible = skills.filter((s) => category === 'All' || s.categories?.includes(category))

    return (
        <div>
            <FilterChips label='Filter skills by category' options={options} value={category} onChange={setCategory} />

            <div className='mt-10 space-y-12'>
                {LEVELS.map((level) => {
                    const items = visible.filter((s) => s.proficiency === level)
                    if (!items.length) return null
                    return (
                        <section key={level}>
                            <h2 className='mb-4 flex items-center gap-3 text-lg font-semibold'>
                                {level}
                                <Dots n={LEVEL_DOTS[level]} />
                                <span className='font-mono text-sm font-normal text-muted'>{items.length}</span>
                            </h2>
                            <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                                {items.map((s) => (
                                    <li key={s.key} className='card flex gap-4 p-4'>
                                        <TechIcon name={s.name} icon={techIcon(s.key)} size={40} />
                                        <div className='min-w-0'>
                                            <p className='font-medium'>{s.name}</p>
                                            <p className='mt-1 text-sm text-muted'>{s.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

function Dots({ n }: { n: number }) {
    return (
        <span className='flex gap-1' aria-hidden>
            {[1, 2, 3].map((i) => (
                <span key={i} className={`h-2 w-2 rounded-full ${i <= n ? 'bg-accent' : 'bg-border'}`} />
            ))}
        </span>
    )
}
