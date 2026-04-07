import { getProjects } from '@/lib/notion'
import Breadcrumb from '@/components/Breadcrumb'
import type { Project } from '@/types'

export const revalidate = 60

export default async function Projects() {
  let projects: Project[] = []

  try {
    projects = await getProjects()
  } catch {
    // Notion not configured yet
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      <section style={{ padding: '80px 0 48px' }}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '12px', color: 'var(--text)',
        }}>Projects</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Things I'm building.
        </p>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', paddingBottom: '80px' }}>
        {projects.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '48px' }}>Projects coming soon.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {projects.map((p, i) => (
              <li key={p.id} style={{ borderBottom: i < projects.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  gap: '16px', padding: '18px 0', textDecoration: 'none', transition: 'opacity 160ms ease',
                }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.description}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    {p.status === 'WIP' && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px' }}>WIP</span>
                    )}
                    {p.tag && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px' }}>{p.tag}</span>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
