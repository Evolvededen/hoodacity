import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Mail } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-sidebar-foreground">
            <Brain className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold">RIS</span>
          </div>
        </div>

        <Card className="border-sidebar-border bg-sidebar-accent">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-sidebar-foreground">Check your email</CardTitle>
            <CardDescription className="text-sidebar-muted">
              We&apos;ve sent you a confirmation link. Please check your email to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-sidebar-muted mb-6">
              After confirming your email, you&apos;ll be able to sign in and start building your intelligent agents.
            </p>
            <Button asChild variant="outline" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar">
              <Link href="/auth/login">Back to sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
