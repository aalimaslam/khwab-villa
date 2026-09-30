import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.jpg', { eager: true });

/** Look up a photo in src/assets/images by its file name (without extension). */
export function photo(name: string): ImageMetadata {
  const file = files[`../assets/images/${name}.jpg`];
  if (!file) throw new Error(`Unknown image "${name}" — expected src/assets/images/${name}.jpg`);
  return file.default;
}

/** 1200×630 cover-cropped JPEG — the size Facebook, WhatsApp, LinkedIn and X expect for link previews. */
export async function ogImage(src: string | ImageMetadata) {
  const image = typeof src === 'string' ? photo(src) : src;
  const result = await getImage({ src: image, width: 1200, height: 630, fit: 'cover', position: 'center', format: 'jpg', quality: 80 });
  return { src: result.src, width: 1200, height: 630, type: 'image/jpeg' };
}

/** URL of an optimized single rendition, for places that need a plain URL (og:image, lightbox, sitemap). */
export async function photoUrl(src: string | ImageMetadata, width = 1200, format: 'jpg' | 'webp' = 'jpg') {
  const image = typeof src === 'string' ? photo(src) : src;
  const result = await getImage({ src: image, width: Math.min(width, image.width), format, quality: format === 'webp' ? 70 : 75 });
  return result.src;
}
