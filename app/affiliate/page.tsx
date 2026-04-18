'use client'

import Link from 'next/link'

export default function Affiliate() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">H</div>
          </Link>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl font-bold">Become an Affiliate</h1>
          <p className="text-muted-foreground">Earn commissions selling Hoodacity services. Automatic affiliate links via WCFM vendor hub.</p>
          <Link href="/auth/sign-up">
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">Get Started as Affiliate</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
