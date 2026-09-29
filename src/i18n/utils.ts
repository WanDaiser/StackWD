import { defaultLang, langs, ui, type Lang, type UiKey } from './ui';

export function isLang(value: string | undefined): value is Lang {
  return !!value && (langs as string[]).includes(value);
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Dilin ana sayfa yolu. Varsayılan dil kökte yaşar. */
export function homePath(lang: Lang) {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

/** Bölüm çapaları tüm dillerde aynıdır. */
export const sectionIds = {
  services: 'services',
  work: 'work',
  process: 'process',
  about: 'about',
  faq: 'faq',
  contact: 'contact',
} as const;

/** Vaka detay sayfalarının dile göre yolları. */
const workBase: Record<Lang, string> = { tr: '/isler', en: '/en/work', es: '/es/proyectos' };

export function workPath(lang: Lang, slug: string) {
  return `${workBase[lang]}/${slug}/`;
}

/** Ana sayfadaki bir bölümün adresi. Her sayfadan çalışır. */
export function sectionHref(lang: Lang, id: string) {
  return `${homePath(lang)}#${id}`;
}

export type Alternates = Record<Lang, string>;

export function homeAlternates(): Alternates {
  return Object.fromEntries(langs.map((l) => [l, homePath(l)])) as Alternates;
}
