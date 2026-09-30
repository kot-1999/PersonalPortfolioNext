import type { Metadata } from 'next'

import ContactForm from '@/components/ContactForm'
import PageHeader from '@/components/PageHeader'
import { profile } from '@/content/profile'
import { asset } from '@/lib/asset'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
    return (
        <div className='container-page'>
            <PageHeader
                eyebrow='Contact'
                title='Get in touch'
                description='Questions, opportunities, or just want to say hi — send me a message and I’ll reply by email.'
            />
            <div className='grid gap-10 lg:grid-cols-3'>
                <div className='lg:col-span-2'>
                    <ContactForm action={profile.formspreeAction} />
                </div>
                <aside className='space-y-6'>
                    <div>
                        <h2 className='label text-muted'>Email</h2>
                        <a href={`mailto:${profile.email}`} className='mt-1 block break-all text-accent hover:underline'>
                            {profile.email}
                        </a>
                    </div>
                    <div>
                        <h2 className='label text-muted'>Location</h2>
                        <p className='mt-1'>{profile.location}</p>
                    </div>
                    <div>
                        <h2 className='label text-muted'>Right to work</h2>
                        <p className='mt-1'>{profile.workRights}</p>
                    </div>
                    <div>
                        <h2 className='label text-muted'>Elsewhere</h2>
                        <ul className='mt-2 space-y-2'>
                            {profile.socials.map((s) => (
                                <li key={s.href}>
                                    <a href={s.href} target='_blank' rel='noreferrer' className='flex items-center gap-3 hover:text-accent'>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={asset(s.icon)} alt='' width={20} height={20} />
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}
