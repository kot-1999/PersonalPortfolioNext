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
            <Link href='/projects/' className='mt-8 inline-block font-mono text-xs uppercase tracking-wider text-muted hover:text-accent'>
                ← All projects
            </Link>

            <header className='flex flex-col gap-6 pb-10 pt-6 sm:flex-row sm:items-start sm:justify-between'>
                <div className='max-w-3xl'>
                    <p className='eyebrow mb-3'>
                        {project.category}
                        {project.client && ` · ${project.client}`}
                    </p>
                    <h1 className='title-page break-words'>{project.name}</h1>
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
                    {project.note && <p className='mt-3 font-mono text-xs text-muted'>* {project.note}</p>}
                </div>
                {project.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(project.icon)} alt={`${project.name} logo`} className='hidden h-24 w-24 rounded-lg border-2 border-black/60 bg-plate object-contain p-1.5 shadow-[4px_4px_0_#000] sm:block' />
                )}
            </header>

            <dl className='card grid grid-cols-1 divide-y-2 divide-dashed divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4'>
                {facts.map(([label, value]) => (
                    <div key={label} className='p-5 sm:border-dashed sm:border-border lg:[&:not(:first-child)]:border-l-2'>
                        <dt className='label text-teal'>{label}</dt>
                        <dd className='mt-1 text-sm'>{value}</dd>
                    </div>
                ))}
            </dl>

            <div className='mt-12 grid gap-12 lg:grid-cols-3'>
                <div className='min-w-0 space-y-12 lg:col-span-2'>
                    {project.images?.length ? <Gallery images={project.images} /> : null}

                    <section>
                        <h2 className='title-card'>Overview</h2>
                        <p className='mt-3 leading-relaxed text-muted'>{project.overview}</p>
                    </section>

                    {project.videoUrl && (
                        <section>
                            <h2 className='title-card'>Video</h2>
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
                    <h2 className='title-card'>Tech stack</h2>
                    <p className='mt-1 font-mono text-[11px] text-muted'>Click a badge for details</p>
                    <ul className='mt-4 flex flex-wrap gap-2'>
                        {project.tech.map((t) => (
                            <li key={t}>
                                <TechBadge id={t} exclude={project.slug} />
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <nav className='mt-20 border-t-2 border-dashed border-border pt-8'>
                <Link href={`/projects/${next.slug}/`} className='group block text-right'>
                    <span className='font-mono text-xs uppercase tracking-wider text-muted'>Next project</span>
                    <span className='pixel block text-4xl group-hover:text-accent'>{next.name} →</span>
                </Link>
            </nav>
        </article>
    )
}

function ListSection({ title, items }: { title: string, items: string[] }) {
    return (
        <section>
            <h2 className='title-card'>{title}</h2>
            <ul className='mt-4 space-y-3'>
                {items.map((item) => (
                    <li key={item} className='flex gap-3 text-muted'>
                        <span aria-hidden className='font-mono text-accent'>▸</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
