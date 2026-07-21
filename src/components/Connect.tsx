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

const serviceId = String(import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '').trim()
const templateId = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '').trim()
const publicKey = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '').trim()

const emailJsConfigured = Boolean(serviceId && templateId && publicKey)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
/** Digits / spaces / + ( ) - ; at least 8 digits overall */
const PHONE_RE = /^\+?[\d\s().-]{8,20}$/

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim())
}

function isValidPhone(value: string) {
  const trimmed = value.trim()
  if (!PHONE_RE.test(trimmed)) return false
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 15
}

type FieldErrors = Partial<Record<'email' | 'phone', string>>

export function Connect() {
  const [form, setForm] = useState<FormState>(initial)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!isValidEmail(form.email)) {
      next.email = 'Enter a valid email address (e.g. name@example.com).'
    }
    if (!isValidPhone(form.phone)) {
      next.phone = 'Enter a valid phone number with country code (e.g. +1 555 000 0000).'
    }
    return next
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setStatus('idle')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus('error')
      setErrorMsg('Please fix the highlighted fields and try again.')
      return
    }

    if (!emailJsConfigured) {
      setStatus('error')
      setErrorMsg(
        'Email form is not configured on this deploy. Email us directly at ' +
          CONTACT_EMAIL +
          '.',
      )
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          phone: form.phone.trim(),
          mosque: form.mosque.trim(),
          city: form.city.trim(),
          role: form.role,
          message: form.message.trim() || '(No additional message)',
          to_email: CONTACT_EMAIL,
          reply_to: form.email.trim(),
        },
        { publicKey },
      )
      setStatus('sent')
      setFieldErrors({})
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
              members, and bring management into the digital age: together in faith, united in
              good.
            </p>
            <div className="connect-meta">
              <div>
                <strong>
                  <a
                    href={brand.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brand.company}
                  </a>
                </strong>
              </div>
              <div>{brand.owner}</div>
              <div>
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                Prefer a quick note? Write us and we will follow up within a few days.
              </div>
              <div>
                Share with mosques:{' '}
                <a href={`${import.meta.env.BASE_URL}mosque-invite.html`} target="_blank" rel="noopener noreferrer">
                  Invite poster
                </a>
              </div>
            </div>
          </div>

          <form className="form-shell reveal" onSubmit={onSubmit}>
            <h3>Mosque registration interest</h3>
            {status === 'sent' && (
              <div className="form-success" role="status">
                JazakAllah khair. Your message was sent. We will get back to you soon.
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
              <div className={`field ${fieldErrors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="name@example.com"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value })
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }))
                    }
                  }}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="field-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="form-grid two" style={{ marginTop: '0.9rem' }}>
              <div className={`field ${fieldErrors.phone ? 'has-error' : ''}`}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+1 555 000 0000"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value })
                    if (fieldErrors.phone) {
                      setFieldErrors((prev) => ({ ...prev, phone: undefined }))
                    }
                  }}
                />
                {fieldErrors.phone && (
                  <p id="phone-error" className="field-error">
                    {fieldErrors.phone}
                  </p>
                )}
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
