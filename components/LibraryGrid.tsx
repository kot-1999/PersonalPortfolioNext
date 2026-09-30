'use client'

import { useState } from 'react'

import BookCover from '@/components/BookCover'
import FilterChips from '@/components/FilterChips'
import type { Book, BookCategory } from '@/content/types'

export default function LibraryGrid({ books }: { books: Book[] }) {
    const shelves = [...new Set(books.map((b) => b.category))]
    const options = ['All', ...shelves] as ('All' | BookCategory)[]
    const counts = Object.fromEntries(options.map((o) => [o, books.filter((b) => o === 'All' || b.category === o).length]))
    const [category, setCategory] = useState<'All' | BookCategory>('All')

    return (
        <div>
            <FilterChips label='Filter books by category' options={options} value={category} onChange={setCategory} counts={counts} />
            <p className='mt-4 font-mono text-xs text-muted'>Click a cover for a short summary and key takeaways.</p>

            <div className='mt-8 space-y-12'>
                {shelves
                    .filter((shelf) => category === 'All' || shelf === category)
                    .map((shelf) => (
                        <section key={shelf}>
                            <h2 className='title-card mb-5'>
                                <span className='text-teal'>#</span> {shelf}
                            </h2>
                            {/* Every cell carries a slice of plank, so each row reads as one continuous shelf */}
                            <ul className='grid grid-cols-3 gap-y-10 sm:grid-cols-4 md:grid-cols-6'>
                                {books
                                    .filter((b) => b.category === shelf)
                                    .map((book) => (
                                        <li key={book.title} className='flex flex-col justify-end border-b-[10px] border-[#3a2e22] px-2 pb-3 shadow-[0_6px_0_#000] sm:px-3'>
                                            <BookCover book={book} />
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    ))}
            </div>
        </div>
    )
}
