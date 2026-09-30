import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = `# robots.txt for Khwab Villa
User-agent: *
Allow: /
Disallow: /404

# AI crawlers are welcome — see llms.txt for a structured summary
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${new URL('sitemap.xml', site).href}

# LLM-friendly summary: ${new URL('llms.txt', site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
