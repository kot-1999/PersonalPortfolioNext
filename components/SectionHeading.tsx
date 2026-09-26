import Link from 'next/link'

type Props = {
    eyebrow?: string
    title: string
    description?: string
    action?: { label: string, href: string }
}

export default function SectionHeading({ eyebrow, title, description, action }: Props) {
    return (
        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div className='max-w-2xl'>
                {eyebrow && <p className='eyebrow mb-2'>{eyebrow}</p>}
                <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h2>
                {description && <p className='mt-3 text-muted'>{description}</p>}
            </div>
            {action && (
                <Link href={action.href} className='shrink-0 text-sm font-medium text-accent hover:underline'>
                    {action.label} →
                </Link>
            )}
        </div>
    )
}
