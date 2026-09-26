import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ExternalIcon from '@/components/ExternalIcon'
import Gallery from '@/components/Gallery'
import TechBadge from '@/components/TechBadge'
import { getProject, projects } from '@/content/projects'
import { asset } from '@/lib/asset'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject((await params).slug)
    return project ? { title: project.name, description: project.tagline } : {}
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params
    const project = getProject(slug)
    if (!project) notFound()

    const index = projects.indexOf(project)
    const next = projects[(index + 1) % projects.length]

    const facts = [
        ['Role', project.role],
        ['Duration', project.duration],
        ['Team', project.team],
        ['Status', project.status]
    ]

    return (
        <article className='container-page'>
            <Link href='/projects/' className='mt-8 inline-block text-sm text-muted hover:text-accent'>
                ← All projects
            </Link>

            <header className='flex flex-col gap-6 pb-10 pt-6 sm:flex-row sm:items-start sm:justify-between'>
                <div className='max-w-3xl'>
                    <p className='eyebrow mb-3'>
                        {project.category}
                        {project.client && ` · ${project.client}`}
                    </p>
                    <h1 className='text-3xl font-semibold tracking-tight sm:text-5xl'>{project.name}</h1>
                    <p className='mt-4 text-lg text-muted'>{project.tagline}</p>
                    <div className='mt-6 flex flex-wrap gap-3'>
                        {project.links.map((l, i) => (
                            <a
                                key={l.href}
                                href={l.href}
                                target='_blank'
                                rel='noreferrer'
                                className={i === 0 ? 'btn-primary' : 'btn-ghost'}
                            >
                                {l.label} <ExternalIcon />
                            </a>
                        ))}
                    </div>
                </div>
                {project.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(project.icon)} alt={`${project.name} logo`} className='hidden h-20 w-20 rounded-2xl border border-border object-contain sm:block' />
                )}
            </header>

            <dl className='card grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4'>
                {facts.map(([label, value]) => (
                    <div key={label} className='p-5 sm:border-border lg:[&:not(:first-child)]:border-l'>
                        <dt className='font-mono text-xs uppercase tracking-wider text-muted'>{label}</dt>
                        <dd className='mt-1 text-sm'>{value}</dd>
                    </div>
                ))}
            </dl>

            <div className='mt-12 grid gap-12 lg:grid-cols-3'>
                <div className='min-w-0 space-y-12 lg:col-span-2'>
                    {project.images?.length ? <Gallery images={project.images} /> : null}

                    <section>
                        <h2 className='text-xl font-semibold'>Overview</h2>
                        <p className='mt-3 leading-relaxed text-muted'>{project.overview}</p>
                    </section>

                    {project.videoUrl && (
                        <section>
                            <h2 className='text-xl font-semibold'>Video</h2>
                            <div className='card mt-4 aspect-video overflow-hidden'>
                                <iframe
                                    src={project.videoUrl}
                                    title={`${project.name} video`}
                                    className='h-full w-full'
                                    loading='lazy'
                                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                />
                            </div>
                        </section>
                    )}

                    <ListSection title='Responsibilities' items={project.responsibilities} />
                    <ListSection title='Impact' items={project.impact} />
                </div>

                <aside className='min-w-0 lg:sticky lg:top-24 lg:self-start'>
                    <h2 className='text-xl font-semibold'>Tech stack</h2>
                    <ul className='mt-4 flex flex-wrap gap-2'>
                        {project.tech.map((t) => (
                            <li key={t}>
                                <TechBadge id={t} />
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <nav className='mt-20 border-t border-border pt-8'>
                <Link href={`/projects/${next.slug}/`} className='group block text-right'>
                    <span className='text-sm text-muted'>Next project</span>
                    <span className='block text-xl font-semibold group-hover:text-accent'>{next.name} →</span>
                </Link>
            </nav>
        </article>
    )
}

function ListSection({ title, items }: { title: string, items: string[] }) {
    return (
        <section>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <ul className='mt-4 space-y-3'>
                {items.map((item) => (
                    <li key={item} className='flex gap-3 text-muted'>
                        <span className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
