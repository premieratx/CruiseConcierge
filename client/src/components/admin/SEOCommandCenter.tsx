import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';

/**
 * SEO Command Center Integration
 *
 * Connects to the external SEO Command Center's multi-agent API
 * to provide AI-powered SEO management directly from the PPC admin.
 *
 * Agents available:
 * - 🎯 Command Center (Main orchestrator)
 * - 🔍 SEO Specialist
 * - 🤖 AI Visibility
 * - 🎨 Design
 * - ⚡ Implementation
 */

const SEO_COMMAND_CENTER_URL = import.meta.env.VITE_SEO_COMMAND_CENTER_URL || 'https://seo-command-center.netlify.app';
const SEO_SYNC_TOKEN = import.meta.env.VITE_SEO_SYNC_TOKEN || 'ppc-seo-sync-2026';
const SITE_ID = '37292000-d661-4238-8ba4-6a53b71c2d07';

interface AgentInfo {
  id: string;
  name: string;
  emoji: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  agent?: AgentInfo;
}

const AGENTS = [
  { id: '', label: 'Auto-route', emoji: '🔀' },
  { id: 'main', label: 'Command Center', emoji: '🎯' },
  { id: 'seo', label: 'SEO Specialist', emoji: '🔍' },
  { id: 'ai_visibility', label: 'AI Visibility', emoji: '🤖' },
  { id: 'design', label: 'Design', emoji: '🎨' },
  { id: 'implementation', label: 'Implementation', emoji: '⚡' },
];

const MODELS = [
  { id: 'claude-sonnet-4-20250514', label: 'Sonnet 4' },
  { id: 'claude-opus-4-20250514', label: 'Opus 4' },
  { id: 'claude-haiku-35-20241022', label: 'Haiku 3.5' },
];

export default function SEOCommandCenter() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'SEO Command Center connected. I have access to your keywords, audit issues, AI visibility data, and recommendations.\n\nI can:\n• Analyze SEO performance and suggest fixes\n• Track AI visibility across ChatGPT, Gemini, Perplexity\n• Generate optimized content for pages\n• Review and improve meta descriptions\n• Execute code changes on your GitHub repo\n\nWhat would you like to work on?',
      agent: { id: 'main', name: 'Command Center', emoji: '🎯' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-20250514');
  const [activeAgent, setActiveAgent] = useState<AgentInfo | null>(null);
  const [overview, setOverview] = useState<Record<string, unknown> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch SEO overview on mount
  useEffect(() => {
    fetchOverview();
  }, []);

  async function fetchOverview() {
    try {
      const res = await fetch(
        `${SEO_COMMAND_CENTER_URL}/api/seo-sync?action=overview&site_id=${SITE_ID}&token=${SEO_SYNC_TOKEN}`
      );
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch {
      // Silently fail - overview is optional
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    setActiveAgent(null);

    try {
      const res = await fetch(`${SEO_COMMAND_CENTER_URL}/api/agent-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-seo-sync-token': SEO_SYNC_TOKEN,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          site_id: SITE_ID,
          model: selectedModel,
          ...(selectedAgent && { agent: selectedAgent }),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Connection failed' }));
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${err.error || err.detail || 'Failed to connect to SEO Command Center'}` },
        ]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';
      let agentInfo: AgentInfo | undefined;

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.agent) {
              agentInfo = parsed.agent;
              setActiveAgent(parsed.agent);
            }
            if (parsed.text) {
              assistantContent += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                  agent: agentInfo,
                };
                return updated;
              });
            }
          } catch {
            // skip
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Connection error: ${err instanceof Error ? err.message : 'Unable to reach SEO Command Center'}. Make sure the dashboard is deployed.`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Overview Stats Bar */}
      {overview && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card className="p-3">
            <div className="text-2xl font-bold">{(overview.averageScore as number) || 0}</div>
            <div className="text-xs text-muted-foreground">SEO Score</div>
          </Card>
          <Card className="p-3">
            <div className="text-2xl font-bold">{(overview.highPriorityIssues as number) || 0}</div>
            <div className="text-xs text-muted-foreground">Priority Issues</div>
          </Card>
          <Card className="p-3">
            <div className="text-2xl font-bold">{(overview.metrics as Record<string, unknown>)?.organic_keywords?.toString() || '—'}</div>
            <div className="text-xs text-muted-foreground">Organic Keywords</div>
          </Card>
          <Card className="p-3">
            <div className="text-2xl font-bold">{(overview.metrics as Record<string, unknown>)?.organic_traffic?.toString() || '—'}</div>
            <div className="text-xs text-muted-foreground">Organic Traffic</div>
          </Card>
          <Card className="p-3 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{(overview.metrics as Record<string, unknown>)?.authority_score?.toString() || '—'}</div>
              <div className="text-xs text-muted-foreground">Authority</div>
            </div>
            <Button variant="ghost" size="sm" onClick={fetchOverview}>
              <RefreshCw className="w-3 h-3" />
            </Button>
          </Card>
        </div>
      )}

      {/* Chat Area */}
      <Card className="flex flex-col" style={{ height: 'calc(100vh - 320px)', minHeight: '500px' }}>
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              SEO Command Center
              {activeAgent && isStreaming && (
                <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                  {activeAgent.emoji} {activeAgent.name} responding...
                </Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="text-xs border rounded px-2 py-1 bg-background"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="text-xs border rounded px-2 py-1 bg-background"
              >
                {AGENTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.emoji} {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                      {msg.agent?.emoji || '🤖'}
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.role === 'assistant' && msg.agent && (
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        {msg.agent.emoji} {msg.agent.name}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">
                      {msg.content || (isStreaming && i === messages.length - 1 ? '...' : '')}
                    </div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SEO, AI visibility, or give instructions..."
                className="flex-1 border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isStreaming}
              />
              <Button type="submit" disabled={isStreaming} size="sm">
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
