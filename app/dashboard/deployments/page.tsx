import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Rocket, QrCode, Code, Link as LinkIcon, MoreVertical, Copy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty } from '@/components/ui/empty'

const channelIcons = {
  qr: QrCode,
  embed: Code,
  link: LinkIcon,
  api: Code,
}

const channelLabels = {
  qr: 'QR Code',
  embed: 'Website Embed',
  link: 'Direct Link',
  api: 'API',
}

export default async function DeploymentsPage() {
  const supabase = await createClient()

  const { data: deployments } = await supabase
    .from('deployments')
    .select('*, intelligences(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deployments</h1>
          <p className="text-muted-foreground">
            Deploy your intelligences across different channels
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/deployments/new">
            <Plus className="mr-2 h-4 w-4" />
            New Deployment
          </Link>
        </Button>
      </div>

      {deployments && deployments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deployments.map((deployment) => {
            const Icon = channelIcons[deployment.channel as keyof typeof channelIcons] || Rocket
            const channelLabel = channelLabels[deployment.channel as keyof typeof channelLabels] || deployment.channel
            return (
              <Card key={deployment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        <Link
                          href={`/dashboard/deployments/${deployment.id}`}
                          className="hover:underline"
                        >
                          {deployment.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {channelLabel}
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
                        <Link href={`/dashboard/deployments/${deployment.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  {deployment.intelligences && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {deployment.intelligences.name}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant={deployment.is_active ? 'default' : 'secondary'}>
                      {deployment.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {deployment.access_code && (
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {deployment.access_code}
                      </code>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Empty
          icon={Rocket}
          title="No deployments yet"
          description="Deploy your intelligences to reach your audience"
        >
          <Button asChild>
            <Link href="/dashboard/deployments/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Deployment
            </Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
