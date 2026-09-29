// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { site } from './src/data/site.ts';

export default defineConfig({
  site: site.url,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  // Tek sayfalık site: CSS'i sayfaya gömmek, açılışı bekleten ayrı CSS isteğini kaldırır.
  build: { inlineStylesheets: 'always' },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  i18n: {
    locales: ['tr', 'en', 'es'],
    defaultLocale: 'tr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en', es: 'es' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Üst klasörlerdeki başka projelere ait PostCSS ayarlarının okunmasını engeller.
    css: { postcss: {} },
  },
});
