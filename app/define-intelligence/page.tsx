'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DefineIntelligence() {
  const [step, setStep] = useState<'role' | 'type'>('role')
  const [selectedRole, setSelectedRole] = useState<'client' | 'creator' | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const clientTypes = [
    { id: 'founder', label: 'Founder', desc: 'Single operator or founder' },
    { id: 'team', label: 'Team', desc: 'Multiple team members' },
    { id: 'enterprise', label: 'Enterprise', desc: 'Large organization' },
  ]

  const creatorTypes = [
    { id: 'studio', label: 'Studio', desc: 'Good starter - no course selling' },
    { id: 'premium', label: 'Premium', desc: 'Full course & service creation' },
    { id: 'concierge', label: 'Concierge', desc: 'White glove service' },
  ]

  const handleRoleSelect = (role: 'client' | 'creator') => {
    setSelectedRole(role)
    setStep('type')
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
  }

  const handleNext = () => {
    if (selectedType) {
      const params = new URLSearchParams({
        role: selectedRole || '',
        type: selectedType,
      })
      router.push(`/pricing?${params.toString()}`)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">H</div>
          </Link>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm hover:text-primary transition">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-12">
          {step === 'role' ? (
            <>
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Define Your Intelligence</h1>
                <p className="text-lg text-muted-foreground">Choose your role to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <button
                  onClick={() => handleRoleSelect('client')}
                  className="p-8 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition text-left space-y-2"
                >
                  <h3 className="text-2xl font-bold">Client</h3>
                  <p className="text-muted-foreground">Use AI intelligences to transform your business operations</p>
                </button>

                <button
                  onClick={() => handleRoleSelect('creator')}
                  className="p-8 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition text-left space-y-2"
                >
                  <h3 className="text-2xl font-bold">Creator</h3>
                  <p className="text-muted-foreground">Build and sell custom AI agents & generators</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <button onClick={() => setStep('role')} className="text-primary hover:underline text-sm mb-4">
                  ← Back
                </button>
                <h1 className="text-4xl font-bold">
                  {selectedRole === 'client' ? 'Select Your Plan' : 'Choose Your Level'}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {selectedRole === 'client'
                    ? 'Pick the option that best fits your organization'
                    : 'Start with what works for you'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(selectedRole === 'client' ? clientTypes : creatorTypes).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-6 rounded-xl border transition text-left space-y-2 ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <h3 className="text-xl font-bold">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!selectedType}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition"
                >
                  Next: View Pricing
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
