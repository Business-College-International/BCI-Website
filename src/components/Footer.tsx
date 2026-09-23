import { navLinks, school } from '../data/content';

export function Footer() {
  return (
    <footer className="footer">
      <div className="page footer-inner">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/bci-logo.svg"
            alt="Business College International crest"
            width="54"
            height="46"
            loading="lazy"
          />
          <div>
            <p className="footer-school">{school.name}</p>
            <p className="footer-meta">{school.country} · Est. {school.founded}</p>
          </div>
        </div>

        <div className="footer-motto" aria-label="BCI motto">
          <span className="footer-motto-dream">Our dream.</span>
          <span>Our school.</span>
          <span className="footer-motto-future">Our future.</span>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="#apply">Apply</a>
          <a href="#track">Track</a>
        </nav>

        <p className="footer-copy">© {new Date().getFullYear()} {school.shortName}</p>
      </div>
    </footer>
  );
}
