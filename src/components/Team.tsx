import { team } from '../data/content'

export function Team() {
  return (
    <section className="section" id="team">
      <div className="section-inner">
        <p className="section-kicker reveal">Development team</p>
        <h2 className="section-title">Balanced team with experience and youth</h2>
        <p className="section-lead reveal">
          Product, engineering, design, and strategy — building My Ummah for mosques and the
          communities they serve.
        </p>

        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name} className="team-member reveal">
              <div className="team-avatar" aria-hidden>
                {member.initials}
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
