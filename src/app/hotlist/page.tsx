'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { HotlistItem } from '@/types'

const CATEGORIES = ['Books', 'TV', 'Movies', 'YouTube', 'Games', 'F1'] as const

export default function Hotlist() {
  const [active, setActive] = useState<string>('Books')
  const [items, setItems] = useState<HotlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hotlist')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = items.filter(i => i.category === active)

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      <section style={{ padding: '80px 0 48px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>/</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Hotlist</span>
        </nav>
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '12px', color: 'var(--text)',
        }}>Hotlist</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Things I'm into right now.</p>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingBottom: '80px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.02em',
              padding: cat === 'Books' ? '8px 16px 10px 0' : '8px 16px 10px',
              color: active === cat ? 'var(--text)' : 'var(--text-muted)',
              borderBottom: active === cat ? `2px solid ${cat === 'F1' ? 'var(--accent)' : 'var(--text)'}` : '2px solid transparent',
              marginBottom: '-1px', transition: 'color 160ms ease',
            }}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nothing here yet.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {filtered.map((item, i) => (
              <li key={item.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                gap: '16px', padding: '14px 0',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>{item.title}</div>
                  {item.meta && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.meta}</div>}
                  {item.note && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '3px' }}>{item.note}</div>}
                </div>
                {item.tag && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.tag}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
