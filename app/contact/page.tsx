'use client'

import Link from 'next/link'

export default function Contact() {
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
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with our team for enterprise solutions and custom integrations</p>
          <form className="space-y-4">
            <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
            <textarea placeholder="Your message" rows={5} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
            <button type="submit" className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">Send</button>
          </form>
        </div>
      </div>
    </main>
  )
}
