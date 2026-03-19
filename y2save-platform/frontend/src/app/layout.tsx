import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AdBanner } from '@/components/layout/AdBanner'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Y2Save - Download Videos Online',
  description: 'Free online video downloader. Download videos from YouTube, Vimeo, TikTok, Instagram, and more.',
  keywords: 'video downloader, youtube downloader, free download',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <AdBanner />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
