import { useReveal } from '../hooks/useReveal';
import { school } from '../data/content';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Hero() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="top" data-snap-section className="section hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="page hero-shell reveal" ref={ref}>
        <div className="hero-copy">
          <p className="eyebrow">{school.shortName} · {school.country} · {school.founded}</p>

          <h1 className="display-1">
            One school.<br />
            KG to SHS,<br />
            <span className="ink-outline">one journey.</span>
          </h1>

          <p className="lead">
            {school.name} carries learners from kindergarten through senior high school under one
            roof, as private candidates or through government (BECE) placement.
          </p>

          <div className="btn-row">
            <a className="btn btn-primary" href="#apply">Apply now</a>
            <a className="btn btn-secondary" href="#track">Track an application</a>
          </div>

          <div className="hero-facts" aria-label="School facts">
            <span>Founded {school.founded}</span>
            <span>KG · Primary · JHS · SHS</span>
            <span>Private &amp; GES-placed students</span>
          </div>
        </div>

        <aside className="hero-art" aria-label="BCI at a glance">
          <div className="hero-proof">
            <div className="hero-proof-top">
              <span>BCI / 01</span>
              <span>Since {school.founded}</span>
            </div>
            <div className="hero-proof-rule" aria-hidden="true">
              <span className="hero-proof-rule-red" />
              <span className="hero-proof-rule-blue" />
            </div>
            <div className="hero-proof-core">
              <span>KG</span>
              <span className="hero-proof-arrow" aria-hidden="true">→</span>
              <span>SHS</span>
            </div>
            <div className="hero-proof-bottom">
              <span className="hero-proof-index">PATHWAY</span>
              <p>One connected school journey from kindergarten through senior high school.</p>
            </div>
          </div>
        </aside>
      </div>

      <ImagePlaceholder
        className="hero-image"
        aspect="wide"
        caption="the BCI campus, wide exterior shot, daylight"
      />
    </section>
  );
}
