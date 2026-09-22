import { useReveal } from '../hooks/useReveal';
import { admissionRoutes } from '../data/content';

export function Routes() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="routes" data-snap-section className="section">
      <div className="page reveal" ref={ref}>
        <p className="eyebrow">Two routes to BCI</p>
        <h2 className="display-2">Private candidate, or placed by GES. Both belong here.</h2>
        <div className="route-grid">
          {admissionRoutes.map((route) => (
            <article className="route-card" key={route.label}>
              <span className="chip chip-outline">{route.label}</span>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
              <a className="text-link" href={route.cta.href}>{route.cta.label} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
