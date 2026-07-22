import { useEffect, useId, useState } from 'react'
import { brand, navItems } from '../data/content'
import { assetUrl } from '../lib/assets'

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

type NavProps = {
  activeId: string
  scrolled: boolean
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Nav({ activeId, scrolled, theme, onToggleTheme }: NavProps) {
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

      <div className="nav-actions">
        <button
          type="button"
          className={`theme-switch ${theme === 'dark' ? 'is-dark' : ''}`}
          onClick={onToggleTheme}
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label="Toggle dark mode"
          title={theme === 'dark' ? 'Dark mode' : 'Light mode'}
        >
          <span className="theme-switch-track">
            <SunIcon />
            <MoonIcon />
          </span>
          <span className="theme-switch-thumb" />
        </button>
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
      </div>

      <span className="sr-only">{brand.name}</span>
    </header>
  )
}
