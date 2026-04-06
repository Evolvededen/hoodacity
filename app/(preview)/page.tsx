'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && mounted && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, mounted, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
        <p className="text-purple-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <Header />

      <div className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Curate Your Intelligence
                </span>
              </h1>
              <p className="text-xl text-purple-200">
                Strategic AI consulting and advanced data engineering to transform your business decisions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Join Now
                </Link>
                <Link
                  href="/auth/login"
                  className="px-8 py-4 border-2 border-yellow-500 hover:border-purple-400 rounded-lg font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9425_Original-ak79DgnKk7fN0g6Lj2eV96weEpVWVs.jpeg"
                alt="HoodaCity Professional"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard icon="🧠" title="Strategic AI Consulting" description="Revolutionary decision-making processes with AI strategists." />
              <ServiceCard icon="⚙️" title="Advanced Data Engineering" description="Precision data refinement unlocking new possibilities." />
              <ServiceCard icon="🎯" title="Customized AI Solutions" description="AI tailored to your ambitions for impactful actions." />
              <ServiceCard icon="📚" title="Elite AI Training" description="Empower teams with training-ready AI knowledge." />
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border border-yellow-500/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Join Your Digital Community</h3>
            <p className="text-purple-200 mb-8">Connect with creators and visionaries building the future of AI.</p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-purple-900/50 py-8 px-6 text-center text-purple-400">
        <p>&copy; 2026 HoodaCity. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 hover:border-yellow-500/50 rounded-lg p-6 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-yellow-400">{title}</h3>
      <p className="text-purple-200 text-sm">{description}</p>
    </div>
  );
}
