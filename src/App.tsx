import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Verse } from './components/Verse'
import { Challenge } from './components/Challenge'
import { Platform } from './components/Platform'
import { Revenue } from './components/Revenue'
import { Team } from './components/Team'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import { useRevealAnimations, useSmoothScroll } from './hooks/useSmoothScroll'
import { navItems } from './data/content'

const Scene3D = lazy(() =>
  import('./components/Scene3D').then((m) => ({ default: m.Scene3D })),
)

export default function App() {
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const onProgress = useCallback((p: number) => {
    setProgress(p)
    setScrolled(p > 0.02)
  }, [])

  useSmoothScroll(onProgress)
  useRevealAnimations()

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <Suspense fallback={null}>
        <Scene3D scrollProgress={progress} theme={theme} />
      </Suspense>
      <div className="page-veil" />
      <Nav activeId={activeId} scrolled={scrolled} theme={theme} onToggleTheme={toggleTheme} />
      <main className="content-layer">
        <Hero />
        <Verse index={0} />
        <Challenge />
        <Verse index={1} />
        <Platform />
        <Revenue />
        <Team />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
