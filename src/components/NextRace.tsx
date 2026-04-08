import { getNextRace } from '@/lib/f1'

function formatRaceDate(dateStr: string, timeStr: string): string {
  const iso = timeStr ? `${dateStr}T${timeStr}` : dateStr
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function NextRace() {
  const race = await getNextRace()
  if (!race) return null

  const label: React.CSSProperties = {
    fontSize: '0.68rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    fontVariantNumeric: 'tabular-nums',
  }

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 0',
      margin: '20px 0 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ ...label, marginBottom: '4px' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>R{race.round}</span>
          {' · '}
          {race.circuitName}
          {' · '}
          {race.country}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
          {race.raceName}
        </div>
      </div>
      <div style={{ ...label, textAlign: 'right', flexShrink: 0 }}>
        {formatRaceDate(race.date, race.time)}
      </div>
    </div>
  )
}
