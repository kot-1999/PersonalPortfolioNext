'use client'

import { useEffect, useRef } from 'react'

/*
 * Pixel slimes that live on the page itself: they stand on the top edges of cards, buttons, headings and images,
 * hop between them, fall off edges, look at the cursor, get startled when it comes close, and go "boing" when clicked.
 * Positions are kept in document coordinates, so a slime sitting on a card scrolls with it.
 * Nothing renders for visitors who prefer reduced motion.
 */

// '.' is transparent, 'b' body, 'h' highlight, 'k' eyes
const FRAMES = {
    idle: [
        '...bbbb...',
        '..bhbbbb..',
        '.bhbbbbbb.',
        '.bbbkbbkb.',
        'bbbbkbbkbb',
        'bbbbbbbbbb',
        '.bbbbbbbb.'
    ],
    squash: [
        '..bbbbbbbb..',
        '.bhbbbbbbbb.',
        'bhbbbkbbkbbb',
        'bbbbbkbbkbbb',
        '.bbbbbbbbbb.'
    ],
    stretch: [
        '...bb...',
        '..bhbb..',
        '.bhbbbb.',
        '.bbbkbk.',
        '.bbbkbk.',
        '.bbbbbb.',
        '.bbbbbb.',
        '..bbbb..'
    ]
}
type Frame = keyof typeof FRAMES

const PALETTES = [
    { b: '#5fd3b0', h: '#b6f2de', k: '#15120e' },
    { b: '#ffb347', h: '#ffe0ad', k: '#15120e' },
    { b: '#ff7a59', h: '#ffc2b0', k: '#15120e' }
]

/** Elements whose top edge a slime can stand on */
const PLATFORM_SELECTOR = '.card, .btn-primary, .btn-ghost, main h1, main h2, main img, footer a'
/** Clicks on these belong to the website, not the slimes */
const INTERACTIVE = 'a, button, input, textarea, select, label, [popover], iframe'

const GRAVITY = 1400
const SCARE_RADIUS = 70

type Platform = { x1: number, x2: number, y: number }
type Slime = {
    x: number
    y: number // bottom edge, document coordinates
    vx: number
    vy: number
    onGround: Platform | null
    rest: number
    facing: 1 | -1
    squashFor: number
    offscreenFor: number
    /** y of the platform it is jumping down from; ignored for landing until it touches something else */
    dropFrom: number | null
    sprites: Record<Frame, { right: HTMLCanvasElement, left: HTMLCanvasElement }>
}
type Floater = { text: string, x: number, y: number, age: number }

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function bake(rows: string[], palette: Record<string, string>, scale: number, mirror: boolean) {
    const canvas = document.createElement('canvas')
    canvas.width = rows[0].length * scale
    canvas.height = rows.length * scale
    const ctx = canvas.getContext('2d')!
    rows.forEach((row, y) => [...(mirror ? [...row].reverse().join('') : row)].forEach((ch, x) => {
        if (ch === '.') return
        ctx.fillStyle = palette[ch]
        ctx.fillRect(x * scale, y * scale, scale, scale)
    }))
    return canvas
}

/** Top edge of an element's visible content: text headings use their text box, not the full-width block. */
function platformOf(el: Element): Platform | null {
    let rect: DOMRect = el.getBoundingClientRect()
    if (/^H[1-6]$/.test(el.tagName)) {
        const range = document.createRange()
        range.selectNodeContents(el)
        rect = range.getBoundingClientRect()
    }
    if (rect.width < 40 || rect.height < 8) return null
    return { x1: rect.left + scrollX, x2: rect.right + scrollX, y: rect.top + scrollY }
}

