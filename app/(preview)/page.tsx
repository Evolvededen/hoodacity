/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    router.push("/dashboards");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <Header />

      <div className="relative px-6 py-20 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI-Powered Business
                </span>
                <span className="block">Management</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Transform your operations with intelligent dashboards, AI-powered content generation, and autonomous agents for HR, Intake, Onboarding, and Front Desk management.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="px-8 py-4 border border-slate-500 hover:border-slate-300 rounded-lg font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">📊</div>
                    <div>
                      <p className="font-semibold">Live Dashboards</p>
                      <p className="text-slate-400 text-sm">Real-time metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">✨</div>
                    <div>
                      <p className="font-semibold">AI Generators</p>
                      <p className="text-slate-400 text-sm">Content & campaigns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">🤖</div>
                    <div>
                      <p className="font-semibold">Smart Agents</p>
                      <p className="text-slate-400 text-sm">Autonomous workflows</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <FeatureCard
              icon="📊"
              title="Smart Dashboards"
              description="Beautiful, real-time dashboards for HR, Intake, Onboarding, and Front Desk operations"
            />
            <FeatureCard
              icon="✨"
              title="AI Content Generation"
              description="Generate marketing campaigns, content, and ads powered by OpenAI in seconds"
            />
            <FeatureCard
              icon="🤖"
              title="Autonomous Agents"
              description="Deploy AI agents to handle tasks, manage workflows, and process data automatically"
            />
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Department Solutions
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DepartmentCard
                emoji="👥"
                title="HR Management"
                description="Employee tracking, recruitment, leave management, and payroll"
                color="blue"
              />
              <DepartmentCard
                emoji="📋"
                title="Intake Processing"
                description="Application management, document verification, and compliance"
                color="green"
              />
              <DepartmentCard
                emoji="🎓"
                title="Onboarding"
                description="Training coordination, cohort management, and feedback tracking"
                color="purple"
              />
              <DepartmentCard
                emoji="🛎️"
                title="Front Desk"
                description="Visitor management, appointments, and queue control"
                color="orange"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center my-20">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Workflows?</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join HoodaCity and start managing your business with AI-powered intelligence today.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700 py-8 px-6 text-center text-slate-400">
        <p>&copy; 2026 HoodaCity. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function DepartmentCard({
  emoji,
  title,
  description,
  color,
}: {
  emoji: string;
  title: string;
  description: string;
  color: string;
}) {
  const colorStyles: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-400/50",
    green: "from-green-500/20 to-green-600/5 border-green-500/30 hover:border-green-400/50",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-400/50",
    orange: "from-orange-500/20 to-orange-600/5 border-orange-500/30 hover:border-orange-400/50",
  };

  return (
    <div
      className={`group bg-gradient-to-br ${colorStyles[color]} backdrop-blur rounded-lg p-8 transition-all duration-300 hover:shadow-lg cursor-pointer`}
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{emoji}</div>
      <h4 className="text-2xl font-bold mb-3 text-slate-100">{title}</h4>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}
