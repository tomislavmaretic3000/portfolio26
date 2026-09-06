import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Studio',
}

export default function Contact() {
  return (
    <main className="min-h-screen px-8 pt-32 pb-24" style={{ background: 'var(--bg)' }}>
      <p
        className="mb-16"
        style={{
          fontSize: '0.6875rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--fg-dim)',
        }}
      >
        Contact
      </p>

      <div className="max-w-xl">
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
          Let&apos;s make something worth making.
        </h1>

        <div className="flex flex-col gap-6" style={{ fontSize: '0.9375rem' }}>
          <div>
            <p
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
                color: 'var(--fg-muted)',
              }}
            >
              Email
            </p>
            <a href="mailto:hello@studio.com" className="link-hover">
              hello@studio.com
            </a>
          </div>

          <div>
            <p
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
                color: 'var(--fg-muted)',
              }}
            >
              Based in
            </p>
            <p style={{ color: 'var(--fg-dim)' }}>Your City, Country</p>
          </div>

          <div>
            <p
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
                color: 'var(--fg-muted)',
              }}
            >
              Social
            </p>
            <div className="flex gap-6">
              <a href="#" className="link-hover">
                Instagram
              </a>
              <a href="#" className="link-hover">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
