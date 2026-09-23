export type FeaturedContentItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  href?: string | null;
  ctaLabel?: string | null;
  accent: 'red' | 'blue' | 'ink';
};

export const featuredContentFallback: FeaturedContentItem[] = [
  {
    id: 'diploma',
    eyebrow: 'Professional programme',
    title: 'Diploma programme',
    description: 'A focused post-secondary learning option presented through BCI for learners seeking practical, career-oriented study.',
    imageUrl: null,
    href: '#contact',
    ctaLabel: 'Ask about the programme',
    accent: 'red',
  },
  {
    id: 'taimako-leadership-institute',
    eyebrow: 'Leadership & character',
    title: 'Taimako Leadership Institute',
    description: 'A leadership-focused initiative designed to help learners build confidence, responsibility, service and practical leadership habits.',
    imageUrl: null,
    href: '#contact',
    ctaLabel: 'Explore the institute',
    accent: 'ink',
  },
  {
    id: 'remedial-programmes',
    eyebrow: 'Extra tuition',
    title: 'Remedial programmes',
    description: 'Additional tuition for students who want more guided practice, reinforcement and academic support beyond their regular lessons.',
    imageUrl: null,
    href: '#contact',
    ctaLabel: 'Ask about extra tuition',
    accent: 'blue',
  },
  {
    id: 'sponsorship',
    eyebrow: 'Community support',
    title: 'Student sponsorship',
    description: 'A sponsorship initiative supporting needy students, with part of the director’s guinea fowl sales being directed toward sponsorship.',
    imageUrl: null,
    href: '#contact',
    ctaLabel: 'Learn about sponsorship',
    accent: 'red',
  },
];

const isFeaturedItem = (value: unknown): value is FeaturedContentItem => {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.eyebrow === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    (item.imageUrl === undefined || item.imageUrl === null || typeof item.imageUrl === 'string') &&
    (item.href === undefined || item.href === null || typeof item.href === 'string') &&
    (item.ctaLabel === undefined || item.ctaLabel === null || typeof item.ctaLabel === 'string') &&
    (item.accent === 'red' || item.accent === 'blue' || item.accent === 'ink')
  );
};

const API_PATH = '/website/featured-content?placement=hero';

export async function loadFeaturedContent(signal: AbortSignal): Promise<FeaturedContentItem[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) return featuredContentFallback;

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}${API_PATH}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Featured content request failed with ${response.status}`);
  }

  const payload: unknown = await response.json();
  const items =
    Array.isArray(payload)
      ? payload
      : payload && typeof payload === 'object' && Array.isArray((payload as { items?: unknown }).items)
        ? (payload as { items: unknown[] }).items
        : [];

  const validItems = items.filter(isFeaturedItem);
  if (validItems.length === 0) throw new Error('Featured content response contained no valid items');

  return validItems.slice(0, 8);
}
