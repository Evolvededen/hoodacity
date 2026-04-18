import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AgentsPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agents</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and monitor your AI agents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Agents</CardTitle>
          <CardDescription>
            A list of all your deployed AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-border py-4 first:border-0 first:pt-0"
              >
                <div>
                  <p className="font-medium text-foreground">Agent {i + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    Last active 2 hours ago
                  </p>
                </div>
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  Active
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
