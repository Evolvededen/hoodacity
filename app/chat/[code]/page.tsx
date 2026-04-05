import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PublicChatInterface } from '@/components/chat/public-chat-interface'
import { Brain } from 'lucide-react'

interface Props {
  params: Promise<{ code: string }>
}

export default async function PublicChatPage({ params }: Props) {
  const { code } = await params
  const supabase = await createClient()

  const { data: deployment } = await supabase
    .from('deployments')
    .select('*, intelligences(*, twins(*))')
    .eq('access_code', code)
    .eq('is_active', true)
    .single()

  if (!deployment || !deployment.intelligences) {
    notFound()
  }

  const intelligence = deployment.intelligences

  // Track view event
  await supabase.from('analytics_events').insert({
    company_id: deployment.company_id,
    intelligence_id: deployment.intelligence_id,
    deployment_id: deployment.id,
    event_type: 'view',
    metadata: {},
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-14 items-center px-4 gap-3">
          {intelligence.avatar_url ? (
            <img
              src={intelligence.avatar_url}
              alt={intelligence.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-4 w-4 text-primary" />
            </div>
          )}
          <div>
            <h1 className="text-sm font-semibold">{intelligence.name}</h1>
            {intelligence.description && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {intelligence.description}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 container mx-auto max-w-3xl">
        <PublicChatInterface
          deploymentId={deployment.id}
          intelligenceId={intelligence.id}
          systemPrompt={intelligence.system_prompt}
          model={intelligence.model}
          temperature={intelligence.temperature}
          twinPersonality={intelligence.twins?.personality}
          intelligenceName={intelligence.name}
        />
      </main>

      {/* Footer */}
      <footer className="border-t py-3 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by RIS
        </p>
      </footer>
    </div>
  )
}
