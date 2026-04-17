import type { Request, Response } from 'express';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://gtoiejwibueezlhfjcue.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const CLAUDE_MODEL_FAST = 'claude-haiku-4-5-20251001';

// In-memory cache so we don't hit Supabase on every message
let kbCache: Array<{ category: string; question: string; answer: string; priority: number }> | null = null;
let kbCacheAt = 0;
const KB_CACHE_MS = 60 * 1000; // 1 min

let anthropicKeyCache: string | null = null;
let anthropicKeyCacheAt = 0;
const KEY_CACHE_MS = 5 * 60 * 1000; // 5 min

async function getKnowledgeBase() {
  const now = Date.now();
  if (kbCache && (now - kbCacheAt) < KB_CACHE_MS) return kbCache;

  try {
    const url = `${SUPABASE_URL}/rest/v1/chatbot_knowledge_base?active=eq.true&select=category,question,answer,priority&order=priority.desc`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) {
      console.error('KB fetch failed:', res.status);
      return kbCache || [];
    }
    const data = await res.json();
    kbCache = data;
    kbCacheAt = now;
    return data;
  } catch (e) {
    console.error('KB fetch error:', e);
    return kbCache || [];
  }
}

async function getAnthropicKey(): Promise<string | null> {
  const now = Date.now();
  if (anthropicKeyCache && (now - anthropicKeyCacheAt) < KEY_CACHE_MS) return anthropicKeyCache;

  // First try env var
  if (process.env.ANTHROPIC_API_KEY) {
    anthropicKeyCache = process.env.ANTHROPIC_API_KEY;
    anthropicKeyCacheAt = now;
    return anthropicKeyCache;
  }

  // Fall back to app_config table
  try {
    const url = `${SUPABASE_URL}/rest/v1/app_config?key=eq.anthropic_api_key&select=value`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.[0]?.value) {
      anthropicKeyCache = data[0].value;
      anthropicKeyCacheAt = now;
      return anthropicKeyCache;
    }
  } catch (e) {
    console.error('API key fetch error:', e);
  }
  return null;
}

function buildSystemPrompt(kb: any[], pageContext: string): string {
  const contextHint = pageContext === 'bachelorette'
    ? 'The user is viewing a BACHELORETTE-related page. Focus on bachelorette party options.'
    : pageContext === 'bachelor'
    ? 'The user is viewing a BACHELOR-related page. Focus on bachelor party options.'
    : 'The user is viewing the homepage or a general page.';

  const kbText = kb
    .sort((a, b) => b.priority - a.priority)
    .map(entry => `[${entry.category.toUpperCase()}] ${entry.question ? `Q: ${entry.question}\n` : ''}A: ${entry.answer}`)
    .join('\n\n');

  return `You are the official AI concierge for Premier Party Cruises (PPC), Austin's longest-running party boat company on Lake Travis since 2009. Your job is to help prospective guests plan their perfect party cruise, answer questions accurately using ONLY the company knowledge provided below, and qualify leads for booking.

${contextHint}

## TONE & STYLE
- Warm, enthusiastic, concise (2-3 sentences max per response unless listing details)
- Use 1-2 emojis per response for warmth — 🚢 🎉 ⚓ ✨ 🌊 💕 🥂
- Never be salesy or pushy — be a helpful concierge
- Always use specific numbers when given (prices, capacity, dates) — never vague
- If you don't know something from the knowledge base, say "Let me connect you with our team at (512) 488-5892 for that" — DO NOT make up answers

## COMPANY KNOWLEDGE BASE
${kbText}

## CONVERSATION GOALS (in order of priority)
1. Answer the user's question accurately from the knowledge base above
2. Qualify: ask about date, group size, event type (if not already provided)
3. Recommend the best option (Disco Cruise vs Private Charter) based on group size and event type
4. Invite them to Get Quote or Book — end most messages with a soft next step
5. Capture contact info if they're ready to book

## OUTPUT FORMAT
Return only the message text as a plain string — the system will handle buttons. You can suggest buttons for the UI by ending with a line like:
[BUTTONS: "Get Quote|/chat", "Call Now|tel:+15124885892", "View Fleet|/private-cruises"]

Never output JSON, only natural prose. Stay under 80 words per response unless the user explicitly asks for a list or details.`;
}

