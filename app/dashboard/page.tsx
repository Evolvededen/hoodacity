'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import MessengerDashboard from '@/components/dashboards/messenger-dashboard'
import EntrepreneurDashboard from '@/components/dashboards/entrepreneur-dashboard'
import CreatorsHubDashboard from '@/components/dashboards/creators-hub-dashboard'
import ClientDashboard from '@/components/dashboards/client-dashboard'
import StudentDashboard from '@/components/dashboards/student-dashboard'
import AdminDashboard from '@/components/dashboards/admin-dashboard'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      const userRole = user.user_metadata?.role
      setRole(userRole)
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  const getDashboardComponent = () => {
    switch (role) {
      case 'messenger':
      case 'messenger_pro':
        return <MessengerDashboard role={role} user={user} />
      case 'entrepreneur':
        return <EntrepreneurDashboard user={user} />
      case 'creators_hub':
        return <CreatorsHubDashboard user={user} />
      case 'client':
        return <ClientDashboard user={user} />
      case 'student':
        return <StudentDashboard user={user} />
      case 'admin':
        return <AdminDashboard user={user} />
      default:
        return <div className="text-muted-foreground">Unknown role</div>
    }
  }

  return (
    <DashboardLayout user={user}>
      {getDashboardComponent()}
    </DashboardLayout>
  )
}
