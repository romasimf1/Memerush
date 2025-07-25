import '@/styles/globals.css'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'
import AnimatedEmojis from '@/components/ui/AnimatedEmojis'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[#0a0a0f] overflow-x-hidden">
        <SessionProviderWrapper>
          <AnimatedEmojis />
          {/*
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#18182b] to-pink-900 opacity-80" />
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-2xl" />
          </div>
          */}
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
