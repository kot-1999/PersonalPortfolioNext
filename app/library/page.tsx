import type { Metadata } from 'next'

import LibraryGrid from '@/components/LibraryGrid'
import PageHeader from '@/components/PageHeader'
import { books } from '@/content/books'

export const metadata: Metadata = { title: 'Library' }

export default function LibraryPage() {
    return (
        <div className='container-page'>
            <PageHeader
                eyebrow='Personal library'
                title='Books I’ve read'
                description='Each of these taught me something new about programming, software design, or data science. I hope you find some inspiration here!'
            />
            <LibraryGrid books={books} />
        </div>
    )
}
