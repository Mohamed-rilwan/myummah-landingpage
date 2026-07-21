import { brand } from '../data/content'

export function Hero() {
  return (
    <section className="section hero" id="home">
      <div className="section-inner">
        <h1 className="hero-brand reveal">
          <span className="my">My</span>
          <span className="ummah">Ummah</span>
        </h1>
        <p className="hero-arabic reveal">{brand.arabic}</p>
        <p className="hero-tagline reveal">{brand.tagline}</p>
        <p className="hero-sub reveal">{brand.subtitle}</p>
        <div className="cta-row reveal">
          <a className="btn btn-primary" href="#connect">
            Register your mosque
          </a>
          <a className="btn btn-ghost" href="#platform">
            Explore the platform
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden>
        <div className="line" />
      </div>
    </section>
  )
}
