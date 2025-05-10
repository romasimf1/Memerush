"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Flame, Sparkles, Zap, TrendingUp, Users, Palette } from "lucide-react"

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      title: "Hot Memes Feed",
      description: "Discover the freshest, most viral content curated just for you.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "One-Click Remix",
      description: "Put your spin on any meme with our easy-to-use remix tools.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      title: "Meme Trends",
      description: "Stay ahead of the curve with real-time trending meme formats.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Instant Reactions",
      description: "Express yourself with custom reactions beyond simple upvotes.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Meme Battles",
      description: "Compete in themed contests and win internet fame and glory.",
    },
    {
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      title: "Creator Tools",
      description: "Powerful yet simple tools to craft the perfect meme.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Meme-making superpowers</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything You Need to Go Viral</h2>
          <p className="text-lg text-gray-300">
            MemeRush combines the best social features with powerful creation tools, making it the ultimate platform for
            meme enthusiasts.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A2E] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 