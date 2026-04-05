import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Eye, Bot, TrendingUp } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Get analytics data
  const [messagesRes, viewsRes, intelligencesRes, deploymentsRes] = await Promise.all([
    supabase
      .from('analytics_events')
      .select('id', { count: 'exact' })
      .eq('event_type', 'message'),
    supabase
      .from('analytics_events')
      .select('id', { count: 'exact' })
      .in('event_type', ['view', 'embed_view']),
    supabase
      .from('intelligences')
      .select('id', { count: 'exact' })
      .eq('is_active', true),
    supabase
      .from('deployments')
      .select('id', { count: 'exact' })
      .eq('is_active', true),
  ])

  // Get recent events
  const { data: recentEvents } = await supabase
    .from('analytics_events')
    .select('*, intelligences(name), deployments(name)')
    .order('created_at', { ascending: false })
    .limit(10)

  const stats = [
    {
      name: 'Total Messages',
      value: messagesRes.count || 0,
      icon: MessageSquare,
      description: 'Messages exchanged',
    },
    {
      name: 'Total Views',
      value: viewsRes.count || 0,
      icon: Eye,
      description: 'Chat sessions started',
    },
    {
      name: 'Active Intelligences',
      value: intelligencesRes.count || 0,
      icon: Bot,
      description: 'AI agents running',
    },
    {
      name: 'Active Deployments',
      value: deploymentsRes.count || 0,
      icon: TrendingUp,
      description: 'Live deployment channels',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track how your AI agents are performing
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest events across your intelligences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentEvents && recentEvents.length > 0 ? (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {event.event_type === 'message' && <MessageSquare className="h-4 w-4" />}
                      {(event.event_type === 'view' || event.event_type === 'embed_view') && <Eye className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {event.event_type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.intelligences?.name || 'Unknown'} 
                        {event.deployments?.name && ` via ${event.deployments.name}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No activity yet. Deploy an intelligence to start tracking.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
