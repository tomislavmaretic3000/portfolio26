'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { SLIDES } from '@/lib/slides'

const AUTO_MS = 6000

interface Props {
  ready: boolean
  onSlideChange: (index: number) => void
}

export default function HeroSlideshow({ ready, onSlideChange }: Props) {
  const [current, setCurrent] = useState(0)

  const currentRef = useRef(0)
  const animatingRef = useRef(false)
  const readyRef = useRef(false)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduleAutoRef = useRef<() => void>(() => {})

  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([])
  const panRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => { readyRef.current = ready }, [ready])

  // Called directly from GSAP — no React render cycle gap
  const startIdlePan = useCallback((index: number) => {
    const pan = panRefs.current[index]
    if (!pan) return
    gsap.killTweensOf(pan)
    gsap.fromTo(pan, { xPercent: 0 }, { xPercent: 5, duration: AUTO_MS / 1000, ease: 'power2.out' })
  }, [])

  const go = useCallback((direction: 'next' | 'prev') => {
    if (animatingRef.current || !readyRef.current) return
    if (autoRef.current) clearTimeout(autoRef.current)

    const from = currentRef.current
    const to = direction === 'next'
      ? (from + 1) % SLIDES.length
      : (from - 1 + SLIDES.length) % SLIDES.length

    const outWrap = wrapperRefs.current[from]
    const inWrap = wrapperRefs.current[to]
    const inPan = panRefs.current[to]

    if (!outWrap || !inWrap || !inPan) return

    animatingRef.current = true

    gsap.set(inWrap, { opacity: 1, zIndex: 2, clipPath: 'inset(0 100% 0 0)' })
    gsap.set(inPan, { xPercent: -5 })

    const tl = gsap.timeline({
      onComplete() {
        gsap.set(outWrap, { opacity: 0, zIndex: 0 })
        gsap.set(inWrap, { zIndex: 1, clearProps: 'clipPath' })
        currentRef.current = to
        setCurrent(to)
        onSlideChange(to)
        animatingRef.current = false
        // Fire idle pan immediately — no React state cycle, no gap
        startIdlePan(to)
        scheduleAutoRef.current()
      },
    })

    // Clip-path wipe
    tl.to(inWrap, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.out' }, 0)
    // Incoming image drifts right into neutral (linear so velocity is steady at join)
    tl.to(inPan, { xPercent: 0, duration: 1.4, ease: 'linear' }, 0)
    // Outgoing image continues drifting right
    tl.to(panRefs.current[from], { xPercent: 4, duration: 1.2, ease: 'power3.out' }, 0)
  }, [onSlideChange, startIdlePan])

  const scheduleAuto = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => go('next'), AUTO_MS)
  }, [go])

  useEffect(() => { scheduleAutoRef.current = scheduleAuto }, [scheduleAuto])

  // Entry: start pan + auto immediately from GSAP, no React dependency on current
  useEffect(() => {
    if (!ready) return

    const wrap0 = wrapperRefs.current[0]
    if (!wrap0) return

    gsap.set(wrap0, { opacity: 1, zIndex: 1 })
    startIdlePan(0)
    scheduleAuto()

    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [ready, scheduleAuto, startIdlePan])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#111' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          ref={(el) => { wrapperRefs.current[i] = el }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
        >
          <div
            ref={(el) => { panRefs.current[i] = el }}
            className="absolute inset-0"
            style={{ width: '112%', left: '-6%', willChange: 'transform' }}
          >
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="50vw"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
