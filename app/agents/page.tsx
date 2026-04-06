"use client";

import { Header } from "@/components/header";
import { mockAgents } from "@/lib/mock-data";
import Link from "next/link";

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-white">AI Agents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{agent.name}</h3>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Type: {agent.type}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Status: {agent.status}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
