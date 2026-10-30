# Mubashar Hussain — Portfolio & Vercel AI SDK Agent

Full Stack Development & AI Integration portfolio featuring an interactive 3D landing page and an autonomous **AI Agent powered by the Vercel AI SDK**.

## 🌟 Key Features

- **Autonomous AI Agent**: Built with **Vercel AI SDK** (`ai`, `@ai-sdk/google`, `zod`).
  - **Tool Calling**:
    - `getProjects()`: Deep dive into featured MERN & AI projects.
    - `checkAvailability()`: Real-time availability verification for hire.
    - `getSkills()`: Complete stack breakdown and proficiency metrics.
    - `calculateEstimate()`: Instant architecture recommendation and timeline estimation.
  - **Streaming UX**: Fast real-time streaming responses with typing animations and tool execution badges.
  - **Zero-Config Resilient Fallback**: Gracefully operates even before an API key is set.
- **Frontend Stack**: React 19, TypeScript, Vite, Tailwind CSS 4, Lucide Icons, Motion.
- **Backend Architecture**: Vercel Serverless Functions (`/api/chat.ts`).

---

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy to Production
vercel --prod
```

When prompted:
- **Project Name**: `mubashar-hussain`
- **Output Subdomain**: `https://mubashar-hussain.vercel.app`

### Option 2: GitHub Integration (Recommended)

1. Push your repository to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and click **Import**.
3. Name your project **`mubashar-hussain`** (which automatically binds to `mubashar-hussain.vercel.app`).
4. Click **Deploy**.

### 🔑 Adding Environment Variables on Vercel

1. In your project dashboard on Vercel, go to **Settings** > **Environment Variables**.
2. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. Redeploy or trigger a new push to activate live LLM streaming.
