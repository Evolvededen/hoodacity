'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get('plan')
  const role = searchParams.get('role')

  const [step, setStep] = useState<'checkout' | 'onboarding'>('checkout')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    intelligenceName: '',
    companyName: '',
    email: '',
  })
  const [files, setFiles] = useState<File[]>([])

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // In production, integrate with Stripe
      setStep('onboarding')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/sign-up')
        return
      }

      // Generate Registered ID
      const registeredId = `HD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      // Create profile with intelligence info
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: formData.companyName,
        intelligence_name: formData.intelligenceName,
        registered_id: registeredId,
        role: role,
        plan_type: plan,
        email: formData.email,
      })

      if (error) throw error

      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">H</div>
          </Link>
        </div>
      </header>

      <div className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {step === 'checkout' ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
                <p className="text-muted-foreground">Plan: {plan?.toUpperCase()}</p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Intelligence Name</label>
                  <input
                    type="text"
                    value={formData.intelligenceName}
                    onChange={(e) => setFormData({ ...formData, intelligenceName: e.target.value })}
                    placeholder="e.g., My AI Twin"
                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company/Organization Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold">Payment Information</h3>
                  <p className="text-sm text-muted-foreground">Stripe integration will be completed here</p>
                  <div className="bg-background border border-dashed border-border rounded p-4 text-center text-sm text-muted-foreground">
                    [Stripe Payment Form]
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition"
                >
                  {loading ? 'Processing...' : 'Complete Purchase'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Intake & Onboarding</h1>
                <p className="text-muted-foreground">Upload your files and intelligence information</p>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">Upload Files</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/30 transition">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer block">
                      <p className="font-medium">Drag files here or click to upload</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload logos, docs, training data, or configuration files
                      </p>
                    </label>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file) => (
                        <div key={file.name} className="text-sm text-muted-foreground">
                          ✓ {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition"
                >
                  {loading ? 'Setting up...' : 'Complete Onboarding & Access Dashboard'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
