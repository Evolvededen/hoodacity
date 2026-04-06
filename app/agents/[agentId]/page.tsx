"use client";

import { DashboardNav } from "@/components/dashboard-components";
import { TaskQueue, TaskForm, AgentStatusIndicator } from "@/components/agent-components";
import { mockAgents } from "@/lib/mock-data";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params?.agentId as string;
  const agent = mockAgents.find((a) => a.id === agentId);
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      type: "document_review",
      status: "completed",
      input: "Review application form",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "task-2",
      type: "email_send",
      status: "completed",
      input: "Send welcome email",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent not found</h1>
          <Link href="/agents" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to agents
          </Link>
        </div>
      </div>
    );
  }

  const handleAssignTask = () => {
    toast.success("Task assigned to agent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/agents" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Agents
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{agent.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {agent.type} Department Agent
                  </p>
                </div>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
                  {agent.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Tasks Processed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">98.2%</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3s</p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {(agent.config.capabilities as string[])?.map((capability) => (
                  <span
                    key={capability}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">
                        {task.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.input}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Assign New Task</h2>
              <TaskForm agentType={agent.type} onSubmit={handleAssignTask} />
            </div>
        </motion.div>
      </div>
    </div>
  );
}
