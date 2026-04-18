'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Mint', href: '/mint' },
  { label: 'Vault', href: '/vault' },
  { label: 'Exchange', href: '/exchange' },
  { label: 'Settings', href: '/settings' },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <aside
        className={`w-64 border-r border-border bg-sidebar transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:relative h-screen z-40 md:z-auto`}
      >
        <div className="flex h-16 items-center justify-center border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Hoodacity</h1>
        </div>
        <nav className="space-y-2 p-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onToggle}
        />
      )}
    </>
  )
}
