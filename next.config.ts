import type { NextConfig } from 'next'

// Set NEXT_PUBLIC_BASE_PATH when the site is served from a sub-path,
// e.g. "/PersonalPortfolioNext" for https://kot-1999.github.io/PersonalPortfolioNext/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath,
    images: { unoptimized: true }
}

export default nextConfig
