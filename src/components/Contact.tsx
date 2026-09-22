import { useReveal } from '../hooks/useReveal';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" data-snap-section className="section tinted">
      <div className="page split reveal" ref={ref}>
        <div>
          <p className="eyebrow">Contact BCI</p>
          <h2 className="display-2">Talk to us, we can help you.</h2>
          <div className="contact-list">
            <div><strong>School office</strong><span>Address — to be added</span></div>
            <div><strong>Phone</strong><span>Phone number — to be added</span></div>
            <div><strong>Email</strong><span>Email address — to be added</span></div>
          </div>
        </div>
        <ImagePlaceholder aspect="wide" caption="a map or exterior photo showing how to find the BCI campus" />
      </div>
    </section>
  );
}
