'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function Pricing() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get('role')
  const type = searchParams.get('type')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getPricingByRole = () => {
    if (role === 'client') {
      return {
        founder: { name: 'Flounder', price: 399, setup: 999, description: 'Single operation' },
        team: { name: 'Team', price: 699, setup: 1997, description: 'Multiple team members - 3 intelligences' },
        enterprise: { name: 'Enterprise', price: 4599, setup: 0, description: 'Concierge - 5 clients included' },
      }
    } else {
      return {
        studio: { name: 'Studio', price: 299, setup: 499, description: 'Starter - no course selling' },
        premium: { name: 'Premium', price: 599, setup: 999, description: 'Full course & service creation' },
        concierge: { name: 'Concierge', price: 1999, setup: 4999, description: 'White glove service' },
      }
    }
  }

  const pricing = getPricingByRole()
  const currentPlan = type ? pricing[type as keyof typeof pricing] : null

  const handlePurchase = () => {
    if (currentPlan) {
      // Redirect to checkout/consultation
      router.push(`/checkout?plan=${type}&role=${role}`)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">H</div>
          </Link>
          <button onClick={() => router.back()} className="text-primary hover:underline text-sm">
            ← Back
          </button>
        </div>
      </header>

      <div className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {currentPlan ? (
            <>
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">{currentPlan.name} Plan</h1>
                <p className="text-lg text-muted-foreground">{currentPlan.description}</p>
              </div>

              <div className="bg-muted/50 border border-border rounded-xl p-12 text-center space-y-8">
                <div>
                  <div className="text-5xl font-bold">${currentPlan.price}</div>
                  <div className="text-muted-foreground mt-2">per month, billed monthly</div>
                  {currentPlan.setup > 0 && (
                    <div className="text-sm text-muted-foreground mt-4">
                      One-time setup: ${currentPlan.setup.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePurchase}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition mx-auto block"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push(`/contact?plan=${type}`)}
                  className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition mx-auto block"
                >
                  Request Consultation
                </button>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                <ul className="space-y-3">
                  <li className="flex gap-3">✓ <span>AI Twin for 24/7 operations</span></li>
                  <li className="flex gap-3">✓ <span>Registered ID & License tracking</span></li>
                  <li className="flex gap-3">✓ <span>Custom agent deployment</span></li>
                  <li className="flex gap-3">✓ <span>Intake & onboarding process</span></li>
                  <li className="flex gap-3">✓ <span>Private dashboard</span></li>
                  <li className="flex gap-3">✓ <span>Community & LMS access</span></li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Loading pricing information...</p>
              <Link href="/define-intelligence">
                <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition">
                  Start Over
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
