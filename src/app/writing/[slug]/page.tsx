import { notFound } from 'next/navigation'
import { getPost, getPostContent, getPosts } from '@/lib/notion'

export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    return posts.map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = await getPost(slug)
    if (!post) return {}
    return { title: `${post.title} — Gerald G.`, description: post.summary }
  } catch {
    return {}
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post, content
  try {
    post = await getPost(slug)
    if (!post) notFound()
    content = await getPostContent(post.id)
  } catch {
    notFound()
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      <article style={{ padding: '80px 0' }}>
        <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2,
            marginBottom: '12px', color: 'var(--text)',
          }}>{post!.title}</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{formatDate(post!.date)}</p>
        </header>

        <div style={{
          fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.8,
        }}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content ?? '') }}
        />
      </article>
    </div>
  )
}

// Basic markdown → HTML for blog content
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:600;margin:32px 0 12px;color:var(--text)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.3rem;font-weight:600;margin:40px 0 16px;color:var(--text)">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.6rem;font-weight:700;margin:48px 0 20px;color:var(--text)">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="font-size:0.85em;background:var(--bg-raised);padding:2px 6px;border-radius:4px">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--text);text-decoration:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;padding-left:4px">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="margin:16px 0;padding-left:20px;list-style:disc">$&</ul>')
    .replace(/\n\n/g, '</p><p style="margin:20px 0">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p style="margin:20px 0">$1</p>')
}
