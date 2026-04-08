import { getWorkHistory } from '@/lib/notion'
import Breadcrumb from '@/components/Breadcrumb'
import type { WorkHistory } from '@/types'

const S = {
  section: { borderTop: '1px solid var(--border)', paddingTop: '48px', paddingBottom: '48px' } as React.CSSProperties,
  h2: { fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '24px' } as React.CSSProperties,
  muted: { color: 'var(--text-muted)' } as React.CSSProperties,
}

function formatYear(d: string | null) {
  if (!d) return 'Present'
  return new Date(d).getFullYear().toString()
}

export default async function About() {
  let work: WorkHistory[] = []

  try {
    work = await getWorkHistory()
  } catch {
    // Notion not configured yet
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 48px' }}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '20px', color: 'var(--text)',
        }}>About</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '16px' }}>
          I'm Gerald — a Software Engineer at Google based in London. I grew up in Ghana, studied Computer Science at Accra Technical University
          where I graduated as the best student in my class, and have been building things ever since.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '520px' }}>
          Outside of work, I spend time on long hikes, exploring cities, and documenting it all. I also read a lot, watch too much TV,
          and have strong opinions about films.
        </p>
      </section>

      {/* Work */}
      <section style={S.section}>
        <h2 style={S.h2}>Work</h2>
        {work.length === 0 ? (
          <p style={{ fontSize: '0.85rem', ...S.muted }}>Work history coming soon.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {work.map((job, i) => (
              <li key={job.id} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                gap: '16px', paddingBottom: '28px',
                marginBottom: i < work.length - 1 ? '0' : '0',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '2px', lineHeight: 1.5 }}>
                  {formatYear(job.start)} — {job.current ? 'Present' : formatYear(job.end)}
                </span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>{job.company}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{job.role}</div>
                  {job.description && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{job.description}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Education */}
      <section style={S.section}>
        <h2 style={S.h2}>Education</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '2px' }}>2018 — 2023</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>Accra Technical University</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>BTech, Computer Science</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Best Graduating Student, Computer Science</div>
          </div>
        </div>
      </section>

      {/* Life outside work */}
      <section style={{ ...S.section, paddingBottom: '80px' }}>
        <h2 style={S.h2}>Outside work</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '520px', marginBottom: '32px' }}>
          Long hikes, travel, photography, and too many recommendations. You can follow along on Instagram.
        </p>

        {/* F1 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>On the grid</div>
          <ul style={{ listStyle: 'none' }}>
            {[
              { label: 'Favourite driver', value: 'Lewis Hamilton', accent: true },
              { label: 'Team', value: 'McLaren → Ferrari' },
              { label: 'Most memorable', value: '2021 Abu Dhabi GP' },
              { label: '2025 take', value: 'Hamilton in red is everything.' },
            ].map(({ label, value, accent }) => (
              <li key={label} style={{
                display: 'grid', gridTemplateColumns: '140px 1fr',
                gap: '16px', paddingBottom: '10px',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '1px' }}>{label}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>
                  {accent && <span style={{ color: 'var(--accent)', marginRight: '6px' }}>·</span>}
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://instagram.com/geraldelorm"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.85rem', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}
        >
          @geraldelorm on Instagram →
        </a>
      </section>

    </div>
  )
}
