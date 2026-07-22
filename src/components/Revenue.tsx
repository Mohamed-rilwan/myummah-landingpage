import { revenueFree, revenuePaid, subscriptionOptions } from '../data/content'

export function Revenue() {
  return (
    <section className="section" id="revenue">
      <div className="section-inner">
        <p className="section-kicker reveal">Subscription model</p>
        <h2 className="section-title">
          Free for all users, all-inclusive single subscription for mosques
        </h2>
        <p className="section-lead reveal">
          Personal worship tools stay free. Mosques unlock CRM, finance, and event modules through an
          all-inclusive single subscription, with optional ad revenue sharing that can reduce fees and
          increase income to the mosque.
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
            <h3>Subscription options</h3>
            <div className="option-list">
              {subscriptionOptions.map((option) => (
                <div className="option-item" key={option.title}>
                  <h4>{option.title}</h4>
                  <p>{option.detail}</p>
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
