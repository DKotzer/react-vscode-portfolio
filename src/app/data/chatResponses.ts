interface Response {
  keywords: string[]
  response: string
}

export const responses: Response[] = [
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml"],
    response: `I specialize in building custom AI solutions with a focus on:

• LLM integration (OpenAI, Azure OpenAI, Anthropic)
• Prompt engineering & system design
• Retrieval-Augmented Generation (RAG)
• Multi-agent AI systems
• Fine-tuning and deploying models

Some of my AI-driven projects include DylanGPT, PlatoAI, and various custom solutions for clients across different industries.`,
  },
  {
    keywords: ["projects", "portfolio", "work"],
    response: `Here are a few standout projects I've developed:

1. **DylanGPT** – A portfolio-interacting chatbot powered by OpenAI
2. **CamelCollect** – A solo-built content manager with a Chrome extension
3. **TweetNet** – A social network of AI-driven bots
4. **PlatoAI** – An AI that simulates philosophical discussions with embeddings
5. **AI Adventure** – Interactive storytelling with dynamic AI-generated content

Each project highlights different areas of my technical expertise, creativity, and ability to ship end-to-end solutions.`,
  },
  {
    keywords: ["tech stack", "technologies", "stack", "tools"],
    response: `My development toolkit includes:

**Frontend:**  
• React, Next.js, TypeScript  
• Tailwind CSS, Material UI  

**Backend:**  
• Node.js, Express, Django  
• REST APIs, TRPC  

**Databases & ORMs:**  
• PostgreSQL, MongoDB, Redis  
• Prisma, Drizzle  

**DevOps & Cloud:**  
• AWS, Azure, Vercel  
• Docker, CI/CD pipelines  

**AI & Machine Learning:**  
• OpenAI, Azure OpenAI, Anthropic  
• Vector databases, RAG, multi-agent systems`,
  },
  {
    keywords: ["experience", "work history", "background"],
    response: `My background bridges full-stack development with over a decade in IT and DevOps.

**Current Roles:**  
• AI & Web Dev Consultant  
• Lead Developer @ CamelCollect  
• Freelance AI Systems Builder  

**Past Experience:**  
• Web Developer in healthcare  
• IT Lead at a large retail business  
• Teaching Assistant at General Assembly  

I’ve been programming since I was a kid—today, I focus on solving complex problems using modern tools and AI.`,
  },
  {
    keywords: ["education", "study", "learning"],
    response: `My education blends formal training and self-driven learning:

• **General Assembly – Software Engineering Immersive**  
   (Built on years of self-taught experience)  
• **BA in Philosophy – McMaster University**  
   (Sharp foundation in logic, ethics, and systems thinking)  
• **Ongoing Self-Education**  
   – Constantly learning new frameworks, dev tools, and AI systems`,
  },
  {
    keywords: ["skills", "capabilities", "expertise"],
    response: `Here's what I bring to the table:

**Technical:**  
• Full-Stack Web Development  
• AI Integration & Architecture  
• DevOps & Cloud Infrastructure  
• API & Database Design  

**AI-Specific:**  
• Prompt Engineering  
• RAG & Multi-Agent Systems  
• LLM Integration & Fine-tuning  

**Soft Skills:**  
• Problem Solving  
• Project Leadership  
• Team Collaboration & Client Communication`,
  },
  {
    keywords: ["contact", "hire", "work with you"],
    response: `I’m open to new opportunities and collaborations.

Reach out to me via:  
• [LinkedIn](https://www.linkedin.com/in/dylan-kotzer-3a5421190/)  
• [GitHub](https://github.com/DKotzer)  
• Email: dylan@dylankotzer.com  

I’m especially interested in:  
• Full-Stack Development Roles  
• AI/LLM Integration Projects  
• Consulting or Fractional CTO Work`,
  },
]

export const defaultResponse = `I'm here to help you learn more about Dylan's experience, skills, and projects. You can ask about:
• Technical skills and expertise
• Project portfolio and achievements
• Work experience and background
• Education and qualifications
• AI capabilities and implementations

What would you like to know more about?`

export const findResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase()

  for (const item of responses) {
    if (item.keywords.some((keyword) => normalizedInput.includes(keyword))) {
      return item.response
    }
  }

  return defaultResponse
}
