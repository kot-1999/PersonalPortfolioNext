'use client'

import { useEffect, useRef } from 'react'

/*
 * Background pixel critters drawn on one canvas behind the page content:
 * - bugs crawl in grid directions and can be squashed with a click ("bug fixed")
 * - slimes hop along the bottom of the viewport
 * - space invaders drift across from time to time
 * Nothing renders for visitors who prefer reduced motion.
 */

// Sprite rows; '.' is transparent, other letters map to COLORS
const SPRITES = {
    bug: [
        [
            '.x..x...',
            '..xxxx..',
            'xxxxxxoo',
            '.xxxxxoo',
            'xxxxxxoo',
            '..xxxx..',
            '.x..x...'
        ],
        [
            'x..x....',
            '..xxxx..',
            '.xxxxxoo',
            'xxxxxxoo',
            '.xxxxxoo',
            '..xxxx..',
            'x..x....'
        ]
    ],
    slime: [
        [
            '...tttt...',
            '..tttttt..',
            '.tttttttt.',
            '.ttkttktt.',
            'tttttttttt',
            'tttttttttt',
            '.tttttttt.'
        ],
        [
            '..tttttttt..',
            '.ttkttttktt.',
            'tttttttttttt',
            'tttttttttttt',
            '.tttttttttt.'
        ]
    ],
    invader: [
        [
            '..a.....a..',
            '...a...a...',
            '..aaaaaaa..',
            '.aa.aaa.aa.',
            'aaaaaaaaaaa',
            'a.aaaaaaa.a',
            'a.a.....a.a',
            '...aa.aa...'
        ],
        [
            '..a.....a..',
            'a..a...a..a',
            'a.aaaaaaa.a',
            'aaa.aaa.aaa',
            'aaaaaaaaaaa',
            '.aaaaaaaaa.',
            '..a.....a..',
            '.a.......a.'
        ]
    ],
    splat: [
        [
            'x..x...x',
            '.xxxx.x.',
            '..xxxx..',
            'xxxxxxxx',
            '..xxxx..',
            '.x.xx.x.',
            'x.....x.'
        ]
    ]
}

const COLORS: Record<string, string> = {
    x: '#ff7a59',
    o: '#f3e9d2',
    t: '#5fd3b0',
    k: '#15120e',
    a: '#ffb347'
}

const ALPHA = 0.55
const INTERACTIVE = 'a, button, input, textarea, select, label, img, iframe, header, footer, [popover], .card'

type Dir = 'right' | 'left' | 'down' | 'up'
type Bug = { kind: 'bug', x: number, y: number, dir: Dir, speed: number, turnIn: number, pause: number, t: number, dead: number, respawnIn: number }
type Slime = { kind: 'slime', x: number, vx: number, hop: number, vy: number, rest: number }
type Invader = { kind: 'invader', x: number, y: number, vx: number, t: number, waitIn: number }
type Floater = { text: string, x: number, y: number, age: number }

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

/** Renders sprite rows into a small canvas once, so each frame is a cheap drawImage. */
function bake(rows: string[], scale: number, transform: 'none' | 'mirror' | 'transpose' | 'transpose-flip' = 'none') {
    let grid = rows.map((r) => r.split(''))
    if (transform === 'mirror') grid = grid.map((r) => [...r].reverse())
    if (transform.startsWith('transpose')) grid = grid[0].map((_, c) => grid.map((r) => r[c]))
    if (transform === 'transpose-flip') grid = [...grid].reverse()

    const canvas = document.createElement('canvas')
    canvas.width = grid[0].length * scale
    canvas.height = grid.length * scale
    const ctx = canvas.getContext('2d')!
    grid.forEach((row, y) => row.forEach((ch, x) => {
        if (ch === '.') return
        ctx.fillStyle = COLORS[ch]
        ctx.fillRect(x * scale, y * scale, scale, scale)
    }))
    return canvas
}

