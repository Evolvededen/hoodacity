import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EntrepreneurDashboardProps {
  user: any
}

export default function EntrepreneurDashboard({ user }: EntrepreneurDashboardProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Entrepreneur Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Create and sell custom agents & generators • Build your store
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
            <CardDescription>Custom Agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Store</CardTitle>
          <CardDescription>Sell to our enterprise clients and community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Store Status</span>
            <span className="font-medium text-green-500">Active</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">LMS Access</span>
            <span className="font-medium">Available</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Affiliate Toggle</span>
            <span className="font-medium">Enabled</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
