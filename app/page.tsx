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
        {/* Split layout — left fills remaining space, right is always 1:1 square */}
        <div className="flex flex-1 h-full overflow-hidden" style={{ borderRadius: '16px' }}>
          {/* Left panel — fills remaining width */}
          <div className="flex-1 h-full min-w-0">
            <HeroLeft ready={ready} currentSlide={currentSlide} />
          </div>

          {/* Right panel — square based on container height */}
          <div
            className="h-full overflow-hidden flex-shrink-0"
            style={{ aspectRatio: '1 / 1', borderRadius: '16px' }}
          >
            <HeroSlideshow ready={ready} onSlideChange={setCurrentSlide} />
          </div>
        </div>
      </div>
    </>
  )
}
