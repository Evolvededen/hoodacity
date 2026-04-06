"use client";

import { DashboardNav, DashboardWidget, DashboardGrid } from "@/components/dashboard-components";
import { mockDashboards } from "@/lib/mock-data";
import { Department } from "@/lib/types";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DepartmentDashboard() {
  const params = useParams();
  const dept = (params?.department as Department) || "hr";
  const dashboard = mockDashboards[dept];

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard not found
          </h1>
          <Link href="/dashboards" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to dashboards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav currentDept={dept} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {dashboard.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time metrics and data
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Refresh
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Settings
            </button>
          </div>
        </motion.div>

        <DashboardGrid>
          {dashboard.widgets.map((widget, index) => (
            <DashboardWidget key={widget.id} widget={widget} index={index} />
          ))}
        </DashboardGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/agents"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Assign Tasks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send work to agents</p>
            </Link>
            <Link
              href="/generators"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Generate Content</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create new content</p>
            </Link>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Export Report</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Download data</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
