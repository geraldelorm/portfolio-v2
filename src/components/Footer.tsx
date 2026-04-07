export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '20px 24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
      }}>
        <span>Gerald G. &copy; {new Date().getFullYear()}</span>
        <span style={{ color: 'var(--text-faint)' }}>Built with intent.</span>
      </div>
    </footer>
  )
}
