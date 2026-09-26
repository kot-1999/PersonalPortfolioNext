'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ action }: { action: string }) {
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState('')

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        setStatus('sending')
        try {
            const res = await fetch(action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            })
            if (!res.ok) throw new Error('The form service rejected the message.')
            form.reset()
            setStatus('sent')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Network error')
            setStatus('error')
        }
    }

    if (status === 'sent') {
        return (
            <div role='status' className='card p-8 text-center'>
                <p className='pixel text-3xl text-accent'>Message sent — thank you!</p>
                <p className='mt-2 text-muted'>I’ll get back to you as soon as I can.</p>
                <button type='button' className='btn-ghost mt-6' onClick={() => setStatus('idle')}>
                    Send another
                </button>
            </div>
        )
    }

    const field = 'mt-2 w-full rounded-md border-2 border-border bg-bg font-mono text-sm px-4 py-3 text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent'

    return (
        <form onSubmit={onSubmit} className='card space-y-5 p-6 sm:p-8'>
            <input type='hidden' name='_subject' value='New message from my portfolio' />
            <label className='block text-sm font-medium'>
                Name
                <input name='name' autoComplete='name' className={field} placeholder='Your name' />
            </label>
            <label className='block text-sm font-medium'>
                Email
                <input name='email' type='email' required autoComplete='email' className={field} placeholder='you@example.com' />
            </label>
            <label className='block text-sm font-medium'>
                Message
                <textarea name='message' required rows={6} className={field} placeholder='How can I help?' />
            </label>

            {status === 'error' && (
                <p role='alert' className='text-sm text-danger'>
                    Couldn’t send the message: {error} Please try again or email me directly.
                </p>
            )}

            <button type='submit' className='btn-primary w-full sm:w-auto' disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
        </form>
    )
}
