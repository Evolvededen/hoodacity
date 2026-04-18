import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ClientDashboardProps {
  user: any
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Client Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Access your deployed intelligences and custom agents
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Registered ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {user?.id?.slice(0, 12)}...
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Active Intelligences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Subscription Level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Standard</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Intelligence Suite</CardTitle>
          <CardDescription>Deployed agents and access to Vault</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Vault Access</span>
            <span className="font-medium text-green-500">Enabled</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Custom Agents</span>
            <span className="font-medium">Available for Purchase</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Team Features</span>
            <span className="font-medium">Enabled</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
