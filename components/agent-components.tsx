"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AgentTask } from "@/lib/types";

interface TaskQueueProps {
  agentId: string;
  tasks: AgentTask[];
  onTaskUpdate?: (taskId: string, status: AgentTask["status"]) => void;
}

export function TaskQueue({ agentId, tasks, onTaskUpdate }: TaskQueueProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const getStatusColor = (status: AgentTask["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "in_progress":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "failed":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const handleRetryTask = (taskId: string) => {
    onTaskUpdate?.(taskId, "pending");
    toast.success("Task queued for retry");
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="mb-2">📭</p>
          <p>No tasks in queue</p>
        </div>
      ) : (
        tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedTask(expandedTask === task.id ? null : task.id)
              }
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <span className="text-lg">
                  {task.status === "completed"
                    ? "✅"
                    : task.status === "failed"
                      ? "❌"
                      : task.status === "in_progress"
                        ? "⏳"
                        : "⏸️"}
                </span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {task.type.replace(/_/g, " ")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </button>

            {expandedTask === task.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4"
              >
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Input
                    </p>
                    <pre className="bg-white dark:bg-gray-800 p-2 rounded text-xs overflow-auto max-h-32 text-gray-800 dark:text-gray-200">
                      {JSON.stringify(task.input, null, 2)}
                    </pre>
                  </div>

                  {task.output && (
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Output
                      </p>
                      <pre className="bg-white dark:bg-gray-800 p-2 rounded text-xs overflow-auto max-h-32 text-gray-800 dark:text-gray-200">
                        {JSON.stringify(task.output, null, 2)}
                      </pre>
                    </div>
                  )}

                  {task.error && (
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400 mb-1">
                        Error
                      </p>
                      <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded text-red-700 dark:text-red-400">
                        {task.error}
                      </div>
                    </div>
                  )}

                  {task.status === "failed" && (
                    <button
                      onClick={() => handleRetryTask(task.id)}
                      className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs font-medium"
                    >
                      Retry Task
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}

export function TaskForm({
  agentType,
  onSubmit,
}: {
  agentType: string;
  onSubmit: (data: Record<string, string>) => void;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const getFormFields = (type: string) => {
    const fields: Record<string, string[]> = {
      hr: ["Task Type", "Employee ID", "Description"],
      intake: ["Document Type", "Application ID", "Priority"],
      onboarding: ["Module", "Participant ID", "Deadline"],
      frontdesk: ["Visitor Name", "Appointment ID", "Check-in Type"],
      campaign: ["Campaign Title", "Campaign Type", "Target Audience"],
    };
    return fields[type] || ["Task Description"];
  };

  const fields = getFormFields(agentType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field}
          </label>
          <input
            type="text"
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [field]: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={`Enter ${field.toLowerCase()}`}
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Assign Task
      </button>
    </form>
  );
}

export function AgentStatusIndicator({ status }: { status: string }) {
  const colors: Record<string, string> = {
    idle: "bg-gray-500",
    active: "bg-green-500",
    processing: "bg-yellow-500",
  };

  const pulseClass = status === "processing" ? "animate-pulse" : "";

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colors[status] || "bg-gray-500"} ${pulseClass}`} />
      <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
        {status}
      </span>
    </div>
  );
}
