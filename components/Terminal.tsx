'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { tech } from '@/content/tech'
import { skills } from '@/lib/skills'

type Line = { kind: 'cmd' | 'out' | 'hint', text: string }
type Result = { lines?: string[], href?: string, clear?: boolean }

const USER = 'alex'
const HOST = 'portfolio'
const MAX_LINES = 60
const NAV_DELAY_MS = 450

const stack = (['NodeJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'EC2'] as const).map((k) => tech[k].name).join(' · ')
const about = profile.about[0].replace(/\s+/g, ' ').trim()

const PAGES: Record<string, string> = {
    '~': '/', '/': '/', '..': '/', home: '/',
    projects: '/projects/', skills: '/skills/', library: '/library/', contact: '/contact/'
}
const FILES = ['stack.txt', 'about.txt', 'contact.sh']
const DIRS = ['projects/', 'skills/', 'library/']
const COMMANDS = ['help', 'ls', 'cd', 'cat', 'whoami', 'uname', 'pwd', 'date', 'echo', 'history', 'clear', './contact.sh']

const INTRO: Line[] = [
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', text: `${USER} — ${profile.role.toLowerCase()}` },
    { kind: 'cmd', text: 'cat stack.txt' },
    { kind: 'out', text: stack },
    { kind: 'cmd', text: 'ls domains/' },
    { kind: 'out', text: profile.domains.join('  ') },
    { kind: 'hint', text: 'Type help and press Enter. Tab completes.' }
]

const clean = (path: string) => path.replace(/^~?\//, '').replace(/^\.\//, '').replace(/\/+$/, '')

function cd(arg: string): Result {
    const target = arg === '~' || arg === '/' ? arg : clean(arg)
    if (!target) return { href: '/' }
    if (PAGES[target]) return { href: PAGES[target] }
    const slug = target.replace(/^projects\//, '')
    if (projects.some((p) => p.slug === slug)) return { href: `/projects/${slug}/` }
    return { lines: [`bash: cd: ${arg}: No such file or directory`] }
}

function run(input: string, history: string[]): Result {
    const [name = '', ...rest] = input.trim().split(/\s+/)
    const args = rest.filter((a) => !a.startsWith('-'))
    const arg = args.join(' ')

    switch (name.toLowerCase()) {
        case '':
            return {}
        case 'help':
            return {
                lines: [
                    'ls [dir]        list files, e.g. ls projects',
                    'cd <dir>        open a page: projects, skills, library, contact',
                    'cat <file>      print a file: stack.txt, about.txt',
                    './contact.sh    get in touch',
                    'whoami, uname, pwd, date, echo, history, clear',
                    '…plus a few things you will have to find yourself.'
                ]
            }
        case 'ls':
        case 'll':
            if (!arg || arg === '~' || arg === '.') return { lines: [[...DIRS, ...FILES].join('  ')] }
            if (clean(arg) === 'projects') return { lines: projects.map((p) => `${`${p.slug}/`.padEnd(28)}${p.name}`) }
            if (clean(arg) === 'skills') {
                const expert = skills.filter((s) => s.proficiency === 'Expert').length
                return { lines: [`${skills.length} technologies, ${expert} at expert level. cd skills to browse them.`] }
            }
            if (clean(arg) === 'library') return { lines: ['books sorted onto shelves. cd library to browse them.'] }
            if (clean(arg) === 'domains') return { lines: [profile.domains.join('  ')] }
            return { lines: [`ls: cannot access '${arg}': No such file or directory`] }
        case 'cd':
            return cd(arg || '~')
        case 'cat':
        case 'less':
        case 'more':
            if (clean(arg) === 'stack.txt') return { lines: [stack] }
            if (clean(arg) === 'about.txt') return { lines: [profile.headline, about] }
            if (clean(arg) === 'contact.sh') return { lines: ['#!/bin/bash', `open "mailto:${profile.email}"`] }
            if (DIRS.includes(`${clean(arg)}/`)) return { lines: [`${name}: ${arg}: Is a directory`] }
            return { lines: [arg ? `${name}: ${arg}: No such file or directory` : `${name}: missing file operand`] }
        case './contact.sh':
        case 'contact':
        case 'mail':
            return { lines: ['Opening contact form…'], href: '/contact/' }
        case 'projects':
        case 'skills':
        case 'library':
            return { lines: [`bash: ${name}: Is a directory. Try cd ${name}`] }
        case 'whoami':
            return { lines: [`${USER} — ${profile.name}, ${profile.role.toLowerCase()}`] }
        case 'uname':
            return { lines: [`Linux ${HOST} 3.0-backend #${profile.stats[0].value} SMP x86_64 GNU/Linux`] }
        case 'pwd':
            return { lines: [`/home/${USER}`] }
        case 'date':
            return { lines: [new Date().toString()] }
        case 'echo':
            return { lines: [rest.join(' ')] }
        case 'history':
            return { lines: history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`) }
        case 'clear':
        case 'cls':
            return { clear: true }

        // Easter eggs
        case 'sudo':
            return { lines: [`${USER} is not in the sudoers file. This incident will be reported.`] }
        case 'hire':
            return { lines: ['Excellent choice. Opening contact form…'], href: '/contact/' }
        case 'rm':
            return { lines: [`rm: refusing to remove '${arg || '/'}': protected by 93% test coverage`] }
        case 'exit':
        case 'logout':
            return { lines: ['logout… just kidding. Try cd projects'] }
        case 'vim':
        case 'vi':
        case 'nano':
            return { lines: ['You are now stuck in vim forever.', 'Just kidding. Try cd projects instead.'] }
        case 'make':
            return { lines: [`make: *** No rule to make target '${arg || 'all'}'.  Stop.`, arg === 'coffee' ? 'Try ./contact.sh, I will bring the coffee.' : ''].filter(Boolean) }
        case 'ping':
            return { lines: [`64 bytes from ${USER}: icmp_seq=1 ttl=64 time<24h`, 'Faster via ./contact.sh'] }
        case 'git':
            return { lines: ['On branch main', 'nothing to commit, working tree clean'] }
        case 'dir':
        case 'ver':
            return { lines: [`bash: ${name}: command not found. This isn't DOS, try ls`] }
        default:
            return { lines: [`bash: ${name}: command not found`] }
    }
}

/** Bash-like Tab completion: one folder level at a time, filled up to the longest shared prefix. */
function complete(value: string): string {
    const parts = value.split(' ')
    const last = parts.at(-1) ?? ''
    const pool = parts.length === 1
        ? COMMANDS
        : last.includes('/') ? projects.map((p) => `projects/${p.slug}/`) : [...DIRS, ...FILES]
    const matches = pool.filter((c) => c.startsWith(last))
    if (!matches.length) return value
    let prefix = matches[0]
    for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
    parts[parts.length - 1] = prefix + (matches.length === 1 && parts.length === 1 ? ' ' : '')
    return parts.join(' ')
}

/** Interactive bash-style prompt on the home page. */
export default function Terminal() {
    const router = useRouter()
    const [lines, setLines] = useState<Line[]>(INTRO)
    const [value, setValue] = useState('')
    const history = useRef<string[]>([])
    const historyIndex = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const screenRef = useRef<HTMLDivElement>(null)
    const navTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    // Keep the newest output visible without scrolling the page itself
    useEffect(() => {
        const screen = screenRef.current
        if (screen) screen.scrollTop = screen.scrollHeight
    }, [lines])

    useEffect(() => () => clearTimeout(navTimer.current), [])

    const print = (command: string, output: string[] = []) => {
        setLines((prev) => [
            ...prev,
            { kind: 'cmd' as const, text: command },
            ...output.map((text) => ({ kind: 'out' as const, text }))
        ].slice(-MAX_LINES))
    }

    const submit = () => {
        const command = value
        if (command.trim()) history.current.push(command)
        historyIndex.current = history.current.length
        const result = run(command, history.current)
        setValue('')

        if (result.clear) {
            setLines([])
            return
        }
        print(command, result.lines)
        if (result.href) {
            const href = result.href
            navTimer.current = setTimeout(() => router.push(href), NAV_DELAY_MS)
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            submit()
        } else if (e.key === 'Tab' && value) {
            // Only capture Tab while typing, so keyboard users can still tab out of an empty prompt
            e.preventDefault()
            setValue(complete(value))
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
            const items = history.current
            const next = Math.min(Math.max(historyIndex.current + (e.key === 'ArrowUp' ? -1 : 1), 0), items.length)
            historyIndex.current = next
            setValue(items[next] ?? '')
        } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault()
            setLines([])
        } else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !window.getSelection()?.toString()) {
            e.preventDefault()
            print(`${value}^C`)
            setValue('')
        }
    }

    return (
        <div className='card overflow-hidden transition-colors focus-within:border-accent'>
            <div className='flex items-center gap-2 border-b-2 border-border bg-surface-2 px-4 py-2'>
                <span className='h-3 w-3 rounded-full bg-coral' />
                <span className='h-3 w-3 rounded-full bg-accent' />
                <span className='h-3 w-3 rounded-full bg-teal' />
                <span className='ml-2 font-mono text-xs text-muted'>{USER}@{HOST}: ~</span>
            </div>
            <div
                ref={screenRef}
                className='pixel max-h-[22rem] min-h-[18rem] cursor-text overflow-y-auto p-5 text-xl leading-snug'
                onClick={() => {
                    if (window.getSelection()?.isCollapsed ?? true) inputRef.current?.focus({ preventScroll: true })
                }}
            >
                <div role='log' aria-live='polite' aria-label='Terminal output'>
                    {lines.map((line, i) => (
                        <p
                            key={i}
                            className={`whitespace-pre-wrap break-words ${
                                line.kind === 'out' ? 'text-accent' : line.kind === 'hint' ? 'mt-2 text-muted' : 'mt-2 first:mt-0'
                            }`}
                        >
                            {line.kind === 'cmd' && <Prompt />}
                            {line.text}
                        </p>
                    ))}
                </div>
                <label className='mt-2 flex items-baseline'>
                    <Prompt />
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        aria-label='Terminal command. Type help for a list.'
                        autoComplete='off'
                        autoCapitalize='off'
                        autoCorrect='off'
                        spellCheck={false}
                        enterKeyHint='go'
                        className='min-w-0 flex-1 bg-transparent text-text caret-accent outline-none focus-visible:outline-none'
                    />
                </label>
            </div>
        </div>
    )
}

function Prompt() {
    return (
        <span className='mr-2 shrink-0'>
            <span className='text-teal'>{USER}@{HOST}</span>
            <span className='text-muted'>:</span>
            <span className='text-accent'>~</span>
            <span className='text-muted'>$</span>
        </span>
    )
}
