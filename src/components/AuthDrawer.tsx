import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface AuthModalProps {
  open: boolean
  mode: 'login' | 'register'
  onClose: () => void
}

export function AuthDrawer({ open, mode, onClose }: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Закрытие по клику вне
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  // Закрытие по Esc
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-md mx-auto bg-white dark:bg-[#18182b] rounded-2xl shadow-2xl p-8 flex flex-col transition-all duration-300',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          'border border-white/10',
        )}
        style={{ zIndex: 60 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">MemeRush</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors text-2xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login' 
                ? 'Welcome back to MemeRush!'
                : 'Join the meme community!'}
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#23233a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#23233a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mt-2"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 