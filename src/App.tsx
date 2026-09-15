import { FormEvent, useEffect, useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';

const programmes = [
  { label: 'Agric', value: 'AGRIC', description: 'A practical pathway for learners interested in agriculture, food systems and related sciences.' },
  { label: 'General Arts', value: 'GENERAL_ARTS', description: 'A broad humanities and social-science pathway supporting further study and professional options.' },
  { label: 'Business', value: 'BUSINESS', description: 'A business-focused pathway for learners interested in commerce, accounting and enterprise.' },
  { label: 'Home Economics', value: 'HOME_ECONOMICS', description: 'A practical pathway combining home economics, life skills and related academic study.' },
];

const levels = ['KG1', 'KG2', 'JHS1', 'JHS2', 'JHS3', 'SHS1', 'SHS2', 'SHS3'];

type TrackingResult = { trackingCode: string; levelApplied: string; programmeApplied: string; status: string; submittedAt: string; updatedAt: string; timeline: Array<{ code: string; at: string }> };

export default function App() {
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '', levelApplied: 'SHS1', programmeApplied: 'BUSINESS', guardianName: '', guardianPhone: '', previousSchool: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState('');
  const [statusResult, setStatusResult] = useState<TrackingResult | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const isShs = useMemo(() => form.levelApplied.startsWith('SHS'), [form.levelApplied]);

  useEffect(() => {
    if (!isShs) setForm((current) => ({ ...current, programmeApplied: 'NONE' }));
    if (isShs && form.programmeApplied === 'NONE') setForm((current) => ({ ...current, programmeApplied: 'BUSINESS' }));
  }, [isShs, form.programmeApplied]);

  const setField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError(null); setTrackingCode(null);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('Application submission failed');
      const result = (await response.json()) as { trackingCode: string };
      setTrackingCode(result.trackingCode); setStatusCode(result.trackingCode); document.getElementById('track')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch { setError('We could not submit the application right now. Please try again.'); } finally { setSubmitting(false); }
  }

  async function checkStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatusLoading(true); setStatusError(null); setStatusResult(null);
    try {
      const code = statusCode.trim(); if (!code) throw new Error('missing');
      const response = await fetch(`${API_BASE_URL}/applications/track/${encodeURIComponent(code)}`);
      if (!response.ok) throw new Error('not-found');
      setStatusResult(await response.json());
    } catch { setStatusError('We could not find that application. Check the tracking code and try again.'); } finally { setStatusLoading(false); }
  }

  return (
    <main className="site-shell">
      <header className="nav-wrap"><nav className="nav page-width" aria-label="Primary navigation"><a href="#top" className="brand"><span className="brand-mark">BCI</span><span><strong>Business College International</strong><small>KG · JHS · SHS · Ghana</small></span></a><div className="nav-links"><a href="#about">About</a><a href="#pathway">Education</a><a href="#programmes">Programmes</a><a href="#apply">Admissions</a><a href="#contact">Contact</a></div><a className="nav-cta" href="#apply">Apply now</a></nav></header>
      <section id="top" className="hero page-width"><div className="hero-copy"><p className="eyebrow">Business College International</p><h1>One school. A complete journey from KG to SHS.</h1><p className="lead">BCI brings early years, basic education and senior high school into one connected learning journey, with admissions and family services designed around the learner.</p><div className="actions"><a className="primary" href="#apply">Start an application</a><a className="secondary" href="#programmes">Explore SHS programmes</a></div><div className="hero-notes"><span>Structured learning</span><span>Family-connected support</span><span>Academic + practical pathways</span></div></div><aside className="hero-card"><p className="eyebrow">At a glance</p><h2>KG → JHS → SHS</h2><p>Families can apply online, receive a tracking code and follow the application journey through the same BCI admissions system used by school staff.</p><a className="text-link" href="#track">Track an application →</a></aside></section>
      <section id="about" className="section page-width split"><div><p className="eyebrow">About BCI</p><h2>A connected school experience for learners and families.</h2></div><div className="prose"><p>Business College International is structured across KG, JHS and SHS, giving families a single school community across the learner journey.</p><p>Our digital school platform is being built around the practical needs of students, guardians, teachers, staff and school leadership—from admissions and attendance to academic records, fees and communication.</p></div></section>
      <section id="pathway" className="section tinted"><div className="page-width"><p className="eyebrow">Education pathway</p><h2>Support at every stage.</h2><div className="path-grid">{[['01', 'KG', 'Early years foundation', 'A strong start focused on confidence, routine, literacy, numeracy and social development.'], ['02', 'JHS', 'Building the learner', 'A broad academic foundation preparing students for senior high school and future study.'], ['03', 'SHS', 'Pathways and preparation', 'Programme-based senior high study with academic, practical and career-focused direction.']].map(([number, label, title, body]) => <article className="path-card" key={label}><span className="step">{number}</span><span className="tag">{label}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section id="programmes" className="section page-width"><p className="eyebrow">Senior High School</p><h2>Four programme pathways.</h2><p className="section-lead">BCI offers four SHS programme families. Subject combinations and admission guidance are managed by the school and will be reflected in the connected admissions system.</p><div className="programme-grid">{programmes.map((programme, index) => <article className="programme-card" key={programme.value}><span className="programme-number">0{index + 1}</span><h3>{programme.label}</h3><p>{programme.description}</p></article>)}</div></section>
      <section id="apply" className="section page-width apply-section"><div className="apply-intro"><p className="eyebrow">Admissions</p><h2>Apply directly to BCI.</h2><p>The application enters the same authoritative admissions system used by the BCI school office. Save the tracking code you receive after submission.</p><div className="mini-list"><span>✓ Online application</span><span>✓ Application tracking</span><span>✓ School-office review</span></div></div><form className="application-form card" onSubmit={submitApplication}><div className="form-title"><h3>New application</h3><p>Tell us about the learner and a parent/guardian.</p></div><label>First name<input required value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} /></label><label>Last name<input required value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} /></label><label>Date of birth<input required type="date" value={form.dob} onChange={(e) => setField('dob', e.target.value)} /></label><label>Level<select value={form.levelApplied} onChange={(e) => setField('levelApplied', e.target.value)}>{levels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>{isShs ? <label>SHS programme<select required value={form.programmeApplied} onChange={(e) => setField('programmeApplied', e.target.value)}>{programmes.map((programme) => <option key={programme.value} value={programme.value}>{programme.label}</option>)}</select></label> : <div className="field-note"><strong>Programme</strong><span>Programme selection is used for SHS admissions. Basic-school applications are submitted without an SHS programme.</span></div>}<label>Guardian name<input required value={form.guardianName} onChange={(e) => setField('guardianName', e.target.value)} /></label><label>Guardian phone<input required type="tel" value={form.guardianPhone} onChange={(e) => setField('guardianPhone', e.target.value)} /></label><label className="full">Previous school<input value={form.previousSchool} onChange={(e) => setField('previousSchool', e.target.value)} /></label><button className="primary full" disabled={submitting}>{submitting ? 'Submitting application…' : 'Submit application'}</button>{error && <p role="alert" className="error full">{error}</p>}{trackingCode && <div className="success full"><strong>Application submitted successfully.</strong><span>Your tracking code is <code>{trackingCode}</code>. Use it in the status checker below.</span></div>}</form></section>
      <section id="track" className="section tinted"><div className="page-width tracking-layout"><div><p className="eyebrow">Application status</p><h2>Track your BCI application.</h2><p className="section-lead">Enter the tracking code you received after submitting an application.</p></div><form className="track-card card" onSubmit={checkStatus}><label>Tracking code<input value={statusCode} onChange={(e) => setStatusCode(e.target.value)} placeholder="e.g. BCI-…" required /></label><button className="primary" disabled={statusLoading}>{statusLoading ? 'Checking…' : 'Check status'}</button>{statusError && <p role="alert" className="error">{statusError}</p>}{statusResult && <div className="status-result"><strong>{statusResult.status.replaceAll('_', ' ')}</strong><span>{statusResult.levelApplied} · {statusResult.programmeApplied !== 'NONE' ? statusResult.programmeApplied.replaceAll('_', ' ') : 'Basic school'}</span><small>Submitted {new Date(statusResult.submittedAt).toLocaleDateString()}</small><div className="timeline">{statusResult.timeline.map((event, index) => <div className="timeline-item" key={`${event.code}-${event.at}-${index}`}><span>{event.code.replaceAll('_', ' ')}</span><small>{new Date(event.at).toLocaleString()}</small></div>)}</div></div>}</form></div></section>
      <section id="contact" className="section page-width split contact-section"><div><p className="eyebrow">Contact BCI</p><h2>Start the conversation.</h2></div><div className="contact-grid"><div className="contact-card"><strong>Admissions</strong><p>Use the online application above and keep your tracking code.</p><a href="#apply">Apply online →</a></div><div className="contact-card"><strong>School office</strong><p>For admission placement, student records and school administration, the BCI office manages the authoritative school portal.</p></div><div className="contact-card"><strong>Families</strong><p>Guardians can use the BCI digital platform for school communication, academic information and approved school services.</p></div></div></section>
      <footer className="footer"><div className="page-width footer-inner"><div><strong>Business College International</strong><p>KG · JHS · SHS · Ghana</p></div><div><a href="#about">About</a><a href="#programmes">Programmes</a><a href="#apply">Admissions</a><a href="#track">Track application</a></div></div></footer>
    </main>
  );
}
