import { useEffect, useId, useState } from 'react'
import { brand, navItems } from '../data/content'
import { assetUrl } from '../lib/assets'

type NavProps = {
  activeId: string
  scrolled: boolean
}

export function Nav({ activeId, scrolled }: NavProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // Let the menu close paint before scrolling
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <header className={`site-nav ${scrolled || open ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <a
        href="#home"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault()
          go('home')
        }}
      >
        <img src={assetUrl('logo.png')} alt="" />
        <span>
          My <em>Ummah</em>
        </span>
      </a>

      <button
        type="button"
        className={`nav-toggle ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`nav-backdrop ${open ? 'open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <nav id={menuId} className={`nav-drawer ${open ? 'open' : ''}`} aria-label="Primary">
        <ul className="nav-links">
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
      </nav>

      <span className="sr-only">{brand.name}</span>
    </header>
  )
}
