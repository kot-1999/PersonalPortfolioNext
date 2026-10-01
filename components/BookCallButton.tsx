import { profile } from '@/content/profile'

type Props = {
    variant?: 'primary' | 'ghost'
    className?: string
}

/** Opens the Google Calendar booking page (profile.bookingUrl) in a new tab. */
export default function BookCallButton({ variant = 'primary', className = '' }: Props) {
    return (
        <a
            href={profile.bookingUrl}
            target='_blank'
            rel='noreferrer'
            className={`${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
        >
            <svg aria-hidden width='16' height='16' viewBox='0 0 16 16' fill='currentColor' shapeRendering='crispEdges'>
                <path d='M4 1h2v2h4V1h2v2h3v12H1V3h3V1Zm-1 6v6h10V7H3Zm2 2h2v2H5V9Zm4 0h2v2H9V9Z' fillRule='evenodd' />
            </svg>
            Book a call
        </a>
    )
}
