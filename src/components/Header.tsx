'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Hotlist', href: '/hotlist' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <header style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none' }}>
          GG.
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '0.82rem',
                color: pathname === href ? 'var(--text)' : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                transition: 'color 160ms ease',
                fontWeight: pathname === href ? 500 : 400,
              }}
            >
              {label}
            </Link>
          ))}

          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                marginLeft: '8px',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '5px 8px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 160ms ease, border-color 160ms ease',
              }}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                  <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
