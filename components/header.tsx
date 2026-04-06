'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useContext } from 'react';
import { AuthContext } from '@/lib/auth-context';

export function Header() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const logout = context?.logout;
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!logout) return;
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
    <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-gradient-to-r from-black via-purple-950 to-black">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <span className="text-3xl">🏢</span>
        <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">HoodaCity</span>
      </Link>

      {user ? (
        <div className="flex gap-6 items-center">
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-yellow-400 transition border border-purple-900/50 hover:border-yellow-500/50 rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-yellow-400 transition border border-purple-900/50 hover:border-yellow-500/50 rounded-lg"
            >
              Admin
            </Link>
            <Link
              href="/profile"
              className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-yellow-400 transition border border-purple-900/50 hover:border-yellow-500/50 rounded-lg"
            >
              Profile
            </Link>
            <Link
              href="/dashboards"
              className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-yellow-400 transition border border-purple-900/50 hover:border-yellow-500/50 rounded-lg"
            >
              Departments
            </Link>
          </div>

          <div className="flex items-center gap-4 pl-4 border-l border-purple-900/50">
            <div className="text-sm text-purple-300">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg transition-all"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-yellow-400 transition border border-purple-900/50 hover:border-yellow-500/50 rounded-lg"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 rounded-lg transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
