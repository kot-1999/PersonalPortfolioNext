'use client'

import { useState } from 'react'

import FilterChips from '@/components/FilterChips'
import { LevelBars, SkillTile } from '@/components/TechBadge'
import { SKILL_CATEGORIES, type Proficiency, type SkillCategory } from '@/content/types'
import { LEVEL_META, LEVELS, skills, type Skill } from '@/lib/skills'

type LevelFilter = 'All' | Proficiency
type CategoryFilter = 'All' | SkillCategory

const LEVEL_OPTIONS: LevelFilter[] = ['All', ...LEVELS]
const CATEGORY_OPTIONS: CategoryFilter[] = ['All', ...SKILL_CATEGORIES.filter((c) => skills.some((s) => s.categories?.includes(c)))]

const inCategory = (s: Skill, c: CategoryFilter) => c === 'All' || Boolean(s.categories?.includes(c))
const atLevel = (s: Skill, l: LevelFilter) => l === 'All' || s.proficiency === l
const primaryCategory = (s: Skill): SkillCategory => s.categories?.[0] ?? 'Others'

export default function SkillsExplorer() {
    const [level, setLevel] = useState<LevelFilter>('All')
    const [category, setCategory] = useState<CategoryFilter>('All')
    const [query, setQuery] = useState('')

    const q = query.trim().toLowerCase()
    const matchesQuery = (s: Skill) => !q || s.name.toLowerCase().includes(q)
    const visible = skills.filter((s) => atLevel(s, level) && inCategory(s, category) && matchesQuery(s))

    // Counts reflect the other active filters, so each chip shows what you'd get by clicking it
    const levelCounts = Object.fromEntries(
        LEVEL_OPTIONS.map((l) => [l, skills.filter((s) => atLevel(s, l) && inCategory(s, category) && matchesQuery(s)).length])
    )
    const categoryCounts = Object.fromEntries(
        CATEGORY_OPTIONS.map((c) => [c, skills.filter((s) => inCategory(s, c) && atLevel(s, level) && matchesQuery(s)).length])
    )

    // With "All" each skill appears once, under its primary category; otherwise one section for the chosen category
    const sections = (category === 'All' ? CATEGORY_OPTIONS.slice(1) : [category])
        .map((c) => ({
            title: c,
            items: visible.filter((s) => (category === 'All' ? primaryCategory(s) === c : true))
        }))
        .filter((s) => s.items.length)

    const reset = () => {
        setLevel('All')
        setCategory('All')
        setQuery('')
    }

    return (
        <div>
            <div className='card space-y-5 p-4 sm:p-5'>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                    <div>
                        <p className='mb-2 label text-muted'>Level</p>
                        <FilterChips label='Filter skills by level' options={LEVEL_OPTIONS} value={level} onChange={setLevel} counts={levelCounts} />
                    </div>
                    <label className='block lg:w-64'>
                        <span className='mb-2 block label text-muted'>Search</span>
                        <input
                            type='search'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='e.g. Redis'
                            className='w-full rounded-md border-2 border-border bg-bg px-3 py-1.5 font-mono text-sm text-text outline-none placeholder:text-muted/60 focus:border-accent'
                        />
                    </label>
                </div>
                <div>
                    <p className='mb-2 label text-muted'>Category</p>
                    <FilterChips label='Filter skills by category' options={CATEGORY_OPTIONS} value={category} onChange={setCategory} counts={categoryCounts} />
                </div>
                <ul className='flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-border pt-4 text-xs text-muted'>
                    {LEVELS.map((l) => (
                        <li key={l} className='flex items-center gap-2'>
                            <LevelBars level={l} withLabel />
                            <span className='mt-1'>{LEVEL_META[l].hint}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <p className='mt-6 font-mono text-xs text-muted' aria-live='polite'>
                {visible.length} of {skills.length} technologies · click a tile for details
            </p>

            {sections.length ? (
                <div className='mt-6 space-y-10'>
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className='mb-4 flex items-baseline gap-3 border-b-2 border-dashed border-border pb-2'>
                                <span className='title-card text-text'>{section.title}</span>
                            </h2>
                            <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                {section.items.map((s) => (
                                    <li key={s.key}>
                                        <SkillTile id={s.key} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <div className='card mt-6 p-8 text-center'>
                    <p className='title-sm'>No matches</p>
                    <button type='button' onClick={reset} className='btn-ghost mt-4'>Reset filters</button>
                </div>
            )}
        </div>
    )
}
