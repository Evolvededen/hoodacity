import { createClient } from '@/lib/supabase/server'
import { DeploymentForm } from '@/components/dashboard/deployment-form'

interface Props {
  searchParams: Promise<{ intelligence?: string }>
}

export default async function NewDeploymentPage({ searchParams }: Props) {
  const { intelligence } = await searchParams
  const supabase = await createClient()

  const { data: intelligences } = await supabase
    .from('intelligences')
    .select('id, name')
    .eq('is_published', true)
    .order('name')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Deployment</h1>
        <p className="text-muted-foreground">
          Deploy your intelligence to reach your audience
        </p>
      </div>

      <DeploymentForm
        intelligences={intelligences || []}
        defaultIntelligenceId={intelligence}
      />
    </div>
  )
}
