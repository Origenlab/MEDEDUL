import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export function compareBlogPosts(a: BlogPost, b: BlogPost): number {
  return a.data.title.localeCompare(b.data.title, 'es', { sensitivity: 'base' });
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(compareBlogPosts);
}
