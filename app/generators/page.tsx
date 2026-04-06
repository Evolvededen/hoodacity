"use client";

import { Header } from "@/components/header";
import Link from "next/link";

const generators = [
  { id: "campaigns", name: "Campaign Generator", emoji: "📢", description: "Create multi-channel marketing campaigns" },
  { id: "content", name: "Content Generator", emoji: "✍️", description: "Generate marketing copy and announcements" },
  { id: "ads", name: "Ad Generator", emoji: "📱", description: "Create targeted ads with design specs" },
];

export default function GeneratorsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-white">Content Generators</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {generators.map((gen) => (
            <Link key={gen.id} href={`/generators/${gen.id}`}>
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <div className="text-5xl mb-4">{gen.emoji}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{gen.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{gen.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
