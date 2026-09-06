import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Studio',
}

export default function About() {
  return (
    <main className="min-h-screen px-8 pt-32 pb-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl">
        <p
          className="mb-16"
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
          }}
        >
          About
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: 1.05,
            color: 'var(--fg)',
            marginBottom: '3rem',
          }}
        >
          Design is intention made visible.
        </h1>

        <div
          style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'var(--fg-dim)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <p>
            I'm a designer working at the intersection of brand, motion, and digital experience.
            My practice is built around the belief that great design solves a problem before the
            audience even knows it existed.
          </p>
          <p>
            Based in [City], I collaborate with studios, startups, and cultural institutions to
            craft identities and experiences that endure. Every project starts with listening —
            and ends with something that feels inevitable.
          </p>
        </div>
      </div>
    </main>
  )
}
