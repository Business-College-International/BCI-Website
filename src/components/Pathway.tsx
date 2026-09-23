import { useReveal } from '../hooks/useReveal';
import { pathwayStages } from '../data/content';

export function Pathway() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pathway" data-snap-section className="section tinted">
      <div className="page reveal" ref={ref}>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">The pathway</p>
            <h2 className="display-2">Four stages, one continuous school life.</h2>
          </div>
          <p className="section-lead">
            From kindergarten through senior high school, learners can progress through one connected BCI journey.
          </p>
        </div>

        <ol className="pathway-list">
          {pathwayStages.map((stage) => (
            <li className="pathway-row" key={stage.tag}>
              <span className="pathway-number" aria-hidden="true">{stage.step}</span>
              <span className="pathway-tag">{stage.tag}</span>
              <div className="pathway-main">
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </div>
              <span className="pathway-mark" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
