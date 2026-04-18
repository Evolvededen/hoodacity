'use client'

interface TopbarProps {
  user: any
  onLogout: () => void
  onMenuClick: () => void
}

export default function Topbar({ user, onLogout, onMenuClick }: TopbarProps) {
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-topbar">
      <div className="flex h-full items-center justify-between px-8">
        <button
          onClick={onMenuClick}
          className="hidden md:hidden lg:hidden text-foreground hover:text-primary transition"
        >
          ☰
        </button>
        <div className="text-sm font-medium text-foreground">
          Hoodacity Control Center
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-80 transition-opacity text-sm font-semibold">
              {userInitial}
            </button>
            <button
              onClick={onLogout}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
