import { profile } from '@/content/profile'
import { asset } from '@/lib/asset'

export default function SiteFooter() {
    return (
        <footer className='mt-24 border-t-2 border-border'>
            <div className='container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row'>
                <p className='font-mono text-xs text-muted'>
                    © {new Date().getFullYear()} {profile.name.replace(' (Alex)', '')}
                </p>
                <ul className='flex items-center gap-3'>
                    {profile.socials.map((s) => (
                        <li key={s.href}>
                            <a
                                href={s.href}
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center gap-2 rounded-md border-2 border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent'
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={asset(s.icon)} alt='' width={18} height={18} className='rounded-sm bg-plate p-px' />
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
