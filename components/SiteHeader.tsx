'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { navigation, profile } from '@/content/profile'

function isActive(pathname: string, href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href.replace(/\/$/, ''))
}

export default function SiteHeader() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className='sticky top-0 z-40 border-b-2 border-border bg-bg/85 backdrop-blur'>
            <div className='container-page flex h-16 items-center justify-between'>
                <Link href='/' className='pixel text-3xl'>
                    <span className='text-accent'>{profile.logo.slice(0, 2)}</span>
                    {profile.logo.slice(2)}
                </Link>

                <nav aria-label='Main' className='hidden md:block'>
                    <ul className='flex items-center gap-1'>
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                                    className='rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent aria-[current=page]:bg-accent aria-[current=page]:text-accent-contrast'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type='button'
                    className='rounded-md p-2 text-muted hover:text-accent md:hidden'
                    aria-expanded={open}
                    aria-controls='mobile-nav'
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                        {open ? <path d='M6 6l12 12M18 6L6 18' /> : <path d='M4 7h16M4 12h16M4 17h16' />}
                    </svg>
                </button>
            </div>

            {open && (
                <nav id='mobile-nav' aria-label='Main' className='border-t-2 border-border bg-bg md:hidden'>
                    <ul className='container-page flex flex-col py-2'>
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                                    onClick={() => setOpen(false)}
                                    className='block rounded-md px-3 py-3 font-mono text-sm uppercase tracking-wider text-muted hover:text-text aria-[current=page]:text-accent'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}
