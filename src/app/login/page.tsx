'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        console.log('Attempting login...');
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        console.log('Login response:', data);

        if (!res.ok) {
          throw new Error(data.error || 'Login failed');
        }

        setSuccess('Login successful! Redirecting...');

        setTimeout(() => {
          if (data.registrationStatus?.submitted) {
            router.push('/dashboard');
          } else {
            router.push('/register');
          }
          router.refresh();
        }, 500);

      } else if (mode === 'signup') {
        console.log('Attempting signup...');
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, fullName }),
        });

        const data = await res.json();
        console.log('Signup response:', data);

        if (!res.ok) {
          throw new Error(data.error || 'Signup failed');
        }

        setSuccess('Account created successfully! Redirecting...');

        setTimeout(() => {
          router.push('/register');
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-[#EFEFE8] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8 mt-20">
          <h1 className="text-3xl font-light text-[#1E2A2A] mb-1">CIMA'26</h1>
          <p className="text-black text-sm">Conference Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#E5E7EB]">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                mode === 'login' ? 'text-[#1E2A2A]' : 'text-black hover:text-black'
              }`}
            >
              Sign In
              {mode === 'login' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E2A2A]" />
              )}
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                mode === 'signup' ? 'text-[#1E2A2A]' : 'text-black hover:text-black'
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-medium text-[#1E2A2A] mb-6">
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h2>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-sm text-green-700"
                  >
                    <CheckCircle size={16} className="shrink-0" />
                    <span>{success}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-black uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-black border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-[#FAFAF8]"
                          placeholder="Dr. John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-black uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border text-black border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-[#FAFAF8]"
                        placeholder="you@university.edu"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#1E2A2A] text-[#FAFAF8] rounded-xl font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                      </>
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-black mt-8">
          © 2026 CIMA. Conference Management System.
        </p>
      </motion.div>
    </div>
  );
}
