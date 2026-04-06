'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // The Supabase auth session will be automatically set
    // Redirect to home page
    const timer = setTimeout(() => {
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Signing you in...
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}
