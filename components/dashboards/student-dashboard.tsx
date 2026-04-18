import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StudentDashboardProps {
  user: any
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Access learning resources and community
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
            <CardDescription>Enrolled Courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Portal</CardTitle>
          <CardDescription>Access courses and community learning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">LMS Access</span>
            <span className="font-medium text-green-500">Enabled</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border">
            <span className="text-muted-foreground">Community</span>
            <span className="font-medium">Available</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Course Materials</span>
            <span className="font-medium">Accessible</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
