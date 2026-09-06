import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Studio',
}

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Strategy, visual identity, typography, colour systems, and brand guidelines. From naming to full rollout.',
  },
  {
    num: '02',
    title: 'Digital Design',
    desc: 'Website design, digital product interfaces, design systems, and interactive experiences.',
  },
  {
    num: '03',
    title: 'Motion & Film',
    desc: 'Title sequences, animated identities, social content, and short-form film direction.',
  },
  {
    num: '04',
    title: 'Print & Packaging',
    desc: 'Editorial design, packaging, wayfinding, and printed matter that holds its own in the physical world.',
  },
]

export default function Services() {
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
        Services
      </p>

      <div className="divide-y" style={{ borderColor: 'var(--fg-muted)' }}>
        {services.map((s) => (
          <div
            key={s.num}
            className="py-10 flex flex-col gap-4 md:flex-row md:items-start md:gap-16"
          >
            <span
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--fg-muted)',
                fontVariantNumeric: 'tabular-nums',
                flexShrink: 0,
                paddingTop: '0.35rem',
              }}
            >
              {s.num}
            </span>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'var(--fg)',
                  marginBottom: '0.75rem',
                }}
              >
                {s.title}
              </h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--fg-dim)' }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
