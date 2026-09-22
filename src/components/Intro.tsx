import { useCallback, useEffect, useRef, useState } from 'react';

type IntroProps = {
  onComplete: () => void;
};

type IntroPhase = 'opening' | 'motto' | 'flight' | 'handoff';

const MOTTO = ['Our dream.', 'Our school.', 'Our future.'];

export function Intro({ onComplete }: IntroProps) {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<IntroPhase>('opening');
  const [flight, setFlight] = useState({ x: 0, y: 0, sx: 1, sy: 1 });
  const completeRef = useRef(false);

  const finish = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    document.documentElement.classList.remove('intro-active');
    document.body.classList.remove('intro-active');
    onComplete();
  }, [finish]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const timers: number[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('intro-active');
    body.classList.add('intro-active');

    const skip = () => finish();

    if (reducedMotion) {
      timers.push(window.setTimeout(finish, 900));
    } else {
      timers.push(window.setTimeout(() => setPhase('motto'), 520));
      timers.push(window.setTimeout(() => {
        const source = logoRef.current;
        const target = document.querySelector<HTMLElement>('[data-nav-logo-target]');

        if (!source || !target) {
          finish();
          return;
        }

        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        setFlight({
          x: targetCenterX - sourceCenterX,
          y: targetCenterY - sourceCenterY,
          sx: targetRect.width / sourceRect.width,
          sy: targetRect.height / sourceRect.height,
        });
        setPhase('flight');

        timers.push(window.setTimeout(() => setPhase('handoff'), 920));
        timers.push(window.setTimeout(finish, 1450));
      }, 1900));
    }

    window.addEventListener('intro:skip', skip);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('intro:skip', skip);
      root.classList.remove('intro-active');
      body.classList.remove('intro-active');
    };
  }, [onComplete]);

  return (
    <div className={'intro-overlay intro-phase-' + phase} role="status" aria-label="Welcome to Business College International">
      <div className="intro-grid" aria-hidden="true">
        <span className="intro-grid-line intro-grid-line-x" />
        <span className="intro-grid-line intro-grid-line-y" />
      </div>

      <div
        ref={logoRef}
        className="intro-logo-stage"
        style={
          {
            '--intro-x': `${flight.x}px`,
            '--intro-y': `${flight.y}px`,
            '--intro-sx': flight.sx,
            '--intro-sy': flight.sy,
          } as React.CSSProperties
        }
      >
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
          {MOTTO.map((line, index) => (
            <span
              key={line}
              style={{ '--motto-delay': `${index * 110}ms` } as React.CSSProperties}
            >
              {line}
            </span>
          ))}
        </div>
        <p className="intro-est">Established {2003}</p>
      </div>

      <button
        type="button"
        className="intro-skip"
        onClick={finish}
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
