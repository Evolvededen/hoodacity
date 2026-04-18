'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';

interface MintItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tier_required: 'studio' | 'premium' | 'concierge';
}

export default function MintPage() {
  const [items] = useState<MintItem[]>([
    {
      id: '1',
      name: 'Email Responder',
      description: 'Automatically respond to emails with AI',
      category: 'Communication',
      tier_required: 'studio',
    },
    {
      id: '2',
      name: 'Content Writer',
      description: 'Generate blog posts and articles',
      category: 'Content',
      tier_required: 'studio',
    },
    {
      id: '3',
      name: 'Image Generator',
      description: 'Create images from text descriptions',
      category: 'Visual',
      tier_required: 'premium',
    },
    {
      id: '4',
      name: 'Video Script Writer',
      description: 'Write engaging video scripts',
      category: 'Video',
      tier_required: 'premium',
    },
    {
      id: '5',
      name: 'Custom Voice Cloner',
      description: 'Clone and customize voices',
      category: 'Audio',
      tier_required: 'concierge',
    },
  ]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'studio':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'concierge':
        return 'bg-gold-100 text-gold-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/entrepreneur">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Mint Library</h1>
            <p className="text-muted-foreground mt-1">Pre-built agents & generators</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            Access tier-locked agents and generators based on your subscription level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(item.tier_required)}`}>
                    {item.tier_required}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Category</p>
                  <p className="text-sm">{item.category}</p>
                </div>
                <Button className="w-full">Use This Agent</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Unlock className="w-5 h-5" />
              Upgrade to Access More
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Premium and Concierge tiers unlock advanced agents and generators for more powerful creations.
            </p>
            <Button>View Plans</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
