'use client'

import React, { useEffect, useState } from 'react'

const EMOJIS = ['😂', '🔥', '🚀', '😎', '🥇', '👾', '💥', '🎮', '🤯', '💡']

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min

type EmojiData = {
  emoji: string
  left: number
  size: number
  duration: number
  delay: number
}

export default function AnimatedEmojis() {
  const [emojis, setEmojis] = useState<EmojiData[]>([])

  useEffect(() => {
    const arr: EmojiData[] = Array.from({ length: 18 }).map(() => ({
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: getRandom(0, 100),
      size: getRandom(1.5, 3.5),
      duration: getRandom(12, 28),
      delay: getRandom(0, 10),
    }))
    setEmojis(arr)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {emojis.map((item, i) => (
        <span
          key={i}
          className="absolute select-none opacity-70 animate-emoji-float"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}rem`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            top: '-4rem',
          }}
        >
          {item.emoji}
        </span>
      ))}
      <style jsx global>{`
        @keyframes emoji-float {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) scale(1.1) rotate(20deg);
            opacity: 0.2;
          }
        }
        .animate-emoji-float {
          animation-name: emoji-float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
} 