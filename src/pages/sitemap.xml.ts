import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { GALLERY } from '../site';
import { photoUrl } from '../lib/images';

const PAGES: { path: string; changefreq: string; priority: string; images?: string[] }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0', images: ['night-view', 'front-view-1', 'drone-night'] },
  { path: '/rooms/', changefreq: 'monthly', priority: '0.9', images: ['bedroom-1', 'bedroom-6', 'living-room'] },
  { path: '/contact/', changefreq: 'monthly', priority: '0.9' },
  { path: '/about/', changefreq: 'monthly', priority: '0.8', images: ['front-view-2', 'blossom-view'] },
  { path: '/gallery/', changefreq: 'monthly', priority: '0.8', images: GALLERY.map((g) => g.src) },
  { path: '/attractions/', changefreq: 'monthly', priority: '0.8', images: ['drone-valley'] },
  { path: '/blog/', changefreq: 'weekly', priority: '0.7' },
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const today = new Date().toISOString().slice(0, 10);
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const imgs = async (names: string[] = []) => Promise.all(names.map((n) => photoUrl(n, 1200, 'jpg')));

  const entry = (loc: string, lastmod: string, changefreq: string, priority: string, images: string[] = []) =>
    `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${images.map((i) => `\n    <image:image><image:loc>${esc(u(i))}</image:loc></image:image>`).join('')}
  </url>`;

  const urls = [
    ...(await Promise.all(PAGES.map(async (p) => entry(u(p.path), today, p.changefreq, p.priority, await imgs(p.images))))),
    ...(await Promise.all(posts.map(async (p) =>
      entry(
        u(`/blog/${p.id}/`),
        (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10),
        'monthly',
        '0.6',
        [await photoUrl(p.data.cover, 1200, 'jpg')],
      ),
    ))),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
