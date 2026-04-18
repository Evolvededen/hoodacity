'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, MessageSquare } from 'lucide-react';

interface Exchange {
  id: string;
  title?: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
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
        body: JSON.stringify({ title: 'New Exchange' }),
      });

      if (!response.ok) throw new Error('Failed to create exchange');
      const newExchange = await response.json();
      router.push(`/exchange/${newExchange.id}`);
    } catch (error) {
      console.error('Failed to create exchange:', error);
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Exchange</h1>
            <p className="text-muted-foreground mt-2">Your AI conversations & interactions</p>
          </div>
          <Button onClick={createNewExchange} disabled={creating}>
            <Plus className="w-4 h-4 mr-2" />
            {creating ? 'Creating...' : 'New Exchange'}
          </Button>
        </div>

        {exchanges.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No exchanges yet</h3>
              <p className="text-muted-foreground mb-6">Create your first exchange to get started</p>
              <Button onClick={createNewExchange} disabled={creating}>
                <Plus className="w-4 h-4 mr-2" />
                Create Exchange
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exchanges.map((exchange) => (
              <Link key={exchange.id} href={`/exchange/${exchange.id}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="truncate">
                      {exchange.title || 'Untitled Exchange'}
                    </CardTitle>
                    <CardDescription>
                      {new Date(exchange.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {exchange.is_archived ? (
                        <span className="text-yellow-600">Archived</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
