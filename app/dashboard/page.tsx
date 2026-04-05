import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Bot, Users, Database, Rocket, Plus, ArrowRight, Sparkles } from 'lucide-react'
import { OnboardingBanner } from '@/components/dashboard/onboarding-banner'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, companies(*)')
    .eq('id', user?.id)
    .single()

  // Fetch stats
  const [intelligencesRes, teamsRes, knowledgeRes, deploymentsRes] = await Promise.all([
    supabase.from('intelligences').select('id', { count: 'exact' }),
    supabase.from('teams').select('id', { count: 'exact' }),
    supabase.from('knowledge').select('id', { count: 'exact' }),
    supabase.from('deployments').select('id', { count: 'exact' }),
  ])

  const stats = [
    { name: 'Intelligences', value: intelligencesRes.count || 0, icon: Bot, href: '/dashboard/intelligences', color: 'from-primary/20 to-accent/10' },
    { name: 'Teams', value: teamsRes.count || 0, icon: Users, href: '/dashboard/teams', color: 'from-accent/20 to-primary/10' },
    { name: 'Knowledge Items', value: knowledgeRes.count || 0, icon: Database, href: '/dashboard/knowledge', color: 'from-primary/20 to-accent/10' },
    { name: 'Deployments', value: deploymentsRes.count || 0, icon: Rocket, href: '/dashboard/deployments', color: 'from-accent/20 to-primary/10' },
  ]

  const needsOnboarding = !profile?.onboarding_completed || !profile?.company_id

  return (
    <div className="space-y-8">
      {needsOnboarding && <OnboardingBanner />}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {"Here's what's happening with your AI agents"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-bold text-foreground">{stat.value}</div>
              <Link
                href={stat.href}
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center mt-3 transition-colors"
              >
                View all <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-5">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Create Intelligence</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Build a new AI agent with custom knowledge and personality
          </p>
          <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <Link href="/dashboard/intelligences/new">
              <Plus className="mr-2 h-4 w-4" />
              New Intelligence
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-accent/5 to-primary/5 p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 mb-5">
            <Database className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Upload Knowledge</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Add documents and data to power your AI agents
          </p>
          <Button asChild variant="outline" className="border-border/50 hover:bg-card/50">
            <Link href="/dashboard/knowledge/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Knowledge
            </Link>
          </Button>
        </div>
      </div>

      {/* Getting Started */}
      {needsOnboarding && (
        <div className="rounded-2xl border border-border/50 bg-card/30 p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Getting Started</h3>
              <p className="text-muted-foreground mt-1">
                Complete your setup to unlock all features. Create your company profile, build your first AI Twin, and deploy your first Intelligence.
              </p>
              <div className="flex gap-3 mt-4">
                <Button asChild size="sm" variant="outline" className="border-border/50">
                  <Link href="/dashboard/settings">Complete Setup</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
