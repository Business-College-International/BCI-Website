import { useReveal } from '../hooks/useReveal';
import { school } from '../data/content';

const storySteps = [
  {
    index: '01',
    label: '2003',
    title: 'The beginning',
    body: `${school.name} was founded by ${school.founder}, beginning as a senior high school.`,
  },
  {
    index: '02',
    label: 'Growth',
    title: 'The school expands',
    body: 'As the community around BCI grew, kindergarten, primary and junior high school were added.',
  },
  {
    index: '03',
    label: 'Today',
    title: 'One continuous pathway',
    body: 'BCI now serves learners from KG through SHS within one connected school, with both direct private admissions and GES/BECE placement.',
  },
];

export function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" data-snap-section className="section about-section">
      <div className="page reveal" ref={ref}>
        <div className="about-header">
          <div>
            <p className="eyebrow">About {school.shortName}</p>
            <h2 className="display-2">A school that grew with its community.</h2>
          </div>
          <p className="about-intro">
            From a senior high school founded in {school.founded} to a full KG-to-SHS institution,
            the story of BCI is a story of building one connected educational journey.
          </p>
        </div>

        <div className="about-story">
          <div className="about-founder-card">
            <div className="about-founder-top">
              <span className="about-founder-year">{school.founded}</span>
              <span className="about-founder-mark">BCI</span>
            </div>
            <div className="about-founder-rule" aria-hidden="true">
              <span />
            </div>
            <p className="about-founder-kicker">Founded by</p>
            <h3>{school.founder}</h3>
            <p className="about-founder-copy">
              The school began at senior high school level and expanded over time into kindergarten,
              primary and junior high school.
            </p>
          </div>

          <ol className="story-timeline" aria-label="BCI story">
            {storySteps.map((step) => (
              <li className="story-item" key={step.index}>
                <div className="story-marker" aria-hidden="true">
                  <span>{step.index}</span>
                </div>
                <div className="story-content">
                  <p className="story-label">{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="about-bottom">
          <span className="chip">One school</span>
          <span className="about-bottom-line" aria-hidden="true" />
          <p>KG · Primary · JHS · SHS</p>
        </div>
      </div>
    </section>
  );
}
