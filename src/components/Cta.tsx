"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Cta() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl" />

          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Join the
                <span className="relative inline-block mx-2">
                  <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
                    MemeRush
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 opacity-30 blur-sm"></span>
                </span>
                Revolution?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Don't miss out on the fun. Join thousands of creators who are already making waves in the meme universe.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register" legacyBehavior>
                  <a className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 h-auto text-lg font-medium rounded-lg flex items-center justify-center transition">
                    Join the MemeRush
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Link>
                <button
                  className="border border-gray-700 text-white hover:bg-white/10 hover:text-white px-8 py-6 h-auto text-lg font-medium rounded-lg"
                >
                  Learn More
                </button>
              </div>
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span>100% Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating emojis */}
          <div className="absolute top-10 left-10 text-4xl">🎭</div>
          <div className="absolute bottom-10 right-10 text-4xl">🚀</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">🔥</div>
          <div className="absolute top-1/3 right-1/4 text-4xl">💯</div>
        </div>
      </div>
    </section>
  )
} 