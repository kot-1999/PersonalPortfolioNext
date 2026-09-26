import Link from 'next/link'

import BookCover from '@/components/BookCover'
import ExternalIcon from '@/components/ExternalIcon'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { SkillTile } from '@/components/TechBadge'
import { books } from '@/content/books'
import { profile } from '@/content/profile'
import { getProject, projects } from '@/content/projects'
import { tech } from '@/content/tech'
import { skills } from '@/lib/skills'

const featured = projects.filter((p) => p.featured)
const coreStack = skills.filter((s) => s.proficiency === 'Expert')

const terminal: [string, string][] = [
    ['whoami', `${profile.shortName} — ${profile.role.toLowerCase()}`],
    ['cat stack.txt', (['NodeJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'EC2'] as const).map((k) => tech[k].name).join(' · ')],
    ['uptime', `${profile.stats[0].value} ${profile.stats[0].label}`],
    ['ls ./domains', profile.domains.join('  ')]
]

export default function Home() {
    return (
        <>
            {/* Hero */}
            <section className='border-b-2 border-border'>
                <div className='container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]'>
                    <div>
                        <p className='eyebrow mb-5'>
                            {profile.role} · {profile.location}
                        </p>
                        <h1 className='pixel text-6xl leading-[0.9] text-text sm:text-8xl'>
                            {profile.name.replace(' (Alex)', '')}
                        </h1>
                        <p className='cursor mt-6 max-w-xl text-lg text-muted sm:text-xl'>{profile.headline}</p>

                        <div className='mt-10 flex flex-wrap gap-4'>
                            <Link href='/projects/' className='btn-primary'>View projects</Link>
                            <Link href='/contact/' className='btn-ghost'>Get in touch</Link>
                        </div>
                    </div>

                    <div className='card overflow-hidden' aria-label='About me, terminal style'>
                        <div className='flex items-center gap-2 border-b-2 border-border bg-surface-2 px-4 py-2'>
                            <span className='h-3 w-3 rounded-sm bg-coral' />
                            <span className='h-3 w-3 rounded-sm bg-accent' />
                            <span className='h-3 w-3 rounded-sm bg-teal' />
                            <span className='ml-2 font-mono text-xs text-muted'>~/alex — zsh</span>
                        </div>
                        <dl className='space-y-3 p-5 font-mono text-sm'>
                            {terminal.map(([cmd, out]) => (
                                <div key={cmd}>
                                    <dt><span className='text-teal'>$</span> {cmd}</dt>
                                    <dd className='mt-1 text-accent'>{out}</dd>
                                </div>
                            ))}
                            <div><span className='text-teal'>$</span> <span className='cursor' /></div>
                        </dl>
                    </div>
                </div>

                <dl className='container-page grid grid-cols-3 gap-4 pb-14'>
                    {profile.stats.map((s) => (
                        <div key={s.label} className='border-l-4 border-accent pl-4'>
                            <dt className='sr-only'>{s.label}</dt>
                            <dd className='pixel text-4xl text-accent sm:text-6xl'>{s.value}</dd>
                            <dd className='mt-1 text-xs text-muted sm:text-sm'>{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* About */}
            <section className='container-page grid gap-10 py-20 lg:grid-cols-5'>
                <div className='lg:col-span-3'>
                    <p className='eyebrow mb-2'>About</p>
                    <h2 className='pixel text-4xl sm:text-5xl'>Hello and welcome</h2>
                    <div className='prose-body mt-5 text-muted'>
                        {[...profile.about, ...profile.summary].map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                    </div>
                    <div className='mt-6 flex flex-wrap gap-2'>
                        {profile.domains.map((d) => <span key={d} className='chip'>{d}</span>)}
                    </div>
                </div>
                <div className='card self-start p-6 lg:col-span-2'>
                    <h3 className='pixel text-3xl text-accent'>What I do</h3>
                    <ul className='mt-4 space-y-3'>
                        {profile.whatIDo.map((item) => (
                            <li key={item} className='flex gap-3 text-sm'>
                                <span aria-hidden className='font-mono text-teal'>▸</span>
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
                            <h3 className='pixel text-4xl'>{job.company}</h3>
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
                                    <span className='font-mono text-xs text-teal'>{e.period}</span>
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
                    description='Click any tile to see what I use it for and where.'
                    action={{ label: 'All skills', href: '/skills/' }}
                />
                <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
                    {coreStack.map((s) => (
                        <li key={s.key}>
                            <SkillTile id={s.key} />
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
                <ul className='-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-6 pt-3 sm:mx-0 sm:px-0'>
                    {books.map((b) => (
                        <li key={b.title} className='w-28 shrink-0 snap-start sm:w-32'>
                            <BookCover book={b} />
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <section className='container-page pt-12'>
                <div className='card flex flex-col items-start gap-6 border-accent p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10'>
                    <div>
                        <h2 className='pixel text-4xl'>Let’s build something reliable.</h2>
                        <p className='mt-2 text-muted'>Have a project or a role in mind? I’d love to hear about it.</p>
                    </div>
                    <Link href='/contact/' className='btn-primary'>Contact me</Link>
                </div>
            </section>
        </>
    )
}
