'use client'

import { useState } from 'react'

import FilterChips from '@/components/FilterChips'
import ProjectCard from '@/components/ProjectCard'
import type { Project, ProjectCategory } from '@/content/types'

export default function ProjectsBrowser({ projects }: { projects: Project[] }) {
    const categories = ['All', ...new Set(projects.map((p) => p.category))] as ('All' | ProjectCategory)[]
    const [category, setCategory] = useState<'All' | ProjectCategory>('All')
    const visible = projects.filter((p) => category === 'All' || p.category === category)

    return (
        <>
            <FilterChips label='Filter projects by category' options={categories} value={category} onChange={setCategory} />
            <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
        </>
    )
}
