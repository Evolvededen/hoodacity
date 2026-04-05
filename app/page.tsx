'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Sparkles, Shield, Users, Zap, ArrowRight, Play, CheckCircle2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary">
              <span className="text-xl font-serif font-bold text-primary">H</span>
            </div>
            <span className="text-xl font-serif font-bold tracking-wide text-primary">HOODACITY</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide">
              Services
            </Link>
            <Link href="#ai-twins" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide">
              AI Twins
            </Link>
            <Link href="#exchange" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide">
              Exchange
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all px-6">
                Design Your Intelligence
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex flex-col items-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary mb-6">
                <span className="text-4xl font-serif font-bold text-primary">H</span>
              </div>
              <h2 className="text-lg tracking-[0.3em] text-primary/80 uppercase">Hoodacity</h2>
            </div>
            
            <p className="text-primary/70 tracking-[0.2em] uppercase text-sm">
              Audacity in Every Algorithm
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-wide">
              <span className="text-primary">Elevate Your</span>
              <br />
              <span className="text-foreground">AI Standard</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Elevate Your AI Standard with Full Business Automation, Custom Agents & Generators, 
              and a Complete AI Platform. Redefine intelligence—boldly, powerfully, unapologetically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all px-8 h-14 text-base tracking-wide">
                  Design Your Intelligence
                </Button>
              </Link>
              <Link href="/chat/demo-frontdesk">
                <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-primary h-14 gap-2">
                  <Play className="h-4 w-4" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border/30">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E2484678-D28B-4214-A95C-3327B05BD7BA-8NwPVF9VjmmaowCceCNrNYLlYLt6yo.png"
                alt="AI Professional"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-8 border-y border-border/30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-center gap-8 text-sm tracking-[0.15em]">
            <span className="text-muted-foreground">Affiliates</span>
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Clients</span>
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Exchange</span>
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Dashboard</span>
          </div>
        </div>
      </section>

      {/* Master AI Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
              <span className="text-primary">Master AI,</span>{' '}
              <span className="text-foreground uppercase tracking-wider">Transform Business.</span>
            </h2>
            <p className="text-2xl md:text-3xl font-serif text-foreground mt-2 uppercase tracking-wider">
              Automate Success.
            </p>
          </div>
          
          <div className="relative rounded-lg border border-border/30 overflow-hidden bg-card/50 p-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B9BC1E07-77EC-405C-9BC6-2FBB41600FBC-x4CWkRb9mxOYV52v1HMjROIeHqRqR4.png"
              alt="Platform Dashboard"
              width={1200}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Your AI, Your Vision */}
      <section id="ai-twins" className="py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 tracking-wide uppercase">
            Your AI, Your Vision
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-border/30 overflow-hidden group hover:border-primary/50 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-primary">AI Twins</h3>
                    <p className="text-lg font-serif text-foreground uppercase tracking-wide">Become Iconic</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Reliable 24/7 intelligent representation, save time & $$$.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Save Time</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Scale Faster</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Stay Present</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30 overflow-hidden group hover:border-primary/50 transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-primary">Time to Take Control</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Teach Your courses. Sell your products. Don&apos;t have any? Start with ours.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Multiple Generators</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Custom Agents</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Business Builders</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Define the Future */}
      <section id="services" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Define the Future</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                  <span className="text-foreground">Define the future of AI,</span>
                  <br />
                  <span className="text-primary">with Audacity.</span>
                </h2>
              </div>
              
              <h3 className="text-xl font-serif uppercase tracking-wider text-foreground">
                Elevate Your AI Standard
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                Step into a new paradigm where intelligence meets boldness. 
                Hoodacity is more than AI—it&apos;s a movement where your intuition 
                leads technology, setting not just a path, but a standard.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-foreground uppercase tracking-wide">Confidence</h4>
                    <p className="text-sm text-muted-foreground">Be the leader, not follower of the digital revolution.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-foreground uppercase tracking-wide">Ambition</h4>
                    <p className="text-sm text-muted-foreground">Set standards that not only meet but redefine the marketplace.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-foreground uppercase tracking-wide">Influence</h4>
                    <p className="text-sm text-muted-foreground">Craft solutions that are not just intelligent but iconic.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/30">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/509A8222-C619-4371-A57C-CC1C61242845-hL0CwN2O4PS7uhb23Bi0fwH5vFVus2.png"
                  alt="AI Professional"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curate Your Intelligence */}
      <section className="py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 tracking-wide uppercase">
            Curate Your Intelligence
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'Strategic AI Consulting', description: 'Join forces with leading AI strategists to revolutionize your decision-making processes.' },
              { icon: Sparkles, title: 'Advanced Data Engineering', description: 'Refine your data\'s potential with engineering precision to unlock new realms of possibility.' },
              { icon: Zap, title: 'Customized AI Solutions', description: 'Leverage AI tailored to your ambitions transforming insight into impactful actions.' },
              { icon: Users, title: 'Elite AI Training', description: 'Empower yourself and your team with training-ready AI knowledge and practices.' }
            ].map((service) => (
              <Card key={service.title} className="bg-card/50 border-border/30 hover:border-primary/50 transition-all group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-lg border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground uppercase tracking-wide text-sm">{service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="exchange" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">
              Join Your Digital
              <br />
              <span className="text-primary">Community & Ecosystem</span>
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with creators, entrepreneurs, and visionaries building the future of AI together.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <span>Creators Hub</span>
              <span className="text-primary">•</span>
              <span>Zuri Niore</span>
              <span className="text-primary">•</span>
              <span>Hood City</span>
            </div>
            
            <div className="pt-8">
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all px-12 h-14 text-base tracking-wide">
                  Design Your Intelligence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50">
                <span className="text-lg font-serif font-bold text-primary">H</span>
              </div>
              <span className="font-serif font-bold text-primary tracking-wide">HOODACITY</span>
            </div>
            
            <p className="text-sm text-muted-foreground">Join Your Digital Community & Ecosystem</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
