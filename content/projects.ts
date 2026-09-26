import type { Project } from './types'

/**
 * Projects are shown in this order.
 * To add one: append an object here and drop images into /public/projects/<slug>/.
 */
export const projects: Project[] = [
    {
        slug: 'flowers-shop',
        name: 'Flowers Shop',
        tagline: 'Multilingual e-commerce platform with payments, shipping and an AI assistant.',
        category: 'Personal',
        featured: true,
        role: 'Backend Engineer / Architect',
        duration: 'Ongoing',
        team: 'Solo',
        status: 'Active Development',
        overview: `Flowers Shop is a full-featured e-commerce platform for an online flower store. The backend
            provides product management, multilingual content, user authentication, basket and order
            processing, Stripe payments, Shippo shipping integration, and S3 cloud storage. A Next.js
            frontend with Ant Design covers both the customer shop and the admin website management.`,
        responsibilities: [
            'Design and implement a scalable e-commerce backend architecture',
            'Develop REST APIs for users, products, categories, baskets, and orders',
            'Implement authentication with sessions, JWT, and Google OAuth',
            'Integrate Stripe payment processing and payment lifecycle management',
            'Implement shipping calculation with an external delivery provider (Shippo)',
            'Configure cloud storage for product images using S3-compatible services',
            'Create the database schema and migrations using Prisma ORM',
            'Implement multilingual content management and translations'
        ],
        impact: [
            'Built a complete e-commerce backend from scratch',
            'Implemented secure checkout and payment processing workflows',
            'Designed a database supporting products, pricing, orders, and translations',
            'Integrated external services including Stripe, Shippo, Redis, and object storage',
            'Created reusable backend patterns for future marketplace projects'
        ],
        tech: [
            'TypeScript', 'NodeJS', 'Express-js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Stripe',
            'Shippo', 'S3', 'LocalStack', 'Passport', 'JWT', 'OAuth', 'JOI', 'Swagger', 'i18next',
            'Winston', 'Sentry', 'Mocha', 'Chai', 'Ollama', 'NextJS', 'React', 'Ant-Design'
        ],
        links: [
            { label: 'Backend', href: 'https://github.com/kot-1999/flowers_shop_be' },
            { label: 'Frontend', href: 'https://github.com/kot-1999/flowers_shop_fe' },
            { label: 'API docs', href: 'https://kot-1999.github.io/flowers_shop_be/' }
        ],
        images: [
            { src: '/projects/flowers-shop/home.webp', caption: 'Home page' },
            { src: '/projects/flowers-shop/home-dark.webp', caption: 'Home page, dark theme' },
            { src: '/projects/flowers-shop/cart.webp', caption: 'Basket' },
            { src: '/projects/flowers-shop/checkout.webp', caption: 'Checkout' },
            { src: '/projects/flowers-shop/orders.webp', caption: 'Orders' },
            { src: '/projects/flowers-shop/admin-goods.webp', caption: 'Website management: goods' },
            { src: '/projects/flowers-shop/admin-edit-product.webp', caption: 'Website management: edit product' },
            { src: '/projects/flowers-shop/db-schema.webp', caption: 'Database schema' }
        ]
    },
    {
        slug: 'restboo',
        name: 'RestBoo',
        tagline: 'Multi-role restaurant booking platform for customers, admins and staff.',
        category: 'Personal',
        featured: true,
        role: 'Idea creator, Backend Developer, System Architect, Database Designer',
        duration: 'Ongoing',
        team: '2 people (backend + frontend)',
        status: 'Maintained',
        overview: `RestBoo is a multi-role restaurant booking platform that centralises reservations for both
            customers and restaurant operators. Users discover restaurants, see availability in real time
            and book instantly, while administrators manage bookings, staff, brands, and locations across
            multiple branches. It eliminates double bookings and fragmented tools by keeping all operations
            in a single system, supporting both B2C and B2B workflows.`,
        responsibilities: [
            'Design the system architecture and database schema',
            'Build REST APIs for users, admins, and employees with role-based access control',
            'Implement authentication with JWT, sessions, and Google OAuth via Passport',
            'Implement transactional emails for bookings, invitations, and password recovery',
            'Integrate S3-compatible file storage and OpenStreetMap geolocation',
            'Set up Docker environments, CI with GitHub Actions, and Mocha/Chai test suites'
        ],
        impact: [
            'Delivered a complete booking flow for three user roles',
            'Soft deletion, centralized error handling, and rate limiting for production-like robustness',
            'Structured logging with daily rotation and Sentry error tracking',
            'Fully dockerized setup that starts with a single command'
        ],
        tech: [
            'TypeScript', 'NodeJS', 'Express-js', 'MySQL', 'Prisma', 'Redis', 'Docker', 'Passport', 'JWT',
            'OAuth', 'Helmet', 'JOI', 'Swagger', 'S3', 'Winston', 'Sentry', 'Mocha', 'Chai', 'GitHub-Actions'
        ],
        links: [
            { label: 'Backend', href: 'https://github.com/kot-1999/RestB_BE' },
            { label: 'Frontend', href: 'https://github.com/kot-1999/RestB_FE' }
        ],
        images: [
            { src: '/projects/restboo/home.webp', caption: 'Home page' },
            { src: '/projects/restboo/restaurant-details.webp', caption: 'Restaurant details' },
            { src: '/projects/restboo/user-bookings.webp', caption: 'User bookings' },
            { src: '/projects/restboo/admin-dashboard.webp', caption: 'Admin dashboard' },
            { src: '/projects/restboo/manage-bookings.webp', caption: 'Booking management' },
            { src: '/projects/restboo/manage-restaurant.webp', caption: 'Restaurant create / edit' },
            { src: '/projects/restboo/login.webp', caption: 'Login' },
            { src: '/projects/restboo/email.webp', caption: 'Booking approved email' }
        ]
    },
    {
        slug: 'notino',
        name: 'Notino',
        tagline: 'Backend services for one of Europe’s leading beauty e-commerce platforms.',
        category: 'Commercial',
        client: 'GoodRequest',
        featured: true,
        role: 'Backend Engineer',
        duration: '18 months',
        team: 'Project managers, backend, frontend, QA, and designers',
        status: 'Live',
        overview: `Developed scalable backend services for Notino, one of the leading European e-commerce
            platforms for beauty and personal care. Focused on high-performance APIs, database optimization,
            and secure payment processing, ensuring seamless integration with inventory, shipping, and
            third-party payment systems.`,
        responsibilities: [
            'Design and maintain REST APIs serving millions of users',
            'Optimize database queries and caching strategies using Redis',
            'Collaborate closely with frontend, QA, and design teams',
            'Implement logging and error tracking with Sentry'
        ],
        impact: [
            'Reduced code duplication by 70% by introducing a new endpoint versioning strategy',
            'Introduced a new caching strategy that removed unnecessary complexity from endpoints',
            'Identified and optimized the slowest 20% of SQL queries to the PostgreSQL database',
            'Increased integration and unit test coverage from 79% to 93%',
            'Updated email notifications to pass 99% of spam checkers'
        ],
        tech: [
            'TypeScript', 'NodeJS', 'Express-js', 'PostgreSQL', 'Sequelize', 'Redis', 'RabbitMQ', 'Docker',
            'EC2', 'RDS', 'SES', 'Swagger', 'JOI', 'Sentry'
        ],
        links: [{ label: 'Case study', href: 'https://www.goodrequest.com/work/notino' }],
        icon: '/logos/notino-icon.png',
        images: [
            { src: '/projects/notino/1.webp', caption: 'Notino on tablet' },
            { src: '/projects/notino/2.webp', caption: 'Notino app' }
        ]
    },
    {
        slug: 'aivodot',
        name: 'Aivodot',
        tagline: 'Personalised investment guidance tailored to each investor’s risk profile.',
        category: 'Commercial',
        client: 'GoodRequest',
        featured: true,
        role: 'Backend Engineer',
        duration: '7 months',
        team: 'Project managers, backend, frontend, QA, and designers',
        status: 'Live',
        overview: `AIVODOT helps investors navigate the complexity of portfolio construction. Instead of
            generic recommendations that lead to herd behavior, the platform delivers personalized guidance
            tailored to each investor’s risk profile, style, and preferences, simplifies security selection,
            and includes educational resources for building optimized portfolios.`,
        responsibilities: [
            'Build scalable backend services to handle API workflows',
            'Manage data pipelines, storage, and queues',
            'Optimize async tasks and data processing'
        ],
        impact: [
            'Implemented registration flows for administrators and users',
            'Implemented subscription flows for three subscription tiers',
            'Implemented the core logic calculating risk, match and other scores per user for over 30k markets',
            'Improved the DB architecture early on to avoid future performance problems'
        ],
        tech: [
            'TypeScript', 'NodeJS', 'Express-js', 'MongoDB', 'Redis', 'Stripe', 'Docker', 'S3', 'EC2',
            'CloudWatch', 'Swagger', 'Sentry', 'Sequelize', 'JOI', 'JWT'
        ],
        links: [{ label: 'Case study', href: 'https://www.goodrequest.com/work/aivodot' }],
        icon: '/logos/aivodot-icon.png'
    },
    {
        slug: 'kia',
        name: 'KIA',
        tagline: 'Anonymous employee feedback platform for Kia Slovakia’s HR team.',
        category: 'Commercial',
        client: 'GoodRequest',
        role: 'Backend Engineer',
        duration: '4 months',
        team: 'Project managers, backend, frontend, QA, and designers',
        status: 'Live',
        overview: `A custom feedback platform for Kia Slovakia that lets the HR team create, manage, and
            evaluate anonymous questionnaires. The system focuses on user comfort, speed, and clarity of
            results, reducing completion time while improving feedback quality.`,
        responsibilities: [
            'Implement REST APIs for questionnaire and user management',
            'Optimize DB queries for large datasets',
            'Integrate caching strategies and real-time updates',
            'Collaborate with frontend and mobile developers'
        ],
        impact: ['Secured sensitive user data', 'Integrated multiple external APIs'],
        tech: ['TypeScript', 'NodeJS', 'Express-js', 'PostgreSQL', 'Sequelize', 'Redis', 'Docker', 'Swagger'],
        links: [{ label: 'Case study', href: 'https://www.goodrequest.com/work/kia-en' }],
        icon: '/logos/kia-icon.png'
    },
    {
        slug: 'benzinol',
        name: 'Benzinol',
        tagline: 'Loyalty programme mobile app for iOS and Android.',
        category: 'Commercial',
        client: 'GoodRequest',
        role: 'Backend Engineer',
        duration: '6 months',
        team: 'Project managers, backend, frontend, QA, and designers',
        status: 'Live',
        overview: `The Benzinol mobile application modernizes the loyalty program experience. Users create
            and manage loyalty cards, collect reward points, and see their profile, transaction history,
            and available rewards. Built with a strong emphasis on performance and usability.`,
        responsibilities: ['Optimize database queries for real-time performance', 'Ensure high uptime and scalability'],
        impact: ['Maintained 99.9% uptime', 'Kept data consistent across multiple devices'],
        tech: ['TypeScript', 'NodeJS', 'Express-js', 'PostgreSQL', 'Redis', 'Docker', 'Swagger', 'JOI', 'JWT'],
        links: [{ label: 'Case study', href: 'https://www.goodrequest.com/blog/grpartners-benzinol-apps' }],
        icon: '/logos/benzinol-icon.png'
    },
    {
        slug: 'bar-thunder',
        name: 'BarThunder',
        tagline: 'Cocktail discovery and management app built on the Bar Assistant API.',
        category: 'Personal',
        role: 'Full Stack Developer',
        duration: 'Ongoing',
        team: 'Solo',
        status: 'Maintained',
        overview: `BarThunder is a cocktail management and discovery app for bartenders and enthusiasts who
            want to explore, rate, and organize drinks in a clean and fast interface. It connects to the Bar
            Assistant API and provides a user-friendly frontend for browsing a large collection of cocktails,
            viewing detailed recipes, managing a personal ingredient shelf, and creating new cocktails.`,
        responsibilities: [
            'Build the Next.js App Router frontend with server and client components',
            'Integrate cocktails, collections, ingredients, bars, and auth endpoints of the Bar Assistant API',
            'Set up the local API, search, and database stack with Docker Compose'
        ],
        impact: [
            'Delivered browsing, rating, collections, shelf management, and cocktail creation',
            'One-command local environment for the whole stack'
        ],
        tech: ['TypeScript', 'NextJS', 'React', 'Ant-Design', 'Docker'],
        links: [{ label: 'Source', href: 'https://github.com/kot-1999/BarThunder' }],
        images: [
            { src: '/projects/bar-thunder/home.webp', caption: 'Home page' },
            { src: '/projects/bar-thunder/cocktail-details.webp', caption: 'Cocktail details' },
            { src: '/projects/bar-thunder/shelf.webp', caption: 'My shelf' },
            { src: '/projects/bar-thunder/create-cocktail.webp', caption: 'Create cocktail' },
            { src: '/projects/bar-thunder/about.webp', caption: 'About' }
        ]
    },
    {
        slug: 'express-joi-to-swagger',
        name: 'express-joi-to-swagger',
        tagline: 'Open-source tool generating Swagger docs straight from Express + Joi code.',
        category: 'Open Source',
        client: 'GoodRequest',
        role: 'Software Developer',
        duration: '3 months',
        team: 'Multi-contributor open-source effort',
        status: 'Maintained',
        overview: `Open-source library that converts Joi validation schemas into Swagger/OpenAPI documentation
            for Express applications. It lists every registered endpoint with routes, methods, and relevant
            middlewares — no annotations or separate doc files required.`,
        responsibilities: [
            'Implement new Swagger versioning',
            'Update schema conversion logic',
            'Update documentation and tests'
        ],
        impact: ['Used in personal and community projects', 'Open-source contributions and forks'],
        tech: ['TypeScript', 'NodeJS', 'Express-js', 'JOI', 'Swagger'],
        links: [
            { label: 'Source', href: 'https://github.com/GoodRequest/express-joi-to-swagger' },
            { label: 'npm', href: 'https://www.npmjs.com/package/@goodrequest/express-joi-to-swagger' }
        ],
        icon: '/logos/goodrequest-icon.png'
    },
    {
        slug: 'backend-express-template',
        name: 'Backend Express Template',
        tagline: 'Production-ready Express + TypeScript starter used across my projects.',
        category: 'Personal',
        role: 'Backend Engineer / Architect',
        duration: 'Ongoing',
        team: 'Solo',
        status: 'Maintained',
        overview: `BE-express demonstrates a robust backend application built with modern technologies and
            best practices. Built with Express.js and TypeScript, it provides a solid foundation for scalable
            and maintainable server-side applications and serves as the base for RestBoo.`,
        responsibilities: [
            'Design a modular backend architecture',
            'Implement authentication and session handling',
            'Integrate Redis and PostgreSQL for storage',
            'Configure logging, monitoring, and error tracking',
            'Set up ESLint, testing, and environment configs'
        ],
        impact: ['Used as the base for multiple side projects', 'Improved code consistency and maintainability'],
        tech: [
            'TypeScript', 'NodeJS', 'Express-js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Eslint', 'Winston',
            'JWT', 'Helmet', 'OAuth', 'Swagger', 'Sentry', 'Google-Cloud-Console'
        ],
        links: [{ label: 'Source', href: 'https://github.com/kot-1999/BE-express' }],
        icon: '/logos/backend-template-icon.png'
    },
    {
        slug: 'city-desk',
        name: 'CityDesk',
        tagline: 'Report city breakdowns on a live map — built in 48 hours.',
        category: 'Hackathon',
        role: 'Full Stack Developer',
        duration: '48 hours',
        team: '4 people',
        status: 'Prototype',
        overview: `An application for reporting failures and breakdowns in the city, built in 48 hours.
            Real-time visualization of city data and task tracking for urban planning, focused on rapid
            prototyping and cross-team collaboration.`,
        responsibilities: ['Create the dashboard frontend with live updates', 'Implement real-time issue updates on the map'],
        impact: [
            'Demo-ready dashboard recognized among top hackathon projects',
            'Real-time collaboration and data syncing',
            'Functional prototype built in limited time'
        ],
        tech: ['NodeJS', 'React-Native', 'JavaScript', 'HTML', 'CSS', 'Leaflet', 'Bootstrap'],
        links: [{ label: 'Source', href: 'https://github.com/Dmytro27Ind/city-desk' }],
        icon: '/logos/city-desk-icon.png',
        images: [
            { src: '/projects/city-desk/1.webp', caption: 'Login screen' },
            { src: '/projects/city-desk/4.webp', caption: 'Breakdowns on map' },
            { src: '/projects/city-desk/2.webp', caption: 'New post for a breakdown' },
            { src: '/projects/city-desk/3.webp', caption: 'Profile info' }
        ]
    },
    {
        slug: 'way-of-memories',
        name: 'Way of Memories',
        tagline: 'AR-based 2D single-player game made in 72 hours.',
        category: 'Hackathon',
        role: 'Game Developer',
        duration: '72 hours',
        team: '4 people',
        status: 'Prototype',
        overview: 'AR-based 2D single-player game developed in 3 days, focused on game logic and augmented reality features.',
        responsibilities: ['AR feature integration', 'Game UI development'],
        impact: ['Playable AR game demo completed', 'Hackathon recognition'],
        tech: ['CSharp-Language', 'Unity'],
        links: [{ label: 'Devpost', href: 'https://devpost.com/software/way-of-memories' }],
        icon: '/logos/way-of-memories-icon.png',
        videoUrl: 'https://www.youtube.com/embed/VV7NYGk6_Gc'
    },
    {
        slug: 'maze',
        name: 'Maze',
        tagline: 'Maze generation and solving algorithms with a visual web UI.',
        category: 'Personal',
        role: 'Developer',
        duration: '6 months',
        team: 'Solo',
        status: 'Completed',
        overview: `BA-Maze generates and solves mazes using various algorithms. Its graphical interface
            visualizes the generation and solving processes, making it an educational tool for understanding
            these algorithms.`,
        responsibilities: [
            'Implement maze generation algorithms',
            'Ensure correctness of the algorithms',
            'Structure code for clarity, extensibility, and testability'
        ],
        impact: ['Strengthened understanding of algorithms', 'Reusable logic for future algorithmic problems'],
        tech: ['Java', 'Spring-Boot', 'HTML', 'CSS'],
        links: [{ label: 'Source', href: 'https://github.com/kot-1999/BA-Maze' }],
        icon: '/logos/maze-icon.png',
        images: [
            { src: '/projects/maze/1.webp', caption: 'Game' },
            { src: '/projects/maze/4.webp', caption: 'Ranking' },
            { src: '/projects/maze/2.webp', caption: 'Authorization' },
            { src: '/projects/maze/3.webp', caption: 'Comments' }
        ]
    },
    {
        slug: 'weather',
        name: 'Weather App',
        tagline: 'Real-time weather, forecasts, air pollution and cloud maps.',
        category: 'Personal',
        role: 'Full Stack Developer',
        duration: '1 month',
        team: 'Solo',
        status: 'Completed',
        overview: `A hybrid BE/FE application providing weather data and services. It uses external APIs to
            gather real-time weather information and exposes endpoints for current weather, forecasts, and
            detailed metrics.`,
        responsibilities: [
            'Design and build a clean, user-friendly UI',
            'Integrate third-party weather APIs',
            'Handle async data fetching and error states'
        ],
        impact: [
            'Real-time weather data from third-party APIs',
            'Detailed metrics such as temperature, humidity, and wind speed',
            'Requests tailored to specific data needs (current weather, forecasts)'
        ],
        tech: ['JavaScript', 'React-Native', 'HTML', 'CSS'],
        links: [{ label: 'Source', href: 'https://github.com/kot-1999/BA-Weather' }],
        icon: '/logos/weather-icon.png',
        videoUrl: 'https://www.youtube.com/embed/ZaQ60oc3CUQ',
        images: [
            { src: '/projects/weather/1.webp', caption: 'Daily weather forecast' },
            { src: '/projects/weather/4.webp', caption: 'Clouds map' },
            { src: '/projects/weather/2.webp', caption: 'Air pollution info' },
            { src: '/projects/weather/3.webp', caption: 'Application settings' }
        ]
    }
]

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug)
}
