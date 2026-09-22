import { useReveal } from '../hooks/useReveal';
import { school } from '../data/content';

export function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" data-snap-section className="section">
      <div className="page split reveal" ref={ref}>
        <div>
          <p className="eyebrow">About {school.shortName}</p>
          <h2 className="display-2">Started with one class. Grew into a whole school.</h2>
        </div>
        <div className="prose">
          <p>
            {school.name} was founded in {school.founded} by {school.founder}, beginning as a
            senior high school. Over the years it grew into a full KG-to-SHS institution, adding
            kindergarten, primary and junior high school as the community around it grew.
          </p>
          <p>
            Today BCI runs both tracks side by side: private candidates who choose the school
            directly, and students placed here through Ghana's national BECE computerized school
            placement system. Same classrooms, same teachers, one school.
          </p>
        </div>
      </div>
    </section>
  );
}
