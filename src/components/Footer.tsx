import Link from "next/link"
import { Github, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-darkBg border-t border-neonBlue/20 py-12 mt-12 shadow-neon">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-neonPink to-neonBlue rounded-lg flex items-center justify-center shadow-neon animate-bounce-slow">
              <span className="text-white font-bold text-xl">M</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neonYellow rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[8px] font-bold">🔥</span>
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neonPink via-neonYellow to-neonBlue text-transparent bg-clip-text animate-gradient-x drop-shadow-neon">MemeRush</span>
          </div>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="text-neonPink hover:text-neonBlue transition-colors animate-bounce">🐦</a>
            <a href="#" className="text-neonBlue hover:text-neonPink transition-colors animate-bounce">📸</a>
            <a href="#" className="text-neonGreen hover:text-neonYellow transition-colors animate-bounce">🎮</a>
            <a href="#" className="text-neonYellow hover:text-neonGreen transition-colors animate-bounce">🍕</a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-4 text-neonPink drop-shadow-neon">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-neonPink transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonPink transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonPink transition-colors">Trending</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonPink transition-colors">Creator Tools</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-neonBlue drop-shadow-neon">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-neonBlue transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonBlue transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonBlue transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neonBlue transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-neonGreen drop-shadow-neon">About</h3>
            <p className="text-gray-400 mb-4">MemeRush is the ultimate platform for creating, sharing, and discovering the internet's funniest memes. Join our community today!</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <span className="text-neonPink animate-bounce">😂</span>
              <span className="text-neonBlue animate-bounce">🚀</span>
              <span className="text-neonGreen animate-bounce">🔥</span>
              <span className="text-neonYellow animate-bounce">💯</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2025 MemeRush. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 