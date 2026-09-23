import { useReveal } from '../hooks/useReveal';
import { admissionRoutes } from '../data/content';

export function Routes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="routes" data-snap-section className="section routes-section">
      <div className="page reveal" ref={ref}>
        <div className="routes-heading">
          <div>
            <p className="eyebrow">Admissions</p>
            <h2 className="display-2">Two ways in. One BCI.</h2>
          </div>
          <p className="routes-intro">
            Choose the path that matches how the learner is entering BCI.
          </p>
        </div>

        <div className="route-grid">
          {admissionRoutes.map((route, index) => (
            <article className={'route-card route-card-' + (index + 1)} key={route.label}>
              <div className="route-card-top">
                <span className="route-number">0{index + 1}</span>
                <span className="chip chip-outline">{route.label}</span>
              </div>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
              <a className="route-action" href={route.cta.href}>
                <span>{route.cta.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
