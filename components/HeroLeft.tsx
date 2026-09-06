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

const CYCLING_WORDS = ['creating', 'building', 'making', 'refining', 'iterating']
const WORD_INTERVAL = 2200

const FONT = 'var(--font-archivo)'

interface Props {
  ready: boolean
  currentSlide: number
}

export default function HeroLeft({ ready, currentSlide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const cycleWrapRef = useRef<HTMLSpanElement>(null)

  const initialized = useRef(false)
  const wordIndexRef = useRef(0)
  const wordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cyclingRef = useRef(false)

  // Build letter spans for a word inside the container
  const buildLetters = (word: string): HTMLSpanElement[] => {
    const wrap = cycleWrapRef.current
    if (!wrap) return []
    wrap.innerHTML = ''
    return word.split('').map((ch) => {
      const span = document.createElement('span')
      span.textContent = ch === ' ' ? '\u00a0' : ch
      span.style.display = 'inline-block'
      span.style.willChange = 'transform, opacity'
      wrap.appendChild(span)
      return span
    })
  }

  const cycleWord = () => {
    if (!cycleWrapRef.current) return
    cyclingRef.current = true

    const wrap = cycleWrapRef.current
    const currentLetters = Array.from(wrap.querySelectorAll('span')) as HTMLSpanElement[]
    const next = CYCLING_WORDS[wordIndexRef.current % CYCLING_WORDS.length]
    wordIndexRef.current++

    const tl = gsap.timeline({
      onComplete() {
        wordTimerRef.current = setTimeout(cycleWord, WORD_INTERVAL)
      },
    })

    // Letters out — stagger left to right, slide up
    if (currentLetters.length) {
      tl.to(currentLetters, {
        yPercent: -120,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        stagger: 0.03,
      }, 0)
    }

    // Build next word off-screen
    tl.call(() => {
      const letters = buildLetters(next)
      gsap.set(letters, { yPercent: 120, opacity: 0 })

      // Letters in — stagger left to right, drop down
      gsap.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        stagger: 0.04,
      })
    }, undefined, currentLetters.length ? 0.25 : 0)
  }

  // Entry animation
  useEffect(() => {
    if (!ready || initialized.current) return
    initialized.current = true

    const slide = SLIDES[0]
    if (catRef.current) catRef.current.textContent = `${slide.category} — ${slide.year}`
    if (titleRef.current) titleRef.current.textContent = slide.title

    // Set first word
    const firstLetters = buildLetters(CYCLING_WORDS[0])
    gsap.set(firstLetters, { yPercent: 0, opacity: 1 })

    const items = containerRef.current?.querySelectorAll('[data-reveal]') ?? []
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09 },
    )

    wordTimerRef.current = setTimeout(cycleWord, WORD_INTERVAL)

    return () => {
      if (wordTimerRef.current) clearTimeout(wordTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Slide change → animate project info
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
      {/* Wordmark */}
      <Link
        href="/"
        data-reveal=""
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: '0.78rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          opacity: 0,
        }}
      >
        Studio
      </Link>

      {/* Main copy */}
      <div className="flex-1 flex items-center">
        <h1
          data-reveal=""
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 4.2vw, 6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            opacity: 0,
          }}
        >
          Design consultant
          <br />
          {/* Cycling word row */}
          <span
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
            }}
          >
            <span
              ref={cycleWrapRef}
              style={{ display: 'inline-block', color: 'var(--fg)' }}
            />
          </span>
          <br />
          apps &amp; brands
        </h1>
      </div>

      {/* Bottom: project info + nav */}
      <div>
        <div
          data-reveal=""
          style={{ height: '1px', background: 'var(--fg-muted)', marginBottom: '1.5rem', opacity: 0 }}
        />

        <div style={{ overflow: 'hidden', marginBottom: '0.4rem' }}>
          <span
            ref={catRef}
            style={{
              display: 'block',
              fontFamily: FONT,
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
            }}
          />
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <span
            ref={titleRef}
            style={{
              display: 'block',
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--fg)',
              letterSpacing: '0.02em',
            }}
          />
        </div>

        <ul
          className="flex items-center gap-7"
          data-reveal=""
          style={{ opacity: 0 }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontFamily: FONT,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
                  transition: 'opacity 0.25s ease',
                  opacity: 1,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.45' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
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
