import { createClient } from '@/lib/supabase/server'
import { IntelligenceForm } from '@/components/dashboard/intelligence-form'

export default async function NewIntelligencePage() {
  const supabase = await createClient()

  const [teamsRes, twinsRes] = await Promise.all([
    supabase.from('teams').select('id, name').order('name'),
    supabase.from('twins').select('id, name').order('name'),
  ])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Intelligence</h1>
        <p className="text-muted-foreground">
          Build a new AI agent with custom personality and knowledge
        </p>
      </div>

      <IntelligenceForm
        teams={teamsRes.data || []}
        twins={twinsRes.data || []}
      />
    </div>
  )
}
