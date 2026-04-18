import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AdminDashboardProps {
  user: any
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Full platform control • Monitor all users and systems
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
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
            <CardDescription>Platform Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>System Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-500">Operational</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
          <CardDescription>Global control and monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">User Management</span>
            <span className="font-medium text-blue-500">Access</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Intelligence Management</span>
            <span className="font-medium text-blue-500">Access</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Transaction Logs</span>
            <span className="font-medium text-blue-500">Access</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">System Settings</span>
            <span className="font-medium text-blue-500">Access</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
