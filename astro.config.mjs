// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://finical3d.co.nz',
  output: 'static',
  adapter: cloudflare(),
});