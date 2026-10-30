import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, Terminal, Wrench } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
  toolCall?: string;
}

const STARTER_PROMPTS = [
  "🚀 What are Mubashar's top projects?",
  "🤖 What is his AI integration experience?",
  "💼 Is Mubashar available for hire?",
  "⏱️ How can I get a project estimate?"
];

export const AIAgentWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted' | 'streaming'>('idle');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hi! I am **Mubashar Hussain's AI Agent**, powered by the **Vercel AI SDK**.\n\nAsk me anything about Mubashar's full-stack projects, AI integration capabilities, or check his availability for hire!`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || status !== 'idle') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setStatus('submitted');

    // Assistant response placeholder
    const assistantId = (Date.now() + 1).toString();
    const assistantPlaceholder: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      isStreaming: true
    };
    setMessages(prev => [...prev, assistantPlaceholder]);

    // Show simulated tool calling feedback for realistic agentic UX
    if (text.toLowerCase().includes('project') || text.toLowerCase().includes('portfolio') || text.toLowerCase().includes('work')) {
      setActiveTool('getProjects()');
    } else if (text.toLowerCase().includes('hire') || text.toLowerCase().includes('availab') || text.toLowerCase().includes('contact')) {
      setActiveTool('checkAvailability()');
    } else if (text.toLowerCase().includes('estimate') || text.toLowerCase().includes('timeline') || text.toLowerCase().includes('price')) {
      setActiveTool('calculateEstimate()');
    } else if (text.toLowerCase().includes('skill') || text.toLowerCase().includes('stack') || text.toLowerCase().includes('ai')) {
      setActiveTool('getSkills()');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned status ${response.status}`);
      }

      setStatus('streaming');
      setActiveTool(null);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: accumulated, isStreaming: true }
              : m
          )
        );
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err: any) {
      console.warn('Backend API request error, activating client agent fallback:', err);
      setActiveTool(null);

      // Intelligent client fallback for preview & zero-key setups
      const fallbackResponse = getSimulatedAgentResponse(text);
      let streamedLength = 0;
      setStatus('streaming');

      const interval = setInterval(() => {
        streamedLength += 4;
        const currentSlice = fallbackResponse.slice(0, streamedLength);

        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: currentSlice, isStreaming: true }
              : m
          )
        );

        if (streamedLength >= fallbackResponse.length) {
          clearInterval(interval);
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, isStreaming: false } : m
            )
          );
          setStatus('idle');
        }
      }, 20);

      return;
    } finally {
      setStatus('idle');
      setActiveTool(null);
    }
  };

  const getSimulatedAgentResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('project') || q.includes('work')) {
      return `🔧 **Tool Executed: \`getProjects()\`**\n\nMubashar's featured full-stack projects include:\n\n1. **Airbnb Clone Platform (MH-01)**: Production-ready full stack MERN web application with user auth, interactive listings, maps, and booking management.\n2. **Real-time Social Media Platform (MH-02)**: MERN app featuring live feeds, like systems, media uploads, and threaded comments.\n3. **AI Integration Studio (MH-03)**: Smart automation suite demonstrating Gemini API integrations, Vercel AI SDK tool calling, and streaming response pipelines.\n4. **Dynamic EJS & PHP / Laravel Hub (MH-04)**: Enterprise-style RBAC system with relational SQL database migrations.\n5. **Interactive DAW & Stem Mixer (MH-05)**: Browser-based audio studio utilizing the Web Audio API and HTML5 canvas.`;
    }

    if (q.includes('availab') || q.includes('hire') || q.includes('job') || q.includes('contact')) {
      return `📅 **Tool Executed: \`checkAvailability()\`**\n\n- **Status**: **OPEN FOR HIRE** (Immediate Availability)\n- **Location**: Lahore, Pakistan (100% remote globally)\n- **Roles**: Full Stack Developer (MERN), AI Integration Engineer, React Specialist\n- **Engagement Types**: Full-time, Contract, or Freelance Consulting\n\nYou can connect directly with Mubashar through this portfolio or schedule an interview!`;
    }

    if (q.includes('ai') || q.includes('sdk') || q.includes('llm') || q.includes('gemini')) {
      return `🤖 **Tool Executed: \`getSkills({ category: "AI" })\`**\n\nMubashar specializes in modern **AI Integration**:\n- **Vercel AI SDK**: Tool-calling agents, streaming completions, structured output generation, and multi-step reasoning.\n- **Gemini 2.0 / LLM APIs**: Contextual pipelines, function calling, and automated web agents.\n- **Full-Stack Architecture**: Integrating intelligent agents into React & Node.js backends deployed on Vercel.`;
    }

    if (q.includes('estimate') || q.includes('timeline') || q.includes('price')) {
      return `⏱️ **Tool Executed: \`calculateEstimate()\`**\n\n- **Typical MVP / Web App**: 2 to 4 weeks\n- **AI Agent & LLM Integration**: 1 to 2 weeks\n- **Full-Stack MERN Enterprise App**: 4 to 8 weeks\n\nRecommended stack: **React + TypeScript, Tailwind CSS, Node.js backend with MongoDB, and Vercel AI SDK** deployed smoothly on Vercel.`;
    }

    return `I am Mubashar Hussain's AI Agent. I can help you with:\n\n- Exploring his **Full Stack MERN** & **AI Integration** projects\n- Checking his current **availability for hire**\n- Explaining his technical skillset (React, TypeScript, Node.js, Express, PHP, Laravel, MongoDB, MySQL)\n- Providing initial **timeline and architecture estimates** for your next project.\n\nWhat would you like to know?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `👋 Chat cleared! How can I assist you with Mubashar's work or hiring availability?`
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Sora',sans-serif]">
      {/* Trigger Button when collapsed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#0A0C0E]/90 hover:bg-[#15120F] text-[#EDE7DC] px-5 py-3.5 rounded-full border border-[#E8913C]/40 hover:border-[#E8913C] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open AI Agent"
        >
          {/* Glowing pulse indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8913C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E8913C]"></span>
          </span>

          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#E8913C] group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-semibold tracking-wide">Mubashar AI Agent</span>
          </div>

          <span className="text-[10px] uppercase font-mono tracking-wider bg-[#E8913C]/20 text-[#E8913C] px-2 py-0.5 rounded-full border border-[#E8913C]/30">
            Vercel AI SDK
          </span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0E1012] border border-[#2E3338] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#15181B] border-b border-[#252A2E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8913C]/20 border border-[#E8913C]/40 flex items-center justify-center text-[#E8913C]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#EDE7DC]">Mubashar AI Agent</h3>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-[#9EA5A8] font-mono">Vercel AI SDK • Gemini 2.0</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-1.5 rounded-lg text-[#9EA5A8] hover:text-[#EDE7DC] hover:bg-[#252A2E] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-[#9EA5A8] hover:text-[#EDE7DC] hover:bg-[#252A2E] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#E8913C]/20 border border-[#E8913C]/40 flex items-center justify-center text-[#E8913C] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#E8913C] text-[#0A0C0E] font-medium rounded-br-none shadow-md'
                      : 'bg-[#181C20] border border-[#2A3036] text-[#EDE7DC] rounded-bl-none'
                  }`}
                >
                  {msg.content || (msg.isStreaming && (
                    <span className="inline-flex gap-1 items-center text-[#E8913C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  ))}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#2E6B72]/40 border border-[#2E6B72] flex items-center justify-center text-[#EDE7DC] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Active Tool Badge Indicator */}
            {activeTool && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E8913C]/10 border border-[#E8913C]/30 rounded-lg text-[11px] text-[#E8913C] font-mono animate-pulse w-fit">
                <Wrench className="w-3.5 h-3.5 animate-spin" />
                <span>Agent executing tool: {activeTool}...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] bg-[#181C20] hover:bg-[#23292F] text-[#9EA5A8] hover:text-[#EDE7DC] px-2.5 py-1 rounded-full border border-[#2B3137] transition-all text-left truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-[#15181B] border-t border-[#252A2E]">
            <div className="relative flex items-center bg-[#0B0D0F] border border-[#2E3338] focus-within:border-[#E8913C] rounded-xl overflow-hidden transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Mubashar AI..."
                disabled={status !== 'idle'}
                className="flex-1 bg-transparent px-3.5 py-2.5 text-xs text-[#EDE7DC] placeholder-[#5A6065] focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || status !== 'idle'}
                className="mr-2 p-1.5 bg-[#E8913C] hover:bg-[#D48133] disabled:opacity-30 disabled:hover:bg-[#E8913C] text-[#0A0C0E] rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-[#5A6065]">
              <span className="flex items-center gap-1 font-mono">
                <Terminal className="w-2.5 h-2.5" /> Autonomous Tool Calling
              </span>
              <span>Deployable on Vercel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
