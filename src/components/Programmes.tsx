import { useReveal } from '../hooks/useReveal';
import { programmes } from '../data/content';

export function Programmes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="programmes" data-snap-section className="section programme-section">
      <div className="page reveal" ref={ref}>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Senior High School</p>
            <h2 className="display-2">Choose a programme.</h2>
          </div>
          <p className="section-lead">
            Subject combinations and electives are confirmed with the school office during admissions.
          </p>
        </div>

        <div className="programme-list" role="list">
          {programmes.map((programme, index) => (
            <article className="programme-row" key={programme.value} role="listitem">
              <span className="programme-number" aria-hidden="true">0{index + 1}</span>
              <div className="programme-name">
                <h3>{programme.label}</h3>
                <span>{programme.value.replaceAll('_', ' ')}</span>
              </div>
              <p>{programme.description}</p>
              <span className="programme-mark" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
