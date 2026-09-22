import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { brandMottoLines, school } from '../data/content';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Hero({ introComplete }: { introComplete: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  const [activeLine, setActiveLine] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [mottoDone, setMottoDone] = useState(false);

  useEffect(() => {
    setActiveLine(0);
    setCharCount(0);
    setMottoDone(false);
    if (!introComplete) return;

    let cancelled = false;
    let line = 0;
    let char = 0;
    let timer = 0;

    const type = () => {
      if (cancelled) return;
      const current = brandMottoLines[line].text;

      if (char < current.length) {
        char += 1;
        setCharCount(char);
        timer = window.setTimeout(type, 54);
        return;
      }

      if (line < brandMottoLines.length - 1) {
        timer = window.setTimeout(() => {
          if (cancelled) return;
          line += 1;
          char = 0;
          setActiveLine(line);
          setCharCount(0);
          timer = window.setTimeout(type, 90);
        }, 820);
      } else {
        timer = window.setTimeout(() => {
          if (!cancelled) setMottoDone(true);
        }, 900);
      }
    };

    timer = window.setTimeout(type, 260);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [introComplete]);

  return (
    <section id="top" data-snap-section className="section hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="page hero-shell reveal" ref={ref}>
        <div className="hero-copy">
          <p className="eyebrow">{school.shortName} · {school.country} · {school.founded}</p>

          <h1
            className="hero-motto"
            aria-label={brandMottoLines.map((line) => line.text).join(' ')}
          >
            {brandMottoLines.map((line, index) => {
              const visibleText =
                index < activeLine
                  ? line.text
                  : index === activeLine
                    ? line.text.slice(0, charCount)
                    : '';

              const cursorVisible = index === activeLine && !mottoDone;

              return (
                <span key={line.text} className={'hero-motto-line ' + line.className}>
                  <span aria-hidden="true">{visibleText}</span>
                  {index === activeLine && (
                    <span
                      className={'hero-motto-cursor' + (cursorVisible ? '' : ' hero-motto-cursor-hidden')}
                      aria-hidden="true"
                    />
                  )}
                </span>
              );
            })}
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
