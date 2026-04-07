import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gerald G. — Engineer. Builder. Writer.',
  description: 'Software Engineer at Google. Building things. Sharing things.',
  openGraph: {
    title: 'Gerald G. — Engineer. Builder. Writer.',
    description: 'Software Engineer at Google. Building things. Sharing things.',
    url: 'https://geraldelorm.com',
    siteName: 'Gerald G.',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    site: '@geraldelorm',
    creator: '@geraldelorm',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={spaceGrotesk.variable}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
