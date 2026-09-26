import type { Link } from './types'

export const profile = {
    name: 'Oleksandr (Alex) Kashytskyi',
    shortName: 'Alex K.',
    logo: ':/ALEX',
    role: 'Backend Developer / Database Architect',
    location: 'London, UK',
    email: 'sashakashytskyy@gmail.com',
    /** Formspree endpoint used by the contact form */
    formspreeAction: 'https://formspree.io/f/mlggekeq',

    headline: 'I build scalable, well-tested backend systems.',
    about: [
        `I am a Backend Developer with 3+ years of production experience building scalable backend
        systems for B2B, B2C, and fintech products. I’ve worked on applications serving hundreds of
        thousands of clients and millions of requests per hour. I focus on code quality, performance,
        clean architecture, and long-term maintainability.`
    ],
    summary: [
        `Working at GoodRequest I’ve delivered robust solutions for companies like Notino, KIA, and
        Aivodot — designing REST APIs, optimizing databases, implementing caching strategies, and
        integrating complex workflows. I work across the full backend stack, from Node.js, TypeScript,
        and Express.js to PostgreSQL, Redis, Docker, and AWS, ensuring clean, maintainable, and
        well-tested code that powers real-world systems.`,
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
        { value: '93%', label: 'test coverage reached on Notino' },
        { value: '30k+', label: 'markets scored on Aivodot' }
    ],

    experience: [
        {
            company: 'GoodRequest',
            role: 'Backend Engineer',
            description: 'Backend services for Notino, KIA, Aivodot and Benzinol in cross-functional teams.',
            projects: ['notino', 'aivodot', 'kia', 'benzinol', 'express-joi-to-swagger']
        }
    ],

    education: [
        {
            degree: 'MSc Web Development',
            school: 'University of Roehampton, London',
            period: '2025 – 2026'
        },
        {
            degree: 'BSc Computer Science',
            school: 'Technical University of Košice',
            period: '2019 – 2022',
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
