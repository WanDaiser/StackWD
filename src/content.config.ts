/**
 * Vaka çalışmaları. Her dil kendi klasöründe: src/content/work/{tr,en,es}/<slug>.md
 * Aynı proje her dilde aynı dosya adını (slug) kullanır.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      /** Gerçek müşteri adı. Konsept çalışmada boş bırakılır. */
      client: z.string().optional(),
      /** Gerçek müşteri işi değilse true. Kartta ve sayfada "Konsept çalışma" etiketi görünür. */
      concept: z.boolean().default(false),
      /** İçerik henüz eklenmediyse true. "Yer tutucu" etiketi ve uyarı görünür. */
      placeholder: z.boolean().default(false),
      sector: z.string(),
      year: z.union([z.number(), z.string()]),
      services: z.array(z.string()),
      order: z.number(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Görsel yokken kullanılacak yer tutucu kompozisyonun tonu. */
      tone: z.enum(['accent', 'grid', 'rings']).default('accent'),
    }),
});

export const collections = { work };
