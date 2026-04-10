export const portfolioData = {
    // General details
    name: "Kalp Thekdi",
    title: "Computer Engineering Undergraduate",
    description: "Computer Engineering student exploring software systems, decentralized applications, and practical technology solutions through academic projects and independent experimentation.",
    resumeUrl: "/resume.pdf",

    // System Metrics
    systemMetrics: {
        projectsBuilt: 3,
        techStacksUsed: 10,
        cgpa: "9.48 / 10",
        cgpaSemester: "As of Semester 6"
    },

    // Contact / Socials
    email: "kalpthekdi08@gmail.com",
    location: "Vadodara, Gujarat, India",
    github: "https://github.com/KT1205",
    linkedin: "https://www.linkedin.com/in/kalpthekdi/",

    // About Section
    about: {
        paragraphs: [
            "I am a Computer Engineering undergraduate with a strong academic foundation and a growing interest in software systems, web technologies, and decentralized applications. My journey into technology began with web development, which helped me understand how modern software products are structured and built.",

            "Over time, I explored different areas including machine learning through academic coursework and collaborative projects. One such project, CropShield, focused on crop disease detection where I contributed primarily to the frontend interface that connected users with machine learning predictions.",

            "More recently, I have been working on Blockrent, a decentralized rental marketplace that explores how blockchain technology can be combined with traditional web applications. Through projects like these, I enjoy understanding how different technologies interact to form complete software systems."
        ],
        stats: [
            { label: "CGPA", value: "9.48" },
            { label: "NPTEL DSA", value: "Top 1%" },
            { label: "Internship", value: "ONGC" }
        ],
        image: "/profile.jpg"
    },

    // Projects Section
    projects: [
        {
            id: "blockrent",
            title: "Blockrent",
            subtitle: "Blockchain-Based Rental Marketplace",
            description: "An experimental decentralized rental platform exploring how blockchain smart contracts can support transparent rental agreements.",
            technologies: ["Solidity", "Hardhat", "Ethers.js", "Next.js", "Node.js", "MongoDB"],
            github: "https://github.com",
            slug: "blockrent",

            overview: "Blockrent is an experimental decentralized application that explores how blockchain technology can be used in real-world marketplaces such as property rentals. The goal of the project is to understand how smart contracts can introduce transparency and automation into agreements that traditionally rely on intermediaries. The platform allows landlords and tenants to interact through blockchain-backed rental agreements while maintaining a familiar web application experience. By combining decentralized smart contracts with a conventional web stack, the project investigates how Web3 systems can integrate with traditional application infrastructure.",
            architecture: "The system combines a modern web interface built with Next.js and a backend service using Node.js and MongoDB for off-chain data. Smart contracts written in Solidity handle the core rental agreement logic on the blockchain test network. The application communicates with the blockchain through Ethers.js, enabling users to interact with smart contracts directly from the web interface.",

            challenges: [
                "Understanding how on-chain smart contract logic interacts with traditional off-chain application data.",
                "Managing asynchronous blockchain transactions within a web application workflow.",
                "Structuring the system so both Web2 and Web3 components work together smoothly."
            ],

            lessons: "Working on Blockrent has helped me better understand the architecture of decentralized applications and how blockchain systems integrate with conventional web stacks. It also gave me exposure to the broader ecosystem of Web3 development tools."
        },

        {
            id: "cropshield",
            title: "CropShield",
            subtitle: "Crop Disease Detection System",
            description: "A machine-learning-assisted system designed to help identify crop diseases from plant images.",
            technologies: ["React", "JavaScript", "ML API", "Node.js"],
            github: "https://github.com",
            slug: "cropshield",

            overview: "CropShield is a machine-learning-assisted application designed to help identify crop diseases from plant images. The system allows users to upload a photo of a plant leaf and receive a prediction about possible diseases. This project helped me understand how machine learning models can be integrated into practical applications. The focus of the system is to provide an accessible interface that connects users with machine learning predictions, demonstrating how AI-powered tools can support decision-making in agriculture.",

            architecture: "The project uses a React-based interface that allows users to upload images and interact with the system easily. These images are processed through a backend service which communicates with a machine learning model API responsible for generating predictions. The results are then presented back to the user through the frontend interface.",

            challenges: [
                "Designing a simple and responsive interface for uploading plant images.",
                "Handling asynchronous communication between the frontend and the ML prediction service.",
                "Ensuring the application remained lightweight and responsive."
            ],

            lessons: "This project helped me understand how machine learning models can be integrated into practical applications and highlighted the importance of building user-friendly interfaces around complex backend systems."
        },

    ],


    // Experience Section
    experiences: [
        {
            id: 1,
            role: "Software Development Intern",
            company: "ONGC, Vadodara",
            date: "May–June 2025",
            description: "Worked on the development of an internal Annual Work Program (AWP) portal, gaining exposure to enterprise software workflows and backend-driven application design."
        }
    ],

    // Skills Section
    skills: [
        {
            category: "Programming",
            skills: ["C", "C++", "Java", "Python", "JavaScript"]
        },
        {
            category: "Web Development",
            skills: ["HTML", "CSS", "ReactJS", "NodeJS", "ExpressJS"]
        },
        {
            category: "Databases",
            skills: ["MySQL", "MongoDB"]
        },
        {
            category: "Ecosystem & Tools",
            skills: ["GitHub", "VS Code"]
        }
    ],

    // Achievements Section
    achievements: [
        {
            id: 1,
            title: "Top 1% — NPTEL Data Structures & Algorithms",
            description: "Ranked among the Top 1% of learners in the NPTEL Data Structures and Algorithms course offered by IIT Kharagpur.",
            icon: "Trophy"
        },
        {
            id: 2,
            title: "Academic Performance",
            description: "Maintained a CGPA of 9.48, reflecting consistent academic performance across core computer engineering subjects.",
            icon: "GraduationCap"
        }
    ],

    // Certifications Section
    certifications: [
        {
            id: "Data",
            name: "Foundation Data Analysis",
            organization: "Google",
            description: "Introduces the fundamentals of data analysis including data collection, cleaning, and interpretation. The course explores how data is used to support decision-making, along with basic analytical workflows and tools used in real-world data analysis.",
            issueDate: "Oct 2023",
            previewUrl: "/Data.jpg",
            pdfUrl: "/Data.pdf"
        },
        {
            id: "Python",
            name: "Python",
            organization: "University of Michigan",
            description: "Covers the fundamentals of programming in Python including variables, control structures, functions, and basic data structures. The course focuses on developing problem-solving skills and understanding how Python can be used to build simple programs and automate tasks.",
            issueDate: "Oct 2023",
            previewUrl: "/Python.jpg",
            pdfUrl: "/Python.pdf"
        },
        {
            id: "Java Essentials",
            name: "Java Essentials",
            organization: "Infosys",
            description: "Introduces the core concepts of Java programming including object-oriented principles, classes, methods, and basic program structure. The course provides foundational knowledge required to build simple Java applications.",
            issueDate: "Sept 2024",
            previewUrl: "/JavaEssentials.jpg",
            pdfUrl: "/JavaEssentials.pdf"
        },
        {
            id: "dsa-java-nptel",
            name: "DSA Java",
            organization: "NPTEL",
            description: "Course covering foundational concepts of blockchain systems, distributed ledgers, and their practical applications.",
            issueDate: "Nov 2024",
            previewUrl: "/DSA_JAVA_NPTEL.jpg",
            pdfUrl: "/DSA_JAVA_NPTEL.pdf"
        },
        {
            id: "blockchain-basics",
            name: "Blockchain Basics",
            organization: "University at Buffalo",
            description: "Course covering foundational concepts of blockchain systems, distributed ledgers, and their practical applications.",
            issueDate: "Jul 2025",
            previewUrl: "/Blockchain.jpg",
            pdfUrl: "/Blockchain.pdf"
        },
        {
            id: "Database",
            name: "Database",
            organization: "Meta",
            description: "Provides an introduction to database concepts including relational database design, SQL queries, and basic data modeling. The course explains how structured data is stored, managed, and retrieved in modern applications.",
            issueDate: "Mar 2026",
            previewUrl: "/Database.jpg",
            pdfUrl: "/Database.pdf"
        }
    ]
};
