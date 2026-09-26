'use client'

import Link from 'next/link'

import InfoPopover from '@/components/InfoPopover'
import { tech, techIcon, type TechKey } from '@/content/tech'
import type { Proficiency, Tech } from '@/content/types'
import { asset } from '@/lib/asset'
import { LEVEL_META, projectsUsing } from '@/lib/skills'

/** Icon + name pill. Click shows what the technology is and where it was used. */
export default function TechBadge({ id, exclude }: { id: TechKey, exclude?: string }) {
    const { name } = tech[id]
    return (
        <InfoPopover
            label={`About ${name}`}
            triggerClassName='inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 py-1 pl-1 pr-2.5 text-sm transition-colors hover:border-accent hover:text-accent'
            trigger={
                <>
                    <TechIcon name={name} icon={techIcon(id)} size={22} />
                    {name}
                </>
            }
        >
            <TechInfo id={id} exclude={exclude} />
        </InfoPopover>
    )
}

/** Compact skill tile used on the Skills page and the home page. */
export function SkillTile({ id }: { id: TechKey }) {
    const t: Tech = tech[id]
    return (
        <InfoPopover
            label={`About ${t.name}`}
            triggerClassName='card card-hover flex w-full items-center gap-3 p-3 text-left'
            trigger={
                <>
                    <TechIcon name={t.name} icon={techIcon(id)} size={36} />
                    <span className='min-w-0 flex-1'>
                        <span className='block truncate text-sm font-medium'>{t.name}</span>
                        {t.proficiency && <LevelBars level={t.proficiency} withLabel />}
                    </span>
                </>
            }
        >
            <TechInfo id={id} />
        </InfoPopover>
    )
}

function TechInfo({ id, exclude }: { id: TechKey, exclude?: string }) {
    const t: Tech = tech[id]
    const usedIn = projectsUsing(id).filter((p) => p.slug !== exclude)

    return (
        <div className='pr-6'>
            <div className='flex items-center gap-3'>
                <TechIcon name={t.name} icon={techIcon(id)} size={40} />
                <div>
                    <p className='pixel text-2xl'>{t.name}</p>
                    {t.proficiency && <LevelBars level={t.proficiency} withLabel />}
                </div>
            </div>
            {t.description && <p className='mt-3 leading-relaxed text-muted'>{t.description}</p>}
            {t.categories && (
                <p className='mt-3 font-mono text-[11px] uppercase tracking-wider text-muted/80'>{t.categories.join(' · ')}</p>
            )}
            {usedIn.length > 0 && (
                <div className='mt-3 border-t border-dashed border-border pt-3'>
                    <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                        {exclude ? 'Also used in' : 'Used in'}
                    </p>
                    <ul className='mt-2 flex flex-wrap gap-1.5'>
                        {usedIn.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/projects/${p.slug}/`} className='chip hover:border-accent hover:text-accent'>
                                    {p.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export function LevelBars({ level, withLabel = false }: { level: Proficiency, withLabel?: boolean }) {
    const meta = LEVEL_META[level]
    return (
        <span className='mt-1 flex items-center gap-2' title={level}>
            <span className='flex gap-0.5' aria-hidden>
                {[1, 2, 3].map((i) => (
                    <span key={i} className={`h-2 w-3 ${i <= meta.bars ? meta.bg : 'bg-border'}`} />
                ))}
            </span>
            <span className={withLabel ? `font-mono text-[11px] uppercase tracking-wider ${meta.text}` : 'sr-only'}>{level}</span>
        </span>
    )
}

export function TechIcon({ name, icon, size }: { name: string, icon: string | null, size: number }) {
    // Logos sit on a light "keycap" plate so dark logos (Next.js, GitHub, Express…) stay visible on the dark theme.
    const box = { width: size, height: size }
    if (icon) {
        return (
            <span style={box} className='grid shrink-0 place-items-center rounded-md bg-plate p-[3px] shadow-[inset_0_-2px_0_#0003]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(icon)} alt='' className='h-full w-full object-contain' loading='lazy' />
            </span>
        )
    }
    return (
        <span
            aria-hidden
            style={{ ...box, fontSize: size * 0.55 }}
            className='pixel grid shrink-0 place-items-center rounded-md border border-accent/60 bg-accent-soft text-accent'
        >
            {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2)}
        </span>
    )
}
