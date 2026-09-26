'use client'

type Props<T extends string> = {
    options: readonly T[]
    value: T
    onChange: (value: T) => void
    label: string
    /** Optional number shown next to each option */
    counts?: Partial<Record<T, number>>
}

export default function FilterChips<T extends string>({ options, value, onChange, label, counts }: Props<T>) {
    return (
        <div role='group' aria-label={label} className='-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0'>
            {options.map((option) => (
                <button
                    key={option}
                    type='button'
                    aria-pressed={option === value}
                    onClick={() => onChange(option)}
                    className='flex shrink-0 items-center gap-2 rounded-md border-2 border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:border-accent/70 hover:text-text aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-contrast'
                >
                    {option}
                    {counts?.[option] !== undefined && <span className='opacity-70'>{counts[option]}</span>}
                </button>
            ))}
        </div>
    )
}
