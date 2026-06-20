import { defineConfig } from 'astro/config';

// NorCal EVs, static Astro build deployed to GitHub Pages on norcalevs.org.
export default defineConfig({
  site: 'https://norcalevs.org',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
