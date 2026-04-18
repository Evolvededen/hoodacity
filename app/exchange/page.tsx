'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Exchange {
  id: string;
  title?: string;
  created_at: string;
  updated_at: string;
}

export default function ExchangePage() {
  const router = useRouter();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      const response = await fetch('/api/exchange');
      if (!response.ok) throw new Error('Failed to fetch exchanges');
      const data = await response.json();
      setExchanges(data);
    } catch (error) {
      console.error('Failed to fetch exchanges:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewExchange = async () => {
    setCreating(true);
    try {
      const response = await fetch('/api/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Conversation' }),
      });

      if (!response.ok) throw new Error('Failed to create exchange');
      const newExchange = await response.json();
      router.push(`/exchange/${newExchange.id}`);
    } catch (error) {
      console.error('Failed to create exchange:', error);
      toast.error('Failed to create new exchange');
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
        <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Your Exchanges
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            View all your AI conversations and interactions
          </p>
        </div>

        {/* New Exchange Button */}
        <button
          onClick={createNewExchange}
          disabled={creating}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {creating ? 'Creating...' : 'New Exchange'}
        </button>

        {/* Exchanges List */}
        {exchanges.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              No exchanges yet
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Create your first exchange to start a conversation
            </p>
            <button
              onClick={createNewExchange}
              disabled={creating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Create Exchange
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {exchanges.map((exchange) => (
              <motion.div key={exchange.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Link href={`/exchange/${exchange.id}`}>
                  <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {exchange.title || 'Untitled Exchange'}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {new Date(exchange.created_at).toLocaleDateString()} at{' '}
                      {new Date(exchange.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link href="/dashboard">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
