import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Database, FileText, Link as LinkIcon, Type, MoreVertical, CheckCircle, Clock } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty } from '@/components/ui/empty'
import { formatDistanceToNow } from 'date-fns'

const sourceTypeIcons = {
  document: FileText,
  url: LinkIcon,
  text: Type,
  api: Database,
}

export default async function KnowledgePage() {
  const supabase = await createClient()

  const { data: knowledge } = await supabase
    .from('knowledge')
    .select('*, intelligences(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage documents and data for your AI agents
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/knowledge/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Knowledge
          </Link>
        </Button>
      </div>

      {knowledge && knowledge.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {knowledge.map((item) => {
            const Icon = sourceTypeIcons[item.source_type as keyof typeof sourceTypeIcons] || FileText
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-base line-clamp-1">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs capitalize">
                        {item.source_type}
                      </CardDescription>
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
                        <Link href={`/dashboard/knowledge/${item.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  {item.intelligences && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Linked to: {item.intelligences.name}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={item.is_processed ? 'default' : 'secondary'}
                      className="gap-1"
                    >
                      {item.is_processed ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Processed
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          Pending
                        </>
                      )}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Empty
          icon={Database}
          title="No knowledge items yet"
          description="Add documents or text to power your AI agents"
        >
          <Button asChild>
            <Link href="/dashboard/knowledge/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Knowledge
            </Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
