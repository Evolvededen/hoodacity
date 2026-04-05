'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
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
            <h2 className="text-xl font-semibold text-white">Welcome back</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Sign in to your account to continue
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-amber-400 hover:text-amber-300">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
              />
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
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            {"Don't have an account? "}
            <Link href="/auth/sign-up" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
