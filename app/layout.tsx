import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Taiwan Interactive Map | 台灣互動式地圖',
  description:
    'An interactive Taiwan map built with Next.js and D3.js. Click on cities to explore detailed introductions. 用 D3.js 打造的台灣互動式地圖，點擊城市探索詳細介紹。',
  keywords: [
    'Taiwan map',
    'interactive map',
    'D3.js',
    'Next.js',
    '台灣地圖',
    '互動式地圖'
  ],
  authors: [{ name: 'Lucien-MHL' }],
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#06b6d4',
  openGraph: {
    title: 'Taiwan Interactive Map | 台灣互動式地圖',
    description:
      'Explore Taiwan through an interactive map with city introductions and zoom functionality.',
    url: 'https://lucien-mhl.github.io/taiwan-intro-map/',
    siteName: 'Taiwan Interactive Map',
    type: 'website',
    locale: 'zh_TW'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taiwan Interactive Map | 台灣互動式地圖',
    description:
      'Explore Taiwan through an interactive map with city introductions and zoom functionality.'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
