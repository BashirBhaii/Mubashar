import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

// Mubashar's portfolio profile & context
const PORTFOLIO_CONTEXT = {
  name: "Mubashar Hussain",
  title: "Full Stack Developer with AI Integration",
  location: "Lahore, Pakistan (Available for Global Remote Engagements)",
  skills: [
    "Frontend: React, TypeScript, Tailwind CSS, HTML5, Modern UI/UX",
    "Backend: Node.js, Express.js, PHP, Laravel, RESTful APIs",
    "Databases: MongoDB, Mongoose, MySQL, SQL Server",
    "AI Integration: Gemini API, Vercel AI SDK, Tool Calling, Autonomous Agents, LLM Pipelines",
    "DevOps & Tools: Git, GitHub, Vercel, Vite, Docker, Postman"
  ],
  projects: [
    {
      name: "Airbnb Clone Platform",
      code: "MH-01",
      stack: "React, Node.js, Express, MongoDB",
      description: "Production-ready full stack web app featuring user auth, interactive listings, map integration, and booking reviews.",
      status: "Production Ready"
    },
    {
      name: "Real-time Social Media Platform",
      code: "MH-02",
      stack: "React, Node.js, Express, MongoDB, WebSockets",
      description: "Interactive social hub with real-time feeds, likes, media uploads, threaded comments, and user profiles.",
      status: "Deployed"
    },
    {
      name: "AI Integration Studio",
      code: "MH-03",
      stack: "TypeScript, React, Vercel AI SDK, Gemini API",
      description: "Next-gen AI application suite demonstrating prompt engineering, autonomous tool calling, and streaming response architecture.",
      status: "Active"
    },
    {
      name: "Dynamic EJS & PHP / Laravel Hub",
      code: "MH-04",
      stack: "PHP, Laravel, EJS, MySQL",
      description: "Multi-role management system with relational migrations, blade templates, and role-based access control (RBAC).",
      status: "Complete"
    },
    {
      name: "Interactive DAW & Stem Mixer",
      code: "MH-05",
      stack: "JavaScript, Web Audio API, Canvas",
      description: "Creative web audio interface featuring multi-track stem playback engine, real-time gain/filter sliders, and waveform visualization.",
      status: "Showcase"
    }
  ],
  availability: {
    status: "OPEN FOR HIRE",
    roles: ["Full Stack Developer (MERN)", "AI Integration Specialist", "Frontend / React Engineer"],
    types: ["Full-time", "Contract", "Freelance Consulting"]
  }
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      // Return a graceful streaming fallback when GEMINI_API_KEY is not yet configured in Vercel
      const fallbackReply = 
        `👋 Hello! I am **Mubashar Hussain's AI Agent**, powered by the **Vercel AI SDK**.\n\n` +
        `I am connected and ready. To activate live Gemini LLM responses, please set your \`GEMINI_API_KEY\` in your **Vercel Project Settings > Environment Variables**.\n\n` +
        `**Quick Summary of Mubashar Hussain:**\n` +
        `- 🚀 **Specialization**: Full Stack Development (React, TypeScript, Node.js, Express, MongoDB) with **AI Integration**\n` +
        `- 📍 **Location**: Lahore, Pakistan (Available for Remote roles worldwide)\n` +
        `- 💼 **Availability**: Open for hire (Full-time & Contract)\n` +
        `- 🛠️ **Featured Work**: Airbnb Clone (MERN), Real-Time Social Platform, AI Integration Studio, and Web Audio DAW`;

      return new Response(fallbackReply, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: `You are the official AI Representative and Portfolio Agent for Mubashar Hussain.
Your purpose is to assist visitors, recruiters, and clients in exploring Mubashar's work, experience, and availability.

Details:
- Full Name: Mubashar Hussain
- Core Focus: Full Stack Development with AI Integration
- Tech Stack: React, TypeScript, Node.js, Express.js, PHP, Laravel, MongoDB, MySQL, Git, GitHub, Vercel, Tailwind CSS
- AI Focus: Gemini API, Vercel AI SDK, Tool Calling, Autonomous Agents, LLM prompt engineering
- Location: Lahore, Pakistan (Open to remote worldwide)
- Personality: Professional, technical, articulate, helpful, and concise.

You have access to tools to fetch live details about Mubashar's projects, verify his availability, inspect his technical skills, and calculate project estimates. Use your tools whenever relevant to provide accurate data.`,
      messages,
      maxSteps: 5,
      tools: {
        getProjects: tool({
          description: "Get detailed information about Mubashar's featured full-stack and AI projects.",
          parameters: z.object({
            filter: z.enum(['all', 'ai', 'mern', 'backend']).optional().describe('Filter projects by category'),
          }),
          execute: async ({ filter }) => {
            if (filter === 'ai') {
              return PORTFOLIO_CONTEXT.projects.filter(p => p.stack.includes('AI') || p.stack.includes('Gemini'));
            }
            if (filter === 'mern') {
              return PORTFOLIO_CONTEXT.projects.filter(p => p.stack.includes('MongoDB') || p.stack.includes('React'));
            }
            return PORTFOLIO_CONTEXT.projects;
          },
        }),
        checkAvailability: tool({
          description: "Check Mubashar's current availability, roles, and remote work readiness.",
          parameters: z.object({
            role: z.string().optional().describe('The role the client is looking to hire for'),
          }),
          execute: async ({ role }) => {
            return {
              status: PORTFOLIO_CONTEXT.availability.status,
              roles: PORTFOLIO_CONTEXT.availability.roles,
              engagementTypes: PORTFOLIO_CONTEXT.availability.types,
              location: PORTFOLIO_CONTEXT.location,
              isMatch: role ? true : undefined,
              note: "Ready for immediate onboarding for remote or hybrid opportunities."
            };
          },
        }),
        getSkills: tool({
          description: "Get Mubashar's complete technical skill breakdown and proficiencies.",
          parameters: z.object({}),
          execute: async () => {
            return {
              skills: PORTFOLIO_CONTEXT.skills,
              topHighlights: [
                "MERN Stack (95% proficiency)",
                "AI Integration & LLM APIs (90% proficiency)",
                "Vercel & Cloud Deployment (89% proficiency)"
              ]
            };
          },
        }),
        calculateEstimate: tool({
          description: "Provide an estimated architecture plan and timeline for a client project.",
          parameters: z.object({
            projectType: z.string().describe('e.g., SaaS, E-Commerce, AI Agent, Full Stack Portal'),
            complexity: z.enum(['low', 'medium', 'high']).describe('Estimated complexity of the requirements'),
          }),
          execute: async ({ projectType, complexity }) => {
            const timelines = {
              low: "1 to 2 weeks",
              medium: "3 to 5 weeks",
              high: "6 to 10 weeks"
            };
            return {
              projectType,
              recommendedStack: "React + TypeScript frontend, Node.js / Express backend with MongoDB, Vercel AI SDK for smart automation, deployed on Vercel",
              estimatedTimeline: timelines[complexity] || "2 to 4 weeks",
              consultationStatus: "Available for discovery call"
            };
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
