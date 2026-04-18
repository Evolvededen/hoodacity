import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Hoodacity</h1>
      <p className="text-muted-foreground">Your AI command center</p>

      <Link href="/dashboard">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
          Enter Dashboard
        </button>
      </Link>
    </main>
  );
}
