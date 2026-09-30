// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://khwabvilla.com',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
});
