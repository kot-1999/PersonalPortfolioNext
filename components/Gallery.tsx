'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ProjectImage } from '@/content/types'
import { asset } from '@/lib/asset'

export default function Gallery({ images }: { images: ProjectImage[] }) {
    const [index, setIndex] = useState(0)
    const thumbs = useRef<HTMLDivElement>(null)
    const count = images.length
    const current = images[index]

    const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count])

    // Keep the active thumbnail visible
    useEffect(() => {
        const el = thumbs.current?.children[index] as HTMLElement | undefined
        el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }, [index])

    // Basic swipe support
    const touchX = useRef<number | null>(null)

    return (
        <figure
            className='card overflow-hidden'
            tabIndex={0}
            aria-roledescription='carousel'
            aria-label='Project screenshots'
            onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') go(-1)
                if (e.key === 'ArrowRight') go(1)
            }}
        >
            <div
                className='relative aspect-[16/10] bg-[#0d0b08]'
                onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                    if (touchX.current === null) return
                    const dx = e.changedTouches[0].clientX - touchX.current
                    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
                    touchX.current = null
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={current.src} src={asset(current.src)} alt={current.caption} className='h-full w-full object-contain' />

                {count > 1 && (
                    <>
                        <GalleryButton side='left' label='Previous image' onClick={() => go(-1)} />
                        <GalleryButton side='right' label='Next image' onClick={() => go(1)} />
                    </>
                )}
            </div>

            <figcaption className='flex items-center justify-between gap-4 border-t-2 border-border px-4 py-3 text-sm'>
                <span>{current.caption}</span>
                <span className='font-mono text-xs text-muted'>
                    {index + 1} / {count}
                </span>
            </figcaption>

            {count > 1 && (
                <div ref={thumbs} className='flex gap-2 overflow-x-auto border-t-2 border-border p-3'>
                    {images.map((img, i) => (
                        <button
                            key={img.src}
                            type='button'
                            onClick={() => setIndex(i)}
                            aria-label={`Show ${img.caption}`}
                            aria-current={i === index}
                            className='h-14 w-24 shrink-0 overflow-hidden rounded-md border-2 border-transparent opacity-60 transition hover:opacity-100 aria-[current=true]:border-accent aria-[current=true]:opacity-100'
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={asset(img.src)} alt='' loading='lazy' className='h-full w-full object-cover object-top' />
                        </button>
                    ))}
                </div>
            )}
        </figure>
    )
}

function GalleryButton({ side, label, onClick }: { side: 'left' | 'right', label: string, onClick: () => void }) {
    return (
        <button
            type='button'
            aria-label={label}
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-3' : 'right-3'} grid h-10 w-10 place-items-center rounded-md border-2 border-border bg-surface/90 text-text shadow-[3px_3px_0_#000] backdrop-blur transition hover:border-accent hover:text-accent`}
        >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                <path d={side === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
            </svg>
        </button>
    )
}
