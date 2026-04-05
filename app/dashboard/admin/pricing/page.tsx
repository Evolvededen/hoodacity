import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Plus, Edit2, Trash2 } from "lucide-react"
import { PricingPlanForm } from "@/components/admin/pricing-plan-form"

export default async function AdminPricingPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")
  
  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()
  
  if (!profile?.is_admin) {
    redirect("/dashboard")
  }
  
  // Fetch all pricing plans (admin can see all, including inactive)
  const { data: plans } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("sort_order")
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage subscription plans and pricing tiers
          </p>
        </div>
        <PricingPlanForm mode="create">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </PricingPlanForm>
      </div>

      <div className="grid gap-6">
        {plans?.map((plan) => (
          <Card key={plan.id} className={`border-border/50 bg-card/50 backdrop-blur-sm ${!plan.is_active ? 'opacity-60' : ''}`}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {plan.display_name}
                    {!plan.is_active && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">Inactive</span>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PricingPlanForm mode="edit" plan={plan}>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </PricingPlanForm>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Price</p>
                  <p className="text-2xl font-bold">
                    {plan.price_monthly === 0 ? "Free" : `$${plan.price_monthly}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Yearly Price</p>
                  <p className="text-2xl font-bold">
                    {plan.price_yearly === 0 ? "Free" : `$${plan.price_yearly}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Limits</p>
                  <div className="text-sm space-y-1">
                    <p>Intelligences: {plan.limits?.intelligences === -1 ? "Unlimited" : plan.limits?.intelligences}</p>
                    <p>Knowledge: {plan.limits?.knowledge_items === -1 ? "Unlimited" : plan.limits?.knowledge_items}</p>
                    <p>Conversations: {plan.limits?.conversations === -1 ? "Unlimited" : plan.limits?.conversations?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {(plan.features as string[])?.map((feature, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
