import { useReveal } from '../hooks/useReveal';
import { programmes } from '../data/content';

export function Programmes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="programmes" data-snap-section className="section tinted">
      <div className="page reveal" ref={ref}>
        <p className="eyebrow">Senior High School</p>
        <h2 className="display-2">Four programme pathways.</h2>
        <p className="section-lead">
          Subject combinations and electives for each programme are confirmed with the school
          office during admissions.
        </p>
        <div className="programme-grid">
          {programmes.map((programme, index) => (
            <article className="programme-card" key={programme.value}>
              <span className="stage-step">0{index + 1}</span>
              <h3>{programme.label}</h3>
              <p>{programme.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
