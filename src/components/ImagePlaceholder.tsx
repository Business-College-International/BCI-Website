type ImagePlaceholderProps = {
  caption: string;
  aspect?: 'square' | 'wide' | 'tall';
  className?: string;
};

export function ImagePlaceholder({ caption, aspect = 'wide', className = '' }: ImagePlaceholderProps) {
  return (
    <div
      className={'placeholder placeholder-' + aspect + (className ? ' ' + className : '')}
      role="img"
      aria-label={caption}
    >
      <span className="placeholder-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="3" y="4" width="18" height="16" rx="2.2" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="M21 16l-5.2-5.2a1.6 1.6 0 0 0-2.26 0L4 20" />
        </svg>
      </span>
      <span className="placeholder-kicker">Photography slot</span>
      <span className="placeholder-caption">{caption}</span>
    </div>
  );
}
