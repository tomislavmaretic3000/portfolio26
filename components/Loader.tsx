'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const counter = { val: 0 }

      const tl = gsap.timeline()

      // Count 0 → 100 with progress bar
      tl.to(counter, {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate() {
          const v = Math.round(counter.val)
          if (counterRef.current) {
            counterRef.current.textContent = String(v).padStart(2, '0')
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${v / 100})`
          }
        },
      })

      // Slide the loader up off screen
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          onComplete,
        },
        '+=0.12'
      )
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* Studio name top-left */}
      <div className="flex-1 flex items-start px-8 pt-7">
        <span
          className="text-sm tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            color: 'var(--fg)',
          }}
        >
          Studio
        </span>
      </div>

      {/* Progress area bottom */}
      <div className="px-8 pb-8">
        <div className="h-px w-full overflow-hidden" style={{ background: 'var(--fg-muted)' }}>
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left"
            style={{ background: 'var(--fg)', transform: 'scaleX(0)' }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--fg-dim)' }}
          >
            Loading
          </span>
          <span
            ref={counterRef}
            className="text-xs font-mono"
            style={{ color: 'var(--fg-dim)' }}
          >
            00
          </span>
        </div>
      </div>
    </div>
  )
}
