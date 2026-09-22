import { useEffect, useRef, useState } from 'react';
import { navLinks, school } from '../data/content';

type NavProps = {
  introComplete: boolean;
  onReplayIntro: () => void;
};

export function Nav({ introComplete, onReplayIntro }: NavProps) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) burgerRef.current?.focus();
  }, [open]);

  return (
    <header
      className={
        'nav ' +
        (solid ? 'nav-solid ' : '') +
        (open ? 'nav-open ' : '') +
        (introComplete ? 'nav-ready' : '')
      }
      aria-hidden={!introComplete}
    >
      <div className="nav-inner">
        <div className="nav-brand">
          <button
            type="button"
            className="nav-logo-button"
            onClick={onReplayIntro}
            aria-label="Replay the BCI introduction"
          >
            <img
              className="nav-logo"
              data-nav-logo-target
              src="/bci-logo.svg"
              alt=""
              aria-hidden="true"
              width="46"
              height="40"
            />
          </button>
          <a href="#top" className="nav-name">{school.shortName}</a>
        </div>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <a className="btn btn-primary btn-small nav-cta" href="#apply">Apply now</a>

        <button
          ref={burgerRef}
          className="nav-burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-navigation" className="nav-drawer" aria-hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {link.label}
          </a>
        ))}
        <a
          className="btn btn-primary"
          href="#apply"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Apply now
        </a>
      </div>
    </header>
  );
}
