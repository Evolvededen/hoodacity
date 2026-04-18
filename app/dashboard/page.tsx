import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const stats = [
    { label: 'Active Agents', value: '12', change: '+2.5%' },
    { label: 'Total Requests', value: '2,847', change: '+12.3%' },
    { label: 'Success Rate', value: '98.5%', change: '+0.8%' },
  ]

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s what&apos;s happening with your AI agents today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-green-500">
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-border py-3 first:border-0 first:pt-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    Agent {i + 1} processed request
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  Success
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
