'use client'

import Link from 'next/link'

export default function Marketplace() {
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
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Connected to WooCommerce & WCFM</p>
          <p className="text-sm text-muted-foreground mt-4">Coming soon - Browse and purchase custom agents & generators</p>
        </div>
      </div>
    </main>
  )
}
