import { useState } from 'react'
import { team } from '../data/content'
import { assetUrl } from '../lib/assets'

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MemberPhoto({
  name,
  initials,
  photo,
}: {
  name: string
  initials: string
  photo?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!photo || failed) {
    return (
      <div className="team-avatar" aria-hidden>
        {initials}
      </div>
    )
  }

  return (
    <div className="team-avatar team-avatar-photo">
      <img
        src={assetUrl(photo)}
        alt={name}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function Team() {
  return (
    <section className="section" id="team">
      <div className="section-inner">
        <p className="section-kicker reveal">Development team</p>
        <h2 className="section-title">Balanced team with experience and youth</h2>
        <p className="section-lead reveal">
          Product, engineering, design, and strategy: building My Ummah for mosques and the
          communities they serve.
        </p>

        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name} className="team-member reveal">
              <MemberPhoto name={member.name} initials={member.initials} photo={member.photo} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a
                className="team-linkedin"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
