export default function SignUpSuccess() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Created</h1>
          <p className="text-muted-foreground">
            Check your email to confirm your account
          </p>
        </div>

        <div className="p-6 bg-muted rounded-lg border border-border space-y-4">
          <p className="text-sm">
            We&apos;ve sent a confirmation link to your email address. Click the link to activate your account and start using Hoodacity.
          </p>
          <p className="text-xs text-muted-foreground">
            If you don&apos;t see the email, check your spam folder or try signing up again.
          </p>
        </div>
      </div>
    </main>
  )
}
