import './globals.css'
import '@nutui/nutui-react/dist/style.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '好室友™ 平台',
  description: '湾区,旧金山,租房,房屋出租,求租,合租,分租,短期,长期',
  keywords: '湾区,旧金山,租房,房屋出租,求租,合租,分租,短期,长期',
  openGraph: {
    title: '好室友™ 平台',
    description: '湾区,旧金山,租房,房屋出租,求租,合租,分租,短期,长期',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
