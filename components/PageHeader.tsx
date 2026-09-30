type Props = {
    eyebrow: string
    title: string
    description: string
}

export default function PageHeader({ eyebrow, title, description }: Props) {
    return (
        <div className='pb-10 pt-12 sm:pt-16'>
            <p className='eyebrow mb-4'>{eyebrow}</p>
            <h1 className='title-page cursor text-text'>{title}</h1>
            <p className='mt-4 max-w-2xl text-lg text-muted'>{description}</p>
        </div>
    )
}
