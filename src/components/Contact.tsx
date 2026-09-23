import { useReveal } from '../hooks/useReveal';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" data-snap-section className="section tinted contact-section">
      <div className="page reveal contact-layout" ref={ref}>
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2 className="display-2">Talk to BCI.</h2>
          <p className="section-lead">
            Reach the school office for admissions questions, programme information, placement
            enrolment and other enquiries.
          </p>

          <address className="contact-details">
            <div className="contact-detail contact-detail-wide">
              <span className="contact-detail-label">School Office</span>
              <p>
                BCI, on the Tamale – Bolgatanga Trunk Road,<br />
                Opposite Nasona Filling Station, Kanvilli, Tamale.
              </p>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Phone</span>
              <p>
                <a href="tel:+233232170716">0232170716</a>
                <span className="contact-separator">/</span>
                <a href="tel:+233200613004">0200613004</a>
              </p>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <p><a href="mailto:bizcollege@gmail.com">bizcollege@gmail.com</a></p>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Post</span>
              <p>P. O. Box TL 399, Tamale, N/R</p>
            </div>
          </address>

          <div className="contact-actions">
            <a className="btn btn-primary" href="#apply">Apply to BCI</a>
            <a className="btn btn-secondary" href="#track">Track an application</a>
          </div>
        </div>

        <div className="contact-visual">
          <ImagePlaceholder
            aspect="wide"
            caption="a map or exterior photo showing how to find the BCI campus"
          />
        </div>
      </div>
    </section>
  );
}
