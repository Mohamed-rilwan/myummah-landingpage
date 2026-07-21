import { platformPillars } from '../data/content'

export function Platform() {
  return (
    <section className="section" id="platform">
      <div className="section-inner">
        <p className="section-kicker reveal">The work</p>
        <h2 className="section-title">One platform, three tailored experiences</h2>
        <p className="section-lead reveal">
          An integrated mobile and web platform for religious interaction, financial governance, and
          social activity management — with multi-tenant data segregation for every mosque.
        </p>

        <div className="feature-columns">
          {platformPillars.map((pillar) => (
            <div key={pillar.title} className="feature-col reveal">
              <h3>{pillar.title}</h3>
              <p className="audience">{pillar.audience}</p>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
