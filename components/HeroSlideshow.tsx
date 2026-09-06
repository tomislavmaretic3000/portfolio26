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

  // One ref per slide: the outer wrapper (for clip-path) and inner img wrapper (for pan)
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([])
  const panRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => { readyRef.current = ready }, [ready])

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

    // Incoming slide: hidden by clipPath, starts slightly shifted right for pan effect
    gsap.set(inWrap, { opacity: 1, zIndex: 2, clipPath: 'inset(0 100% 0 0)' })
    gsap.set(inPan, { xPercent: 3 })

    const tl = gsap.timeline({
      onComplete() {
        gsap.set(outWrap, { opacity: 0, zIndex: 0 })
        gsap.set(inWrap, { zIndex: 1, clearProps: 'clipPath' })
        currentRef.current = to
        setCurrent(to)
        onSlideChange(to)
        animatingRef.current = false
        scheduleAutoRef.current()
      },
    })

    // Wipe reveal (clip-path)
    tl.to(inWrap, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.out' }, 0)

    // Pan in: incoming image drifts to neutral
    tl.to(inPan, { xPercent: 0, duration: 1.6, ease: 'power3.out' }, 0)

    // Pan out: outgoing image continues drifting left slightly
    tl.to(panRefs.current[from], { xPercent: -2, duration: 1.1, ease: 'power3.out' }, 0)
  }, [onSlideChange])

  const scheduleAuto = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => go('next'), AUTO_MS)
  }, [go])

  useEffect(() => { scheduleAutoRef.current = scheduleAuto }, [scheduleAuto])

  // Entry animation + start idle pan on first slide
  useEffect(() => {
    if (!ready) return

    const wrap0 = wrapperRefs.current[0]
    const pan0 = panRefs.current[0]
    if (!wrap0 || !pan0) return

    gsap.set(wrap0, { opacity: 1, zIndex: 1 })

    // Slow rightward idle pan on active slide
    gsap.fromTo(pan0, { xPercent: 0 }, { xPercent: -2, duration: AUTO_MS / 1000, ease: 'none' })

    scheduleAuto()
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [ready, scheduleAuto])

  // Idle pan on current slide while it's active
  useEffect(() => {
    const pan = panRefs.current[current]
    if (!pan || !ready) return
    gsap.killTweensOf(pan)
    gsap.fromTo(pan, { xPercent: 0 }, { xPercent: -2, duration: AUTO_MS / 1000, ease: 'none' })
  }, [current, ready])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#111' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          ref={(el) => { wrapperRefs.current[i] = el }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
        >
          {/* Inner div scales/pans independently */}
          <div
            ref={(el) => { panRefs.current[i] = el }}
            className="absolute inset-0"
            style={{ width: '106%', left: '-3%', willChange: 'transform' }}
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
