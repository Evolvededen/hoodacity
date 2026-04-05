import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Bot, MoreVertical, Play, Pause } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty } from '@/components/ui/empty'

export default async function IntelligencesPage() {
  const supabase = await createClient()

  const { data: intelligences } = await supabase
    .from('intelligences')
    .select('*, teams(name), twins(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Intelligences</h1>
          <p className="text-muted-foreground">
            Create and manage your AI agents
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/intelligences/new">
            <Plus className="mr-2 h-4 w-4" />
            New Intelligence
          </Link>
        </Button>
      </div>

      {intelligences && intelligences.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {intelligences.map((intelligence) => (
            <Card key={intelligence.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        href={`/dashboard/intelligences/${intelligence.id}`}
                        className="hover:underline"
                      >
                        {intelligence.name}
                      </Link>
                    </CardTitle>
                    {intelligence.teams && (
                      <CardDescription className="text-xs">
                        {intelligence.teams.name}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/intelligences/${intelligence.id}`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/intelligences/${intelligence.id}/chat`}>
                        Test Chat
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/deployments/new?intelligence=${intelligence.id}`}>
                        Deploy
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {intelligence.description || 'No description'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={intelligence.is_published ? 'default' : 'secondary'}>
                      {intelligence.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    {intelligence.twins && (
                      <Badge variant="outline">AI Twin</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title={intelligence.is_active ? 'Pause' : 'Activate'}
                  >
                    {intelligence.is_active ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          icon={Bot}
          title="No intelligences yet"
          description="Create your first AI agent to get started"
        >
          <Button asChild>
            <Link href="/dashboard/intelligences/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Intelligence
            </Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
