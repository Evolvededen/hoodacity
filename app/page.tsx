import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header/Nav */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">H</div>
          <nav className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Affiliates</a>
            <a href="#" className="hover:text-foreground transition">Clients</a>
            <a href="#" className="hover:text-foreground transition">Exchange</a>
            <a href="#" className="hover:text-foreground transition">Dashboard</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border px-6 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold leading-tight text-balance">
            Hoodacity
          </h1>
          <p className="text-xl text-muted-foreground">
            Audacity in Every Algorithm
          </p>
          <p className="text-3xl font-semibold">
            Elevate Your AI Standard
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate Your AI Standard with Full Business Automation, Custom Agents & Generators, and a Complete AI Platform. Redefine intelligence—boldly, powerfully, unapologetically.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                Design Your Intelligence
              </button>
            </Link>
            <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition">
              Try Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Master AI, Transform Business.</h2>
            <p className="text-xl text-muted-foreground">Automate Success.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">AI Twins</h3>
              <p className="text-muted-foreground">Become Iconic</p>
              <p className="text-muted-foreground">
                Reliable 24/7 intelligent representation, save time & $$$.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Save Time</li>
                <li>• Scale Faster</li>
                <li>• Stay Present</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Custom Solutions</h3>
              <p className="text-muted-foreground">Time to Take Control</p>
              <p className="text-muted-foreground">
                Teach Your courses. Sell your products. Don&apos;t have any? Start with ours.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple Generators</li>
                <li>• Custom Agents</li>
                <li>• Business Builders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Define the future of AI, with Audacity.</h2>
          <p className="text-lg text-muted-foreground">
            Step into a new paradigm where intelligence meets boldness. Hoodacity is more than AI—it&apos;s a movement.
          </p>
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
