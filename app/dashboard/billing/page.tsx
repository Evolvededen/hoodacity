'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface Subscription {
  id: string;
  tier: string;
  status: string;
  currentAmount: number;
  nextBillingDate: string;
  subscriptionId: string;
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Failed to fetch subscription');
        const data = await response.json();
        setSubscription(data.subscription);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Failed to open billing portal');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 text-red-400">
          {error}
        </div>
      )}

      {subscription ? (
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Tier</p>
                <p className="text-lg font-semibold capitalize">{subscription.tier}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Status</p>
                <p className="text-lg font-semibold capitalize">
                  <span className={subscription.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                    {subscription.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Monthly Amount</p>
                <p className="text-lg font-semibold">${(subscription.currentAmount / 100).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Next Billing Date</p>
                <p className="text-lg font-semibold">
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Button onClick={handleManageSubscription} className="w-full md:w-auto">
              Manage Subscription in Stripe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 mb-4">You don&apos;t have an active subscription yet.</p>
            <Button href="/pricing">View Pricing Plans</Button>
          </CardContent>
        </Card>
      )}

      {/* Upgrade/Downgrade Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Upgrade or Downgrade</CardTitle>
          <CardDescription>Change your plan anytime</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-4">
            Want to upgrade to a higher tier or downgrade to a lower one? You can manage your subscription through our billing portal.
          </p>
          <Button onClick={handleManageSubscription} variant="outline">
            Open Billing Portal
          </Button>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>View your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-4">
            All your invoices are available in the Stripe billing portal.
          </p>
          <Button onClick={handleManageSubscription} variant="outline">
            View Invoices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
