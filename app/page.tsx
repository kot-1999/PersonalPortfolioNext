import Link from 'next/link'

import BookCover from '@/components/BookCover'
import Terminal from '@/components/Terminal'
import ExternalIcon from '@/components/ExternalIcon'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { SkillTile } from '@/components/TechBadge'
import { books } from '@/content/books'
import { profile } from '@/content/profile'
import { getProject, projects } from '@/content/projects'
import { recommendations, recommendationsUrl } from '@/content/recommendations'
import { skills } from '@/lib/skills'

const featured = projects.filter((p) => p.featured)
const coreStack = skills.filter((s) => s.proficiency === 'Expert')

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
                        <p className='mt-6 max-w-xl text-lg text-muted sm:text-xl'>{profile.headline}</p>

                        <div className='mt-10 flex flex-wrap gap-4'>
                            <Link href='/projects/' className='btn-primary'>View projects</Link>
                            <Link href='/contact/' className='btn-ghost'>Get in touch</Link>
                        </div>
                    </div>

                    <Terminal />
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
            <section className='section'>
                <SectionHeading eyebrow='About' title='Hello and welcome' />
                <div className='grid gap-10 lg:grid-cols-5'>
                    <div className='lg:col-span-3'>
                        <div className='prose-body text-muted'>
                            {[...profile.about, ...profile.summary].map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                        </div>
                        <div className='mt-6 flex flex-wrap gap-2'>
                            {profile.domains.map((d) => <span key={d} className='chip'>{d}</span>)}
                        </div>
                    </div>
                    <div className='card self-start p-6 lg:col-span-2'>
                        <h3 className='title-card text-accent'>What I do</h3>
                        <ul className='mt-4 space-y-3'>
                            {profile.whatIDo.map((item) => (
                                <li key={item} className='flex gap-3 text-sm'>
                                    <span aria-hidden className='font-mono text-teal'>▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Featured projects */}
            <section className='section'>
                <SectionHeading
                    eyebrow='Selected work'
                    title='Featured projects'
                    description='From production systems used by millions to personal products built end-to-end.'
                    action={{ label: 'All projects', href: '/projects/' }}
                />
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
            </section>

            {/* Experience & education */}
            <section className='section'>
                <SectionHeading eyebrow='Career' title='Experience' />
                <ol>
                    {profile.experience.map((job) => (
                        <li key={`${job.company}-${job.role}`} className='group grid sm:grid-cols-[11rem_1fr]'>
                            <p className='meta hidden pr-6 pt-2 text-right sm:block'>{job.period}</p>
                            <div className='timeline-entry group-last:pb-0'>
                                <p className='meta sm:hidden'>{job.period}</p>
                                <h3 className='title-card'>{job.company}</h3>
                                <p className='mt-1 text-muted'>{job.role}</p>
                                <p className='mt-3 max-w-3xl text-sm leading-relaxed'>{job.description}</p>
                                {job.projects.length > 0 && (
                                    <div className='mt-4 flex flex-wrap gap-2'>
                                        {job.projects.map((slug) => {
                                            const p = getProject(slug)
                                            return p && <Link key={slug} href={`/projects/${slug}/`} className='chip-link'>{p.name}</Link>
                                        })}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>

                <h3 className='title-card mt-16 mb-6'>Education</h3>
                <ol className='grid gap-6 sm:grid-cols-2'>
                    {profile.education.map((e) => (
                        <li key={e.degree} className='card p-6'>
                            <p className='meta'>{e.period}</p>
                            <h4 className='mt-2 font-semibold'>{e.degree}</h4>
                            <p className='text-sm text-muted'>{e.school}</p>
                            <p className='mt-3 label text-accent'>{e.grade}</p>
                            <p className='mt-3 text-sm leading-relaxed text-muted'>{e.detail}</p>
                            {'note' in e && e.note && (
                                <a href={e.note.href} target='_blank' rel='noreferrer' className='mt-2 inline-block text-sm text-accent hover:underline'>
                                    {e.note.label} <ExternalIcon />
                                </a>
                            )}
                        </li>
                    ))}
                </ol>
            </section>

            {/* Recommendations */}
            <section className='section'>
                <SectionHeading
                    eyebrow='References'
                    title='Recommendations'
                    description='Written recommendations from people I’ve worked and studied with, on my LinkedIn profile.'
                />
                <ul className='grid gap-6 sm:grid-cols-2'>
                    {recommendations.map((r) => (
                        <li key={r.name} className='card flex flex-col p-6'>
                            {r.quote && (
                                <blockquote className='mb-5 flex-1 leading-relaxed text-text'>
                                    <span aria-hidden className='pixel mr-1 text-3xl text-accent'>“</span>
                                    {r.quote}
                                </blockquote>
                            )}
                            <p className='title-card'>{r.name}</p>
                            <p className='mt-1 text-sm text-muted'>{r.role} · {r.organisation}</p>
                            <a href={recommendationsUrl} target='_blank' rel='noreferrer' className='mt-4 inline-flex items-center gap-1 self-start text-sm text-accent hover:underline'>
                                {r.quote ? 'Read in full on LinkedIn' : `Read ${r.name.split(' ')[0]}’s recommendation on LinkedIn`} <ExternalIcon />
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Core stack */}
            <section className='section'>
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
            <section className='section'>
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
            <section className='container-page pt-12 sm:pt-16'>
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
