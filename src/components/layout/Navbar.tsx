'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Technical Blog', href: '/blog/technical' },
    { name: 'Engineering Blog', href: '/blog/engineering' },
    { name: 'Life Blog', href: '/blog/life' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
      <div className="container-base py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-primary-900 hover:text-accent-600 transition">
          Charles Poulin
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(item.href)
                  ? 'text-accent-600'
                  : 'text-primary-600 hover:text-primary-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-primary-700 hover:text-primary-900 focus:outline-none"
          aria-label="Menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-white border-t border-primary-100">
          <div className="space-y-2 py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-accent-600'
                    : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}