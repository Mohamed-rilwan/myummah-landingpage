import { FormEvent, useState } from 'react'
import { brand } from '../data/content'

type FormState = {
  name: string
  email: string
  mosque: string
  city: string
  role: string
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  mosque: '',
  city: '',
  role: 'Trustee',
  message: '',
}

export function Connect() {
  const [form, setForm] = useState<FormState>(initial)
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`My Ummah — Mosque registration: ${form.mosque}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Mosque: ${form.mosque}`,
        `City: ${form.city}`,
        `Role: ${form.role}`,
        '',
        form.message,
      ].join('\n'),
    )
    window.location.href = `mailto:managoor@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="section" id="connect">
      <div className="section-inner">
        <p className="section-kicker reveal">Join the ummah</p>
        <h2 className="section-title">Register your mosque. Build community.</h2>

        <div className="connect-layout">
          <div className="connect-copy reveal">
            <p>
              Start with a simple registration. We will help you onboard your mosque, connect
              members, and bring management into the digital age — together in faith, united in
              good.
            </p>
            <div className="connect-meta">
              <div>
                <strong>{brand.company}</strong>
              </div>
              <div>{brand.owner}</div>
              <div>
                Email:{' '}
                <a href="mailto:managoor@gmail.com">managoor@gmail.com</a>
              </div>
              <div>
                Prefer a quick note? Write us and we will follow up within a few days.
              </div>
            </div>
          </div>

          <form className="form-shell reveal" onSubmit={onSubmit}>
            <h3>Mosque registration interest</h3>
            {sent && (
              <div className="form-success" role="status">
                Your mail client should open with the details filled in. If it does not, email us at
                managoor@gmail.com.
              </div>
            )}
            <div className="form-grid two">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-grid two" style={{ marginTop: '0.9rem' }}>
              <div className="field">
                <label htmlFor="mosque">Mosque name</label>
                <input
                  id="mosque"
                  required
                  value={form.mosque}
                  onChange={(e) => setForm({ ...form, mosque: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="city">City / country</label>
                <input
                  id="city"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
            </div>
            <div className="form-grid" style={{ marginTop: '0.9rem' }}>
              <div className="field">
                <label htmlFor="role">Your role</label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Trustee</option>
                  <option>Imam</option>
                  <option>Admin</option>
                  <option>Treasurer</option>
                  <option>Secretary</option>
                  <option>Community member</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your mosque and what you hope to achieve…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Connect via email
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
