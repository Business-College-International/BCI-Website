import { FormEvent, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const API_BASE_URL = configuredApiBaseUrl || (import.meta.env.PROD ? null : 'http://localhost:3000/api/v1');
const REQUEST_TIMEOUT_MS = 10000;

type TrackingResult = {
  trackingCode: string;
  levelApplied: string;
  programmeApplied: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  timeline: Array<{ code: string; at: string }>;
};

function formatLevel(level: string) {
  const match = level.match(/^(KG|P|JHS|SHS)(\d)$/);
  if (!match) return level;
  const [, prefix, number] = match;
  return prefix === 'P' ? 'Primary ' + number : prefix + ' ' + number;
}

function formatProgramme(programme: string) {
  return programme === 'NONE' ? 'Basic school' : programme.replaceAll('_', ' ');
}

export function Track() {
  const ref = useReveal<HTMLDivElement>();
  const [statusCode, setStatusCode] = useState('');
  const [statusResult, setStatusResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setStatusResult(null);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      if (!API_BASE_URL) throw new Error('website-api-not-configured');
      const code = statusCode.trim().toUpperCase();
      if (!code) throw new Error('missing');

      const response = await fetch(
        API_BASE_URL + '/applications/track/' + encodeURIComponent(code),
        { signal: controller.signal },
      );
      if (!response.ok) throw new Error('not-found');

      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== 'object' ||
        typeof (result as Record<string, unknown>).trackingCode !== 'string' ||
        typeof (result as Record<string, unknown>).status !== 'string' ||
        !Array.isArray((result as Record<string, unknown>).timeline)
      ) {
        throw new Error('invalid-response');
      }

      setStatusResult(result as TrackingResult);
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'website-api-not-configured'
          ? 'Application tracking is temporarily unavailable because the website API is not configured.'
          : err instanceof DOMException && err.name === 'AbortError'
          ? 'Application tracking timed out. Please try again.'
          : 'We could not find that application. Check the tracking code and try again.',
      );
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <section id="track" data-snap-section className="section">
      <div className="page split reveal" ref={ref}>
        <div>
          <p className="eyebrow">Application status</p>
          <h2 className="display-2">Track your application.</h2>
          <p>Enter the tracking code you received after submitting an application.</p>
        </div>

        <form className="card track-form" onSubmit={checkStatus}>
          <label>
            Tracking code
            <input
              value={statusCode}
              onChange={(e) => setStatusCode(e.target.value)}
              placeholder="e.g. BCI-2026-0001"
              autoCapitalize="characters"
              spellCheck={false}
              autoComplete="off"
              maxLength={40}
              required
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Check status'}
          </button>
          {error && <p role="alert" aria-live="assertive" className="form-error">{error}</p>}
          {statusResult && (
            <div className="status-result" role="status" aria-live="polite">
              <strong>{statusResult.status.replaceAll('_', ' ')}</strong>
              <span>{formatLevel(statusResult.levelApplied)} · {formatProgramme(statusResult.programmeApplied)}</span>
              <small>
                Submitted {new Date(statusResult.submittedAt).toLocaleDateString()} · Updated {new Date(statusResult.updatedAt).toLocaleDateString()}
              </small>
              <div className="timeline">
                {statusResult.timeline.map((event, index) => (
                  <div className="timeline-item" key={event.code + '-' + event.at + '-' + index}>
                    <span>{event.code.replaceAll('_', ' ')}</span>
                    <small>{new Date(event.at).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
