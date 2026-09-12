'use client'

import { useState } from 'react'
import Loader from '@/components/Loader'
import HeroSlideshow from '@/components/HeroSlideshow'
import HeroLeft from '@/components/HeroLeft'

export default function Home() {
  const [ready, setReady] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <>
      <Loader onComplete={() => setReady(true)} />

      {/* Outer padding frame */}
      <div className="fixed inset-0 flex" style={{ padding: '48px' }}>
        {/* Split layout fills padded area */}
        <div className="flex flex-1 h-full overflow-hidden" style={{ borderRadius: '16px' }}>
          {/* Left panel — 42% */}
          <div className="h-full" style={{ width: '42%', flexShrink: 0 }}>
            <HeroLeft ready={ready} currentSlide={currentSlide} />
          </div>

          {/* Right panel — 58%, rounded corners inherited from parent clip */}
          <div className="h-full overflow-hidden" style={{ width: '58%', borderRadius: '16px' }}>
            <HeroSlideshow ready={ready} onSlideChange={setCurrentSlide} />
          </div>
        </div>
      </div>
    </>
  )
}
