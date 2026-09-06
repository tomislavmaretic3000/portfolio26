'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { SLIDES } from '@/lib/slides'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

interface Props {
  ready: boolean
  currentSlide: number
}

export default function HeroLeft({ ready, currentSlide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const catRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const navRef = useRef<HTMLUListElement>(null)

  const initialized = useRef(false)

  // Entry animation
  useEffect(() => {
    if (!ready || initialized.current) return
    initialized.current = true

    const slide = SLIDES[0]
    if (catRef.current) catRef.current.textContent = `${slide.category} — ${slide.year}`
    if (titleRef.current) titleRef.current.textContent = slide.title

    const tl = gsap.timeline()
    const items = containerRef.current?.querySelectorAll('[data-reveal]') ?? []

    tl.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }
    )
  }, [ready])

  // Slide change: animate project info out → update → in
  useEffect(() => {
    if (!initialized.current) return

    const catEl = catRef.current
    const titleEl = titleRef.current
    if (!catEl || !titleEl) return

    const slide = SLIDES[currentSlide]

    const tl = gsap.timeline()
    tl.to([catEl, titleEl], { yPercent: -120, duration: 0.28, ease: 'power2.in', stagger: 0.04 })
    tl.call(() => {
      catEl.textContent = `${slide.category} — ${slide.year}`
      titleEl.textContent = slide.title
      gsap.set([catEl, titleEl], { yPercent: 120 })
    })
    tl.to([catEl, titleEl], { yPercent: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06 })
  }, [currentSlide])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-full px-10 py-8 select-none"
      style={{ background: 'var(--bg)' }}
    >
      {/* Studio wordmark */}
      <Link
        href="/"
        ref={logoRef}
        data-reveal=""
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          opacity: 0,
        }}
      >
        Studio
      </Link>

      {/* Headline — static tagline, grows to fill space */}
      <div className="flex-1 flex items-center">
        <h1
          ref={headlineRef}
          data-reveal=""
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 4.5vw, 6.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            opacity: 0,
          }}
        >
          Design
          <br />
          that speaks
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--fg-dim)' }}>before</em>
          <br />
          it&apos;s read.
        </h1>
      </div>

      {/* Bottom: project info + nav */}
      <div>
        {/* Thin divider */}
        <div
          data-reveal=""
          style={{ height: '1px', background: 'var(--fg-muted)', marginBottom: '1.5rem', opacity: 0 }}
        />

        {/* Animated project info */}
        <div style={{ overflow: 'hidden', marginBottom: '0.4rem' }}>
          <span
            ref={catRef}
            style={{
              display: 'block',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--fg-muted)',
              fontFamily: 'var(--font-dm-sans)',
            }}
          />
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <span
            ref={titleRef}
            style={{
              display: 'block',
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--fg-dim)',
              letterSpacing: '0.02em',
            }}
          />
        </div>

        {/* Nav links */}
        <ul ref={navRef} className="flex items-center gap-7" data-reveal="" style={{ opacity: 0 }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-muted)',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
