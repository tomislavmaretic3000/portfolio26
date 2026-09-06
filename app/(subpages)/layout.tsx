'use client'

import Link from 'next/link'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function SubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6"
        style={{ background: 'transparent' }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--fg)',
          }}
        >
          Studio
        </Link>

        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-dim)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--fg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--fg-dim)'
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </>
  )
}
