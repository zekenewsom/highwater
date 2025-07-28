'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HighWater Protocol</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('product')}
                  onMouseEnter={() => setActiveDropdown('product')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Product</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'product' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Portfolio Analytics</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Risk Management</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Compliance Tools</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Custody Solutions</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('solutions')}
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Solutions</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Wealth Advisors</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Family Offices</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Institutional Investors</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">RIA Firms</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('customers')}
                  onMouseEnter={() => setActiveDropdown('customers')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Customers</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'customers' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Success Stories</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Case Studies</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Testimonials</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('plans')}
                  onMouseEnter={() => setActiveDropdown('plans')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Plans</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'plans' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Starter</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Professional</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Enterprise</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('resources')}
                  onMouseEnter={() => setActiveDropdown('resources')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Resources</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Documentation</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Blog</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Webinars</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Support</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('company')}
                  onMouseEnter={() => setActiveDropdown('company')}
                  className="flex items-center space-x-1 cursor-pointer group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Company</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">About Us</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Careers</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Press</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Contact</a>
                  </div>
                )}
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSignIn(true)}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignUp(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Request a demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Announcement Banner */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Marketing Content */}
          <div className="space-y-8 lg:pl-80">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Digital Asset Intelligence
                <span className="block text-indigo-600">for Wealth Advisors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                HighWater helps you get compliant <strong>fast</strong>. And we don't stop there. 
                Our AI and automation power everything—from evidence collection and continuous 
                monitoring to security reviews and vendor risk—whether you're starting up or scaling.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowSignUp(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium whitespace-nowrap"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Right Column - Dashboard Screenshot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-4xl">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Image
                  src="/dashboard-screenshot.png"
                  alt="HighWater Protocol Dashboard"
                  width={1400}
                  height={1050}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            HighWater Digital Asset Management Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No matter your size, HighWater helps you manage digital assets, assess risk, and maintain compliance—all from a single, AI-powered platform designed for wealth advisors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Portfolio Analytics</h3>
                <p className="text-gray-600 leading-relaxed">Get comprehensive portfolio insights—no spreadsheets required.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Management</h3>
                <p className="text-gray-600 leading-relaxed">Easily manage crypto risk from one central platform.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance Center</h3>
                <p className="text-gray-600 leading-relaxed">Prove compliance—before regulators ask.</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Automated Monitoring</h3>
                <p className="text-gray-600 leading-relaxed">Get audit-ready, automatically with continuous monitoring.</p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Custody Management</h3>
                <p className="text-gray-600 leading-relaxed">Get ahead of custody risk with institutional-grade security.</p>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 flex-shrink-0">
                <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
                <p className="text-gray-600 leading-relaxed">Speed up decisions with AI-powered portfolio analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sign In</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <Link
                href="/dashboard"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium block text-center"
              >
                Sign In
              </Link>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setShowSignIn(false);
                    setShowSignUp(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Get Started</h2>
              <button
                onClick={() => setShowSignUp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <Link
                href="/dashboard"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium block text-center"
              >
                Create Account
              </Link>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setShowSignUp(false);
                    setShowSignIn(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}