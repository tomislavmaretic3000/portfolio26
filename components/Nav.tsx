'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav({ ready }: { ready: boolean }) {
  const navRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ready || hasAnimated.current || !navRef.current) return
    hasAnimated.current = true

    const items = navRef.current.querySelectorAll('[data-nav]')
    gsap.fromTo(
      items,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
      }
    )
  }, [ready])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6"
    >
      <Link
        href="/"
        data-nav=""
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: '0.8125rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          opacity: 0,
        }}
      >
        Studio
      </Link>

      <ul className="flex items-center gap-8">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              data-nav=""
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--fg-dim)',
                opacity: 0,
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
  )
}
