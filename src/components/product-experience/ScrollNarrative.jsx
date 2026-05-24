import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { FLAVORS } from './CanModel'

const STORY_BEATS = [
  {
    phase: 0,
    headline: 'UNLEASH\nTHE BEAST',
    sub: 'A bold Black Bagiraa rush inspired by the call to unleash the beast within.',
    stat: null,
  },
  {
    phase: 1,
    headline: 'KING OF\nENERGY',
    sub: 'A premium energy drink built for focus, motion, and high-voltage days.',
    stat: { value: '250 ml', label: 'Slim Premium Can' },
  },
  {
    phase: 2,
    headline: 'BOLD\nBLACK CAN',
    sub: 'Dark, sharp, and unmistakable with the Black Bagiraa panther at the center.',
    stat: { value: 'B2 B3', label: 'Vitamin Blend' },
  },
  {
    phase: 3,
    headline: 'READY\nTO ROAR',
    sub: 'Made for the moment before action: open the can, feel the spark, move.',
    stat: { value: 'B5 B6', label: 'Energy Support' },
  },
]

export default function ScrollNarrative({ progress = 0, currentFlavor, isMobile }) {
  const containerRef = useRef()
  const cardsRef = useRef([])
  const lastBeatRef = useRef(-1)

  const beatIndex = Math.min(
    Math.floor(progress * STORY_BEATS.length),
    STORY_BEATS.length - 1
  )

  useEffect(() => {
    if (beatIndex === lastBeatRef.current) return
    lastBeatRef.current = beatIndex

    cardsRef.current.forEach((el, i) => {
      if (!el) return
      if (i !== beatIndex) {
        gsap.to(el, {
          opacity: 0,
          y: i < beatIndex ? -30 : 30,
          duration: 0.5,
          ease: 'power2.in',
        })
      }
    })

    const card = cardsRef.current[beatIndex]
    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [beatIndex])

  const flavor = FLAVORS[currentFlavor] ?? FLAVORS.bagiraa

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none"
      aria-live="polite"
    >
      <div className={`absolute ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2 flex-row' : 'right-8 top-1/2 -translate-y-1/2 flex-col'} flex gap-2 z-30`}>
        {STORY_BEATS.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-500"
            style={{
              width: i === beatIndex ? (isMobile ? '20px' : '3px') : '3px',
              height: isMobile ? '3px' : (i === beatIndex ? '20px' : '3px'),
              borderRadius: '2px',
              background: i === beatIndex ? flavor.primary : 'rgba(255,255,255,0.2)',
              boxShadow: i === beatIndex ? `0 0 8px ${flavor.primary}` : 'none',
            }}
          />
        ))}
      </div>

      {STORY_BEATS.map((beat, i) => (
        <div
          key={beat.phase}
          ref={el => cardsRef.current[i] = el}
          className={`absolute opacity-0 ${
            isMobile
              ? 'bottom-32 left-5 right-5 text-left'
              : 'bottom-16 left-12 max-w-lg'
          }`}
          style={{ willChange: 'opacity, transform' }}
        >
          <div
            className="mb-4 h-px w-12"
            style={{ background: `linear-gradient(90deg, ${flavor.primary}, transparent)` }}
          />

          <h2
            className="font-display leading-none tracking-wider mb-3"
            style={{
              fontSize: isMobile ? 'clamp(2.5rem, 10vw, 3.5rem)' : 'clamp(3rem, 5vw, 5rem)',
              color: '#F0EDE6',
              whiteSpace: 'pre-line',
            }}
          >
            {beat.headline.split('\n').map((line, li) => (
              <span key={li} style={{ display: 'block' }}>
                {li === 1 ? (
                  <span style={{ color: flavor.primary, filter: `drop-shadow(0 0 20px ${flavor.primary}60)` }}>
                    {line}
                  </span>
                ) : line}
              </span>
            ))}
          </h2>

          <p
            className="mb-4"
            style={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              color: 'rgba(240,237,230,0.6)',
              fontWeight: 300,
              maxWidth: '320px',
            }}
          >
            {beat.sub}
          </p>

          {beat.stat && (
            <div
              className="inline-flex flex-col"
              style={{ borderLeft: `2px solid ${flavor.primary}`, paddingLeft: '1rem' }}
            >
              <span
                className="font-display tracking-widest"
                style={{ fontSize: '1.8rem', color: flavor.primary }}
              >
                {beat.stat.value}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(240,237,230,0.4)', letterSpacing: '0.15em' }}>
                {beat.stat.label.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
