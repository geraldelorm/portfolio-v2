import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Gerald G. — Engineer. Builder. Writer.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 28, color: '#555', marginBottom: 32, letterSpacing: '-0.02em' }}>
          geraldelorm.com
        </div>
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#e2e2e2',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Gerald G.
        </div>
        <div style={{ fontSize: 28, color: '#555', letterSpacing: '-0.01em' }}>
          Engineer. Builder. Writer.
        </div>
      </div>
    ),
    { ...size }
  )
}
