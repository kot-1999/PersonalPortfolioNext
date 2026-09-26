'use client'

type Props<T extends string> = {
    options: readonly T[]
    value: T
    onChange: (value: T) => void
    label: string
}

export default function FilterChips<T extends string>({ options, value, onChange, label }: Props<T>) {
    return (
        <div role='group' aria-label={label} className='-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0'>
            {options.map((option) => (
                <button
                    key={option}
                    type='button'
                    aria-pressed={option === value}
                    onClick={() => onChange(option)}
                    className='shrink-0 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:text-text aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-contrast'
                >
                    {option}
                </button>
            ))}
        </div>
    )
}
