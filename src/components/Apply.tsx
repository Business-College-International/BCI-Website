import { FormEvent, useEffect, useMemo, useState } from 'react';
import { levels, programmes } from '../data/content';
import { useReveal } from '../hooks/useReveal';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const API_BASE_URL = configuredApiBaseUrl || (import.meta.env.PROD ? null : 'http://localhost:3000/api/v1');

function formatLevel(level: string) {
  const match = level.match(/^(KG|P|JHS|SHS)(\d)$/);
  if (!match) return level;
  const [, prefix, number] = match;
  return prefix === 'P' ? 'Primary ' + number : prefix + ' ' + number;
}

export function Apply() {
  const ref = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', levelApplied: 'SHS1', programmeApplied: 'BUSINESS',
    guardianName: '', guardianPhone: '', previousSchool: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const isShs = useMemo(() => form.levelApplied.startsWith('SHS'), [form.levelApplied]);

  useEffect(() => {
    if (!isShs) setForm((current) => ({ ...current, programmeApplied: 'NONE' }));
    if (isShs && form.programmeApplied === 'NONE') {
      setForm((current) => ({ ...current, programmeApplied: 'BUSINESS' }));
    }
  }, [isShs, form.programmeApplied]);

  const setField = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setTrackingCode(null);

    try {
      if (!API_BASE_URL) throw new Error('website-api-not-configured');

      const response = await fetch(API_BASE_URL + '/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Application submission failed');

      const result = (await response.json()) as { trackingCode: string };
      setTrackingCode(result.trackingCode);
      document.getElementById('track')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'website-api-not-configured'
          ? 'Admissions are temporarily unavailable because the website API is not configured.'
          : 'We could not submit the application right now. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="apply" data-snap-section className="section tinted apply-section">
      <div className="page split reveal" ref={ref}>
        <div className="apply-intro">
          <p className="eyebrow">Admissions</p>
          <h2 className="display-2">Apply as a private candidate.</h2>
          <p>
            Placed by GES instead? See <a href="#routes">the two routes to BCI</a> — placement
            students enrol through the school office, not this form.
          </p>
        </div>

        <form className="card application-form" onSubmit={submitApplication}>
          <div className="form-title">
            <h3>New application</h3>
            <p>Tell us about the learner and a parent or guardian.</p>
          </div>

          <label>
            First name
            <input
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => setField('firstName', e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => setField('lastName', e.target.value)}
            />
          </label>
          <label>
            Date of birth
            <input
              required
              type="date"
              value={form.dob}
              onChange={(e) => setField('dob', e.target.value)}
            />
          </label>
          <label>
            Level
            <select value={form.levelApplied} onChange={(e) => setField('levelApplied', e.target.value)}>
              {levels.map((level) => (
                <option key={level} value={level}>{formatLevel(level)}</option>
              ))}
            </select>
          </label>

          {isShs ? (
            <label>
              SHS programme
              <select
                required
                value={form.programmeApplied}
                onChange={(e) => setField('programmeApplied', e.target.value)}
              >
                {programmes.map((programme) => (
                  <option key={programme.value} value={programme.value}>{programme.label}</option>
                ))}
              </select>
            </label>
          ) : (
            <div className="field-note">
              <strong>Programme</strong>
              <span>Programme selection applies to SHS admissions only.</span>
            </div>
          )}

          <label>
            Guardian name
            <input
              required
              autoComplete="name"
              value={form.guardianName}
              onChange={(e) => setField('guardianName', e.target.value)}
            />
          </label>
          <label>
            Guardian phone
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.guardianPhone}
              onChange={(e) => setField('guardianPhone', e.target.value)}
            />
          </label>
          <label className="full">
            Previous school
            <input
              autoComplete="organization"
              value={form.previousSchool}
              onChange={(e) => setField('previousSchool', e.target.value)}
            />
          </label>

          <button className="btn btn-primary full" type="submit" disabled={submitting}>
            {submitting ? 'Submitting application…' : 'Submit application'}
          </button>

          {error && (
            <p role="alert" aria-live="assertive" className="form-error full">{error}</p>
          )}
          {trackingCode && (
            <div className="form-success full" role="status" aria-live="polite">
              <strong>Application submitted.</strong>
              <span>Your tracking code is <code>{trackingCode}</code>. Use it below to follow its status.</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
