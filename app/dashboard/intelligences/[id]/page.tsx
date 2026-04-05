import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { IntelligenceForm } from '@/components/dashboard/intelligence-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MessageSquare, Rocket, Trash2 } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default async function IntelligenceDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [intelligenceRes, teamsRes, twinsRes] = await Promise.all([
    supabase
      .from('intelligences')
      .select('*')
      .eq('id', id)
      .single(),
    supabase.from('teams').select('id, name').order('name'),
    supabase.from('twins').select('id, name').order('name'),
  ])

  if (!intelligenceRes.data) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Intelligence</h1>
          <p className="text-muted-foreground">
            Update your AI agent configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/intelligences/${id}/chat`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Test Chat
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/deployments/new?intelligence=${id}`}>
              <Rocket className="mr-2 h-4 w-4" />
              Deploy
            </Link>
          </Button>
        </div>
      </div>

      <IntelligenceForm
        intelligence={intelligenceRes.data}
        teams={teamsRes.data || []}
        twins={twinsRes.data || []}
      />
    </div>
  )
}
