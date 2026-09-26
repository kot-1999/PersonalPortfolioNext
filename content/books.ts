import type { Book } from './types'

/** Covers live in /public/books/ (webp, ~400px wide). */
export const books: Book[] = [
    // Programming languages
    {
        title: 'The C Programming Language',
        author: 'Brian W. Kernighan',
        category: 'Programming Languages',
        cover: '/books/the-c-programming-language.webp',
        summary: 'Classic book teaching C fundamentals, idiomatic C programming, and foundational programming concepts.',
        takeaways: 'Pointers, memory management, structured programming, and clean coding practices.'
    },
    {
        title: 'The C++ Programming Language',
        author: 'Bjarne Stroustrup',
        category: 'Programming Languages',
        cover: '/books/cpp-programming-language.webp',
        summary: 'Comprehensive guide covering C++ syntax, object-oriented programming, templates, and the STL.',
        takeaways: 'OOP principles, templates, STL, memory management, RAII, and idiomatic C++ patterns.'
    },
    {
        title: 'Java: A Beginner’s Guide',
        author: 'Herbert Schildt',
        category: 'Programming Languages',
        cover: '/books/java-a-beginner-s-guide.webp',
        summary: 'Beginner-friendly introduction to Java covering core syntax, object-oriented concepts, and basic libraries.',
        takeaways: 'Java syntax, OOP principles, basic GUI development, exception handling, and standard libraries.'
    },
    {
        title: 'Effective Java',
        author: 'Joshua Bloch',
        category: 'Programming Languages',
        cover: '/books/effective-java.webp',
        summary: 'Advanced guide on writing robust, maintainable, and high-performance Java code with best practices.',
        takeaways: 'Design patterns, API usage, performance optimization, and writing clean, efficient Java code.'
    },
    {
        title: 'C#: The Complete Reference',
        author: 'Herbert Schildt',
        category: 'Programming Languages',
        cover: '/books/c-the-complete-reference.webp',
        summary: 'In-depth reference covering C# language features, .NET integration, and practical programming examples.',
        takeaways: 'C# syntax, LINQ, collections, .NET frameworks, and practical backend application development.'
    },
    {
        title: 'JavaScript & jQuery',
        author: 'Jon Duckett',
        category: 'Programming Languages',
        cover: '/books/javascript-jquery.webp',
        summary: 'Guide to JavaScript basics, DOM manipulation, event handling, and creating interactive web applications.',
        takeaways: 'JavaScript syntax, DOM API, event handling, asynchronous programming, and basic web interactivity.'
    },

    // Web development
    {
        title: 'HTML & CSS',
        author: 'Jon Duckett',
        category: 'Web Development',
        cover: '/books/html-css.webp',
        summary: 'Introduction to building web pages with HTML structure and styling them with CSS, including responsive design.',
        takeaways: 'HTML semantics, CSS layout techniques, styling, responsive design, and web design best practices.'
    },

    // Software development
    {
        title: 'Git Magic',
        author: 'Ben Lynn',
        category: 'Software Development',
        cover: '/books/git-magic.webp',
        summary: 'Concise guide to using Git for version control, branching, merging, and collaborative workflows.',
        takeaways: 'Git commands, branching strategies, conflict resolution, and efficient version control practices.'
    },
    {
        title: 'Grokking Algorithms',
        author: 'Aditya Bhargava',
        category: 'Software Development',
        cover: '/books/grokking-algorithms.webp',
        summary: 'Illustrated guide for learning algorithms and problem-solving with visual examples and exercises.',
        takeaways: 'Sorting, searching, recursion, Big O notation, and algorithmic thinking for coding challenges.'
    },
    {
        title: 'Design Patterns',
        author: 'Erich Gamma',
        category: 'Software Development',
        cover: '/books/design-patterns.webp',
        summary: 'Classic book introducing design patterns for reusable, maintainable, and modular object-oriented software.',
        takeaways: 'Key patterns such as Singleton, Observer, and Factory, and strategies for clean software architecture.'
    },

    // AI & machine learning
    {
        title: 'Deep Reinforcement Learning with Python',
        author: 'Sudharsan Ravichandiran',
        category: 'AI',
        cover: '/books/deep-reinforcement-learning-with-python.webp',
        summary: 'Practical guide to reinforcement learning algorithms and agent-based models using Python.',
        takeaways: 'Q-learning, policy gradients, neural network integration, environment design, and agent training.'
    },
    {
        title: 'Python Machine Learning',
        author: 'Sebastian Raschka',
        category: 'AI',
        cover: '/books/python-machine-learning.webp',
        summary: 'Guide to implementing machine learning algorithms and understanding models using Python libraries.',
        takeaways: 'Supervised and unsupervised learning, scikit-learn, model evaluation, and feature engineering.'
    },
    {
        title: 'Hands-On Intelligent Agents with OpenAI Gym',
        author: 'Praveen Palanisamy',
        category: 'AI',
        cover: '/books/intelligent-agents-with-openai-gym.webp',
        summary: 'Hands-on reinforcement learning projects using OpenAI Gym, Python, and practical exercises.',
        takeaways: 'Environment creation, agent training, policy evaluation, and applying RL concepts to practical tasks.'
    },

    // Backend & databases
    {
        title: 'Node.js Web Development',
        author: 'David Herron',
        category: 'Backend & Databases',
        cover: '/books/nodejs-web-development.webp',
        summary: 'Guide to building server-side applications using Node.js, Express, and asynchronous programming.',
        takeaways: 'Server-side JavaScript, REST APIs, routing, middleware, async programming, and the Node.js ecosystem.'
    },
    {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        category: 'Backend & Databases',
        cover: '/books/designing-data-intensive-applications.webp',
        summary: 'Guide to building scalable, reliable, and maintainable data systems for modern applications.',
        takeaways: 'Distributed system principles, data modeling, consistency models, and fault-tolerant architectures.'
    },
    {
        title: 'PostgreSQL',
        author: 'Pavel Luzanov',
        category: 'Backend & Databases',
        cover: '/books/postgresql.webp',
        summary: 'Comprehensive guide to PostgreSQL covering queries, indexing, transactions, and database design.',
        takeaways: 'SQL queries, indexing, transactions, performance tuning, and database best practices.'
    },
    {
        title: 'SQL Antipatterns',
        author: 'Bill Karwin',
        category: 'Backend & Databases',
        cover: '/books/sql-antipatterns.webp',
        summary: 'Guide to common SQL mistakes and how to avoid them in schema design and queries.',
        takeaways: 'Pitfalls in database design, query optimization, and maintaining data integrity.'
    },

    // Embedded & operating systems
    {
        title: 'Arduino Microcontrollers Programming',
        author: 'Ulli Sommer',
        category: 'Embedded & Operating Systems',
        cover: '/books/arduino-microcontrollers-programming.webp',
        summary: 'Practical guide to programming Arduino microcontrollers and building electronics projects.',
        takeaways: 'Microcontroller programming, working with sensors and actuators, and small electronics projects.'
    },
    {
        title: 'Modern Operating Systems',
        author: 'Andrew S. Tanenbaum',
        category: 'Embedded & Operating Systems',
        cover: '/books/modern-operating-systems.webp',
        summary: 'Comprehensive guide to operating system design: processes, memory, scheduling, and file systems.',
        takeaways: 'Process management, CPU scheduling, memory handling, file systems, and OS architecture concepts.'
    }
]
