import { useReveal } from '../hooks/useReveal';
import { school } from '../data/content';
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

          <div className="contact-list">
            <div>
              <strong>School office</strong>
              <span>Address — to be added</span>
            </div>
            <div>
              <strong>Phone</strong>
              <span>Phone number — to be added</span>
            </div>
            <div>
              <strong>Email</strong>
              <span>Email address — to be added</span>
            </div>
          </div>

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
          <p className="contact-visual-note">
            Campus location and official contact details can be added from the school website portal.
          </p>
        </div>
      </div>
    </section>
  );
}
