'use client'

import { useState } from 'react'

import FilterChips from '@/components/FilterChips'
import type { Book, BookCategory } from '@/content/types'
import { asset } from '@/lib/asset'

export default function LibraryGrid({ books }: { books: Book[] }) {
    const categories = ['All', ...new Set(books.map((b) => b.category))] as ('All' | BookCategory)[]
    const [category, setCategory] = useState<'All' | BookCategory>('All')
    const visible = books.filter((b) => category === 'All' || b.category === category)

    return (
        <div>
            <FilterChips label='Filter books by category' options={categories} value={category} onChange={setCategory} />

            <ul className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {visible.map((book) => (
                    <li key={book.title} className='card flex gap-4 p-4'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={asset(book.cover)}
                            alt={`${book.title} cover`}
                            loading='lazy'
                            className='h-36 w-24 shrink-0 rounded-md border border-border object-cover'
                        />
                        <div className='min-w-0'>
                            <h3 className='font-semibold leading-snug'>{book.title}</h3>
                            <p className='mt-1 text-sm text-muted'>{book.author}</p>
                            <p className='mt-2 font-mono text-[11px] uppercase tracking-wider text-accent'>{book.category}</p>
                            <details className='group mt-2 text-sm'>
                                <summary className='cursor-pointer list-none text-muted hover:text-text [&::-webkit-details-marker]:hidden'>
                                    <span className='group-open:hidden'>Show details +</span>
                                    <span className='hidden group-open:inline'>Hide details −</span>
                                </summary>
                                <p className='mt-2'>{book.summary}</p>
                                <p className='mt-2 text-muted'>
                                    <strong className='text-text'>Takeaways:</strong> {book.takeaways}
                                </p>
                            </details>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
