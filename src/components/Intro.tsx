import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { brandMottoLines } from '../data/content';

type IntroProps = {
  onComplete: () => void;
  onHandoff: () => void;
};

type IntroPhase = 'opening' | 'motto' | 'flight' | 'handoff';

type FlightTarget = {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
};

export function Intro({ onComplete, onHandoff }: IntroProps) {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<IntroPhase>('opening');
  const [flight, setFlight] = useState<FlightTarget | null>(null);
  const completeRef = useRef(false);

  const finish = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    document.documentElement.classList.remove('intro-active');
    document.body.classList.remove('intro-active');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const timers: number[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('intro-active');
    body.classList.add('intro-active');

    if (reducedMotion) {
      timers.push(window.setTimeout(() => {
        onHandoff();
        finish();
      }, 300));
    } else {
      timers.push(window.setTimeout(() => setPhase('motto'), 520));

      timers.push(window.setTimeout(() => {
        const target = document.querySelector<HTMLElement>('[data-nav-logo-target]');

        if (!target) {
          onHandoff();
          finish();
          return;
        }

        const targetRect = target.getBoundingClientRect();

        setFlight({
          centerX: targetRect.left + targetRect.width / 2,
          centerY: targetRect.top + targetRect.height / 2,
          width: targetRect.width,
          height: targetRect.height,
        });
        setPhase('flight');

        timers.push(window.setTimeout(() => {
          setPhase('handoff');
          onHandoff();
          timers.push(window.setTimeout(finish, 540));
        }, 960));
      }, 1900));
    }

    return () => {
      timers.forEach(window.clearTimeout);
      root.classList.remove('intro-active');
      body.classList.remove('intro-active');
    };
  }, [finish, onHandoff]);

  const flightStyle: CSSProperties | undefined = flight
    ? {
        left: flight.centerX,
        top: flight.centerY,
        width: flight.width,
        height: flight.height,
      }
    : undefined;

  return (
    <div
      className={'intro-overlay intro-phase-' + phase}
      role="status"
      aria-label="Welcome to Business College International"
    >
      <div className="intro-grid" aria-hidden="true">
        <span className="intro-grid-line intro-grid-line-x" />
        <span className="intro-grid-line intro-grid-line-y" />
      </div>

      <div ref={logoRef} className="intro-logo-stage" style={flightStyle}>
        <span className="intro-halo intro-halo-red" aria-hidden="true" />
        <span className="intro-halo intro-halo-blue" aria-hidden="true" />
        <img
          className="intro-logo"
          src="/bci-logo.svg"
          alt=""
          aria-hidden="true"
          width="224"
          height="192"
          fetchPriority="high"
        />
      </div>

      <div className="intro-wordmark">
        <p className="intro-kicker">Business College International · Tamale</p>
        <div className="intro-motto">
          {brandMottoLines.map((line, index) => (
            <span
              key={line.text}
              className={line.className}
              style={{ '--motto-delay': `${index * 110}ms` } as CSSProperties}
            >
              {line.text}
            </span>
          ))}
        </div>
        <p className="intro-est">Established 2003</p>
      </div>

      <button
        type="button"
        className="intro-skip"
        onClick={() => {
          onHandoff();
          finish();
        }}
        aria-label="Skip the BCI opening animation"
      >
        Skip intro
      </button>

      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
