import { navLinks, school } from '../data/content';

export function Footer() {
  return (
    <footer className="footer">
      <div className="page footer-inner">
        <div>
          <p className="footer-motto">BCI, our dream our school our future.</p>
          <p className="footer-meta">{school.name} · Est. {school.founded} · {school.country}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="#apply">Apply</a>
          <a href="#track">Track application</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} {school.shortName}</p>
      </div>
    </footer>
  );
}
