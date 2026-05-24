import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FLAVORS } from './CanModel'

export default function FlavorController({ currentFlavor }) {
  const prevFlavor = useRef(currentFlavor)
  const flavor = FLAVORS[currentFlavor] ?? FLAVORS.bagiraa

  useEffect(() => {
    prevFlavor.current = currentFlavor

    gsap.to(document.documentElement, {
      duration: 0,
      onComplete: () => {
        document.body.classList.remove('flavor-bagiraa', 'flavor-beast', 'flavor-mango', 'flavor-berry')
        document.body.classList.add(flavor.bodyClass)
      }
    })

    const root = document.documentElement
    gsap.to({}, {
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        root.style.setProperty('--flavor-primary', flavor.primary)
        root.style.setProperty('--flavor-glow', `rgba(${hexToRgb(flavor.primary)},0.35)`)
        root.style.setProperty('--flavor-bg-start', flavor.labelTop)
      }
    })
  }, [currentFlavor, flavor])

  return (
    <div className="flex items-center gap-2">
      {flavor.highlights.map((item) => (
        <span
          key={item}
          className="flavor-pill active"
          aria-label={item}
        >
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
            style={{ backgroundColor: flavor.primary, boxShadow: `0 0 6px ${flavor.primary}` }}
          />
          {item}
        </span>
      ))}
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
