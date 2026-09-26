import type { Metadata } from 'next'

import PageHeader from '@/components/PageHeader'
import SkillsExplorer from '@/components/SkillsExplorer'

export const metadata: Metadata = { title: 'Skills' }

export default function SkillsPage() {
    return (
        <div className='container-page'>
            <PageHeader
                eyebrow='Tech stack'
                title='Skills & tools'
                description='From server-side frameworks to cloud services — the tools I rely on to build scalable backend systems, maintain databases, and keep systems observable and reliable.'
            />
            <SkillsExplorer />
        </div>
    )
}
