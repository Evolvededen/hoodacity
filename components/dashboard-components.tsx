"use client";

import { Department } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";

export function DashboardNav({ currentDept }: { currentDept?: Department }) {
  const departments: { id: Department; label: string; icon: string }[] = [
    { id: "hr", label: "HR", icon: "👥" },
    { id: "intake", label: "Intake", icon: "📋" },
    { id: "onboarding", label: "Onboarding", icon: "🎓" },
    { id: "frontdesk", label: "Front Desk", icon: "🛎️" },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🏢</span>
            HoodaCity
          </Link>
          <div className="flex gap-1">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                href={`/dashboards/${dept.id}`}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentDept === dept.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-1">{dept.icon}</span>
                {dept.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function DashboardWidget({
  widget,
  index,
}: {
  widget: { id: string; type: string; title: string; data: Record<string, unknown> };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{widget.title}</h3>
      <div className="space-y-3">
        {Object.entries(widget.data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {key.replace(/-/g, " ")}
            </span>
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              {typeof value === "number" ? value.toLocaleString() : String(value)}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function DashboardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
