import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ChatInterface } from '@/components/chat/chat-interface'

interface Props {
  params: Promise<{ id: string }>
}

export default async function IntelligenceChatPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: intelligence } = await supabase
    .from('intelligences')
    .select('*, twins(*)')
    .eq('id', id)
    .single()

  if (!intelligence) {
    notFound()
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{intelligence.name}</h1>
          <p className="text-muted-foreground">Test your intelligence</p>
        </div>
      </div>

      <ChatInterface
        intelligenceId={intelligence.id}
        systemPrompt={intelligence.system_prompt}
        model={intelligence.model}
        temperature={intelligence.temperature}
        twinPersonality={intelligence.twins?.personality}
      />
    </div>
  )
}
