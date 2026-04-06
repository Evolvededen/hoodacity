'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';

export default function AdminDashboard() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </h1>
        <p className="text-purple-300 mb-8">Manage your HoodaCity platform</p>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-900">
          {['overview', 'users', 'content', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-purple-300 hover:text-yellow-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Areas */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard title="Total Users" value="0" icon="👥" />
            <AdminCard title="Active Profiles" value="0" icon="📊" />
            <AdminCard title="Content Published" value="0" icon="📝" />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Manage Users</h2>
            <p className="text-purple-300">User management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Content Editor</h2>
            <p className="text-purple-300">WYSIWYG editor for site content coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Settings</h2>
            <p className="text-purple-300">Platform settings management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-6">
      <div className="text-5xl mb-4">{icon}</div>
      <p className="text-purple-300 text-sm mb-2">{title}</p>
      <p className="text-4xl font-bold text-yellow-400">{value}</p>
    </div>
  );
}
