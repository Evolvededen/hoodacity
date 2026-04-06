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
      router.push('/dashboards');
    }
  }, [user, isLoading, mounted, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />

      <div className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Curate Your Intelligence
                </span>
              </h1>
              <p className="text-xl text-slate-300">
                Strategic AI consulting and advanced data engineering to transform your business decisions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Join Now
                </Link>
                <Link
                  href="#services"
                  className="px-8 py-4 border border-slate-500 hover:border-slate-300 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9425_Original-ak79DgnKk7fN0g6Lj2eV96weEpVWVs.jpeg"
                alt="HoodaCity Professional"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>

          {/* Services Section */}
          <div id="services" className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon="🧠"
                title="Strategic AI Consulting"
                description="Join forces with leading AI strategists to revolutionize your decision-making processes."
              />
              <ServiceCard
                icon="⚙️"
                title="Advanced Data Engineering"
                description="Refine your data's potential with engineering precision to unlock new realms of possibility."
              />
              <ServiceCard
                icon="🎯"
                title="Customized AI Solutions"
                description="Leverage AI tailored to your ambitions transforming insight into impactful actions."
              />
              <ServiceCard
                icon="📚"
                title="Elite AI Training"
                description="Empower yourself and your team with training-ready AI knowledge and practices."
              />
            </div>
          </div>

          {/* Community Section */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center mb-20">
            <h3 className="text-3xl font-bold mb-4">Join Your Digital Community & Ecosystem</h3>
            <p className="text-slate-300 mb-3">
              Connect with creators, entrepreneurs, and visionaries building the future of AI together.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Creators Hub • Zuri Niore • Hood City
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Join the Community
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <FeatureCard
              icon="📊"
              title="Smart Dashboards"
              description="Beautiful, real-time dashboards for HR, Intake, Onboarding, and Front Desk"
            />
            <FeatureCard
              icon="✨"
              title="AI Content Generation"
              description="Generate marketing campaigns and content powered by OpenAI"
            />
            <FeatureCard
              icon="🤖"
              title="Autonomous Agents"
              description="Deploy AI agents to handle tasks and manage workflows"
            />
          </div>

          {/* Solutions Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Department Solutions
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DepartmentCard emoji="👥" title="HR Management" description="Employee tracking, recruitment, and payroll" />
              <DepartmentCard emoji="📋" title="Intake Processing" description="Application management and compliance" />
              <DepartmentCard emoji="🎓" title="Onboarding" description="Training coordination and feedback" />
              <DepartmentCard emoji="🛎️" title="Front Desk" description="Visitor management and appointments" />
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-slate-300 mb-8">
              Sign up with email, GitHub, or Google to access all features.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700 py-8 px-6 text-center text-slate-400 mt-20">
        <p>&copy; 2026 HoodaCity. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 rounded-lg p-6 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 rounded-lg p-6 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function DepartmentCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 rounded-lg p-8 transition-all">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold mb-3 text-slate-100">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}
