'use client';

import { useContext } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function PersonalDashboard() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Welcome, {user.email?.split('@')[0]}
            </span>
          </h1>
          <p className="text-purple-300">Your AI Intelligence Dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Twins */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">AI Twins Intelligence</h2>
              <div className="space-y-4">
                <div className="bg-black/50 border border-purple-900 rounded p-4">
                  <p className="text-purple-300 text-sm">AI Twin 1: Business Strategy</p>
                  <p className="text-gray-400 mt-2">Status: Ready</p>
                </div>
                <div className="bg-black/50 border border-purple-900 rounded p-4">
                  <p className="text-purple-300 text-sm">AI Twin 2: Content Creation</p>
                  <p className="text-gray-400 mt-2">Status: Ready</p>
                </div>
              </div>
            </div>

            {/* Business Profiles */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Business Profiles</h2>
              <div className="space-y-4">
                <Link href="/profile" className="block bg-black/50 border border-purple-900 hover:border-yellow-500/50 rounded p-4 transition-colors">
                  <p className="text-purple-300">Personal Brand Profile</p>
                  <p className="text-gray-400 text-sm mt-1">Edit your professional profile</p>
                </Link>
                <button className="w-full bg-black/50 border border-purple-900 hover:border-yellow-500/50 rounded p-4 transition-colors text-left">
                  <p className="text-purple-300">Collective Profile</p>
                  <p className="text-gray-400 text-sm mt-1">Manage team or organization profile</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Social Media Connections */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Social Connections</h3>
              <div className="space-y-3">
                {['Twitter', 'LinkedIn', 'Instagram', 'TikTok'].map((social) => (
                  <button
                    key={social}
                    className="w-full bg-black/50 border border-purple-900 hover:border-yellow-500/50 rounded p-3 text-left transition-colors"
                  >
                    <p className="text-purple-300 text-sm">{social}</p>
                    <p className="text-gray-400 text-xs mt-1">Not connected</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cheatsheets & Resources */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Resources</h3>
              <button className="w-full bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 hover:border-yellow-500/50 rounded p-3 transition-colors">
                <p className="text-yellow-300 text-sm font-semibold">Upload Cheatsheet</p>
              </button>
              <div className="mt-4 space-y-2">
                <p className="text-purple-300 text-sm">No cheatsheets yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
