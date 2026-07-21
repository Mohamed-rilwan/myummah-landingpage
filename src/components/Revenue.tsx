import { adSharing, revenueFree, revenuePaid } from '../data/content'

export function Revenue() {
  return (
    <section className="section" id="revenue">
      <div className="section-inner">
        <p className="section-kicker reveal">Revenue model</p>
        <h2 className="section-title">Free for all users, subscription for mosques</h2>
        <p className="section-lead reveal">
          Personal worship tools stay free. Mosques unlock CRM, finance, and event modules through
          subscription, with optional ad revenue sharing that can reduce fees.
        </p>

        <div className="tier-wrap">
          <div>
            <div className="tier-block free reveal">
              <h3>Always free</h3>
              <ul>
                {revenueFree.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="tier-block paid reveal">
              <h3>Mosque CRM (paid)</h3>
              <ul>
                {revenuePaid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="soft-panel reveal">
            <h3>In-app advertisement sharing</h3>
            <p>
              Model B lets mosques accept in-app ads. Ad revenue can reduce subscription to a
              minimum, and may eventually cover it entirely while creating additional income for
              the mosque.
            </p>
            <div className="share-rows">
              {adSharing.map((row) => (
                <div className="share-row" key={row.source}>
                  <span>{row.source}</span>
                  <span>{row.split}</span>
                </div>
              ))}
            </div>
            <p className="revenue-note">
              Users remain free. Mosques subscribe. Ads are optional, and designed to serve the
              community, not distract from worship.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
