import Link from 'next/link'
import { getPosts } from '@/lib/notion'
import type { Post } from '@/types'

export const revalidate = 60

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export default async function Writing() {
  let posts: Post[] = []

  try {
    posts = await getPosts()
  } catch {
    // Notion not configured yet
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      <section style={{ padding: '80px 0 48px' }}>
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '12px', color: 'var(--text)',
        }}>Writing</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Thoughts on engineering, craft, and everything in between.
        </p>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingBottom: '80px' }}>
        {posts.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '48px' }}>Posts coming soon.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {posts.map((post, i) => (
              <li key={post.id} style={{ borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <Link href={`/writing/${post.slug}`} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  gap: '16px', padding: '18px 0', textDecoration: 'none',
                }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>{post.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{post.summary}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
