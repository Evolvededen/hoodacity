"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { Header } from "@/components/header";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GeneratorsPage() {
  const generators = [
    {
      id: "campaigns",
      title: "Campaign Generator",
      description: "Create marketing and recruitment campaigns",
      icon: "📢",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "content",
      title: "Content Generator",
      description: "Generate marketing copy and announcements",
      icon: "📝",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "ads",
      title: "Ad Generator",
      description: "Create targeted ads with images and copy",
      icon: "🎨",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Content Generators
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered tools to create campaigns, content, and ads
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {generators.map((generator, index) => (
            <motion.div
              key={generator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/generators/${generator.id}`}>
                <div className={`h-48 bg-gradient-to-br ${generator.color} rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer text-white group`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {generator.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    {generator.title}
                  </h3>
                  <p className="text-sm text-opacity-90">
                    {generator.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Generations
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Summer Recruitment 2024</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Campaign • Draft</p>
              </div>
              <button className="text-blue-500 hover:text-blue-600">View</button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Onboarding Content Pack</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Content • Saved</p>
              </div>
              <button className="text-blue-500 hover:text-blue-600">View</button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Benefits Program Ads</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ads • Active</p>
              </div>
              <button className="text-blue-500 hover:text-blue-600">View</button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