export async function handleChatMessage(req: Request, res: Response) {
  try {
    const { sessionId, message, context } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message required' });
    }

    const [kb, apiKey] = await Promise.all([
      getKnowledgeBase(),
      getAnthropicKey(),
    ]);

    if (!apiKey) {
      return res.json({
        message: "Our booking team would love to help you plan! Please call us at (512) 488-5892 or use the Get Quote form. 🚢",
        buttons: [
          { id: 'call', text: 'Call (512) 488-5892', value: 'tel:+15124885892', style: 'primary' },
          { id: 'quote', text: 'Get Quote', value: '/chat', style: 'secondary' },
        ],
        metadata: { fallback: true, reason: 'no_api_key' },
      });
    }

    const pageContext = context?.pageContext || 'home';
    const systemPrompt = buildSystemPrompt(kb, pageContext);

    // Pick model based on message complexity
    const isComplex = message.length > 200 || /compare|analyze|recommend|plan my|itinerary|detail/i.test(message);
    const model = isComplex ? CLAUDE_MODEL : CLAUDE_MODEL_FAST;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      console.error('Claude API error:', claudeRes.status, err);
      return res.json({
        message: "I'm having trouble connecting right now. Please call us at (512) 488-5892 and we'll help you immediately! 🚢",
        buttons: [{ id: 'call', text: 'Call Now', value: 'tel:+15124885892', style: 'primary' }],
        metadata: { fallback: true, reason: 'claude_error' },
      });
    }

    const claudeData = await claudeRes.json();
    let text = claudeData?.content?.[0]?.text || '';

    // Extract buttons if present in response
    let buttons: Array<{ id: string; text: string; value: string; style: string }> = [];
    const buttonMatch = text.match(/\[BUTTONS:\s*(.+?)\]/s);
    if (buttonMatch) {
      const buttonsStr = buttonMatch[1];
      const buttonPairs = buttonsStr.match(/"([^"]+)\|([^"]+)"/g) || [];
      buttons = buttonPairs.map((pair, i) => {
        const match = pair.match(/"([^"]+)\|([^"]+)"/);
        if (!match) return null;
        return {
          id: `btn_${i}`,
          text: match[1],
          value: match[2],
          style: (i === 0 ? 'primary' : 'secondary') as string,
        };
      }).filter(Boolean) as any[];
      text = text.replace(/\[BUTTONS:.+?\]/s, '').trim();
    }

    // Log conversation async (don't await)
    if (sessionId) {
      logConversation(sessionId, pageContext, message, text).catch(() => { /* fire-and-forget */ });
    }

    return res.json({
      message: text,
      buttons: buttons.length ? buttons : undefined,
      metadata: { model, knowledgeEntries: kb.length },
    });
  } catch (e: any) {
    console.error('Chat endpoint error:', e);
    return res.status(500).json({
      message: "Sorry, I'm having trouble. Please call (512) 488-5892 for immediate help. 🚢",
      buttons: [{ id: 'call', text: 'Call Now', value: 'tel:+15124885892', style: 'primary' }],
      metadata: { error: true },
    });
  }
}

async function logConversation(sessionId: string, pageContext: string, userMsg: string, assistantMsg: string) {
  try {
    const now = new Date().toISOString();
    // Check if session exists
    const existsRes = await fetch(`${SUPABASE_URL}/rest/v1/chatbot_conversations?session_id=eq.${sessionId}&select=id,messages`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
    });
    const existing = await existsRes.json();

    const newMessages = [
      { role: 'user', content: userMsg, at: now },
      { role: 'assistant', content: assistantMsg, at: now },
    ];

    if (existing?.[0]?.id) {
      // Append
      const current = existing[0].messages || [];
      await fetch(`${SUPABASE_URL}/rest/v1/chatbot_conversations?id=eq.${existing[0].id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          messages: [...current, ...newMessages],
          last_message_at: now,
        }),
      });
    } else {
      // Create
      await fetch(`${SUPABASE_URL}/rest/v1/chatbot_conversations`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          session_id: sessionId,
          page_context: pageContext,
          messages: newMessages,
        }),
      });
    }
  } catch (e) {
    // Don't throw — conversation logging is non-critical
    console.error('Conv log error:', e);
  }
}
