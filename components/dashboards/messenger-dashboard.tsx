import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface MessengerDashboardProps {
  role: string
  user: any
}

export default function MessengerDashboard({ role, user }: MessengerDashboardProps) {
  const tier = role === 'messenger_pro' ? 'Pro' : 'Basic'

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messenger Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Tier: {tier} • Manage your messaging and affiliate links
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
            <CardDescription>Messages Sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Affiliate Links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>Messenger {tier}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Subscription Status</span>
            <span className="font-medium text-green-500">Active</span>
          </div>
          {role === 'messenger' && (
            <div className="mt-6 p-4 bg-primary/10 border border-primary rounded-lg">
              <p className="text-sm font-medium text-primary">
                Upgrade to Messenger Pro for advanced features
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
