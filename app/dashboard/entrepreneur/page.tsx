'use client';

import { useUserTier } from '@/lib/hooks/useUserTier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function EntrepreneurDashboard() {
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
          <h1 className="text-3xl font-bold">Creators Hub</h1>
          <p className="text-muted-foreground mt-2">Welcome, {user?.username || user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan</CardTitle>
              <CardDescription>Your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold capitalize">Studio / Premium / Concierge</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creations</CardTitle>
              <CardDescription>Total agents & generators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>Marketplace earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$0.00</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Creator Tools</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/entrepreneur/builder">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                Visual Builder - Create Agents & Generators
              </Button>
            </Link>
            <Link href="/dashboard/entrepreneur/mint">
              <Button variant="outline" className="w-full justify-start">
                Access Mint Library (Pre-built)
              </Button>
            </Link>
            <Link href="/dashboard/entrepreneur/vault">
              <Button variant="outline" className="w-full justify-start">
                Vault - View All Generations
              </Button>
            </Link>
            <Link href="/dashboard/entrepreneur/gallery">
              <Button variant="outline" className="w-full justify-start">
                Gallery - Showcase Creations
              </Button>
            </Link>
            <Link href="/dashboard/entrepreneur/marketplace">
              <Button variant="outline" className="w-full justify-start">
                Marketplace - Sell Creations
              </Button>
            </Link>
            <Link href="/exchange">
              <Button variant="outline" className="w-full justify-start">
                Go to Exchange (Chat)
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
