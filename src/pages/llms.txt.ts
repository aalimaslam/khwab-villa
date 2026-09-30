import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ATTRACTIONS, FACILITIES, ROOM_AMENITIES } from '../site';

export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const body = `# ${SITE.name}

> ${SITE.description}

Khwab Villa is a privately run luxury villa stay in Preng, Kangan (Ganderbal district, Jammu & Kashmir, India). It has five bedrooms, a spacious front lawn and four orchard gardens with walnut, cherry and apricot trees, a gazebo, bonfire and BBQ area, a games room with board games and a cozy library. The Sindh River is within walking distance.

## Key facts

- Location: ${SITE.address.full}
- Phone: ${SITE.phones.join(', ')}
- Email: ${SITE.email}
- Room type: Super Deluxe — from ${SITE.price} per room per night (all taxes extra)
- Room amenities: ${ROOM_AMENITIES.join(', ')}
- Property facilities: ${FACILITIES.map(([, l]) => l).join(', ')}
- Reservations: via phone, WhatsApp or the form at ${u('/contact/')}

## Nearby attractions (distance from the villa)

${ATTRACTIONS.map((a) => `- ${a.name} (${a.distance}): ${a.text}`).join('\n')}

## Pages

- [Home](${u('/')}): Overview of the villa, rooms, experiences, gallery and reservation form
- [About](${u('/about/')}): The story, heritage architecture and full facility list
- [Rooms](${u('/rooms/')}): Super Deluxe room details, amenities and pricing
- [Gallery](${u('/gallery/')}): Photos of the villa, rooms, dining and evenings
- [Attractions](${u('/attractions/')}): Places to visit near Kangan with distances
- [Contact & Reservations](${u('/contact/')}): Phone, email, map and booking enquiry form
- [Blogs](${u('/blog/')}): Kashmir travel guides and stories

## Blogs

${posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`).join('\n')}

## Optional

- [Full content for LLMs](${u('/llms-full.txt')}): all page facts and complete blog posts
- [Sitemap](${u('/sitemap.xml')})
- [RSS feed](${u('/rss.xml')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
