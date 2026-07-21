import { brand } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">
            My <em>Ummah</em>
          </p>
          <p className="footer-tag">{brand.tagline}</p>
        </div>
        <p className="footer-copy">
          © {year} {brand.company}
          <br />
          Linking community with the mosque
        </p>
      </div>
    </footer>
  )
}
