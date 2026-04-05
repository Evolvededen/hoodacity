'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Profile, Company } from '@/lib/types'
import {
  Brain,
  LayoutDashboard,
  Bot,
  Users,
  Database,
  Rocket,
  BarChart3,
  Settings,
  Sparkles,
  DollarSign,
  Shield,
} from 'lucide-react'

interface DashboardSidebarProps {
  profile: (Profile & { companies: Company | null }) | null
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Intelligences', href: '/dashboard/intelligences', icon: Bot },
  { name: 'AI Twins', href: '/dashboard/twins', icon: Sparkles },
  { name: 'Teams', href: '/dashboard/teams', icon: Users },
  { name: 'Knowledge', href: '/dashboard/knowledge', icon: Database },
  { name: 'Deployments', href: '/dashboard/deployments', icon: Rocket },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

const bottomNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const adminNavigation = [
  { name: 'Admin Panel', href: '/dashboard/admin', icon: Shield },
  { name: 'Pricing', href: '/dashboard/admin/pricing', icon: DollarSign },
]

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
          <Brain className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-sidebar-foreground">RIS</span>
      </div>

      {/* Company Selector */}
      {profile?.companies && (
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-sidebar-accent to-sidebar-accent/50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground text-sm font-semibold">
              {profile.companies.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {profile.companies.name}
              </p>
              <p className="text-xs text-sidebar-muted capitalize">
                {profile.companies.plan} plan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-sidebar-foreground border-l-2 border-primary'
                  : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}>
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Admin Navigation */}
      {profile?.is_admin && (
        <div className="px-4 py-2 border-t border-sidebar-border">
          <p className="px-3 py-2 text-xs font-semibold text-sidebar-muted uppercase tracking-wider flex items-center gap-2">
            <Shield className="h-3 w-3" /> Admin
          </p>
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-sidebar-foreground border-l-2 border-primary'
                    : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-sidebar-foreground border-l-2 border-primary'
                  : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
