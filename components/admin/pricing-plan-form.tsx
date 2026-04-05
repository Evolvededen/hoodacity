"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PricingPlan {
  id: string
  name: string
  display_name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  limits: {
    intelligences: number
    knowledge_items: number
    conversations: number
    team_members: number
  }
  is_active: boolean
  sort_order: number
}

interface PricingPlanFormProps {
  mode: "create" | "edit"
  plan?: PricingPlan
  children: React.ReactNode
}

export function PricingPlanForm({ mode, plan, children }: PricingPlanFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    display_name: plan?.display_name || "",
    description: plan?.description || "",
    price_monthly: plan?.price_monthly || 0,
    price_yearly: plan?.price_yearly || 0,
    features: plan?.features?.join("\n") || "",
    intelligences: plan?.limits?.intelligences || 3,
    knowledge_items: plan?.limits?.knowledge_items || 100,
    conversations: plan?.limits?.conversations || 1000,
    team_members: plan?.limits?.team_members || 5,
    is_active: plan?.is_active ?? true,
    sort_order: plan?.sort_order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    
    const data = {
      name: formData.name.toLowerCase().replace(/\s+/g, "-"),
      display_name: formData.display_name,
      description: formData.description,
      price_monthly: Number(formData.price_monthly),
      price_yearly: Number(formData.price_yearly),
      features: formData.features.split("\n").filter(Boolean),
      limits: {
        intelligences: Number(formData.intelligences),
        knowledge_items: Number(formData.knowledge_items),
        conversations: Number(formData.conversations),
        team_members: Number(formData.team_members),
      },
      is_active: formData.is_active,
      sort_order: Number(formData.sort_order),
    }

    if (mode === "edit" && plan?.id) {
      await supabase
        .from("pricing_plans")
        .update(data)
        .eq("id", plan.id)
    } else {
      await supabase
        .from("pricing_plans")
        .insert(data)
    }

    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit" : "Create"} Pricing Plan</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update plan details and limits" : "Create a new subscription plan"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                placeholder="Professional"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Slug (internal)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="professional"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="For growing teams"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_monthly">Monthly Price ($)</Label>
              <Input
                id="price_monthly"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_monthly}
                onChange={(e) => setFormData({ ...formData, price_monthly: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_yearly">Yearly Price ($)</Label>
              <Input
                id="price_yearly"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_yearly}
                onChange={(e) => setFormData({ ...formData, price_yearly: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="10 Intelligences
1,000 Knowledge Items
Priority Support"
              rows={5}
            />
          </div>

          <div className="space-y-4">
            <Label>Limits (-1 for unlimited)</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intelligences" className="text-sm text-muted-foreground">Intelligences</Label>
                <Input
                  id="intelligences"
                  type="number"
                  value={formData.intelligences}
                  onChange={(e) => setFormData({ ...formData, intelligences: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="knowledge_items" className="text-sm text-muted-foreground">Knowledge Items</Label>
                <Input
                  id="knowledge_items"
                  type="number"
                  value={formData.knowledge_items}
                  onChange={(e) => setFormData({ ...formData, knowledge_items: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conversations" className="text-sm text-muted-foreground">Conversations/mo</Label>
                <Input
                  id="conversations"
                  type="number"
                  value={formData.conversations}
                  onChange={(e) => setFormData({ ...formData, conversations: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_members" className="text-sm text-muted-foreground">Team Members</Label>
                <Input
                  id="team_members"
                  type="number"
                  value={formData.team_members}
                  onChange={(e) => setFormData({ ...formData, team_members: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-primary to-accent">
              {loading ? "Saving..." : mode === "edit" ? "Update Plan" : "Create Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
