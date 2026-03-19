'use client'

import Link from 'next/link'
import { useState } from 'react'

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Y2</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Y2Save</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Download
            </Link>
            <Link href="/history" className="text-gray-700 hover:text-blue-600">
              History
            </Link>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">
              Pricing
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-blue-600 py-2">
              Download
            </Link>
            <Link href="/history" className="block text-gray-700 hover:text-blue-600 py-2">
              History
            </Link>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 py-2">
              Pricing
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
