"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { Header } from "@/components/header";
import { mockAgents } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AgentsPage() {
  const getAgentIcon = (type: string) => {
    const icons: Record<string, string> = {
      hr: "👥",
      intake: "📋",
      onboarding: "🎓",
      frontdesk: "🛎️",
      campaign: "📢",
    };
    return icons[type] || "🤖";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "processing":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "idle":
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agents
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor AI agents across your organization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{mockAgents.length}</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Total Agents</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="text-3xl font-bold text-green-600">{mockAgents.filter(a => a.status === "active").length}</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white">0</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Failed Tasks</p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {mockAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/agents/${agent.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getAgentIcon(agent.type)}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{agent.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {agent.type} Department
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Tasks Completed</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {Math.floor(Math.random() * 100)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Queue</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {agent.taskQueue.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Uptime</p>
                      <p className="font-semibold text-gray-900 dark:text-white">99.8%</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Model: {(agent.config.aiModel as string) || "gpt-4"}
                    </span>
                    <span className="text-blue-500 text-sm">View Details →</span>
        </div>
      </div>
    </ProtectedRoute>
  );
}
