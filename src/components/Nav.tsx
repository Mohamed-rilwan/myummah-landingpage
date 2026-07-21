import { useEffect, useState } from 'react'
import { brand, navItems } from '../data/content'

type NavProps = {
  activeId: string
  scrolled: boolean
}

export function Nav({ activeId, scrolled }: NavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a
        href="#home"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault()
          go('home')
        }}
      >
        <img src="/logo.png" alt="" />
        <span>
          My <em>Ummah</em>
        </span>
      </a>

      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${'cta' in item && item.cta ? 'nav-cta' : ''} ${
                activeId === item.id ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault()
                go(item.id)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <span className="sr-only">{brand.name}</span>
    </header>
  )
}
