import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind() , astroI18next()],
  markdown: {
    shikiConfig: {
      theme: 'material-theme',
    },
  },
});