'use client';

import { useUserTier } from '@/lib/hooks/useUserTier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function StudentDashboard() {
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
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome, {user?.username || user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
              <CardDescription>Your current course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Getting Started</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>Course completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Available materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Available</div>
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
                Go to Exchange (Limited Access)
              </Button>
            </Link>
            <Link href="/dashboard/student/learning">
              <Button variant="outline" className="w-full justify-start">
                View Learning Resources
              </Button>
            </Link>
            <Link href="/dashboard/student/upgrade">
              <Button className="w-full justify-start">
                Upgrade Plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
