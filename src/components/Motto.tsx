import { useReveal } from '../hooks/useReveal';
import { motto } from '../data/content';

export function Motto() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section data-snap-section className="section motto-section" aria-label="BCI motto">
      <div className="page reveal motto-lines" ref={ref}>
        {motto.map((line, i) => (
          <p className="motto-line" key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}
