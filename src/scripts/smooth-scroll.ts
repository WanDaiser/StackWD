/**
 * Akıcı kaydırma (Locomotive referansı). Etkisi bilinçli olarak incedir.
 * - Yalnızca fare tekerleği yumuşatılır. Dokunmatik ve klavye kaydırması yereldir.
 * - Hareket azaltma tercihi açıksa Lenis hiç başlatılmaz, tercih değişirse kapatılır.
 * - Açık <dialog> içindeki tekerlek olaylarına dokunulmaz.
 * - Sayfa içi çapalar burada yönetilir: üst bar kadar boşluk bırakılır, odak hedef bölüme taşınır.
 */
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | null = null;

function headerOffset() {
  const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
  return h + 16;
}

function start() {
  if (lenis || reduceMotion.matches) return;
  lenis = new Lenis({
    lerp: 0.12,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: true,
    prevent: (node) => !!node.closest('dialog'),
  });
}

function stop() {
  lenis?.destroy();
  lenis = null;
}

reduceMotion.addEventListener('change', (e) => (e.matches ? stop() : start()));
start();

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
  // Yalnızca aynı sayfadaki çapalar. Başka sayfaya giden bağlantılar normal çalışır.
  if (!link || link.target || link.origin !== location.origin || link.pathname !== location.pathname) return;
  const id = decodeURIComponent(link.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (!target) return;

  event.preventDefault();
  if (lenis) {
    lenis.scrollTo(target, { offset: -headerOffset(), duration: 1.1 });
  } else {
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
  history.pushState(null, '', `#${id}`);
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});
