'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to log out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-2xl">🏢</span>
        HoodaCity
      </Link>

      {user ? (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Link
              href="/dashboards"
              className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              Dashboards
            </Link>
            <Link
              href="/generators"
              className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              Generators
            </Link>
            <Link
              href="/agents"
              className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              Agents
            </Link>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-zinc-200 dark:border-zinc-700">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:bg-zinc-400 rounded-lg transition-colors"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Link
            href="/dashboards"
            className="px-3 py-2 text-xs font-medium text-yellow-500 hover:text-yellow-400 transition border border-yellow-500/30 rounded bg-yellow-500/5"
          >
            TEST: Dashboards
          </Link>
          <Link
            href="/generators"
            className="px-3 py-2 text-xs font-medium text-yellow-500 hover:text-yellow-400 transition border border-yellow-500/30 rounded bg-yellow-500/5"
          >
            TEST: Generators
          </Link>
          <Link
            href="/agents"
            className="px-3 py-2 text-xs font-medium text-yellow-500 hover:text-yellow-400 transition border border-yellow-500/30 rounded bg-yellow-500/5"
          >
            TEST: Agents
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition border border-zinc-200 dark:border-zinc-700 rounded-lg"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
