import { useEffect, useRef, useState } from 'react';

type IntroProps = {
  onComplete: () => void;
};

const INTRO_MOTTO = ['Our dream.', 'Our school.', 'Our future.'];

export function Intro({ onComplete }: IntroProps) {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [mottoVisible, setMottoVisible] = useState(false);
  const [flying, setFlying] = useState(false);
  const [flightStyle, setFlightStyle] = useState<React.CSSProperties>({});
  const completedRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];

    root.classList.add('intro-active');
    body.classList.add('intro-active');

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      root.classList.remove('intro-active');
      body.classList.remove('intro-active');
      onComplete();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish();
      } else if (event.key === 'Tab') {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (reduced) {
      timers.push(window.setTimeout(finish, 650));
      return () => {
        timers.forEach(window.clearTimeout);
        document.removeEventListener('keydown', handleKeyDown);
        root.classList.remove('intro-active');
        body.classList.remove('intro-active');
      };
    }

    timers.push(window.setTimeout(() => setMottoVisible(true), 720));
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
      const scale = targetRect.width / sourceRect.width;
      const dx = targetCenterX - sourceCenterX;
      const dy = targetCenterY - sourceCenterY;

      setFlightStyle({
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
      });
      requestAnimationFrame(() => setFlying(true));
      timers.push(window.setTimeout(finish, 980));
    }, 2200));

    return () => {
      timers.forEach(window.clearTimeout);
      document.removeEventListener('keydown', handleKeyDown);
      root.classList.remove('intro-active');
      body.classList.remove('intro-active');
    };
  }, [onComplete]);

  return (
    <div className="intro-overlay" role="status" aria-label="Welcome to Business College International">
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-center">
        <div
          ref={logoRef}
          className={'intro-logo-stage' + (flying ? ' intro-logo-flying' : '')}
          style={flightStyle}
        >
          <span className="intro-ring intro-ring-red" aria-hidden="true" />
          <span className="intro-ring intro-ring-blue" aria-hidden="true" />
          <img
            className="intro-logo"
            src="/bci-logo.svg"
            alt=""
            aria-hidden="true"
            width="220"
            height="188"
          />
        </div>

        <div className={'intro-copy' + (mottoVisible ? ' intro-copy-visible' : '')}>
          <p className="intro-kicker">Business College International · Tamale</p>
          <div className="intro-motto" aria-hidden="true">
            {INTRO_MOTTO.map((line, index) => (
              <span key={line} style={{ '--intro-delay': `${index * 90}ms` } as React.CSSProperties}>
                {line}
              </span>
            ))}
          </div>
          <p className="intro-year">Established {2003}</p>
        </div>
      </div>

      <div className="intro-progress" aria-hidden="true">
        <span />
      </div>

      <p className="intro-skip-hint">Press Esc to skip intro</p>
    </div>
  );
}
