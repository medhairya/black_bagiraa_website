import { useState, useEffect } from 'react'

export function useResponsive3D() {
  const [config, setConfig] = useState(() => getConfig())

  function getConfig() {
    const w = window.innerWidth
    const isMobile = w < 768
    const isTablet = w >= 768 && w < 1024

    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      canScale: isMobile ? 0.72 : isTablet ? 0.88 : 1.05,
      canPosition: isMobile ? [0, -0.05, 0] : [0, 0, 0],
      cameraFov: isMobile ? 55 : 42,
      cameraZ: isMobile ? 5.5 : 4.8,
      dpr: isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
      shadows: !isMobile,
      particleCount: isMobile ? 40 : 100,
    }
  }

  useEffect(() => {
    let timeout
    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => setConfig(getConfig()), 100)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [])

  return config
}
