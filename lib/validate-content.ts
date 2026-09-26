import fs from 'node:fs'
import path from 'node:path'

import { books } from '@/content/books'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { tech, techIcon, type TechKey } from '@/content/tech'

/**
 * Runs at build time. Fails the build when content points at an image that
 * does not exist in /public, or when two projects share a slug.
 */
export function validateContent() {
    const publicDir = path.join(process.cwd(), 'public')
    const paths = [
        ...profile.socials.map((s) => s.icon),
        ...books.map((b) => b.cover),
        ...(Object.keys(tech) as TechKey[]).map(techIcon),
        ...projects.flatMap((p) => [p.icon, ...(p.images ?? []).map((i) => i.src)])
    ].filter((p): p is string => Boolean(p))

    const missing = [...new Set(paths)].filter((p) => !fs.existsSync(path.join(publicDir, p)))
    if (missing.length) {
        throw new Error(`Missing files in /public:\n  ${missing.join('\n  ')}`)
    }

    const slugs = projects.map((p) => p.slug)
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
    if (dupes.length) {
        throw new Error(`Duplicate project slugs: ${dupes.join(', ')}`)
    }
}
