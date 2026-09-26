import Link from 'next/link'

import ExternalIcon from '@/components/ExternalIcon'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { TechIcon } from '@/components/TechBadge'
import { books } from '@/content/books'
import { profile } from '@/content/profile'
import { getProject, projects } from '@/content/projects'
import { tech, techIcon, type TechKey } from '@/content/tech'
import type { Tech } from '@/content/types'
import { asset } from '@/lib/asset'

const featured = projects.filter((p) => p.featured)
const coreStack = (Object.entries(tech) as [TechKey, Tech][]).filter(([, t]) => t.proficiency === 'Expert')

export default function Home() {
    return (
        <>
            {/* Hero */}
            <section className='relative overflow-hidden border-b border-border'>
                <div
                    aria-hidden
                    className='pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]'
                />
                <div className='container-page relative py-20 sm:py-28'>
                    <p className='eyebrow mb-5'>
                        {profile.role} · {profile.location}
                    </p>
                    <h1 className='max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl'>
                        {profile.name}
                    </h1>
                    <p className='mt-6 max-w-2xl text-lg text-muted sm:text-xl'>{profile.headline}</p>

                    <div className='mt-10 flex flex-wrap gap-3'>
                        <Link href='/projects/' className='btn-primary'>View projects</Link>
                        <Link href='/contact/' className='btn-ghost'>Get in touch</Link>
                    </div>

                    <dl className='mt-16 grid max-w-2xl grid-cols-3 gap-6'>
                        {profile.stats.map((s) => (
                            <div key={s.label}>
                                <dt className='sr-only'>{s.label}</dt>
                                <dd className='font-mono text-2xl font-semibold text-accent sm:text-3xl'>{s.value}</dd>
                                <dd className='mt-1 text-xs text-muted sm:text-sm'>{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* About */}
            <section className='container-page grid gap-10 py-20 lg:grid-cols-5'>
                <div className='lg:col-span-3'>
                    <p className='eyebrow mb-2'>About</p>
                    <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Hello and welcome</h2>
                    <div className='prose-body mt-5 text-muted'>
                        {[...profile.about, ...profile.summary].map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                    </div>
                    <div className='mt-6 flex flex-wrap gap-2'>
                        {profile.domains.map((d) => <span key={d} className='chip'>{d}</span>)}
                    </div>
                </div>
                <div className='card p-6 lg:col-span-2'>
                    <h3 className='font-semibold'>What I do</h3>
                    <ul className='mt-4 space-y-3'>
                        {profile.whatIDo.map((item) => (
                            <li key={item} className='flex gap-3 text-sm'>
                                <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Featured projects */}
            <section className='container-page py-12'>
                <SectionHeading
                    eyebrow='Selected work'
                    title='Featured projects'
                    description='From production systems used by millions to personal products built end-to-end.'
                    action={{ label: 'All projects', href: '/projects/' }}
                />
                <div className='grid gap-6 sm:grid-cols-2'>
                    {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
            </section>

            {/* Experience & education */}
            <section className='container-page grid gap-6 py-20 lg:grid-cols-2'>
                <div className='card p-6 sm:p-8'>
                    <p className='eyebrow mb-4'>Experience</p>
                    {profile.experience.map((job) => (
                        <div key={job.company}>
                            <h3 className='text-xl font-semibold'>{job.company}</h3>
                            <p className='text-muted'>{job.role}</p>
                            <p className='mt-3 text-sm'>{job.description}</p>
                            <div className='mt-4 flex flex-wrap gap-2'>
                                {job.projects.map((slug) => {
                                    const p = getProject(slug)
                                    return p && (
                                        <Link key={slug} href={`/projects/${slug}/`} className='chip hover:border-accent hover:text-accent'>
                                            {p.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='card p-6 sm:p-8'>
                    <p className='eyebrow mb-4'>Education</p>
                    <ol className='space-y-6'>
                        {profile.education.map((e) => (
                            <li key={e.degree}>
                                <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                                    <h3 className='font-semibold'>{e.degree}</h3>
                                    <span className='font-mono text-xs text-muted'>{e.period}</span>
                                </div>
                                <p className='text-sm text-muted'>{e.school}</p>
                                {'note' in e && e.note && (
                                    <a href={e.note.href} target='_blank' rel='noreferrer' className='mt-1 inline-block text-sm text-accent hover:underline'>
                                        {e.note.label} <ExternalIcon />
                                    </a>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Core stack */}
            <section className='container-page py-12'>
                <SectionHeading
                    eyebrow='Tech stack'
                    title='Tools I use every day'
                    action={{ label: 'All skills', href: '/skills/' }}
                />
                <ul className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
                    {coreStack.map(([key, t]) => (
                        <li key={key} className='card flex flex-col items-center gap-3 p-4 text-center'>
                            <TechIcon name={t.name} icon={techIcon(key)} size={36} />
                            <span className='text-xs'>{t.name}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Library preview */}
            <section className='container-page py-12'>
                <SectionHeading
                    eyebrow='Personal library'
                    title='Books that shaped how I build'
                    action={{ label: 'Open library', href: '/library/' }}
                />
                <ul className='-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0'>
                    {books.map((b) => (
                        <li key={b.title} className='w-28 shrink-0 snap-start sm:w-32'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={asset(b.cover)}
                                alt={`${b.title} cover`}
                                loading='lazy'
                                className='aspect-[2/3] w-full rounded-lg border border-border object-cover shadow-sm'
                            />
                            <p className='mt-2 line-clamp-2 text-xs text-muted'>{b.title}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <section className='container-page pt-12'>
                <div className='card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10'>
                    <div>
                        <h2 className='text-2xl font-semibold tracking-tight'>Let’s build something reliable.</h2>
                        <p className='mt-2 text-muted'>Have a project or a role in mind? I’d love to hear about it.</p>
                    </div>
                    <Link href='/contact/' className='btn-primary'>Contact me</Link>
                </div>
            </section>
        </>
    )
}
