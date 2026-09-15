const programmes = [
  'Agric',
  'General Arts',
  'Business',
  'Home Economics',
];

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Business College International</p>
        <h1>Learning, discipline and opportunity from KG to SHS.</h1>
        <p className="lead">
          BCI serves learners across KG, JHS and SHS, with a strong senior high programme structure and a connected digital admissions experience.
        </p>
        <div className="actions">
          <a className="primary" href="#apply">Apply to BCI</a>
          <a className="secondary" href="#programmes">Explore programmes</a>
        </div>
      </header>

      <section id="programmes" className="section">
        <p className="eyebrow">Senior High School</p>
        <h2>Four core programmes</h2>
        <div className="grid">
          {programmes.map((programme) => (
            <article className="card" key={programme}>
              <h3>{programme}</h3>
              <p>Programme information, subject combinations and current admission requirements will appear here.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="section callout">
        <p className="eyebrow">Admissions</p>
        <h2>Apply through the same BCI admissions system used by the mobile app.</h2>
        <p>There will be one application record regardless of whether a guardian begins on this website or in the BCI mobile app.</p>
        <a className="primary" href="#application-form">Start application</a>
      </section>
    </main>
  );
}
