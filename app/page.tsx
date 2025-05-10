'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Community } from '@/components/Community'
import { Cta } from '@/components/Cta'
import { Footer } from '@/components/Footer'
import { AuthModal } from '@/components/AuthModal'

export default function Home() {
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login',
  })

  return (
    <main className="min-h-screen">
      <Navbar
        onSignIn={() => setAuthModal({ open: true, mode: 'login' })}
        onSignUp={() => setAuthModal({ open: true, mode: 'register' })}
      />
      <Hero
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
      />
      <Features />
      <Community />
      <Cta />
      <Footer />
      <AuthModal
        open={authModal.open}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
      />
    </main>
  )
} 