import type { Metadata } from 'next'

import PageHeader from '@/components/PageHeader'
import ProjectsBrowser from '@/components/ProjectsBrowser'
import { projects } from '@/content/projects'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
    return (
        <div className='container-page'>
            <PageHeader
                eyebrow='Projects'
                title='Things I’ve built'
                description='Projects that reflect my growth as a software engineer — from production systems used by millions to experimental ideas built for learning and exploration.'
            />
            <ProjectsBrowser projects={projects} />
        </div>
    )
}
