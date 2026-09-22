import { useReveal } from '../hooks/useReveal';
import { galleryPlaceholders } from '../data/content';
import { ImagePlaceholder } from './ImagePlaceholder';

export function Gallery() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="life" data-snap-section className="section">
      <div className="page reveal" ref={ref}>
        <p className="eyebrow">Life at BCI</p>
        <h2 className="display-2">The campus, in pictures.</h2>
        <div className="gallery-grid">
          {galleryPlaceholders.map((item) => (
            <ImagePlaceholder key={item.caption} caption={item.caption} aspect="square" />
          ))}
        </div>
      </div>
    </section>
  );
}
