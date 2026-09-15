import { FormEvent, useState } from 'react';

const programmes = ['Agric', 'General Arts', 'Business', 'Home Economics'];
const levels = ['KG1', 'KG2', 'JHS1', 'JHS2', 'JHS3', 'SHS1', 'SHS2', 'SHS3'];

const programmeValue: Record<string, string> = {
  Agric: 'AGRIC',
  'General Arts': 'GENERAL_ARTS',
  Business: 'BUSINESS',
  'Home Economics': 'HOME_ECONOMICS',
};

export default function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    levelApplied: 'SHS1',
    programmeApplied: 'BUSINESS',
    guardianName: '',
    guardianPhone: '',
    previousSchool: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  const setField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setTrackingCode(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1'}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Application submission failed');
      const result = (await response.json()) as { trackingCode: string };
      setTrackingCode(result.trackingCode);
    } catch {
      setError('We could not submit the application right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Business College International</p>
        <h1>Learning, discipline and opportunity from KG to SHS.</h1>
        <p className="lead">BCI serves learners across KG, JHS and SHS, with a connected admissions experience for families.</p>
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
              <p>Current subject combinations and admission requirements will be published by BCI.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="section callout">
        <p className="eyebrow">Admissions</p>
        <h2>Apply directly to BCI</h2>
        <p>Applications submitted here enter the same authoritative admissions system used by the BCI mobile application.</p>

        <form id="application-form" className="application-form" onSubmit={submitApplication}>
          <label>First name<input required value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} /></label>
          <label>Last name<input required value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} /></label>
          <label>Date of birth<input required type="date" value={form.dob} onChange={(e) => setField('dob', e.target.value)} /></label>
          <label>Level<select value={form.levelApplied} onChange={(e) => setField('levelApplied', e.target.value)}>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
          <label>SHS programme<select value={form.programmeApplied} onChange={(e) => setField('programmeApplied', e.target.value)}>{programmes.map((programme) => <option key={programme} value={programmeValue[programme]}>{programme}</option>)}</select></label>
          <label>Guardian name<input required value={form.guardianName} onChange={(e) => setField('guardianName', e.target.value)} /></label>
          <label>Guardian phone<input required value={form.guardianPhone} onChange={(e) => setField('guardianPhone', e.target.value)} /></label>
          <label>Previous school<input value={form.previousSchool} onChange={(e) => setField('previousSchool', e.target.value)} /></label>
          <button className="primary" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'}</button>
        </form>

        {error && <p role="alert" className="error">{error}</p>}
        {trackingCode && (
          <div className="success">
            <strong>Application submitted.</strong>
            <p>Your BCI tracking code is:</p>
            <code>{trackingCode}</code>
            <p>Keep this code so you can check the application status later.</p>
          </div>
        )}
      </section>
    </main>
  );
}
