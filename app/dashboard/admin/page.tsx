'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, Bot, DollarSign, TrendingUp, Crown } from 'lucide-react'
import Link from 'next/link'

interface CompanyStats {
  id: string
  name: string
  slug: string
  plan: string
  created_at: string
  _count: {
    profiles: number
    intelligences: number
  }
}

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<CompanyStats[]>([])
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalUsers: 0,
    totalIntelligences: 0,
    totalConversations: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      // Load companies with counts
      const { data: companiesData } = await supabase
        .from('companies')
        .select('id, name, slug, plan, created_at')
        .order('created_at', { ascending: false })
        .limit(10)

      if (companiesData) {
        // Get counts for each company
        const companiesWithCounts = await Promise.all(
          companiesData.map(async (company) => {
            const { count: profileCount } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .eq('company_id', company.id)
            
            const { count: intelligenceCount } = await supabase
              .from('intelligences')
              .select('*', { count: 'exact', head: true })
              .eq('company_id', company.id)

            return {
              ...company,
              _count: {
                profiles: profileCount || 0,
                intelligences: intelligenceCount || 0,
              }
            }
          })
        )
        setCompanies(companiesWithCounts)
      }

      // Load global stats
      const { count: companyCount } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true })
      
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      const { count: intelligenceCount } = await supabase
        .from('intelligences')
        .select('*', { count: 'exact', head: true })
      
      const { count: conversationCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })

      setStats({
        totalCompanies: companyCount || 0,
        totalUsers: userCount || 0,
        totalIntelligences: intelligenceCount || 0,
        totalConversations: conversationCount || 0,
      })

      setLoading(false)
    }

    loadData()
  }, [supabase])

  const getPlanBadge = (plan: string) => {
    const variants: Record<string, string> = {
      starter: 'bg-muted text-muted-foreground',
      pro: 'bg-primary/20 text-primary',
      enterprise: 'bg-accent/20 text-accent',
      concierge: 'bg-gradient-to-r from-primary to-accent text-white',
    }
    return variants[plan] || variants.starter
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading admin data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intelligences</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIntelligences}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard/admin/pricing">
            <DollarSign className="mr-2 h-4 w-4" />
            Manage Pricing
          </Link>
        </Button>
      </div>

      {/* Recent Companies */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Recent Companies</CardTitle>
          <CardDescription>Latest organizations on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">/{company.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p>{company._count.profiles} users</p>
                    <p className="text-muted-foreground">{company._count.intelligences} agents</p>
                  </div>
                  <Badge className={getPlanBadge(company.plan)}>
                    {company.plan === 'concierge' && <Crown className="h-3 w-3 mr-1" />}
                    {company.plan}
                  </Badge>
                </div>
              </div>
            ))}
            {companies.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No companies yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
