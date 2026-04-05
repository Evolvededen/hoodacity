'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Shield, Crown } from 'lucide-react'

// Admin emails that get automatic admin privileges
const ADMIN_EMAILS = [
  'desire1319@yahoo.com',
  'hoodacity.ai@gmail.com',
]

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const isAdminEmail = ADMIN_EMAILS.some(
    adminEmail => adminEmail.toLowerCase() === email.toLowerCase()
  )

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      // Sign up with Supabase - email confirmation is disabled in project settings
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            is_admin: isAdminEmail,
            role: isAdminEmail ? 'owner' : 'member',
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // If user was created and session exists (email confirmation disabled)
      if (data.session) {
        // Direct login - redirect to dashboard or onboarding
        router.push('/dashboard')
      } else if (data.user) {
        // Email confirmation required - show success page
        router.push('/auth/sign-up-success')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Gold gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black pointer-events-none" />
      
      <div className="relative w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <span className="text-2xl font-serif font-bold text-black">H</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Hoodacity</h1>
            <p className="text-amber-200/60 text-sm mt-1">Registered Intelligence Systems</p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-zinc-900/80 backdrop-blur-sm p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white">Create your account</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Start your 14-day free trial today
            </p>
          </div>

          {/* Admin indicator */}
          {isAdminEmail && (
            <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-amber-200">
                Admin privileges will be granted
              </span>
            </div>
          )}
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-300">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                />
                {isAdminEmail && (
                  <Shield className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-400">Passwords do not match</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold transition-all" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Start free trial'
              )}
            </Button>

            <p className="text-xs text-center text-zinc-500">
              14-day free trial. No credit card required.
            </p>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
