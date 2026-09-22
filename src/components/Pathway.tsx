import { useReveal } from '../hooks/useReveal';
import { pathwayStages } from '../data/content';

export function Pathway() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pathway" data-snap-section className="section tinted">
      <div className="page reveal" ref={ref}>
        <p className="eyebrow">The pathway</p>
        <h2 className="display-2">Four stages, one continuous school life.</h2>
        <div className="stage-grid">
          {pathwayStages.map((stage) => (
            <article className="stage-card" key={stage.tag}>
              <span className="stage-step">{stage.step}</span>
              <span className="chip">{stage.tag}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
