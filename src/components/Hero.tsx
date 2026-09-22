import { useReveal } from '../hooks/useReveal';
import { school } from '../data/content';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Hero() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="top" data-snap-section className="section hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="page reveal" ref={ref}>
        <p className="eyebrow">{school.shortName} · Est. {school.founded} · {school.country}</p>
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
      <ImagePlaceholder
        className="hero-image"
        aspect="wide"
        caption="the BCI campus, wide exterior shot, daylight"
      />
    </section>
  );
}
