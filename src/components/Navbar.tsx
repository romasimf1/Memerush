"use client"

import React from 'react'
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"
import { AuthModal } from './AuthModal'
import { useSession, signOut } from 'next-auth/react'

interface NavbarProps {
  onSignIn?: () => void
  onSignUp?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onSignIn, onSignUp }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login'
  })
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { data: session, status } = useSession()
  const [delayPassed, setDelayPassed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (status === 'loading') {
      setDelayPassed(false)
      const timer = setTimeout(() => setDelayPassed(true), 1200)
      return () => clearTimeout(timer)
    } else {
      setDelayPassed(true)
    }
  }, [status])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0F0F1A]/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-[8px] font-bold">🔥</span>
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight">MemeRush</span>
          </Link>

          {isMobile ? (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full bg-transparent hover:bg-white/10 transition">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="#community" className="text-sm font-medium hover:text-purple-400 transition-colors">
                Community
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-purple-400 transition-colors">
                About
              </Link>
            </nav>
          )}

          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' || !delayPassed ? (
              <div style={{ width: 120, height: 40 }} />
            ) : session?.user ? (
              <div className="relative group flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-white font-medium text-base">{session.user.username || session.user.email}</span>
                <div className="absolute right-0 top-12 bg-[#23233a] border border-purple-700/30 rounded-xl shadow-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity z-50 min-w-[140px]">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left text-red-500 hover:text-red-700 font-semibold py-1 px-2 rounded transition"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal({ open: true, mode: 'login' })}
                  className="px-6 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setAuthModal({ open: true, mode: 'register' })}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-[#1A1A2E] rounded-xl">
            <nav className="flex flex-col gap-4 px-4">
              <Link
                href="#features"
                className="text-sm font-medium py-2 hover:text-purple-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#community"
                className="text-sm font-medium py-2 hover:text-purple-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium py-2 hover:text-purple-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <button 
                onClick={() => {
                  setAuthModal({ open: true, mode: 'login' })
                  setIsMenuOpen(false)
                }}
                className="mt-2 px-6 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition w-full text-left"
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  setAuthModal({ open: true, mode: 'register' })
                  setIsMenuOpen(false)
                }}
                className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition w-full text-left"
              >
                Sign Up
              </button>
            </nav>
          </div>
        )}
      </div>

      <AuthModal 
        open={authModal.open} 
        onClose={() => setAuthModal(prev => ({ ...prev, open: false }))} 
      />
    </header>
  )
} 