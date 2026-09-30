import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ATTRACTIONS, FACILITIES, ROOM_AMENITIES } from '../site';

export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const body = `# ${SITE.name} — full content

> ${SITE.description}

Source: ${u('/')}

## About

Khwab Villa, nestled in Preng, Kangan, Ganderbal district, is a luxurious retreat offering a blend of Kashmiri heritage and modern comfort. Surrounded by mountains, lush gardens and the serene Sindh River, the five-bedroom villa has a traditional wooden façade and elegantly designed interiors.

The villa features a spacious front lawn, four gardens filled with walnut, cherry and apricot trees, and a cozy library. It is equipped with Wi-Fi, air conditioning, a workstation and a music system. Guests can unwind in the gazebo, enjoy a bonfire, or have a BBQ evening outdoors. A games room with board games makes it ideal for families and groups.

## Contact & reservations

- Address: ${SITE.address.full}
- Phone: ${SITE.phones.join(', ')}
- WhatsApp: +${SITE.whatsapp}
- Email: ${SITE.email}
- Booking enquiry form: ${u('/contact/')}

## Rooms

Super Deluxe Room — from ${SITE.price} per room per night (all taxes extra).
King-size beds, air conditioning, Wi-Fi, TV and a private balcony with mountain views, plus a workstation, wardrobe, geyser, toiletries and a seating area.

Amenities: ${ROOM_AMENITIES.join(', ')}

## Facilities

${FACILITIES.map(([, l]) => `- ${l}`).join('\n')}

## Nearby attractions

${ATTRACTIONS.map((a) => `### ${a.name} (${a.distance})\n\n${a.text}`).join('\n\n')}

## Blogs

${posts
  .map(
    (p) => `---

### ${p.data.title}

URL: ${u(`/blog/${p.id}/`)}
Published: ${p.data.pubDate.toISOString().slice(0, 10)} · Category: ${p.data.category}

${p.data.description}

${(p.body ?? '').trim()}`,
  )
  .join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
