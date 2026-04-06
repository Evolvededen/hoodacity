"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AdvancedDashboardWidgetProps {
  type: string;
  title: string;
  data: Record<string, unknown>;
  index: number;
}

export function AdvancedDashboardWidget({
  type,
  title,
  data,
  index,
}: AdvancedDashboardWidgetProps) {
  const renderContent = () => {
    switch (type) {
      case "employee-metrics":
      case "applications-overview":
      case "cohort-progress":
      case "visitor-metrics":
        return (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>
        );

      case "processing-time":
      case "training-progress":
      case "queue-management":
        return (
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        );

      case "feedback-ratings":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">
                {String(data.avgRating)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-bold text-green-600">{String(data.satisfied)}</p>
                <p className="text-gray-600 dark:text-gray-400">Satisfied</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">{String(data.neutral)}</p>
                <p className="text-gray-600 dark:text-gray-400">Neutral</p>
              </div>
              <div>
                <p className="font-bold text-red-600">{String(data.unsatisfied)}</p>
                <p className="text-gray-600 dark:text-gray-400">Unsatisfied</p>
              </div>
            </div>
          </div>
        );

      case "compliance-check":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Compliance Rate</span>
              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      ((data.compliant as number) / ((data.compliant as number) + (data.warnings as number) + (data.critical as number))) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-green-600">
                {(
                  ((data.compliant as number) / ((data.compliant as number) + (data.warnings as number) + (data.critical as number))) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-green-50 dark:bg-green-900/30 rounded p-2">
                <p className="font-bold text-green-700 dark:text-green-400">{String(data.compliant)}</p>
                <p className="text-green-600 dark:text-green-300">Compliant</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded p-2">
                <p className="font-bold text-yellow-700 dark:text-yellow-400">{String(data.warnings)}</p>
                <p className="text-yellow-600 dark:text-yellow-300">Warnings</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded p-2">
                <p className="font-bold text-red-700 dark:text-red-400">{String(data.critical)}</p>
                <p className="text-red-600 dark:text-red-300">Critical</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
        {title}
      </h3>
      {renderContent()}
    </motion.div>
  );
}

export function DashboardStatsRow({
  stats,
}: {
  stats: Array<{ label: string; value: string | number; trend?: string; color?: string }>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            {stat.trend && (
              <span
                className={`text-xs font-semibold ${
                  stat.trend.startsWith("+")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.trend}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DashboardSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}
