import type { User, Project, Conversation } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    avatar: 'user-1',
    title: 'Senior UI/UX Designer',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Webflow'],
    rating: 4.9,
    reviews: 124,
    isClient: false,
    about: 'A passionate UI/UX designer with over 10 years of experience in creating beautiful and intuitive user interfaces. I specialize in mobile and web applications, helping brands to grow and users to be happy.',
    portfolio: [
        { id: 'p1', title: 'E-commerce App Redesign', image: 'project-1', description: 'Complete redesign of a major e-commerce platform.' },
        { id: 'p2', title: 'SaaS Dashboard Design', image: 'project-4', description: 'Dashboard for a data analytics SaaS product.' },
    ],
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    avatar: 'user-2',
    title: 'Client',
    skills: [],
    rating: 5.0,
    reviews: 15,
    isClient: true,
    about: 'Startup founder looking for talented freelancers to help build innovative products. Clear communication and quality work are my priorities.',
    portfolio: [],
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    avatar: 'user-3',
    title: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL'],
    rating: 4.8,
    reviews: 89,
    isClient: false,
    about: 'I am a full-stack developer with a passion for building scalable and maintainable web applications. I have experience working with startups and large corporations.',
    portfolio: [
        { id: 'p3', title: 'Real-time Chat Application', image: 'project-2', description: 'A full-featured chat app using WebSockets.' },
    ],
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    avatar: 'user-4',
    title: 'Content Strategist',
    skills: ['SEO', 'Copywriting', 'Content Marketing', 'Blogging'],
    rating: 4.9,
    reviews: 210,
    isClient: false,
    about: 'Helping businesses tell their story through compelling content. I specialize in creating SEO-friendly articles, blog posts, and website copy that converts.',
    portfolio: [
        { id: 'p4', title: 'Blog Content for Tech Startup', image: 'project-3', description: 'Wrote a series of articles on AI and machine learning.' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce Website Redesign',
    description: 'We are looking for an experienced UI/UX designer to redesign our e-commerce platform. The goal is to improve user engagement and conversion rates. Key deliverables include wireframes, mockups, and a complete design system.',
    skills: ['UI Design', 'UX Research', 'Figma', 'E-commerce'],
    budget: 5000,
    deadline: '2024-08-30',
    clientId: 'user-2',
    image: 'project-1',
    bids: [
        { id: 'bid-1', freelancerId: 'user-1', amount: 4800, proposal: "I have extensive experience in e-commerce redesign and can deliver a modern, user-friendly interface. My portfolio includes several successful projects in this domain.", timestamp: "2024-07-20T10:00:00Z" }
    ],
  },
  {
    id: 'proj-2',
    title: 'Build a Real-time Chat Application',
    description: 'We need a full-stack developer to build a real-time chat feature for our social networking app. The developer should be proficient in WebSocket technologies, Node.js, and React. The feature should support one-on-one and group chats.',
    skills: ['React', 'Node.js', 'WebSocket', 'TypeScript'],
    budget: 8000,
    deadline: '2024-09-15',
    clientId: 'user-2',
    image: 'project-2',
    bids: [
        { id: 'bid-2', freelancerId: 'user-3', amount: 7500, proposal: "I've built several real-time applications and am highly proficient with the MERN stack and WebSockets. I can start immediately and ensure a high-quality, scalable solution.", timestamp: "2024-07-21T14:30:00Z" }
    ],
  },
  {
    id: 'proj-3',
    title: 'Content Writer for a Tech Blog',
    description: 'We are seeking a skilled content writer to produce high-quality articles for our technology blog. Topics will include AI, software development, and cloud computing. The ideal candidate should have a strong understanding of the tech industry and excellent writing skills.',
    skills: ['Content Writing', 'SEO', 'Tech', 'Blogging'],
    budget: 1500,
    deadline: '2024-08-10',
    clientId: 'user-2',
    image: 'project-3',
    bids: [
        { id: 'bid-3', freelancerId: 'user-4', amount: 1400, proposal: "As a content strategist specializing in tech, I can create engaging and informative articles that will drive traffic and establish your brand as a thought leader. I have a portfolio of published work to share.", timestamp: "2024-07-19T09:00:00Z" }
    ],
  },
  {
    id: 'proj-4',
    title: 'Digital Marketing Campaign for a New App',
    description: 'We are launching a new mobile app and need a digital marketing expert to run our launch campaign. Responsibilities include social media marketing, PPC campaigns, and influencer outreach.',
    skills: ['Digital Marketing', 'Social Media', 'PPC', 'Google Ads'],
    budget: 3000,
    deadline: '2024-09-01',
    clientId: 'user-2',
    image: 'project-4',
    bids: [],
  },
  {
    id: 'proj-5',
    title: 'Architectural Visualization for a Residential Project',
    description: 'Seeking a 3D artist for architectural visualization. You will be provided with CAD drawings and need to create photorealistic 3D renderings of a residential building.',
    skills: ['3D Modeling', 'Blender', 'V-Ray', 'Architectural Visualization'],
    budget: 4000,
    deadline: '2024-08-25',
    clientId: 'user-2',
    image: 'project-5',
    bids: [],
  },
   {
    id: 'proj-6',
    title: 'Logo and Brand Identity Design',
    description: 'We are a new startup in the fitness space and need a strong brand identity. This includes a logo, color palette, and typography guidelines. Looking for a creative graphic designer with a modern aesthetic.',
    skills: ['Graphic Design', 'Logo Design', 'Branding', 'Adobe Illustrator'],
    budget: 2500,
    deadline: '2024-08-20',
    clientId: 'user-2',
    image: 'project-6',
    bids: [],
  },
];

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        userId: 'user-2',
        messages: [
            { id: 'msg-1', senderId: 'user-2', text: 'Hi Alice, thanks for your bid on the e-commerce redesign project. Your portfolio looks great!', timestamp: '2024-07-20T11:00:00Z' },
            { id: 'msg-2', senderId: 'user-1', text: 'Hi Bob, thank you! I\'m excited about the project. I have a few questions about the target audience.', timestamp: '2024-07-20T11:05:00Z' },
        ]
    },
    {
        id: 'conv-2',
        userId: 'user-3',
        messages: [
            { id: 'msg-3', senderId: 'user-3', text: 'Hello, I have a question about my current project.', timestamp: '2024-07-21T10:00:00Z' },
        ]
    }
];
