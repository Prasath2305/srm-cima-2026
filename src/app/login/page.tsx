'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'signup' | 'forgot';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Login failed');
        
        if (data.registrationStatus?.submitted) {
          router.push('/dashboard'); // Or show status page
        } else {
          router.push('/register');
        }
      } 
      else if (mode === 'signup') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, fullName }),
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Signup failed');
        
        router.push('/register');
      }
      else if (mode === 'forgot') {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Request failed');
        
        setSuccess('Check your email for reset instructions');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8 mt-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1E2A2A] rounded-2xl mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-[#FAFAF8]" />
          </div>
          <h1 className="text-3xl font-light text-[#1E2A2A] mb-1">CIMA'26</h1>
          <p className="text-[#607274] text-sm">Conference Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#E5E7EB]">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                mode === 'login' ? 'text-[#1E2A2A]' : 'text-[#9CA3AF] hover:text-[#607274]'
              }`}
            >
              Sign In
              {mode === 'login' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E2A2A]" />
              )}
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                mode === 'signup' ? 'text-[#1E2A2A]' : 'text-[#9CA3AF] hover:text-[#607274]'
              }`}
            >
              Create Account
              {mode === 'signup' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E2A2A]" />
              )}
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'forgot' ? 20 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-medium text-[#1E2A2A] mb-6">
                  {mode === 'login' && 'Welcome back'}
                  {mode === 'signup' && 'Create your account'}
                  {mode === 'forgot' && 'Reset password'}
                </h2>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-800"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-sm text-green-800"
                  >
                    <CheckCircle size={16} />
                    {success}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-black rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all bg-[#FAFAF8]"
                          placeholder="Dr. John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-black     rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all bg-[#FAFAF8]"
                        placeholder="you@university.edu"
                      />
                    </div>
                  </div>

                  {mode !== 'forgot' && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#607274] uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-black rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#607274] focus:border-transparent transition-all bg-[#FAFAF8]"
                          placeholder="••••••••"
                        />
                      </div>
                      {mode === 'signup' && (
                        <p className="text-xs text-[#9CA3AF]">At least 6 characters</p>
                      )}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs text-[#607274] hover:text-[#1E2A2A] underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-xl font-medium hover:bg-[#607274] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 mt-6"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        {mode === 'login' && 'Sign In'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Send Reset Link'}
                        {!loading && <ArrowRight size={18} />}
                      </>
                    )}
                  </button>

                  {mode === 'forgot' && (
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="w-full py-3 text-[#607274] text-sm hover:text-[#1E2A2A] transition-colors"
                    >
                      Back to sign in
                    </button>
                  )}
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-8">
          © 2026 CIMA. Secure authentication system.
        </p>
      </motion.div>
    </div>
  );
}