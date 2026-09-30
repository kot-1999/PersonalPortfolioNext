import Link from 'next/link'

import { tech } from '@/content/tech'
import type { Project } from '@/content/types'
import { asset } from '@/lib/asset'

export default function ProjectCard({ project }: { project: Project }) {
    const cover = project.images?.[0]

    return (
        <Link
            href={`/projects/${project.slug}/`}
            className='card card-hover group flex h-full flex-col overflow-hidden'
        >
            <div className='relative aspect-[16/10] overflow-hidden border-b-2 border-border bg-surface-2'>
                {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={asset(cover.src)}
                        alt={cover.caption}
                        loading='lazy'
                        className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
                    />
                ) : project.icon ? (
                    <div className='grid h-full place-items-center'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(project.icon)} alt='' className='h-20 w-20 rounded-lg bg-plate object-contain p-1 shadow-[4px_4px_0_#000]' loading='lazy' />
                    </div>
                ) : (
                    <div className='pixel grid h-full place-items-center text-6xl text-accent'>{project.name.slice(0, 2)}</div>
                )}
            </div>

            <div className='flex flex-1 flex-col p-5'>
                <p className='mb-2 label text-teal'>
                    {project.category}
                    {project.client && ` · ${project.client}`}
                </p>
                <h3 className='title-card group-hover:text-accent'>{project.name}</h3>
                <p className='mt-2 flex-1 text-sm text-muted'>{project.tagline}</p>
                <p className='mt-4 truncate border-t border-dashed border-border pt-3 font-mono text-xs text-muted'>
                    {project.tech.slice(0, 3).map((t) => tech[t].name).join(' · ')}
                    {project.tech.length > 3 && ` +${project.tech.length - 3}`}
                </p>
            </div>
        </Link>
    )
}
