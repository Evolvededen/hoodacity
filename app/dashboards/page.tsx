"use client";

import { Header } from "@/components/header";
import Link from "next/link";

const departments = [
  { id: "hr", name: "HR Management", emoji: "👥", description: "Employee tracking, recruitment, payroll" },
  { id: "intake", name: "Intake Processing", emoji: "📋", description: "Application management & verification" },
  { id: "onboarding", name: "Onboarding", emoji: "🎓", description: "Training coordination & feedback" },
  { id: "frontdesk", name: "Front Desk", emoji: "🛎️", description: "Visitor management & appointments" },
];

export default function DashboardsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-white">Department Dashboards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <Link key={dept.id} href={`/dashboards/${dept.id}`}>
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <div className="text-5xl mb-4">{dept.emoji}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{dept.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{dept.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
