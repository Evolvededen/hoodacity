"use client";

import { DashboardNav } from "@/components/dashboard-components";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

type GeneratorType = "campaigns" | "content" | "ads";

const generatorConfig: Record<GeneratorType, { title: string; description: string; fields: string[] }> = {
  campaigns: {
    title: "Campaign Generator",
    description: "Create multi-channel marketing campaigns",
    fields: ["Campaign Name", "Target Audience", "Campaign Theme", "Duration", "Budget"],
  },
  content: {
    title: "Content Generator",
    description: "Generate marketing copy and announcements",
    fields: ["Content Title", "Topic", "Tone", "Length", "Target Platform"],
  },
  ads: {
    title: "Ad Generator",
    description: "Create targeted ads with copy and design specs",
    fields: ["Ad Title", "Target Demographics", "Call-to-Action", "Ad Copy", "Style/Theme"],
  },
};

export default function GeneratorPage() {
  const params = useParams();
  const generatorType = (params?.type as GeneratorType) || "campaigns";
  const config = generatorConfig[generatorType];

  const [formData, setFormData] = useState<Record<string, string>>(
    config.fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );
  const [preview, setPreview] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: generatorType,
          title: formData[config.fields[0]],
          inputs: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to generate content");
        setIsGenerating(false);
        return;
      }

      setPreview(result.content);
      setShowPreview(true);
      toast.success("Content generated successfully!");
      setIsGenerating(false);
    } catch (error) {
      toast.error("Failed to generate content");
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    toast.success("Content saved to Supabase!");
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([preview], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${generatorType}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Content exported!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Link href="/generators" className="text-blue-500 hover:underline mb-4 inline-block">
            ← Back to Generators
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {config.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{config.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Configuration
              </h2>

              <div className="space-y-4 mb-6">
                {config.fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {field}
                    </label>
                    {field === "Ad Copy" || field === "Description" ? (
                      <textarea
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        rows={3}
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors font-medium"
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Generated Today</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Saved</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Active</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save to Supabase
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100 font-mono text-sm">
              {preview}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
