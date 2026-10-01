import type { Link } from './types'

export const profile = {
    name: 'Oleksandr (Alex) Kashytskyi',
    shortName: 'Alex K.',
    logo: ':/ALEX',
    role: 'Backend Software Engineer',
    location: 'London, UK',
    workRights: 'Full UK right to work, no sponsorship needed',
    email: 'sashakashytskyy@gmail.com',
    /** Formspree endpoint used by the contact form */
    formspreeAction: 'https://formspree.io/f/mlggekeq',
    /** Google Calendar appointment page behind the "Book a call" buttons */
    bookingUrl: 'https://calendar.app.google/Yg9HMPFqktqosbRL7',

    headline: 'I build scalable, well-tested backend systems.',
    about: [
        `I am a Backend Software Engineer with 3+ years of commercial experience designing and scaling
        Node.js/TypeScript systems for B2B, B2C and fintech products, including applications serving 30M+
        users at 99.9% uptime. I’m strong in REST API design, PostgreSQL performance, caching and payment
        integrations, with full-stack ability in React and Next.js.`
    ],
    summary: [
        `Working at GoodRequest I’ve delivered robust solutions for companies like Notino, KIA, and
        Aivodot — designing REST APIs, optimizing databases, implementing caching strategies, and
        integrating complex workflows. I work across the full backend stack, from Node.js, TypeScript,
        and Express.js to PostgreSQL, Redis, Docker, and AWS, ensuring clean, maintainable, and
        well-tested code that powers real-world systems.`,
        `Today I work as a self-employed full-stack developer, mainly with clients on Upwork, while
        building FlowersShop, a multi-language e-commerce platform, from requirements to deployment. Its
        public beta is open source; active development continues in private repositories.`,
        `Beyond professional projects, I build personal and open-source applications that show my
        ability to tackle complex logic, ship functional prototypes, and experiment with new
        technologies. With a solid foundation in algorithms, design patterns, and software architecture,
        I create solutions that are reliable, efficient, and user-focused.`
    ],

    domains: ['B2B', 'B2C', 'Fintech', 'E-commerce', 'Enterprise Systems'],

    whatIDo: [
        'Design and maintain scalable REST APIs',
        'Build and evolve Node.js backend systems',
        'Optimise databases and data-heavy workflows',
        'Refactor legacy systems safely in production',
        'Collaborate in cross-functional Agile teams'
    ],

    stats: [
        { value: '3+', label: 'years in production' },
        { value: '30M+', label: 'users on apps I’ve worked on' },
        { value: '99.9%', label: 'uptime on production systems' }
    ],

    experience: [
        {
            company: 'Upwork',
            role: 'Freelance Software Engineer · Remote',
            period: 'Jun 2026 – Present',
            description: 'Backend and full-stack work for clients through Upwork, and Flowers Shop: a multilingual e-commerce platform for a family flower business, built end to end (public beta; active development continues in private repositories).',
            projects: ['flowers-shop']
        },
        {
            company: 'Oud Technologies',
            role: 'Volunteer Backend Developer · Remote',
            period: 'Jan 2026 – May 2026',
            description: 'Refactored the TypeScript backend of Tech Academy, an educational web platform, improving code structure, maintainability and architecture.',
            projects: ['tech-academy']
        },
        {
            company: 'GoodRequest',
            role: 'Backend Developer · Košice, Slovakia',
            period: 'Mar 2022 – Aug 2025',
            description: 'Maintained and extended high-traffic modules for Notino across multiple EU markets. Designed and documented REST APIs, optimised PostgreSQL queries and caching, integrated Stripe subscriptions and webhooks, and introduced Sentry monitoring. Joined through the GoodRequest Academy backend bootcamp (Mar–Jul 2022).',
            projects: ['notino', 'aivodot', 'kia', 'benzinol', 'express-joi-to-swagger']
        },
        {
            company: 'Self-employed',
            role: 'C Programming Tutor · Košice, Slovakia',
            period: 'May 2020 – Mar 2022',
            description: 'Taught C to around 20 university students one-to-one: algorithms, pointers, memory management and debugging.',
            projects: []
        }
    ],

    education: [
        {
            degree: 'MSc Web Development',
            school: 'University of Roehampton, London',
            period: 'Sep 2025 – Aug 2026',
            grade: 'First class honours',
            detail: 'Dissertation: a modern e-commerce application with multilingual support, online payments and shipping integration.'
        },
        {
            degree: 'BSc Computer Science',
            school: 'Technical University of Košice',
            period: 'Sep 2019 – Jul 2022',
            grade: 'First class honours',
            detail: 'Modules: Algorithms and Data Structures, Operating Systems, Software Architecture, Component-Based Development.',
            note: {
                label: 'Thesis: Implementation of OpenAI environment',
                href: 'https://www.youtube.com/watch?v=DrO_A16kGj8'
            }
        }
    ],

    socials: [
        { label: 'GitHub', href: 'https://github.com/kot-1999', icon: '/icons/social-GitHub.png' },
        {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/oleksandr-kashytskyi-07974b22b/',
            icon: '/icons/social-LinkedIn.png'
        },
        { label: 'Dev.to', href: 'https://dev.to/oleksandr_kashytskyi_a630', icon: '/icons/social-Dev-Community.png' }
    ] satisfies (Link & { icon: string })[]
}

export const navigation: Link[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Skills', href: '/skills/' },
    { label: 'Library', href: '/library/' },
    { label: 'Contact', href: '/contact/' }
]
