import { challenges, objectives } from '../data/content'

export function Challenge() {
  return (
    <section className="section" id="challenge">
      <div className="section-inner">
        <p className="section-kicker reveal">The challenge</p>
        <h2 className="section-title">Why mosque engagement falls short today</h2>
        <p className="section-lead reveal">
          Community connection is fragmented. Existing tools are costly, one-way, and built only for
          those already inside the mosque walls.
        </p>

        <div className="challenge-list">
          {challenges.map((item) => (
            <article key={item.title} className="soft-panel reveal">
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="soft-panel reveal" style={{ marginTop: '2rem' }}>
          <h3>Objectives fulfilled</h3>
          <ul>
            {objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
