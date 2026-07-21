import { verses } from '../data/content'

export function Verse({ index = 0 }: { index?: number }) {
  const verse = verses[index] ?? verses[0]

  return (
    <section className="section verse-band" aria-label="Qur’anic verse">
      <div className="section-inner">
        <blockquote className="verse-panel reveal">
          <p className="verse-arabic">{verse.arabic}</p>
          <p className="verse-translation">“{verse.translation}”</p>
          <cite className="verse-ref">{verse.reference}</cite>
        </blockquote>
      </div>
    </section>
  )
}
