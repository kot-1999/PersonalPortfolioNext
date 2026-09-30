'use client'

import InfoPopover from '@/components/InfoPopover'
import type { Book } from '@/content/types'
import { asset } from '@/lib/asset'

/** A book cover that tilts on hover; click shows the summary and takeaways. */
export default function BookCover({ book }: { book: Book }) {
    return (
        <InfoPopover
            label={`About ${book.title}`}
            triggerClassName='group block w-full text-left'
            trigger={
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={asset(book.cover)}
                        alt={`${book.title} cover`}
                        loading='lazy'
                        className='aspect-[2/3] w-full rounded-sm border-2 border-black/60 object-cover shadow-[4px_4px_0_#000] transition-transform duration-200 group-hover:-translate-y-2 group-hover:-rotate-2 group-focus-visible:-translate-y-2'
                    />
                    <span className='mt-2 line-clamp-2 text-xs text-muted group-hover:text-accent'>{book.title}</span>
                </>
            }
        >
            <div className='flex gap-4 pr-6'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(book.cover)} alt='' className='h-24 w-16 shrink-0 rounded-sm border border-border object-cover' />
                <div className='min-w-0'>
                    <p className='font-semibold leading-snug'>{book.title}</p>
                    <p className='mt-1 text-xs text-muted'>{book.author}</p>
                    <p className='mt-2 font-mono text-[10px] uppercase tracking-wider text-teal'>{book.category}</p>
                </div>
            </div>
            <p className='mt-3 leading-relaxed text-muted'>{book.summary}</p>
            <p className='mt-3 border-t border-dashed border-border pt-3 leading-relaxed'>
                <span className='label text-accent'>Takeaways</span>
                <br />
                <span className='text-muted'>{book.takeaways}</span>
            </p>
        </InfoPopover>
    )
}
