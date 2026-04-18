import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hoodacity - AI Intelligence Platform',
  description: 'Enterprise AI solutions for real estate, healthcare, social services, and corporate operations',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">H</div>
          <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition">Home</Link>
            <Link href="/marketplace" className="hover:text-foreground transition">Marketplace</Link>
            <Link href="/exchange" className="hover:text-foreground transition">Exchange</Link>
            <Link href="/hood-city" className="hover:text-foreground transition">Hoodcity Community</Link>
            <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm hover:text-primary transition">Login</button>
            </Link>
            <Link href="/auth/sign-up">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition">Register</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold leading-tight">Hoodacity</h1>
          <p className="text-xl text-muted-foreground">Audacity in Every Algorithm</p>
          <h2 className="text-3xl font-semibold">Enterprise AI for Large-Scale Operations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for Real Estate, Healthcare, Social Services & Corporate Operations. Deploy custom AI intelligences that scale with your business.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/define-intelligence">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                Define Your Intelligence
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-24 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Flounder */}
            <div className="border border-border rounded-xl p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold">Flounder</h3>
                <p className="text-muted-foreground mt-2">Perfect for getting started</p>
              </div>
              <div>
                <div className="text-4xl font-bold">$399<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mt-2">Setup: $999</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">✓ Single AI Intelligence</li>
                <li className="flex gap-2">✓ 24/7 AI Twin</li>
                <li className="flex gap-2">✓ Basic Support</li>
              </ul>
              <Link href="/define-intelligence">
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Team */}
            <div className="border border-primary rounded-xl p-8 space-y-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>
              <div>
                <h3 className="text-2xl font-bold">Team</h3>
                <p className="text-muted-foreground mt-2">For growing teams</p>
              </div>
              <div>
                <div className="text-4xl font-bold">$699<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mt-2">Setup: $1,997</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">✓ 3 AI Intelligences</li>
                <li className="flex gap-2">✓ Team Management</li>
                <li className="flex gap-2">✓ Priority Support</li>
                <li className="flex gap-2">✓ Additional: $199-$250 each</li>
              </ul>
              <Link href="/define-intelligence">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="border border-border rounded-xl p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground mt-2">Concierge service included</p>
              </div>
              <div>
                <div className="text-4xl font-bold">$4,599<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mt-2">Base includes 5 concierge clients</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">✓ Unlimited Intelligences</li>
                <li className="flex gap-2">✓ Concierge Support</li>
                <li className="flex gap-2">✓ Custom Integration</li>
                <li className="flex gap-2">✓ Additional: $399+ per service</li>
              </ul>
              <Link href="/define-intelligence">
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition">
                  Request Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Hoodacity</h3>
              <p className="text-sm text-muted-foreground">Enterprise AI Intelligence Platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/affiliate" className="text-muted-foreground hover:text-foreground">Become an Affiliate</Link></li>
                <li><Link href="/entrepreneur" className="text-muted-foreground hover:text-foreground">Entrepreneur Program</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/hood-city" className="text-muted-foreground hover:text-foreground">Hoodcity Community</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Hoodacity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
