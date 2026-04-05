import { createClient } from '@/lib/supabase/server'
import { KnowledgeForm } from '@/components/dashboard/knowledge-form'

export default async function NewKnowledgePage() {
  const supabase = await createClient()

  const { data: intelligences } = await supabase
    .from('intelligences')
    .select('id, name')
    .order('name')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Knowledge</h1>
        <p className="text-muted-foreground">
          Add documents, text, or URLs to your knowledge base
        </p>
      </div>

      <KnowledgeForm intelligences={intelligences || []} />
    </div>
  )
}