export default function PixelMobs() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const small = window.innerWidth < 640
        const scale = small ? 3 : 4
        const bugSprites: Record<Dir, HTMLCanvasElement[]> = {
            right: SPRITES.bug.map((f) => bake(f, scale)),
            left: SPRITES.bug.map((f) => bake(f, scale, 'mirror')),
            down: SPRITES.bug.map((f) => bake(f, scale, 'transpose')),
            up: SPRITES.bug.map((f) => bake(f, scale, 'transpose-flip'))
        }
        const slimeSprites = SPRITES.slime.map((f) => bake(f, scale))
        const slimeSpritesLeft = SPRITES.slime.map((f) => bake(f, scale, 'mirror'))
        const invaderSprites = SPRITES.invader.map((f) => bake(f, scale))
        const splat = bake(SPRITES.splat[0], scale)
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

        const newBug = (fromEdge = false): Bug => {
            const dir = pick<Dir>(['right', 'left', 'down', 'up'])
            const bug: Bug = { kind: 'bug', x: rand(0, width), y: rand(80, height - 40), dir, speed: rand(18, 34), turnIn: rand(1, 4), pause: 0, t: 0, dead: 0, respawnIn: 0 }
            if (fromEdge) {
                if (dir === 'right') bug.x = -40
                if (dir === 'left') bug.x = width + 10
                if (dir === 'down') bug.y = -40
                if (dir === 'up') bug.y = height + 10
            }
            return bug
        }
        const bugs: Bug[] = Array.from({ length: small ? 2 : 4 }, () => newBug())
        const slimes: Slime[] = Array.from({ length: small ? 1 : 2 }, () => ({ kind: 'slime', x: rand(0, width), vx: pick([-1, 1]) * rand(40, 60), hop: 0, vy: 0, rest: rand(0.3, 1.5) }))
        const invader: Invader = { kind: 'invader', x: -60, y: 0, vx: 0, t: 0, waitIn: rand(2, 6) }
        const floaters: Floater[] = []
        let fixed = 0

        const bugBox = (b: Bug) => {
            const s = bugSprites[b.dir][0]
            return { x: b.x - 6, y: b.y - 6, w: s.width + 12, h: s.height + 12 }
        }
        const bugAt = (px: number, py: number) => bugs.find((b) => {
            if (b.dead) return false
            const r = bugBox(b)
            return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h
        })
        const onBackground = (target: EventTarget | null) => !(target as Element | null)?.closest?.(INTERACTIVE)

        const onClick = (e: MouseEvent) => {
            if (!onBackground(e.target) || window.getSelection()?.toString()) return
            const bug = bugAt(e.clientX, e.clientY)
            if (!bug) return
            bug.dead = 1.6
            bug.respawnIn = rand(4, 9)
            fixed += 1
            floaters.push({ text: fixed === 1 ? 'bug fixed!' : `bug fixed ×${fixed}`, x: bug.x, y: bug.y, age: 0 })
        }
        const onMove = (e: MouseEvent) => {
            const hit = onBackground(e.target) && bugAt(e.clientX, e.clientY)
            document.documentElement.classList.toggle('mob-hover', Boolean(hit))
        }

        const update = (dt: number) => {
            for (const [i, b] of bugs.entries()) {
                if (b.dead > 0) {
                    b.dead -= dt
                    continue
                }
                if (b.respawnIn > 0) {
                    b.respawnIn -= dt
                    if (b.respawnIn <= 0) bugs[i] = newBug(true)
                    continue
                }
                if (b.pause > 0) {
                    b.pause -= dt
                    continue
                }
                b.t += dt
                b.turnIn -= dt
                if (b.turnIn <= 0) {
                    b.turnIn = rand(1.5, 5)
                    if (Math.random() < 0.3) b.pause = rand(0.6, 2)
                    else b.dir = pick<Dir>(['right', 'left', 'down', 'up'])
                }
                const d = b.speed * dt
                if (b.dir === 'right') b.x += d
                if (b.dir === 'left') b.x -= d
                if (b.dir === 'down') b.y += d
                if (b.dir === 'up') b.y -= d
                // Wrap around the edges
                if (b.x > width + 40) b.x = -40
                if (b.x < -40) b.x = width + 40
                if (b.y > height + 40) b.y = -40
                if (b.y < -40) b.y = height + 40
            }

            for (const s of slimes) {
                if (s.hop === 0 && s.vy === 0) {
                    s.rest -= dt
                    if (s.rest <= 0) s.vy = -rand(160, 240)
                } else {
                    s.vy += 600 * dt
                    s.hop += s.vy * dt
                    s.x += s.vx * dt
                    if (s.hop >= 0) {
                        s.hop = 0
                        s.vy = 0
                        s.rest = rand(0.4, 1.8)
                        if (Math.random() < 0.15) s.vx *= -1
                    }
                }
                if (s.x < 0) s.vx = Math.abs(s.vx)
                if (s.x > width - 40) s.vx = -Math.abs(s.vx)
            }

            if (invader.waitIn > 0) {
                invader.waitIn -= dt
                if (invader.waitIn <= 0) {
                    const fromLeft = Math.random() < 0.5
                    invader.x = fromLeft ? -60 : width + 10
                    invader.vx = (fromLeft ? 1 : -1) * rand(30, 50)
                    invader.y = rand(100, Math.max(120, height * 0.6))
                    invader.t = 0
                }
            } else {
                invader.t += dt
                invader.x += invader.vx * dt
                if (invader.x < -80 || invader.x > width + 80) invader.waitIn = rand(8, 20)
            }

            for (const f of floaters) f.age += dt
            while (floaters.length && floaters[0].age > 1.8) floaters.shift()
        }

        const draw = (time: number) => {
            ctx.clearRect(0, 0, width, height)
            ctx.globalAlpha = ALPHA
            const frame = Math.floor(time / 180) % 2

            for (const b of bugs) {
                if (b.respawnIn > 0 && b.dead <= 0) continue
                if (b.dead > 0) {
                    ctx.globalAlpha = ALPHA * Math.min(1, b.dead)
                    ctx.drawImage(splat, Math.round(b.x), Math.round(b.y))
                    ctx.globalAlpha = ALPHA
                    continue
                }
                ctx.drawImage(bugSprites[b.dir][b.pause > 0 ? 0 : frame], Math.round(b.x), Math.round(b.y))
            }

            for (const s of slimes) {
                const set = s.vx < 0 ? slimeSpritesLeft : slimeSprites
                const squashed = s.hop === 0 && s.rest < 0.15
                const sprite = set[squashed ? 1 : 0]
                ctx.drawImage(sprite, Math.round(s.x), Math.round(height - sprite.height - 6 + s.hop))
            }

            if (invader.waitIn <= 0) {
                const bob = Math.sin(invader.t * 2) * 10
                ctx.drawImage(invaderSprites[Math.floor(time / 450) % 2], Math.round(invader.x), Math.round(invader.y + bob))
            }

            ctx.font = `${small ? 20 : 24}px ${pixelFont}`
            ctx.textAlign = 'center'
            for (const f of floaters) {
                ctx.globalAlpha = Math.max(0, 1 - f.age / 1.8)
                ctx.fillStyle = COLORS.a
                ctx.fillText(f.text, f.x + 16, f.y - 8 - f.age * 30)
            }
            ctx.globalAlpha = 1
        }

        let last = performance.now()
        let raf = 0
        const loop = (time: number) => {
            // Clamp the step so a backgrounded tab doesn't teleport everything on return
            update(Math.min((time - last) / 1000, 0.05))
            last = time
            draw(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        window.addEventListener('resize', resize)
        document.addEventListener('click', onClick)
        document.addEventListener('mousemove', onMove, { passive: true })
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            document.removeEventListener('click', onClick)
            document.removeEventListener('mousemove', onMove)
            document.documentElement.classList.remove('mob-hover')
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden className='pointer-events-none fixed inset-0 -z-10 h-full w-full' />
}
