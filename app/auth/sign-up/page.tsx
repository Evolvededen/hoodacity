'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName) {
      setError('Please enter your name')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!role) {
      setError('Please select an account type')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/sign-up-success')
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Hoodacity</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        {success && (
          <div className="p-4 bg-green-100/10 border border-green-500/30 text-green-600 rounded-lg text-sm">
            Account created! Redirecting...
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'messenger', label: 'Messenger' },
                { id: 'entrepreneur', label: 'Entrepreneur' },
                { id: 'creators_hub', label: 'Creators' },
                { id: 'client', label: 'Client' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  disabled={loading}
                  onClick={() => setRole(r.id)}
                  className={`p-3 rounded-lg border text-sm font-medium transition disabled:opacity-50 ${
                    role === r.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  )
}
