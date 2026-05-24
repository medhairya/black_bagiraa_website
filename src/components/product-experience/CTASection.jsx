import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { FLAVORS } from './CanModel'

export default function CTASection({ visible, currentFlavor, isMobile }) {
  const ref = useRef()
  const flavor = FLAVORS[currentFlavor] ?? FLAVORS.bagiraa

  useEffect(() => {
    if (!ref.current) return
    if (visible) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      )
    } else {
      gsap.to(ref.current, { opacity: 0, y: 30, duration: 0.5 })
    }
  }, [visible])

  return (
    <div
      ref={ref}
      className={`absolute opacity-0 z-30 pointer-events-none ${
        isMobile
          ? 'bottom-8 left-5 right-5'
          : 'bottom-14 right-12'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className={`${isMobile ? 'text-center' : 'text-right'}`}>
        <p
          className="mb-1"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: flavor.primary,
            fontWeight: 500,
          }}
        >
          {flavor.name.toUpperCase()} - 250 ml
        </p>

        <p
          className="mb-6"
          style={{
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            color: 'rgba(240,237,230,0.45)',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          {flavor.tagline}. EVERY CAN.
        </p>

        <div className={`flex gap-3 ${isMobile ? 'justify-center' : 'justify-end'}`}
          style={{ pointerEvents: visible ? 'all' : 'none' }}
        >
          <button
            className="cta-btn"
            style={{ '--flavor-primary': flavor.primary, '--flavor-glow': `rgba(${hexToRgb(flavor.primary)},0.4)` }}
            onClick={() => window.open('https://blackbagiraa.vercel.app', '_blank')}
          >
            FIND A STORE
          </button>
          <button
            className="cta-btn"
            style={{
              '--flavor-primary': flavor.primary,
              '--flavor-glow': `rgba(${hexToRgb(flavor.primary)},0.4)`,
              borderColor: 'rgba(240,237,230,0.2)',
            }}
            onClick={() => window.open('https://www.blackbagiraa.com', '_blank')}
          >
            VISIT WEBSITE
          </button>
        </div>
      </div>
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
