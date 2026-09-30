# Khwab Villa — website

Astro site for Khwab Villa, Preng, Kangan (Kashmir).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

- `src/site.ts` — contact details, price, facilities, attractions, gallery list
- `src/content/blog/*.md` — blog posts (frontmatter schema in `src/content.config.ts`)
- `src/pages/` — pages, plus `rss.xml`, `robots.txt` and `llms.txt` endpoints
- `public/images/` — photos
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt` and `/rss.xml` are generated from `src/pages/*.ts`

To add a blog post, create a new `.md` file in `src/content/blog/` with `title`, `description`,
`pubDate`, `cover`, `coverAlt`, `category` and `readingTime`. It shows up automatically on the
Blogs page, in the sitemap, RSS feed and `llms.txt`.
