import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { QrCode, Code, Link as LinkIcon, ExternalLink, Copy, Bot } from 'lucide-react'
import { DeploymentQRCode } from '@/components/dashboard/deployment-qr'
import { DeploymentEmbed } from '@/components/dashboard/deployment-embed'

interface Props {
  params: Promise<{ id: string }>
}

export default async function DeploymentDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: deployment } = await supabase
    .from('deployments')
    .select('*, intelligences(name, description)')
    .eq('id', id)
    .single()

  if (!deployment) {
    notFound()
  }

  const chatUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/chat/${deployment.access_code}`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{deployment.name}</h1>
          <p className="text-muted-foreground">
            {deployment.intelligences?.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={deployment.is_active ? 'default' : 'secondary'}>
            {deployment.is_active ? 'Active' : 'Inactive'}
          </Badge>
          <Button asChild variant="outline">
            <Link href={chatUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Chat
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Access Details */}
        <Card>
          <CardHeader>
            <CardTitle>Access Details</CardTitle>
            <CardDescription>
              How users can access this deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Access Code</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">
                  {deployment.access_code}
                </code>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Direct Link</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono truncate">
                  {chatUrl}
                </code>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Channel</label>
              <div className="flex items-center gap-2 mt-1">
                {deployment.channel === 'qr' && <QrCode className="h-4 w-4" />}
                {deployment.channel === 'embed' && <Code className="h-4 w-4" />}
                {deployment.channel === 'link' && <LinkIcon className="h-4 w-4" />}
                <span className="capitalize">{deployment.channel}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intelligence Info */}
        <Card>
          <CardHeader>
            <CardTitle>Intelligence</CardTitle>
            <CardDescription>
              The AI agent powering this deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{deployment.intelligences?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {deployment.intelligences?.description || 'No description'}
                </p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link href={`/dashboard/intelligences/${deployment.intelligence_id}`}>
                    Edit Intelligence
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel-specific content */}
      {deployment.channel === 'qr' && (
        <DeploymentQRCode url={chatUrl} name={deployment.name} />
      )}

      {deployment.channel === 'embed' && (
        <DeploymentEmbed accessCode={deployment.access_code} />
      )}
    </div>
  )
}
