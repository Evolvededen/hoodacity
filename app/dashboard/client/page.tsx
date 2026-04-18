'use client';

import { useUserTier } from '@/lib/hooks/useUserTier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ClientDashboard() {
  const { user, loading } = useUserTier();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome, {user?.username || user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Type</CardTitle>
              <CardDescription>Your subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold capitalize">Founder/Team/Corporation</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Active team seats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Status</CardTitle>
              <CardDescription>Active subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">Active</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/exchange">
              <Button variant="outline" className="w-full justify-start">
                Go to Exchange (Chat)
              </Button>
            </Link>
            <Link href="/dashboard/client/team">
              <Button variant="outline" className="w-full justify-start">
                Manage Team
              </Button>
            </Link>
            <Link href="/dashboard/client/billing">
              <Button variant="outline" className="w-full justify-start">
                Billing Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
