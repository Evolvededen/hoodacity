import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BillingPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Pro - Monthly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-foreground">Monthly cost</span>
              <span className="font-bold text-2xl">$99/mo</span>
            </div>
            <div className="flex items-center justify-between border-t border-border py-3">
              <span className="text-muted-foreground">Next billing date</span>
              <span className="text-foreground">May 18, 2026</span>
            </div>
            <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
              Upgrade Plan
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Your recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-border py-3 first:border-0 first:pt-0"
              >
                <div>
                  <p className="font-medium text-foreground">Invoice #{1000 + i}</p>
                  <p className="text-sm text-muted-foreground">April {20 - i}, 2026</p>
                </div>
                <span className="font-medium text-foreground">$99.00</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
