import React, { useState, useRef, useEffect } from 'react'
import { X, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { signIn } from 'next-auth/react'
import ReactDOM from 'react-dom'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Scroll-lock: блокировка прокрутки body при открытой модалке
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (tab === 'register') {
        if (form.password !== form.confirm) {
          setError('Пароли не совпадают!')
          setLoading(false)
          return
        }
        // Запрос на регистрацию
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            username: form.email.split('@')[0], // Можно заменить на отдельное поле, если нужно
            password: form.password,
          }),
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Ошибка регистрации')
        }
        // После успешной регистрации — автоматический вход
        const result = await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
          callbackUrl: '/feed',
        })
        if (result?.error) {
          throw new Error(result.error)
        }
        setSuccess('Вы успешно зарегистрировались!')
        setTimeout(() => {
          setSuccess('')
          window.location.href = result.url || '/feed'
        }, 1000)
      } else {
        // Вход
        const result = await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
          callbackUrl: '/feed',
        })
        if (result?.error) {
          throw new Error(result.error)
        }
        setSuccess('Вы успешно авторизировались!')
        setTimeout(() => {
          setSuccess('')
          window.location.href = result.url || '/feed'
        }, 1000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так')
    } finally {
      setLoading(false)
    }
  }

  if (typeof window === 'undefined') return null;

  const modalContent = (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 opacity-100" aria-hidden="true" onClick={onClose} />
      )}
      {open && (
        <div
          ref={modalRef}
          className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-w-xl w-full p-10 rounded-2xl shadow-2xl border border-purple-700/40 bg-[#18182b] pointer-events-auto transition-all duration-300
            ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{
            fontFamily: 'Inter, Urbanist, sans-serif',
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">MemeRush</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors text-2xl"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex mb-8 rounded-xl overflow-hidden border border-purple-700/30">
            <button
              className={`flex-1 py-2 text-lg font-semibold transition-all ${tab === 'login'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow'
                : 'bg-[#23233a] text-purple-300 hover:text-white'
                }`}
              onClick={() => setTab('login')}
            >
              Вход
            </button>
            <button
              className={`flex-1 py-2 text-lg font-semibold transition-all ${tab === 'register'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow'
                : 'bg-[#23233a] text-pink-300 hover:text-white'
                }`}
              onClick={() => setTab('register')}
            >
              Регистрация
            </button>
          </div>
          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 p-3">
                <div className="text-sm text-green-700">{success}</div>
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-purple-400" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-700/30 bg-[#23233a] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-purple-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                required
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-purple-700/30 bg-[#23233a] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-purple-400 hover:text-pink-400"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {tab === 'register' && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-purple-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirm"
                  required
                  placeholder="Повторите пароль"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-700/30 bg-[#23233a] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">Загрузка...</span>
              ) : tab === 'login' ? (
                <span className="flex items-center justify-center gap-2"><LogIn /> Войти</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><UserPlus /> Создать аккаунт</span>
              )}
            </button>
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
              // TODO: Реализовать Google sign-in
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><g><path fill='#fff' d='M21.35 11.1h-9.18v2.92h5.27c-.23 1.23-1.4 3.6-5.27 3.6-3.18 0-5.78-2.63-5.78-5.86s2.6-5.86 5.78-5.86c1.81 0 3.03.77 3.73 1.43l2.55-2.48C16.1 3.6 14.13 2.5 11.99 2.5 6.98 2.5 2.99 6.49 2.99 11.5s4 9 9 9c5.18 0 8.59-3.63 8.59-8.74 0-.59-.07-1.04-.16-1.66z'/></g></svg>
              Войти через Google
            </button>
          </form>
        </div>
      )}
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
} 