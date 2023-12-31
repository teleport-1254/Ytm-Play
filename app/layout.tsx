import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Ytm_Play',
    description: 'Ytm_Play is a web music player for YouTube music. Made with Next.js + React.js. It uses YouTube and Google APIs to search and get music, video, artist and playlist data.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body data-bs-theme="dark" className={inter.className}>{children}</body>
        </html>
    )
}
