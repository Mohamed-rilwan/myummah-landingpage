import { FormEvent, useState } from 'react'
import emailjs from '@emailjs/browser'
import { brand } from '../data/content'

type FormState = {
  name: string
  email: string
  phone: string
  mosque: string
  city: string
  role: string
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  mosque: '',
  city: '',
  role: 'Trustee',
  message: '',
}

const CONTACT_EMAIL = 'managoor@gmail.com'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

const emailJsConfigured = Boolean(serviceId && templateId && publicKey)

export function Connect() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!emailJsConfigured) {
      setStatus('error')
      setErrorMsg(
        'EmailJS is not configured yet. Add your keys to .env, or email us directly at ' +
          CONTACT_EMAIL +
          '.',
      )
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        serviceId!,
        templateId!,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone.trim() || 'Not provided',
          mosque: form.mosque,
          city: form.city,
          role: form.role,
          message: form.message || '(No additional message)',
          to_email: CONTACT_EMAIL,
          reply_to: form.email,
        },
        { publicKey: publicKey! },
      )
      setStatus('sent')
      setForm(initial)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrorMsg(
        `Could not send the message. Please try again or email ${CONTACT_EMAIL} directly.`,
      )
    }
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
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                Prefer a quick note? Write us and we will follow up within a few days.
              </div>
            </div>
          </div>

          <form className="form-shell reveal" onSubmit={onSubmit}>
            <h3>Mosque registration interest</h3>
            {status === 'sent' && (
              <div className="form-success" role="status">
                JazakAllah khair — your message was sent. We will get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-error" role="alert">
                {errorMsg}
              </div>
            )}
            <div className="form-grid two">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-grid two" style={{ marginTop: '0.9rem' }}>
              <div className="field">
                <label htmlFor="phone">
                  Phone <span className="field-optional">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="role">Your role</label>
                <select
                  id="role"
                  name="role"
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
            </div>
            <div className="form-grid two" style={{ marginTop: '0.9rem' }}>
              <div className="field">
                <label htmlFor="mosque">Mosque name</label>
                <input
                  id="mosque"
                  name="mosque"
                  required
                  value={form.mosque}
                  onChange={(e) => setForm({ ...form, mosque: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="city">City / country</label>
                <input
                  id="city"
                  name="city"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
            </div>
            <div className="form-grid" style={{ marginTop: '0.9rem' }}>
              <div className="field">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your mosque and what you hope to achieve…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send registration'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
