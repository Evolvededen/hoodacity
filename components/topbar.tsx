'use client'

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-border bg-topbar">
      <div className="flex h-full items-center justify-between px-8">
        <div className="text-sm font-medium text-foreground">
          Dashboard
        </div>
        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground hover:opacity-80 transition-opacity">
            <span className="text-sm font-semibold">U</span>
          </button>
        </div>
      </div>
    </header>
  )
}
