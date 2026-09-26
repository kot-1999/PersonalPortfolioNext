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
        <header className='sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur'>
            <div className='container-page flex h-16 items-center justify-between'>
                <Link href='/' className='font-mono text-lg font-semibold tracking-tight'>
                    <span className='text-accent'>/:</span>
                    {profile.logo.replace('/:', '')}
                </Link>

                <nav aria-label='Main' className='hidden md:block'>
                    <ul className='flex items-center gap-1'>
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                                    className='rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-text aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type='button'
                    className='rounded-lg p-2 text-muted hover:text-text md:hidden'
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
                <nav id='mobile-nav' aria-label='Main' className='border-t border-border bg-bg md:hidden'>
                    <ul className='container-page flex flex-col py-2'>
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                                    onClick={() => setOpen(false)}
                                    className='block rounded-lg px-3 py-3 text-muted hover:text-text aria-[current=page]:text-accent'
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
