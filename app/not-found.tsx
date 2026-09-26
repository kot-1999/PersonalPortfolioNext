import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='container-page py-32 text-center'>
            <p className='eyebrow'>404</p>
            <h1 className='mt-3 text-3xl font-semibold'>Page not found</h1>
            <p className='mt-3 text-muted'>The page you are looking for doesn’t exist.</p>
            <Link href='/' className='btn-primary mt-8'>
                Back home
            </Link>
        </div>
    )
}
