import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CreatorsHubDashboardProps {
  user: any
}

export default function CreatorsHubDashboard({ user }: CreatorsHubDashboardProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Creators Hub</h1>
        <p className="mt-2 text-muted-foreground">
          Create and teach • Access LMS and community features
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
            <CardDescription>Courses Created</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Creator Tools</CardTitle>
          <CardDescription>Manage your courses and community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">LMS Access</span>
            <span className="font-medium text-green-500">Enabled</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Community Access</span>
            <span className="font-medium">Full</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Affiliate Status</span>
            <span className="font-medium">Available</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
