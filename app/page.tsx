'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return null;
  }

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">HoodaCity</h1>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          The Complete Platform for <span className="text-blue-400">Creators & Entrepreneurs</span>
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Connect, create, and monetize with our integrated ecosystem. From AI agents to marketplace sales, manage everything in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-white border-slate-400">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Platform Tiers</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Affiliate */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Affiliate</h4>
            <p className="text-slate-400 text-sm mb-4">Earn through referrals</p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>✓ Free tier</li>
              <li>✓ $177 one-time</li>
              <li>✓ Referral earnings</li>
            </ul>
          </div>

          {/* Client */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Users className="w-8 h-8 text-purple-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Client</h4>
            <p className="text-slate-400 text-sm mb-4">Team collaboration</p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>✓ Founder (1 seat)</li>
              <li>✓ Team (5-50)</li>
              <li>✓ Enterprise (10+)</li>
              <li>✓ $4500+/month</li>
            </ul>
          </div>

          {/* Student */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Student</h4>
            <p className="text-slate-400 text-sm mb-4">Learn & grow</p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>✓ Learning resources</li>
              <li>✓ Limited exchange</li>
              <li>✓ Community access</li>
            </ul>
          </div>

          {/* Entrepreneur */}
          <div className="bg-slate-800 border border-blue-600 rounded-lg p-6">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Entrepreneur</h4>
            <p className="text-slate-400 text-sm mb-4">Create & sell</p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>✓ AI Twin Generator</li>
              <li>✓ Studio/Premium/Concierge</li>
              <li>✓ Creators Hub</li>
              <li>✓ Marketplace</li>
            </ul>
          </div>

          {/* Admin */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Users className="w-8 h-8 text-red-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Admin</h4>
            <p className="text-slate-400 text-sm mb-4">Manage platform</p>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>✓ User management</li>
              <li>✓ Analytics</li>
              <li>✓ Moderation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Powerful Features</h3>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Exchange Chat</h4>
            <p className="text-slate-300 mb-4">Individual AI conversations with full history management and easy archiving.</p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Creators Hub</h4>
            <p className="text-slate-300 mb-4">Visual builder to create custom AI agents and generators. Host in Mint library with tier-based access.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Vault & Gallery</h4>
            <p className="text-slate-300 mb-4">Store all generations in Vault with Blob storage. Showcase creations in public Gallery.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Marketplace</h4>
            <p className="text-slate-300 mb-4">WCFM-integrated marketplace for selling custom agents, generators, and services.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h3>
        <p className="text-xl text-slate-300 mb-8">Join thousands of creators and entrepreneurs on HoodaCity.</p>
        <Link href="/auth/signup">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Your Account <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 HoodaCity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
