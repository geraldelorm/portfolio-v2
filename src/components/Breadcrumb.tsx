import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', flexWrap: 'wrap' }}>
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {i > 0 && <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} style={{
              fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none',
              transition: 'color 160ms ease',
            }}>
              {crumb.label}
            </Link>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
