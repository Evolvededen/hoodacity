"use client";

import { DashboardNav, DashboardWidget, DashboardGrid } from "@/components/dashboard-components";
import { mockDashboards } from "@/lib/mock-data";
import { Department } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardsPage() {
  const departments: { id: Department; label: string; icon: string; color: string }[] = [
    { id: "hr", label: "HR Management", icon: "👥", color: "blue" },
    { id: "intake", label: "Intake Processing", icon: "📋", color: "green" },
    { id: "onboarding", label: "Onboarding", icon: "🎓", color: "purple" },
    { id: "frontdesk", label: "Front Desk", icon: "🛎️", color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Department Dashboards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a department to view and manage your dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/dashboards/${dept.id}`}>
                <div className="h-40 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-4xl">{dept.icon}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {dept.label}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View and manage {dept.label.toLowerCase()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/generators">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer text-white">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="font-bold text-lg mb-1">Generators</h3>
                <p className="text-sm text-blue-100">Create campaigns, content, and ads</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/agents">
              <div className="h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer text-white">
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="font-bold text-lg mb-1">Agents</h3>
                <p className="text-sm text-green-100">Manage AI agents and tasks</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
