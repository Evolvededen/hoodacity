import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground"
              />
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
              Save Changes
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">Email notifications</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">Dark mode</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
