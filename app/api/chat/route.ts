import { streamText, convertToModelMessages, UIMessage, embed } from 'ai'
import { createClient } from '@/lib/supabase/server'

// Helper to extract text from UIMessage
function getMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export async function POST(req: Request) {
  const {
    messages,
    intelligenceId,
    systemPrompt,
    model = 'openai/gpt-4o',
    temperature = 0.7,
    twinPersonality,
    deploymentId,
  }: {
    messages: UIMessage[]
    intelligenceId: string
    systemPrompt?: string
    model?: string
    temperature?: number
    twinPersonality?: Record<string, unknown>
    deploymentId?: string
  } = await req.json()

  const supabase = await createClient()

  // Build system prompt with optional twin personality
  let finalSystemPrompt = systemPrompt || 'You are a helpful AI assistant.'

  if (twinPersonality) {
    const personality = twinPersonality as {
      tone?: string
      style?: string
      traits?: string[]
    }
    
    if (personality.tone) {
      finalSystemPrompt += `\n\nTone: ${personality.tone}`
    }
    if (personality.style) {
      finalSystemPrompt += `\nCommunication style: ${personality.style}`
    }
    if (personality.traits?.length) {
      finalSystemPrompt += `\nPersonality traits: ${personality.traits.join(', ')}`
    }
  }

  // Fetch relevant knowledge using RAG with vector search
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()
  let context = ''

  if (lastUserMessage && intelligenceId) {
    const query = getMessageText(lastUserMessage)
    
    if (query) {
      try {
        // Generate embedding for the query
        const { embedding } = await embed({
          model: 'openai/text-embedding-3-small',
          value: query,
        })

        // Get the intelligence to find company_id
        const { data: intelligence } = await supabase
          .from('intelligences')
          .select('company_id')
          .eq('id', intelligenceId)
          .single()

        if (intelligence) {
          // Search for similar knowledge chunks using vector similarity
          const { data: chunks } = await supabase.rpc('match_knowledge', {
            query_embedding: embedding,
            match_threshold: 0.7,
            match_count: 5,
            filter_company_id: intelligence.company_id,
            filter_intelligence_id: intelligenceId,
          })

          if (chunks?.length) {
            context = `\n\nRelevant context from knowledge base:\n${chunks.map((c: { content: string }) => c.content).join('\n\n---\n\n')}`
          }
        }
      } catch (err) {
        console.error('RAG search error:', err)
        // Fall back to simple search
        const { data: knowledge } = await supabase
          .from('knowledge')
          .select('content')
          .eq('intelligence_id', intelligenceId)
          .eq('is_processed', true)
          .limit(3)

        if (knowledge?.length) {
          context = `\n\nRelevant context:\n${knowledge.map(k => k.content).join('\n\n')}`
        }
      }
    }
  }

  const systemMessage = finalSystemPrompt + context

  const result = streamText({
    model,
    system: systemMessage,
    messages: await convertToModelMessages(messages),
    temperature,
  })

  // Track analytics for deployments
  if (deploymentId) {
    await supabase.from('analytics_events').insert({
      intelligence_id: intelligenceId,
      deployment_id: deploymentId,
      event_type: 'message',
      metadata: { model },
    })
  }

  return result.toUIMessageStreamResponse()
}
