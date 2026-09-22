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
          <div className="hero-identity">
            <img
              className="hero-logo"
              src="/bci-logo.svg"
              alt="Business College International crest"
              width="72"
              height="64"
            />
            <div>
              <p className="hero-identity-name">{school.name}</p>
              <p className="hero-identity-meta">Tamale, Ghana · Est. {school.founded}</p>
            </div>
          </div>

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

        <aside className="hero-art" aria-label="BCI school identity">
          <div className="hero-art-frame">
            <div className="hero-art-top">
              <span>Business College International</span>
              <span>Tamale</span>
            </div>
            <div className="hero-art-rule" aria-hidden="true">
              <span className="hero-art-rule-red" />
              <span className="hero-art-rule-blue" />
            </div>
            <img
              className="hero-art-logo"
              src="/bci-logo.svg"
              alt=""
              aria-hidden="true"
              width="420"
              height="420"
              fetchPriority="high"
            />
            <div className="hero-art-bottom">
              <span className="hero-art-index">BCI / 01</span>
              <p>
                From our collective weakness, we derive our individual strength.
              </p>
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
