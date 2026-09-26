// Prefixes a /public path with the configured basePath.
// next/link handles basePath automatically, plain <img> / <video> src do not.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string): string {
    if (/^https?:\/\//.test(path)) return path
    return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}
