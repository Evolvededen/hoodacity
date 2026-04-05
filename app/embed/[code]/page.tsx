import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PublicChatInterface } from '@/components/chat/public-chat-interface'

interface Props {
  params: Promise<{ code: string }>
}

export default async function EmbedChatPage({ params }: Props) {
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

  // Track embed view
  await supabase.from('analytics_events').insert({
    company_id: deployment.company_id,
    intelligence_id: deployment.intelligence_id,
    deployment_id: deployment.id,
    event_type: 'embed_view',
    metadata: {},
  })

  return (
    <div className="h-screen bg-background">
      <PublicChatInterface
        deploymentId={deployment.id}
        intelligenceId={intelligence.id}
        systemPrompt={intelligence.system_prompt}
        model={intelligence.model}
        temperature={intelligence.temperature}
        twinPersonality={intelligence.twins?.personality}
        intelligenceName={intelligence.name}
      />
    </div>
  )
}
