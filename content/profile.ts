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
        `I am a Backend Developer with 3+ years of experience building scalable Node.js systems for B2B,
        B2C, and fintech products. I’ve contributed to applications serving 30M+ users with high traffic
        and 99.9% uptime. I focus on clean architecture, performance optimisation, and reliable
        data-intensive systems.`
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
            company: 'Self-employed',
            role: 'Full-Stack Developer · Upwork',
            period: '2026 – Present',
            description: 'Freelance full-stack work for clients on Upwork, and FlowersShop, a multi-language e-commerce platform (public beta; active development continues in private repositories).',
            projects: ['flowers-shop']
        },
        {
            company: 'OudTech',
            role: 'Volunteer Backend Developer',
            period: '2026',
            description: 'Improved the Tech Academy platform’s quality through refactoring and architectural improvements.',
            projects: ['tech-academy']
        },
        {
            company: 'GoodRequest',
            role: 'Backend Developer',
            period: '2022 – 2025',
            description: 'Designed REST APIs, optimised SQL queries and introduced caching that cut backend complexity and response times, in Agile teams shipping software used by millions.',
            projects: ['notino', 'aivodot', 'kia', 'benzinol', 'express-joi-to-swagger']
        },
        {
            company: 'GoodRequest Academy',
            role: 'Intern Backend Developer',
            period: '2022',
            description: 'Built backend features under senior mentorship; first commercial experience with Git, databases, REST APIs and Agile.',
            projects: []
        },
        {
            company: 'Self-employed',
            role: 'C-Language Teacher',
            period: '2020 – 2022',
            description: 'One-to-one C lessons for around 20 university students: algorithms, pointers, memory management and debugging.',
            projects: []
        }
    ],

    education: [
        {
            degree: 'MSc Web Development',
            school: 'University of Roehampton, London',
            period: '2025 – 2026',
            grade: 'First class honours'
        },
        {
            degree: 'BSc Computer Science',
            school: 'Technical University of Košice',
            period: '2019 – 2022',
            grade: 'First class honours',
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
