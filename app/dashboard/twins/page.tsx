import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Sparkles, MoreVertical, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty } from '@/components/ui/empty'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function TwinsPage() {
  const supabase = await createClient()

  const { data: twins } = await supabase
    .from('twins')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Twins</h1>
          <p className="text-muted-foreground">
            Create digital representations of team members
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/twins/new">
            <Plus className="mr-2 h-4 w-4" />
            New AI Twin
          </Link>
        </Button>
      </div>

      {twins && twins.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {twins.map((twin) => (
            <Card key={twin.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={twin.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        href={`/dashboard/twins/${twin.id}`}
                        className="hover:underline"
                      >
                        {twin.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {twin.profiles?.full_name || twin.profiles?.email}
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
                      <Link href={`/dashboard/twins/${twin.id}`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {twin.bio || 'No bio'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={twin.is_active ? 'default' : 'secondary'}>
                    {twin.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  {twin.personality?.traits?.length > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      {twin.personality.traits.length} traits
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          icon={Sparkles}
          title="No AI twins yet"
          description="Create AI twins to give your intelligences personality"
        >
          <Button asChild>
            <Link href="/dashboard/twins/new">
              <Plus className="mr-2 h-4 w-4" />
              Create AI Twin
            </Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
