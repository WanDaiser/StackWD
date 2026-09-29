/**
 * Arayüz metinleri. Her anahtar üç dilde de bulunmak zorundadır.
 * Kural: uzun tire kullanılmaz, uydurma rakam, müşteri ya da yorum yazılmaz.
 * Başlıklardaki | işareti masaüstündeki tercih edilen satır kırılımıdır.
 */
export const languages = {
  tr: { label: 'Türkçe', short: 'TR', htmlLang: 'tr', ogLocale: 'tr_TR' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_ES' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'tr';
export const langs = Object.keys(languages) as Lang[];

const tr = {
  'meta.title': 'StackWD | Web tasarım ve geliştirme stüdyosu',
  'meta.description':
    'StackWD, işletmeler için kurumsal web siteleri, landing page, e-ticaret ve web uygulamaları tasarlayıp geliştiren bağımsız bir dijital stüdyo.',

  'nav.services': 'Hizmetler',
  'nav.work': 'İşler',
  'nav.process': 'Süreç',
  'nav.about': 'Hakkında',
  'nav.faq': 'SSS',
  'cta.contact': 'Projenizi konuşalım',

  'a11y.skip': 'İçeriğe geç',
  'a11y.home': 'StackWD ana sayfa',
  'a11y.mainNav': 'Ana menü',
  'a11y.menuOpen': 'Menüyü aç',
  'a11y.menuClose': 'Menüyü kapat',
  'a11y.toDark': 'Koyu temaya geç',
  'a11y.toLight': 'Açık temaya geç',
  'a11y.language': 'Dil seçimi',

  'hero.eyebrow': 'Web tasarım ve geliştirme',
  'hero.title': 'Katman katman kurulan|web siteleri.',
  'hero.lead':
    'Strateji, tasarım, kod ve yayın tek elde. İşletmeniz için hızlı, erişilebilir ve uzun ömürlü web siteleri.',
  'hero.visual': 'Strateji, arayüz, kod ve yayın katmanlarının üst üste durduğu soyut bir çizim.',

  'layer.strategy': 'Strateji',
  'layer.interface': 'Arayüz',
  'layer.code': 'Kod',
  'layer.launch': 'Yayın',
};

type Dict = Record<keyof typeof tr, string>;

const en: Dict = {
  'meta.title': 'StackWD | Web design and development studio',
  'meta.description':
    'StackWD is an independent digital studio designing and building corporate websites, landing pages, e-commerce and web applications for businesses.',

  'nav.services': 'Services',
  'nav.work': 'Work',
  'nav.process': 'Process',
  'nav.about': 'About',
  'nav.faq': 'FAQ',
  'cta.contact': 'Discuss your project',

  'a11y.skip': 'Skip to content',
  'a11y.home': 'StackWD home',
  'a11y.mainNav': 'Main menu',
  'a11y.menuOpen': 'Open menu',
  'a11y.menuClose': 'Close menu',
  'a11y.toDark': 'Switch to dark theme',
  'a11y.toLight': 'Switch to light theme',
  'a11y.language': 'Language',

  'hero.eyebrow': 'Web design and development',
  'hero.title': 'Websites built|layer by layer.',
  'hero.lead':
    'Strategy, design, code and launch in one pair of hands. Fast, accessible, long-lasting websites for your business.',
  'hero.visual': 'An abstract drawing of strategy, interface, code and launch layers stacked on top of each other.',

  'layer.strategy': 'Strategy',
  'layer.interface': 'Interface',
  'layer.code': 'Code',
  'layer.launch': 'Launch',
};

const es: Dict = {
  'meta.title': 'StackWD | Estudio de diseño y desarrollo web',
  'meta.description':
    'StackWD es un estudio digital independiente que diseña y desarrolla sitios corporativos, landing pages, tiendas online y aplicaciones web para empresas.',

  'nav.services': 'Servicios',
  'nav.work': 'Proyectos',
  'nav.process': 'Proceso',
  'nav.about': 'Estudio',
  'nav.faq': 'FAQ',
  'cta.contact': 'Cuéntenos su proyecto',

  'a11y.skip': 'Saltar al contenido',
  'a11y.home': 'Inicio de StackWD',
  'a11y.mainNav': 'Menú principal',
  'a11y.menuOpen': 'Abrir menú',
  'a11y.menuClose': 'Cerrar menú',
  'a11y.toDark': 'Cambiar a tema oscuro',
  'a11y.toLight': 'Cambiar a tema claro',
  'a11y.language': 'Idioma',

  'hero.eyebrow': 'Diseño y desarrollo web',
  'hero.title': 'Sitios web construidos|capa a capa.',
  'hero.lead':
    'Estrategia, diseño, código y lanzamiento en las mismas manos. Sitios web rápidos, accesibles y duraderos para su empresa.',
  'hero.visual': 'Un dibujo abstracto de las capas de estrategia, interfaz, código y lanzamiento, apiladas una sobre otra.',

  'layer.strategy': 'Estrategia',
  'layer.interface': 'Interfaz',
  'layer.code': 'Código',
  'layer.launch': 'Lanzamiento',
};

export const ui = { tr, en, es } as const;
export type UiKey = keyof typeof tr;
