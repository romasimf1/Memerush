"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react"

interface HeroProps {
  onOpenAuth?: (mode: 'login' | 'register') => void
}

export function Hero({ onOpenAuth }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax")
      elements.forEach((el) => {
        const speed = Number.parseFloat((el as HTMLElement).dataset.speed || "5")
        const xOffset = x * speed
        const yOffset = y * speed
        ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div
              className="absolute -left-10 -top-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl parallax"
              data-speed="3"
            />
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium">The meme revolution is here</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Where Memes
              <span className="relative inline-block mx-2">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
                  Come Alive
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 opacity-30 blur-sm"></span>
              </span>
              and Go Viral
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Post, vote, and remix the internet's funniest content. Join the fastest growing meme community where
              creativity meets comedy.
            </p>
            <div className="flex flex-wrap gap-4 mb-2">
              <Link href="#remix-battle">
                <button
                  className="px-8 py-6 h-auto text-lg font-medium bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white shadow-lg rounded-lg"
                >
                  Remix Battle
                </button>
              </Link>
              <Link href="#trending">
                <button
                  className="border-gray-700 text-white hover:bg-white/10 hover:text-white px-8 py-6 h-auto text-lg font-medium rounded-lg border"
                >
                  See Top Memes
                </button>
              </Link>
              <Link href="#about">
                <button
                  className="px-8 py-6 h-auto text-lg font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg rounded-lg"
                >
                  About Project
                </button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0F0F1A] flex items-center justify-center text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="font-bold text-white">10k+</span> memers joined this week
              </p>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-30 parallax"
              data-speed="2"
            />
            <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#16162A] rounded-3xl p-1 shadow-xl">
              <div className="bg-[#0F0F1A]/80 rounded-[calc(1.5rem-4px)] p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: "🔥", text: "Hot Memes" },
                    { emoji: "🚀", text: "Trending" },
                    { emoji: "🎭", text: "Remix Battle" },
                    { emoji: "🏆", text: "Meme of the Day" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <div className="text-3xl mb-2">{item.emoji}</div>
                        <div className="font-medium">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white/5 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500/20 to-pink-500/20 w-32 h-32 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                          M
                        </div>
                        <span className="font-medium">MemeKing</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>+2.4k</span>
                      </div>
                    </div>
                    <div className="bg-[#0F0F1A] rounded-xl p-3 mb-3">
                      <p className="text-sm">When you finally debug that error after 5 hours...</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          className="h-8 px-2 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <Sparkles className="h-4 w-4 mr-1" /> 1.2k
                        </button>
                        <button
                          className="h-8 px-2 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <Zap className="h-4 w-4 mr-1" /> Remix
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating emojis */}
            <div className="absolute -top-10 -right-10 text-4xl parallax" data-speed="4">
              🚀
            </div>
            <div className="absolute bottom-20 -left-10 text-4xl parallax" data-speed="3">
              😂
            </div>
            <div className="absolute top-1/2 -right-5 text-4xl parallax" data-speed="5">
              💯
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 