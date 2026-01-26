'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY > 10) setOpen(false);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`w-full transition-all duration-500 ease-in-out
          ${scrolled ? 'max-w-[140px] md:max-w-xs' : 'max-w-7xl'}
        `}
      >
        <div
          className={`relative flex items-center rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all duration-500
            ${scrolled ? 'px-4 md:px-6 py-2 justify-center md:justify-between md:gap-12' : 'px-6 py-4 justify-between'}
          `}
        >
          {/* Logo (ALWAYS visible) */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-[#1E2A2A] whitespace-nowrap flex-shrink-0"
          >
            CIMA<span className="text-[#607274]">'26</span>
          </Link>

          {/* Desktop Nav Links (only when NOT scrolled) */}
          <nav
            className={`hidden md:flex items-center gap-8 transition-all duration-300
              ${scrolled ? 'opacity-0 max-w-0 overflow-hidden pointer-events-none' : 'opacity-100 max-w-full'}
            `}
          >
            <Link href="about" className="text-sm text-[#5F6F73] hover:text-[#1E2A2A] whitespace-nowrap">
              About
            </Link>
            <Link href="" className="text-sm text-[#5F6F73] hover:text-[#1E2A2A] whitespace-nowrap">
              Departments
            </Link>
            <Link href="#fees" className="text-sm text-[#5F6F73] hover:text-[#1E2A2A] whitespace-nowrap">
              Fees
            </Link>
            <Link href="contact" className="text-sm text-[#5F6F73] hover:text-[#1E2A2A] whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Desktop Register (always on desktop) */}
          <Link
            href="/register"
            className="hidden md:block rounded-full bg-[#1E2A2A] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#607274] whitespace-nowrap flex-shrink-0"
          >
            Register
          </Link>

          {/* Mobile Hamburger - with fade transition */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden rounded-full bg-[#EFEFE8] p-2 text-[#1E2A2A] flex-shrink-0 transition-all duration-500
              ${scrolled ? 'opacity-0 scale-0 w-0 p-0 pointer-events-none' : 'opacity-100 scale-100'}
            `}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Dropdown (only if open & not scrolled) */}
          {!scrolled && open && (
            <div className="absolute left-0 right-0 top-full mt-4 rounded-[24px] bg-white px-6 py-6 shadow-xl md:hidden">
              <nav className="flex flex-col gap-4 text-sm text-[#1E2A2A]">
                <Link href="about" onClick={() => setOpen(false)}>
                  About
                </Link>
                <Link href="" onClick={() => setOpen(false)}>
                  Departments
                </Link>
                <Link href="" onClick={() => setOpen(false)}>
                  Fees
                </Link>
                <Link href="" onClick={() => setOpen(false)}>
                  Contact
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-full bg-[#1E2A2A] px-4 py-3 text-center font-medium text-white"
                >
                  Register
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
