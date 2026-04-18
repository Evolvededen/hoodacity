'use client';

import { useUserTier } from '@/lib/hooks/useUserTier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function AffiliateDashboard() {
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
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome, {user?.username || user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
              <CardDescription>Your total earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$0.00</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referrals</CardTitle>
              <CardDescription>Active referral links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversions</CardTitle>
              <CardDescription>Successful conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
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
            <Link href="/dashboard/affiliate/earnings">
              <Button variant="outline" className="w-full justify-start">
                View Detailed Earnings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