export default function Slimes() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const small = window.innerWidth < 640
        const scale = small ? 3 : 4
        const pixelFont = getComputedStyle(document.body).getPropertyValue('--font-vt323').trim() || 'monospace'

        let width = 0
        let height = 0
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.imageSmoothingEnabled = false
        }
        resize()

        let platforms: Platform[] = []
        const refreshPlatforms = () => {
            platforms = [...document.querySelectorAll(PLATFORM_SELECTOR)]
                .map(platformOf)
                .filter((p): p is Platform => p !== null)
        }
        refreshPlatforms()

        const visible = (p: Platform) => p.y > scrollY + 90 && p.y < scrollY + height - 10 && p.x2 > scrollX && p.x1 < scrollX + width

        const slimes: Slime[] = PALETTES.slice(0, small ? 2 : 3).map((palette) => {
            const sprites = Object.fromEntries(
                (Object.keys(FRAMES) as Frame[]).map((f) => [f, { right: bake(FRAMES[f], palette, scale, false), left: bake(FRAMES[f], palette, scale, true) }])
            ) as Slime['sprites']
            return { x: 0, y: 0, vx: 0, vy: 0, onGround: null, rest: 0, facing: 1, squashFor: 0, offscreenFor: 0, dropFrom: null, sprites }
        })
        const widthOf = (s: Slime) => s.sprites.idle.right.width

        /** Drop a slime in from the top of the screen above a visible platform. */
        const dropIn = (s: Slime) => {
            const options = platforms.filter(visible)
            const target = options.length ? options[Math.floor(Math.random() * options.length)] : null
            s.x = target ? rand(target.x1, Math.max(target.x1, target.x2 - widthOf(s))) : rand(scrollX, scrollX + width - 40)
            s.y = scrollY + rand(20, 80)
            s.vx = 0
            s.vy = 0
            s.onGround = null
            s.offscreenFor = 0
        }
        slimes.forEach(dropIn)

        /** Ballistic jump that lands at (tx, ty) after `time` seconds. */
        const jumpTo = (s: Slime, tx: number, ty: number, time: number) => {
            s.vx = (tx - s.x) / time
            s.vy = (ty - s.y - 0.5 * GRAVITY * time * time) / time
            s.facing = s.vx >= 0 ? 1 : -1
            s.onGround = null
        }

        const decide = (s: Slime) => {
            const here = s.onGround!
            const w = widthOf(s)
            const reachable = platforms.filter((p) => p !== here && visible(p)
                && Math.abs((p.x1 + p.x2) / 2 - s.x) < 360 && p.y - here.y > -240 && p.y - here.y < 420)

            if (reachable.length && Math.random() < 0.45) {
                const p = reachable[Math.floor(Math.random() * reachable.length)]
                const tx = rand(p.x1, Math.max(p.x1, p.x2 - w))
                const from = here.y
                jumpTo(s, tx, p.y, p.y < here.y ? rand(0.7, 0.9) : rand(0.5, 0.7))
                if (p.y > from) s.dropFrom = from
            } else {
                // A little hop along the platform, sometimes right off its edge
                const dx = (Math.random() < 0.5 ? -1 : 1) * rand(24, 70)
                jumpTo(s, s.x + dx, s.y, 0.35)
            }
        }

        const land = (s: Slime, p: Platform) => {
            s.y = p.y
            s.vx = 0
            s.vy = 0
            s.onGround = p
            s.dropFrom = null
            s.squashFor = 0.12
            s.rest = rand(0.8, 3)
        }

        const floaters: Floater[] = []
        let pointer: { x: number, y: number } | null = null

        const slimeAt = (docX: number, docY: number, pad = 8) => slimes.find((s) => {
            const w = widthOf(s)
            return docX >= s.x - pad && docX <= s.x + w + pad && docY >= s.y - w - pad && docY <= s.y + pad
        })

        const onMove = (e: MouseEvent) => {
            pointer = { x: e.clientX + scrollX, y: e.clientY + scrollY }
            const hit = !(e.target as Element).closest?.(INTERACTIVE) && slimeAt(pointer.x, pointer.y)
            document.documentElement.classList.toggle('mob-hover', Boolean(hit))
        }
        const onLeave = () => {
            pointer = null
        }
        const onClick = (e: MouseEvent) => {
            if ((e.target as Element).closest?.(INTERACTIVE) || window.getSelection()?.toString()) return
            const s = slimeAt(e.clientX + scrollX, e.clientY + scrollY, 12)
            if (!s) return
            s.onGround = null
            s.dropFrom = null
            s.vy = -rand(620, 760)
            s.vx = rand(-160, 160)
            s.facing = s.vx >= 0 ? 1 : -1
            floaters.push({ text: 'boing!', x: s.x + widthOf(s) / 2, y: s.y - widthOf(s), age: 0 })
        }

        const update = (dt: number) => {
            for (const s of slimes) {
                const w = widthOf(s)
                s.squashFor = Math.max(0, s.squashFor - dt)

                // Respawn slimes that were left behind while scrolling
                const onScreen = s.y > scrollY && s.y - w < scrollY + height
                s.offscreenFor = onScreen ? 0 : s.offscreenFor + dt
                if (s.offscreenFor > 1.5) dropIn(s)

                if (s.onGround) {
                    // The platform may have moved or disappeared (layout change, navigation)
                    const still = platforms.find((p) => Math.abs(p.y - s.onGround!.y) < 2 && s.x + w / 2 >= p.x1 && s.x + w / 2 <= p.x2)
                    if (!still) {
                        s.onGround = null
                        continue
                    }
                    s.onGround = still

                    if (pointer) {
                        const dx = pointer.x - (s.x + w / 2)
                        const dy = pointer.y - (s.y - w / 2)
                        s.facing = dx >= 0 ? 1 : -1
                        if (Math.hypot(dx, dy) < SCARE_RADIUS && s.rest > 0.2) {
                            // Startled: hop away from the cursor
                            jumpTo(s, s.x - Math.sign(dx || 1) * rand(50, 90), s.y, 0.4)
                            continue
                        }
                    }

                    s.rest -= dt
                    if (s.rest <= 0) decide(s)
                    continue
                }

                const prevY = s.y
                s.vy += GRAVITY * dt
                s.x += s.vx * dt
                s.y += s.vy * dt

                if (s.vy > 0) {
                    const mid = s.x + w / 2
                    const hit = platforms
                        .filter((p) => prevY <= p.y + 1 && s.y >= p.y && mid >= p.x1 && mid <= p.x2)
                        .filter((p) => s.dropFrom === null || Math.abs(p.y - s.dropFrom) > 2)
                        .sort((a, b) => a.y - b.y)[0]
                    if (hit) land(s, hit)
                }
                if (s.y > document.documentElement.scrollHeight + 200) dropIn(s)
            }

            for (const f of floaters) f.age += dt
            while (floaters.length && floaters[0].age > 1.2) floaters.shift()
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)
            for (const s of slimes) {
                const frame: Frame = s.squashFor > 0 || (s.onGround && s.rest < 0.12) ? 'squash' : s.onGround ? 'idle' : 'stretch'
                const sprite = s.sprites[frame][s.facing === 1 ? 'right' : 'left']
                const x = s.x + (widthOf(s) - sprite.width) / 2 - scrollX
                const y = s.y - sprite.height - scrollY
                if (y > height || y + sprite.height < 0) continue
                ctx.drawImage(sprite, Math.round(x), Math.round(y))
            }
            ctx.font = `${small ? 20 : 24}px ${pixelFont}`
            ctx.textAlign = 'center'
            ctx.fillStyle = '#ffb347'
            for (const f of floaters) {
                ctx.globalAlpha = Math.max(0, 1 - f.age / 1.2)
                ctx.fillText(f.text, f.x - scrollX, f.y - scrollY - f.age * 40)
            }
            ctx.globalAlpha = 1
        }

        let last = performance.now()
        let sinceRefresh = 0
        let raf = 0
        const loop = (time: number) => {
            // Clamp the step so a backgrounded tab doesn't teleport everything on return
            const dt = Math.min((time - last) / 1000, 0.05)
            last = time
            sinceRefresh += dt
            if (sinceRefresh > 0.5) {
                sinceRefresh = 0
                refreshPlatforms()
            }
            update(dt)
            draw()
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        const onResize = () => {
            resize()
            refreshPlatforms()
        }
        window.addEventListener('resize', onResize)
        document.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('mouseleave', onLeave)
        document.addEventListener('click', onClick)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', onResize)
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
            document.removeEventListener('click', onClick)
            document.documentElement.classList.remove('mob-hover')
        }
    }, [])

    // Above page content (so slimes can sit on it) but below the sticky header and popovers
    return <canvas ref={canvasRef} aria-hidden className='pointer-events-none fixed inset-0 z-30 h-full w-full' />
}
