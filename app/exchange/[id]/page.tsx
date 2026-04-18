'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  role: string;
  created_at: string;
}

interface Exchange {
  id: string;
  title?: string;
  created_at: string;
}

export default function ExchangeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchExchange();
  }, [params.id]);

  const fetchExchange = async () => {
    try {
      const response = await fetch(`/api/exchange/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch exchange');
      const data = await response.json();
      setExchange(data.exchange);
      setMessages(data.messages);
    } catch (error) {
      console.error('Failed to fetch exchange:', error);
      router.push('/exchange');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`/api/exchange/${params.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input, role: 'user' }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setInput('');

      // Simulate AI response (placeholder)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            content: 'This is a placeholder AI response. Real responses will be integrated in the next phase.',
            role: 'assistant',
            created_at: new Date().toISOString(),
          },
        ]);
      }, 500);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/exchange">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{exchange?.title || 'Untitled Exchange'}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(exchange?.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Start a conversation</p>
              <p className="text-sm text-muted-foreground">Type a message below to begin</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-md p-4 ${
                message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-muted'
              }`}>
                <p className="break-words">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                }`}>
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="bg-card border-t p-4">
        <form onSubmit={sendMessage} className="flex gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" disabled={sending || !input.trim()}>
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
