import { tech, techIcon, type TechKey } from '@/content/tech'
import { asset } from '@/lib/asset'

type Props = {
    id: TechKey
    size?: 'sm' | 'md'
}

/** Icon + name pill. Falls back to a monogram when the technology has no icon. */
export default function TechBadge({ id, size = 'sm' }: Props) {
    const { name } = tech[id]
    const icon = techIcon(id)
    const px = size === 'sm' ? 18 : 24

    return (
        <span className='inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1.5 pr-3 text-sm'>
            <TechIcon name={name} icon={icon} size={px} />
            {name}
        </span>
    )
}

export function TechIcon({ name, icon, size }: { name: string, icon: string | null, size: number }) {
    if (icon) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={asset(icon)} alt='' width={size} height={size} className='shrink-0 object-contain dark:rounded-md dark:bg-white/90 dark:p-[2px]' loading='lazy' />
    }
    return (
        <span
            aria-hidden
            style={{ width: size, height: size, fontSize: size * 0.45 }}
            className='grid shrink-0 place-items-center rounded-md bg-accent-soft font-mono font-semibold text-accent'
        >
            {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2)}
        </span>
    )
}
