'use client';

import { useUserTier } from '@/lib/hooks/useUserTier';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useUserTier();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Route to appropriate dashboard based on tier
      const currentPath = window.location.pathname;
      
      if (currentPath === '/dashboard' || currentPath === '/dashboard/') {
        switch (user.user_tier) {
          case 'affiliate':
            router.push('/dashboard/affiliate');
            break;
          case 'client':
            router.push('/dashboard/client');
            break;
          case 'entrepreneur':
            router.push('/dashboard/entrepreneur');
            break;
          case 'student':
            router.push('/dashboard/student');
            break;
          case 'admin':
            router.push('/dashboard/admin');
            break;
          default:
            router.push('/dashboard/student');
        }
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return <>{children}</>;
}
