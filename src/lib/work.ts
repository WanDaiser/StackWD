import { getCollection, type CollectionEntry } from 'astro:content';
import { langs, type Lang } from '../i18n/ui';
import { homePath, workPath, type Alternates } from '../i18n/utils';

export type WorkEntry = CollectionEntry<'work'>;

/** "tr/ornek-vaka-1" kimliğinden dil ön ekini atar. */
export const slugOf = (entry: WorkEntry) => entry.id.split('/').slice(1).join('/');

export async function getWork(lang: Lang) {
  const entries = await getCollection('work', (e) => e.id.startsWith(`${lang}/`));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getStaticCasePaths(lang: Lang) {
  const list = await getWork(lang);
  return list.map((entry, i) => ({
    params: { slug: slugOf(entry) },
    props: { entry, next: list.length > 1 ? list[(i + 1) % list.length] : undefined },
  }));
}

/** Aynı vakanın diğer dillerdeki adresleri. Çevirisi yoksa o dilin ana sayfası. */
export async function caseAlternates(slug: string): Promise<Alternates> {
  const all = await getCollection('work');
  const ids = new Set(all.map((e) => e.id));
  return Object.fromEntries(
    langs.map((l) => [l, ids.has(`${l}/${slug}`) ? workPath(l, slug) : homePath(l)]),
  ) as Alternates;
}
