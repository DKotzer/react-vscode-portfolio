interface Response {
  keywords: string[];
  response: string;
}

export const responses: Response[] = [
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml'],
    response: `I specialize in AI integration and development, with expertise in:
• LLM Integration (OpenAI, Azure OpenAI, Anthropic)
• Custom AI Solutions and Implementations
• Prompt Engineering and System Design
• Multi-Agent AI Systems
• RAG (Retrieval Augmented Generation)
• Fine-tuning and Deploying LLMs

I've built various AI-powered applications, including DylanGPT, PlatoAI, and custom solutions for clients.`
  },
  {
    keywords: ['projects', 'portfolio', 'work'],
    response: `Here are some of my notable projects:

1. DylanGPT: A cutting-edge chatbot using OpenAI's GPT for portfolio interaction
2. CamelCollect: Solo-developed content management system with Chrome extension
3. TweetNet: Social network platform for AI-powered bot interactions
4. PlatoAI: Philosophical dialogue generator using vector embeddings
5. AI Adventure: Interactive storytelling platform with AI-generated content

Each project showcases different aspects of my technical expertise and problem-solving abilities.`
  },
  {
    keywords: ['tech stack', 'technologies', 'stack', 'tools'],
    response: `My comprehensive tech stack includes:

Frontend:
• React, Next.js, TypeScript
• Tailwind CSS, Material-UI
• Modern JavaScript

Backend:
• Node.js, Express, Django
• Python, TypeScript
• TRPC, REST APIs

Databases:
• PostgreSQL, MongoDB, Redis
• Prisma, Drizzle ORMs

Cloud & DevOps:
• AWS, Azure, Vercel
• Docker, CI/CD
• Microservice Architecture

AI & ML:
• OpenAI, Azure OpenAI, Anthropic
• RAG Systems, Vector Databases
• Custom AI Implementations`
  },
  {
    keywords: ['experience', 'work history', 'background'],
    response: `My professional journey combines long-term programming experience with modern AI expertise:

Current:
• AI & Web Development Consultant (2023-Present)
• Lead Developer at CamelCollect
• Freelance AI Integration Specialist

Previous:
• Software Developer at General Assembly
• Web Developer for Healthcare Practice
• IT Head at Major Retail Operation

I've been programming since elementary school and have successfully transitioned from traditional IT to modern AI-enhanced development.`
  },
  {
    keywords: ['education', 'study', 'learning'],
    response: `My educational background combines formal training with self-taught expertise:

• Software Engineering Immersive at General Assembly (2021-2022)
  - Formalized my long-standing programming experience
  - Perfect timing for AI integration expertise

• BA in Philosophy from McMaster University
  - Strong foundation in logic and critical thinking
  - Valuable for AI ethics and system design

• Continuous Learning
  - Self-taught programming since elementary school
  - Regular upskilling in AI and modern development practices`
  },
  {
    keywords: ['skills', 'capabilities', 'expertise'],
    response: `My key skills span multiple domains:

Technical Skills:
• Full-Stack Development
• AI Integration & Development
• Cloud Architecture
• System Design
• Database Management
• API Development

AI Specific:
• Prompt Engineering
• LLM Integration
• RAG Systems
• Multi-Agent Systems
• Fine-Tuning Models

Soft Skills:
• Problem Solving
• Technical Leadership
• Project Management
• Client Communication
• Team Collaboration`
  },
  {
    keywords: ['contact', 'hire', 'work with you'],
    response: `I'm always interested in discussing new opportunities and collaborations.

You can reach me through:
• LinkedIn: [Your LinkedIn]
• GitHub: [Your GitHub]
• Email: [Your Email]

I'm particularly interested in:
• AI Integration Projects
• Full-Stack Development
• Technical Consulting
• Complex Problem-Solving Opportunities`
  }
];

export const defaultResponse = `I'm here to help you learn more about Dylan's experience, skills, and projects. You can ask about:
• Technical skills and expertise
• Project portfolio and achievements
• Work experience and background
• Education and qualifications
• AI capabilities and implementations

What would you like to know more about?`;

export const findResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  
  for (const item of responses) {
    if (item.keywords.some(keyword => normalizedInput.includes(keyword))) {
      return item.response;
    }
  }
  
  return defaultResponse;
};
