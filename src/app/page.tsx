import Link from 'next/link'
import { getPosts, getProjects, getHotlist } from '@/lib/notion'
import NextRace from '@/components/NextRace'
import type { Post, Project, HotlistItem } from '@/types'

export const revalidate = 60

const social = [
  { label: 'GitHub', href: 'https://github.com/geraldelorm' },
  { label: 'Twitter', href: 'https://x.com/geraldelorm' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/geraldelorm' },
  { label: 'Instagram', href: 'https://instagram.com/geraldelorm' },
]

const pages = [
  { label: 'What I\'m building', sub: 'Projects, experiments, things in progress.', href: '/projects' },
  { label: 'What I\'m writing', sub: 'Thoughts on engineering, craft, and life.', href: '/writing' },
  { label: 'What I\'m into', sub: 'Books, TV, movies, F1, games and YouTube picks.', href: '/hotlist' },
  { label: 'Who I am', sub: 'Work history, background, outside of work.', href: '/about' },
]

const S = {
  section: { borderTop: '1px solid var(--border)', paddingTop: '48px', paddingBottom: '48px' } as React.CSSProperties,
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' } as React.CSSProperties,
  h2: { fontSize: '1rem', fontWeight: 600, color: 'var(--text)' } as React.CSSProperties,
  seeAll: { fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' } as React.CSSProperties,
  empty: { fontSize: '0.85rem', color: 'var(--text-muted)' } as React.CSSProperties,
  tag: { fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px', whiteSpace: 'nowrap' } as React.CSSProperties,
}

function GoogleText() {
  return (
    <span style={{ fontWeight: 500 }}>
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export default async function Home() {
  let posts: Post[] = []
  let projects: Project[] = []
  let hotlist: HotlistItem[] = []

  try {
    ;[posts, projects, hotlist] = await Promise.all([
      getPosts(),
      getProjects(true),
      getHotlist(),
    ])
  } catch {
    // Notion not yet configured
  }

  const recentHotlist = hotlist.slice(0, 3)

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 64px' }}>
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '10px', color: 'var(--text)',
        }}>Gerald G.</h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Software Engineer at <GoogleText />
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '460px', marginBottom: '0', lineHeight: 1.8 }}>
          I build things at Google. When I'm not, I'm somewhere on a trail, deep in a book, or rewatching something I've already seen twice.
        </p>

        <NextRace />

        {/* Page chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {pages.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none',
              border: '1px solid var(--border)', borderRadius: '999px',
              padding: '5px 14px', background: 'var(--bg-raised)',
              transition: 'color 160ms ease, border-color 160ms ease',
            }}>
              {label} →
            </Link>
          ))}
        </div>

        {/* Social links */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '36px' }}>
          {social.map(({ label, href }, i) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none',
              paddingRight: i < social.length - 1 ? '16px' : '0', position: 'relative', transition: 'color 160ms ease',
            }}>
              {label}
              {i < social.length - 1 && <span style={{ position: 'absolute', right: '6px', color: 'var(--text-faint)' }}>·</span>}
            </a>
          ))}
        </nav>

        {/* Page nav cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {pages.map(({ label, sub, href }) => (
            <Link key={href} href={href} style={{
              display: 'block', padding: '16px', textDecoration: 'none',
              background: 'var(--bg-raised)', border: '1px solid var(--border)',
              borderRadius: '10px', transition: 'border-color 160ms ease',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>{label} →</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section style={S.section}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Projects</h2>
          <Link href="/projects" style={S.seeAll}>All projects →</Link>
        </div>
        {projects.length === 0
          ? <p style={S.empty}>Projects coming soon.</p>
          : <ul style={{ listStyle: 'none' }}>
              {projects.map((p, i) => (
                <li key={p.id} style={{ borderBottom: i < projects.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '16px', padding: '14px 0', textDecoration: 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '3px' }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.description}</div>
                    </div>
                    {p.tag && <span style={S.tag}>{p.tag}</span>}
                  </a>
                </li>
              ))}
            </ul>
        }
      </section>

      {/* Writing */}
      <section style={S.section}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Writing</h2>
          <Link href="/writing" style={S.seeAll}>All posts →</Link>
        </div>
        {posts.length === 0
          ? <p style={S.empty}>Posts coming soon.</p>
          : <ul style={{ listStyle: 'none' }}>
              {posts.slice(0, 3).map((post, i) => (
                <li key={post.id} style={{ borderBottom: i < Math.min(posts.length, 3) - 1 ? '1px solid var(--border)' : 'none' }}>
                  <Link href={`/writing/${post.slug}`} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    gap: '16px', padding: '14px 0', textDecoration: 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '3px' }}>{post.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.summary}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {formatDate(post.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
        }
      </section>

      {/* Hotlist preview */}
      <section style={{ ...S.section, paddingBottom: '80px' }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Hotlist</h2>
          <Link href="/hotlist" style={S.seeAll}>See full list →</Link>
        </div>
        {recentHotlist.length === 0
          ? <p style={S.empty}>Hotlist coming soon.</p>
          : <ul style={{ listStyle: 'none' }}>
              {recentHotlist.map((item, i) => (
                <li key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: '16px', padding: '14px 0',
                  borderBottom: i < recentHotlist.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>{item.title}</div>
                    {item.meta && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.meta}</div>}
                    {item.note && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>{item.note}</div>}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.category}</span>
                </li>
              ))}
            </ul>
        }
      </section>

    </div>
  )
}
