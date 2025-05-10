"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { MessageSquare, Heart, Share2 } from "lucide-react"

export function Community() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const memes = [
    {
      id: 1,
      user: "MemeQueen",
      avatar: "Q",
      content: "When the code works on the first try",
      likes: "3.2k",
      comments: "421",
      shares: "1.1k",
      time: "3h ago",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      user: "DankMaster",
      avatar: "D",
      content: "Me explaining to my mom why I need a new graphics card",
      likes: "5.7k",
      comments: "832",
      shares: "2.3k",
      time: "5h ago",
      gradient: "from-pink-500 to-orange-500",
    },
    {
      id: 3,
      user: "MemeLord",
      avatar: "M",
      content: "Everyone on Monday morning vs me",
      likes: "8.9k",
      comments: "1.2k",
      shares: "4.5k",
      time: "1d ago",
      gradient: "from-green-500 to-teal-500",
    },
  ]

  return (
    <section id="community" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-medium">Join 2M+ memers</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">A Community of Creative Minds</h2>
          <p className="text-lg text-gray-300">
            Connect with fellow meme enthusiasts, share your creations, and become part of the internet's most vibrant
            community.
          </p>
        </div>

        <div
          ref={ref}
          className="relative"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl opacity-30" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {memes.map((meme, index) => (
              <div
                key={meme.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${meme.gradient} flex items-center justify-center text-sm font-bold`}
                    >
                      {meme.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{meme.user}</div>
                      <div className="text-xs text-gray-400">{meme.time}</div>
                    </div>
                  </div>

                  <div className="bg-[#0F0F1A] rounded-xl p-4 mb-4">
                    <p>{meme.content}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center gap-1 text-gray-400 hover:text-pink-500 hover:bg-pink-500/10"
                      >
                        <Heart className="w-4 h-4 mr-1" /> {meme.likes}
                      </button>
                      <button
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" /> {meme.comments}
                      </button>
                      <button
                        className="flex items-center gap-1 text-gray-400 hover:text-green-500 hover:bg-green-500/10"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> {meme.shares}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -top-10 -right-10 text-4xl">🤣</div>
          <div className="absolute bottom-10 -left-10 text-4xl">👽</div>
          <div className="absolute top-1/2 right-0 text-4xl transform translate-x-1/2">💀</div>
        </div>
      </div>
    </section>
  )
} 