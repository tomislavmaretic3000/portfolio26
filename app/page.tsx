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

      {/* Split layout — full viewport */}
      <div className="fixed inset-0 flex">
        {/* Left panel — 42% */}
        <div className="h-full" style={{ width: '42%', flexShrink: 0 }}>
          <HeroLeft ready={ready} currentSlide={currentSlide} />
        </div>

        {/* Right panel — 58% */}
        <div className="h-full" style={{ width: '58%' }}>
          <HeroSlideshow ready={ready} onSlideChange={setCurrentSlide} />
        </div>
      </div>
    </>
  )
}
