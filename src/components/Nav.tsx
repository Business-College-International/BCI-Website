import { useEffect, useState } from 'react';
import { navLinks, school } from '../data/content';

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className={'nav ' + (solid ? 'nav-solid ' : '') + (open ? 'nav-open' : '')}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-mark">BCI</span>
          <span className="nav-name">{school.shortName}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <a className="btn btn-primary btn-small nav-cta" href="#apply">Apply now</a>

        <button
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

      <div
        id="mobile-navigation"
        className="nav-drawer"
        aria-hidden={!open}
      >
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
