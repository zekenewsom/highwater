'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AuthNav from './AuthNav';
import { useClient } from '../contexts/ClientContext';

const NAV_LINKS = [
  { label: 'Clients', href: '/clients' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights', href: '/insights' },
  { label: 'Taxes', href: '/taxes' },
  { label: 'Ask', href: '/ask' },
];

export default function NavBar() {
  const [active, setActive] = React.useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedClient, isClientSelected } = useClient();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setActive(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm w-full">
      <nav className="w-full px-4 sm:px-6 lg:px-8 flex items-center h-16">
        <div className="flex-1 flex items-center justify-start min-w-0">
          <Link href="/" className="text-2xl font-bold text-black tracking-tight">
            HighWater Protocol
          </Link>
          {isClientSelected && selectedClient && (
            <div className="ml-4 text-sm text-gray-600">
              <span className="hidden sm:inline">Client: </span>
              <span className="font-medium text-gray-900">{selectedClient.name}</span>
            </div>
          )}
        </div>
        <ul className="flex-1 flex justify-center gap-2 md:gap-4 lg:gap-6 min-w-0">
          <li>
            <Link
              href={isClientSelected ? "/dashboard" : "/"}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 hover:bg-gray-100 hover:text-blue-700 ${
                active === '/dashboard' || (active === '/' && isClientSelected)
                  ? 'bg-gray-900 text-white shadow font-semibold'
                  : 'text-gray-700'
              }`}
            >
              Home
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 hover:bg-gray-100 hover:text-blue-700 ${
                  active === link.href
                    ? 'bg-gray-900 text-white shadow font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex items-center justify-end gap-4 min-w-0">
          <AuthNav />
        </div>
      </nav>
    </header>
  );
}
