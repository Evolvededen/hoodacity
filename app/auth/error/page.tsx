export default function AuthError() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong with your authentication
          </p>
        </div>

        <a
          href="/auth/login"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
        >
          Try Again
        </a>
      </div>
    </main>
  )
}
