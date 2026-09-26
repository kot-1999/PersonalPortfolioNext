import type { Tech } from './types'

/**
 * Every technology used anywhere on the site.
 *
 * - The key is also the icon file name: /public/icons/<key>.png
 * - Entries with `proficiency` appear on the Skills page.
 * - Entries without it are only used as badges on projects.
 */
export const tech = {
    // Languages
    TypeScript: {
        name: 'TypeScript',
        categories: ['Languages'],
        proficiency: 'Expert',
        description: 'Strongly typed JavaScript superset improving code safety, refactoring, and scalability.'
    },
    JavaScript: {
        name: 'JavaScript',
        categories: ['Languages'],
        proficiency: 'Expert',
        description: 'Core language of the web used across frontend interfaces and backend services.'
    },
    Python: {
        name: 'Python',
        categories: ['Languages'],
        proficiency: 'Expert',
        description: 'General-purpose language used for backend services, scripting, and automation.'
    },
    Java: {
        name: 'Java',
        categories: ['Languages'],
        proficiency: 'Advanced',
        description: 'Enterprise-grade language for building reliable, long-running backend systems.'
    },
    'C-Language': {
        name: 'C',
        categories: ['Languages'],
        proficiency: 'Expert',
        description: 'Low-level language used to understand memory management and system-level programming.'
    },
    'CSharp-Language': {
        name: 'C#',
        categories: ['Languages'],
        proficiency: 'Advanced',
        description: 'Strongly typed language used for backend development on the .NET platform.'
    },
    'C++-Language': {
        name: 'C++',
        categories: ['Languages'],
        proficiency: 'Basic',
        description: 'Used for system programming, performance-critical applications, and game development.'
    },

    // Backend
    NodeJS: {
        name: 'Node.js',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'JavaScript runtime for building fast, scalable backend services and event-driven APIs.'
    },
    'Express-js': {
        name: 'Express.js',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'Minimal Node.js framework for building REST APIs with middleware-based architecture.'
    },
    Prisma: {
        name: 'Prisma',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'Type-safe ORM simplifying database access and schema migrations.'
    },
    Sequelize: {
        name: 'Sequelize',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'ORM providing model-based access to SQL databases.'
    },
    JOI: {
        name: 'Joi',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'Schema-based validation library ensuring API request data integrity.'
    },
    Docker: {
        name: 'Docker',
        categories: ['DevOps', 'Backend'],
        proficiency: 'Expert',
        description: 'Containerization platform ensuring consistent runtime environments.'
    },
    BullMQ: {
        name: 'BullMQ',
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'Redis-based queue system for background jobs and async processing.'
    },
    RabbitMQ: {
        name: 'RabbitMQ',
        categories: ['Backend'],
        proficiency: 'Advanced',
        description: 'Message broker enabling asynchronous system communication.'
    },
    ElasticSearch: {
        name: 'Elasticsearch',
        categories: ['Backend'],
        proficiency: 'Advanced',
        description: 'Search and analytics engine used for log analysis and observability.'
    },
    Swagger: {
        name: 'Swagger',
        categories: ['Backend', 'Project Management'],
        proficiency: 'Expert',
        description: 'Tooling for designing, documenting, and testing REST APIs using OpenAPI specifications.'
    },
    Stripe: {
        name: 'Stripe',
        categories: ['Backend'],
        proficiency: 'Advanced',
        description: 'Payment processing platform for subscriptions, payments, and billing workflows.'
    },
    i18next: {
        name: 'i18next',
        categories: ['Backend', 'Frontend'],
        proficiency: 'Expert',
        description: 'Internationalization framework for managing translations and multi-language support.'
    },
    'Spring-Boot': {
        name: 'Spring Boot',
        categories: ['Backend'],
        proficiency: 'Basic',
        description: 'Java framework for building scalable and production-ready backend services.'
    },
    'Google-Cloud-Console': {
        name: 'Google Cloud',
        categories: ['Backend'],
        proficiency: 'Basic',
        description: 'Google APIs and services used for integrations such as OAuth sign-in.'
    },
    'Shell-Script': {
        name: 'Shell',
        categories: ['DevOps'],
        proficiency: 'Basic',
        description: 'Used for automating deployments, server tasks, and development workflows.'
    },

    Nodemailer: {
        name: 'Nodemailer',
        icon: null,
        categories: ['Backend'],
        proficiency: 'Expert',
        description: 'Transactional emails — bookings, invitations, password recovery — rendered from EJS templates.'
    },
    NestJS: {
        name: 'NestJS',
        icon: '/icons/NestJS.svg',
        categories: ['Backend'],
        proficiency: 'Basic',
        description: 'Opinionated Node.js framework with modules and dependency injection, explored in a starter template.'
    },
    SocketIO: {
        name: 'Socket.IO',
        icon: '/icons/SocketIO.svg',
        categories: ['Backend'],
        proficiency: 'Basic',
        description: 'WebSocket library for real-time, bidirectional events between server and clients.'
    },
    Zod: {
        name: 'Zod',
        icon: '/icons/Zod.svg',
        categories: ['Backend', 'Frontend'],
        proficiency: 'Basic',
        description: 'TypeScript-first schema validation with static type inference.'
    },

    // Storage
    PostgreSQL: {
        name: 'PostgreSQL',
        categories: ['Storage'],
        proficiency: 'Expert',
        description: 'Advanced relational database focused on data integrity, performance, and complex queries.'
    },
    MySQL: {
        name: 'MySQL',
        categories: ['Storage'],
        proficiency: 'Advanced',
        description: 'Popular relational database used in transactional and data-driven systems.'
    },
    MongoDB: {
        name: 'MongoDB',
        categories: ['Storage'],
        proficiency: 'Advanced',
        description: 'NoSQL document database designed for flexible schemas and rapid iteration.'
    },
    Redis: {
        name: 'Redis',
        categories: ['Storage'],
        proficiency: 'Expert',
        description: 'In-memory data store used for caching, queues, sessions, and real-time data.'
    },

    Mongoose: {
        name: 'Mongoose',
        icon: '/icons/Mongoose.svg',
        categories: ['Storage'],
        proficiency: 'Basic',
        description: 'MongoDB object modelling with schemas, validation and middleware hooks.'
    },

    // Frontend
    HTML: {
        name: 'HTML',
        categories: ['Frontend'],
        proficiency: 'Expert',
        description: 'Markup language defining semantic structure of web pages.'
    },
    CSS: {
        name: 'CSS',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Styling language used for layouts, responsiveness, and UI design.'
    },
    Bootstrap: {
        name: 'Bootstrap',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'CSS framework for building responsive and consistent user interfaces.'
    },
    Leaflet: {
        name: 'Leaflet',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Lightweight JavaScript library for interactive maps and geospatial visualizations.'
    },
    'React-Native': {
        name: 'React Native',
        icon: '/icons/React.svg',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Framework for building cross-platform mobile applications with React concepts.'
    },

    NextJS: {
        name: 'Next.js',
        icon: '/icons/NextJS.svg',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'React framework with the App Router — used for the Flowers Shop storefront, BarThunder and this site.'
    },
    React: {
        name: 'React',
        icon: '/icons/React.svg',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Component-based UI library; server and client components in Next.js apps.'
    },
    'Ant-Design': {
        name: 'Ant Design',
        icon: '/icons/Ant-Design.svg',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Enterprise React component library used for admin panels and data-heavy screens.'
    },
    Tailwind: {
        name: 'Tailwind CSS',
        icon: '/icons/Tailwind.svg',
        categories: ['Frontend'],
        proficiency: 'Advanced',
        description: 'Utility-first CSS framework for fast, consistent styling with design tokens.'
    },
    Webpack: {
        name: 'Webpack',
        icon: '/icons/Webpack.svg',
        categories: ['Frontend'],
        proficiency: 'Basic',
        description: 'Module bundler used to package the Swagger UI in express-joi-to-swagger.'
    },

    // Testing
    Mocha: {
        name: 'Mocha',
        categories: ['Testing'],
        proficiency: 'Expert',
        description: 'JavaScript testing framework for unit and integration tests.'
    },
    Chai: {
        name: 'Chai',
        categories: ['Testing'],
        proficiency: 'Expert',
        description: 'Assertion library used to validate application behavior in tests.'
    },
    Postman: {
        name: 'Postman',
        categories: ['Testing'],
        proficiency: 'Expert',
        description: 'Tool for testing, debugging, and documenting REST APIs.'
    },
    JMeter: {
        name: 'JMeter',
        categories: ['Testing'],
        proficiency: 'Advanced',
        description: 'Load and performance testing tool for backend systems.'
    },

    Supertest: {
        name: 'Supertest',
        icon: null,
        categories: ['Testing'],
        proficiency: 'Expert',
        description: 'HTTP assertions for end-to-end testing of Express endpoints together with Mocha and Chai.'
    },
    Istanbul: {
        name: 'Istanbul (nyc)',
        icon: null,
        categories: ['Testing'],
        proficiency: 'Advanced',
        description: 'Code coverage tooling — used to track Notino coverage growing from 79% to 93%.'
    },
    Jest: {
        name: 'Jest',
        icon: '/icons/Jest.svg',
        categories: ['Testing'],
        proficiency: 'Basic',
        description: 'All-in-one JavaScript test runner with mocking and snapshot testing.'
    },

    // Security
    JWT: {
        name: 'JWT',
        categories: ['Security'],
        proficiency: 'Expert',
        description: 'Stateless authentication mechanism using signed tokens.'
    },
    OAuth: {
        name: 'OAuth',
        categories: ['Security'],
        proficiency: 'Advanced',
        description: 'Authorization framework for secure delegated access.'
    },
    Passport: {
        name: 'Passport',
        categories: ['Security'],
        proficiency: 'Advanced',
        description: 'Authentication middleware supporting multiple strategies.'
    },
    Helmet: {
        name: 'Helmet',
        categories: ['Security'],
        proficiency: 'Advanced',
        description: 'Secures applications by configuring HTTP security headers.'
    },

    // Monitoring
    Sentry: {
        name: 'Sentry',
        categories: ['Monitoring'],
        proficiency: 'Advanced',
        description: 'Error tracking and performance monitoring in production environments.'
    },
    Winston: {
        name: 'Winston',
        categories: ['Monitoring'],
        proficiency: 'Expert',
        description: 'Structured logging library for Node.js applications.'
    },

    // AWS
    EC2: {
        name: 'EC2',
        categories: ['AWS', 'Backend'],
        proficiency: 'Advanced',
        description: 'AWS virtual servers used to deploy and scale backend applications.'
    },
    S3: {
        name: 'S3',
        categories: ['AWS', 'Storage'],
        proficiency: 'Advanced',
        description: 'AWS object storage for files and media, also used via S3-compatible services.'
    },
    RDS: {
        name: 'RDS',
        categories: ['AWS', 'Storage'],
        proficiency: 'Basic',
        description: 'Managed AWS service for running relational databases with automated backups and scaling.'
    },
    SES: {
        name: 'SES',
        categories: ['AWS', 'Backend'],
        proficiency: 'Advanced',
        description: 'AWS email service for sending transactional and notification emails at scale.'
    },
    IAM: {
        name: 'IAM',
        categories: ['AWS'],
        proficiency: 'Advanced',
        description: 'AWS identity and access management for permissions, roles, and security policies.'
    },
    CloudWatch: {
        name: 'CloudWatch',
        categories: ['AWS', 'Monitoring'],
        proficiency: 'Advanced',
        description: 'AWS monitoring service for logs, metrics, and alarms on cloud resources.'
    },

    LocalStack: {
        name: 'LocalStack',
        icon: null,
        categories: ['AWS', 'DevOps'],
        proficiency: 'Basic',
        description: 'Local AWS cloud emulator for developing against S3 without touching real infrastructure.'
    },

    // DevOps
    'GitHub-Actions': {
        name: 'GitHub Actions',
        icon: '/icons/GitHub-Actions.svg',
        categories: ['DevOps'],
        proficiency: 'Advanced',
        description: 'CI/CD workflows for linting, tests and deployments — including this site’s GitHub Pages deploy.'
    },

    // AI
    Ollama: {
        name: 'Ollama',
        icon: '/icons/Ollama.svg',
        categories: ['AI'],
        proficiency: 'Basic',
        description: 'Runs open LLMs locally; powers the AI shopping assistant in Flowers Shop.'
    },

    // Project management
    Git: {
        name: 'Git',
        icon: '/icons/Git.svg',
        categories: ['Project Management', 'DevOps'],
        proficiency: 'Expert',
        description: 'Version control: branching strategies, rebasing, code review and clean history.'
    },
    GitHub: {
        name: 'GitHub',
        categories: ['Project Management'],
        proficiency: 'Expert',
        description: 'Version control and collaboration platform for managing source code.'
    },
    Bitbucket: {
        name: 'Bitbucket',
        categories: ['Project Management', 'DevOps'],
        proficiency: 'Advanced',
        description: 'Git hosting with Bitbucket Pipelines CI used to type-check, test and deploy production services.'
    },
    Jira: {
        name: 'Jira',
        categories: ['Project Management'],
        proficiency: 'Advanced',
        description: 'Agile project management tool for sprint planning and tracking.'
    },
    Notion: {
        name: 'Notion',
        categories: ['Project Management'],
        proficiency: 'Advanced',
        description: 'Documentation and collaboration workspace for teams.'
    },

    // Others
    Prettier: {
        name: 'Prettier',
        icon: '/icons/Prettier.svg',
        categories: ['Others'],
        proficiency: 'Expert',
        description: 'Opinionated code formatter keeping style consistent across teams.'
    },
    Husky: {
        name: 'Husky + commitlint',
        icon: null,
        categories: ['Others'],
        proficiency: 'Advanced',
        description: 'Git hooks that lint code and enforce Jira-linked commit messages before they land.'
    },
    Eslint: {
        name: 'ESLint',
        categories: ['Others'],
        proficiency: 'Expert',
        description: 'Static analysis tool enforcing code quality and consistency.'
    },
    Linux: {
        name: 'Linux',
        categories: ['DevOps'],
        proficiency: 'Advanced',
        description: 'Operating system used for servers, deployments, and backend infrastructure.'
    },
    OpenAI: {
        name: 'OpenAI',
        categories: ['AI'],
        proficiency: 'Advanced',
        description: 'API platform enabling AI-powered features such as text generation and automation.'
    },
    Unity: {
        name: 'Unity',
        categories: ['Others'],
        proficiency: 'Basic',
        description: 'Game engine used for learning real-time 2D/3D development concepts.'
    },

    // Project-only badges (not listed on the Skills page)
    Shippo: { name: 'Shippo', icon: null }
} as const satisfies Record<string, Tech>

export type TechKey = keyof typeof tech

export function techIcon(key: TechKey): string | null {
    const entry: Tech = tech[key]
    return entry.icon === undefined ? `/icons/${key}.png` : entry.icon
}
