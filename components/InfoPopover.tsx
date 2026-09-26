'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'

type Props = {
    /** Content of the trigger button */
    trigger: ReactNode
    /** Accessible name of the trigger, e.g. "About TypeScript" */
    label: string
    triggerClassName?: string
    children: ReactNode
}

const GAP = 8
const EDGE = 12

/**
 * Small click-to-open info card built on the native Popover API:
 * one open at a time, closes on Esc, outside click, the × button or clicking the trigger again.
 * Anchored under the trigger on larger screens, a bottom sheet on phones. No backdrop, no scroll lock.
 */
export default function InfoPopover({ trigger, label, triggerClassName, children }: Props) {
    const id = useId()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const button = buttonRef.current
        const popover = popoverRef.current
        if (!button || !popover) return

        const place = () => {
            if (window.matchMedia('(max-width: 639px)').matches) {
                popover.style.top = ''
                popover.style.left = ''
                return
            }
            const r = button.getBoundingClientRect()
            const { offsetWidth: w, offsetHeight: h } = popover
            const left = Math.min(Math.max(EDGE, r.left + r.width / 2 - w / 2), window.innerWidth - w - EDGE)
            let top = r.bottom + GAP
            if (top + h > window.innerHeight - EDGE) top = Math.max(EDGE, r.top - h - GAP)
            popover.style.left = `${left}px`
            popover.style.top = `${top}px`
        }

        const stopTracking = () => {
            window.removeEventListener('scroll', place, true)
            window.removeEventListener('resize', place)
        }
        const onToggle = (e: Event) => {
            if ((e as ToggleEvent).newState === 'open') {
                place()
                window.addEventListener('scroll', place, { capture: true, passive: true })
                window.addEventListener('resize', place)
            } else {
                stopTracking()
            }
        }

        popover.addEventListener('toggle', onToggle)
        return () => {
            popover.removeEventListener('toggle', onToggle)
            stopTracking()
        }
    }, [])

    return (
        <>
            <button ref={buttonRef} type='button' popoverTarget={id} aria-label={label} className={triggerClassName}>
                {trigger}
            </button>
            <div
                ref={popoverRef}
                id={id}
                popover='auto'
                role='dialog'
                aria-label={label}
                className='card m-0 w-80 max-w-[calc(100vw-24px)] p-4 text-sm text-text [&:popover-open]:animate-[pop-in_120ms_ease-out] sm:inset-auto max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-auto max-sm:w-auto max-sm:max-w-none'
            >
                <button
                    type='button'
                    popoverTarget={id}
                    popoverTargetAction='hide'
                    aria-label='Close'
                    className='absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md font-mono text-muted hover:bg-surface-2 hover:text-accent'
                >
                    ×
                </button>
                {children}
            </div>
        </>
    )
}
