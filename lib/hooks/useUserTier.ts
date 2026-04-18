import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserTier } from '@/lib/types/database';

interface UserWithTier extends User {
  tier?: UserTier;
  enterpriseTier?: string;
  clientTier?: string;
}

export function useUserTier() {
  const router = useRouter();
  const [user, setUser] = useState<UserWithTier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        
        if (response.status === 401) {
          router.push('/auth/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser({
          ...data.user,
          tier: data.user.user_tier,
          enterpriseTier: data.tierAssignment?.entrepreneur_tier,
          clientTier: data.tierAssignment?.client_tier,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading, error };
}
