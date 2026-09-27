import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Slimes from '@/components/Slimes'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { profile } from '@/content/profile'
import { validateContent } from '@/lib/validate-content'

import './globals.css'

validateContent()

// Fonts are bundled locally so the build doesn't need network access to Google Fonts.
// Each subset is its own font; globals.css chains them so latin-ext fills in missing glyphs (e.g. "š").
const geistSans = localFont({ src: './fonts/geist-latin.woff2', weight: '100 900', adjustFontFallback: false, variable: '--font-geist-sans' })
const geistSansExt = localFont({ src: './fonts/geist-latin-ext.woff2', weight: '100 900', variable: '--font-geist-sans-ext' })
const geistMono = localFont({ src: './fonts/geist-mono-latin.woff2', weight: '100 900', adjustFontFallback: false, variable: '--font-geist-mono' })
const geistMonoExt = localFont({ src: './fonts/geist-mono-latin-ext.woff2', weight: '100 900', variable: '--font-geist-mono-ext' })
const vt323 = localFont({ src: './fonts/vt323-latin-400-normal.woff2', weight: '400', adjustFontFallback: false, variable: '--font-vt323' })
const vt323Ext = localFont({ src: './fonts/vt323-latin-ext-400-normal.woff2', weight: '400', variable: '--font-vt323-ext' })
const fontVariables = [geistSans, geistSansExt, geistMono, geistMonoExt, vt323, vt323Ext].map((f) => f.variable).join(' ')

export const metadata: Metadata = {
    title: {
        default: `${profile.shortName} — ${profile.role}`,
        template: `%s · ${profile.shortName}`
    },
    description: profile.about[0].replace(/\s+/g, ' ').trim()
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={`${fontVariables} flex min-h-dvh flex-col font-sans antialiased`}>
                <a href='#main' className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast'>
                    Skip to content
                </a>
                <Slimes />
                <SiteHeader />
                <main id='main' className='flex-1'>{children}</main>
                <SiteFooter />
            </body>
        </html>
    )
}
