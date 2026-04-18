'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Affiliate',
    description: 'Earn through referrals',
    prices: [
      { label: 'Free Tier', price: '$0', period: 'forever' },
      { label: 'Premium', price: '$177', period: 'one-time' }
    ],
    features: [
      'Affiliate dashboard',
      'Referral links & tracking',
      'Commission earnings',
      'LearnDash LMS access',
      'Community features'
    ],
    ctaText: 'Get Started',
    ctaUrl: '/auth/signup?tier=affiliate'
  },
  {
    name: 'Client',
    description: 'Team collaboration & projects',
    prices: [
      { label: 'Founder', price: '$4,500+', period: '/month' },
      { label: 'Team', price: 'Custom', period: '5-50 seats' },
      { label: 'Enterprise', price: 'Custom', period: '100+ seats' }
    ],
    features: [
      'Team collaboration',
      'Project management',
      'Consultation calls',
      'Priority support',
      'Custom integrations',
      'Unlimited storage'
    ],
    ctaText: 'Schedule Consultation',
    ctaUrl: '/auth/signup?tier=client',
    highlighted: true
  },
  {
    name: 'Student',
    description: 'Learn & develop skills',
    prices: [
      { label: 'Free', price: '$0', period: 'forever' }
    ],
    features: [
      'Learning resources',
      'Limited exchange access',
      'Community support',
      'Course materials',
      'Peer networking'
    ],
    ctaText: 'Enroll Now',
    ctaUrl: '/auth/signup?tier=student'
  },
  {
    name: 'Entrepreneur',
    description: 'Create & monetize AI tools',
    prices: [
      { label: 'Studio', price: '$109', period: '/month' },
      { label: 'Premium', price: '$209', period: '/month' },
      { label: 'Concierge', price: '$599', period: '/month' }
    ],
    features: [
      'AI Twin Generator',
      'Creators Hub with builder',
      'Agents & generators library',
      'Vault storage',
      'Gallery showcase',
      'Marketplace sales',
      'Custom agent/generator',
      'Full entitlements access'
    ],
    ctaText: 'Start Creating',
    ctaUrl: '/auth/signup?tier=entrepreneur',
    highlighted: true
  },
  {
    name: 'Admin',
    description: 'Platform management',
    prices: [
      { label: 'Admin', price: 'N/A', period: 'by invitation' }
    ],
    features: [
      'User management',
      'Analytics & reporting',
      'Platform moderation',
      'Subscription management',
      'Custom tier control',
      'API access'
    ],
    ctaText: 'Contact Support',
    ctaUrl: 'mailto:support@hoodacity.com'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white cursor-pointer">HoodaCity</h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-300 mb-8">Choose the perfect plan for your needs</p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${
                tier.highlighted
                  ? 'border-blue-500 bg-slate-800/50'
                  : 'border-slate-700 bg-slate-800/30'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white">{tier.name}</CardTitle>
                <CardDescription className="text-slate-400">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-2 mb-6">
                  {tier.prices.map((price, idx) => (
                    <div key={idx}>
                      <p className="text-sm text-slate-400">{price.label}</p>
                      <p className="text-2xl font-bold text-white">
                        {price.price}
                        <span className="text-sm text-slate-400 ml-1">{price.period}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.ctaUrl}>
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Can I change tiers?</h3>
            <p className="text-slate-400">Yes, you can upgrade or downgrade your tier at any time. Changes take effect at the next billing cycle.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
            <p className="text-slate-400">Yes! Affiliate and Student tiers are completely free. Entrepreneur tiers include a 7-day free trial.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">What's included in Vault storage?</h3>
            <p className="text-slate-400">Vault storage holds all your generations, AI outputs, and created content. Storage limits vary by tier.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
            <p className="text-slate-400">We offer a 30-day money-back guarantee on all paid tiers. Contact support for details.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">Ready to get started?</h3>
        <Link href="/auth/signup">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Your Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 HoodaCity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
