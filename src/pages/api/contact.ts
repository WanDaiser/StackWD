/**
 * İletişim formu uç noktası. Vercel'de sunucu fonksiyonu olarak çalışır.
 * E-posta Resend REST API ile gönderilir (ek bağımlılık yok).
 *
 * Ortam değişkenleri (Vercel > Settings > Environment Variables):
 *   RESEND_API_KEY  zorunlu, yoksa form 503 döner
 *   CONTACT_TO      isteğe bağlı, varsayılan site e-postası
 *   CONTACT_FROM    isteğe bağlı, varsayılan "StackWD <onboarding@resend.dev>"
 *
 * Geliştirme ortamında anahtar yoksa mesaj konsola yazılır ve başarı döner, böylece form test edilebilir.
 */
import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';
import { site } from '../../data/site';
import { content, serviceKeys } from '../../i18n/content';
import { defaultLang, type Lang } from '../../i18n/ui';
import { homePath, isLang } from '../../i18n/utils';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '');

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  let lang: Lang = defaultLang;

  const reply = (ok: boolean, status: number, code?: string) => {
    if (wantsJson) {
      return new Response(JSON.stringify({ ok, code }), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }
    const target = `${homePath(lang)}?${ok ? 'sent=1' : 'error=1'}#contact`;
    return new Response(null, { status: 303, headers: { Location: target } });
  };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(false, 400, 'bad_request');
  }

  const rawLang = str(form.get('lang'));
  if (isLang(rawLang)) lang = rawLang;

  // Bot kontrolleri: gizli alan dolu ya da form çok hızlı gönderildiyse sessizce başarı dön.
  const honeypot = str(form.get('website'));
  const ts = Number(str(form.get('ts')));
  if (honeypot || (ts && Date.now() - ts < MIN_FILL_MS)) return reply(true, 200);

  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* adres alınamadı */
  }
  if (rateLimited(ip)) return reply(false, 429, 'rate_limited');

  const name = str(form.get('name'));
  const email = str(form.get('email'));
  const company = str(form.get('company'));
  const type = str(form.get('type'));
  const message = str(form.get('message'));

  const typeValid = type === 'unsure' || (serviceKeys as readonly string[]).includes(type);
  if (
    !name || name.length > 100 ||
    !EMAIL_RE.test(email) || email.length > 200 ||
    company.length > 120 ||
    !typeValid ||
    message.length < 20 || message.length > 5000
  ) {
    return reply(false, 422, 'invalid');
  }

  const typeLabel =
    type === 'unsure'
      ? content.tr.contact.form.typeUnsure
      : content.tr.services.items[type as (typeof serviceKeys)[number]].title;

  const subject = `Yeni proje talebi: ${name}${company ? ` (${company})` : ''}`;
  const rows: [string, string][] = [
    ['Ad', name],
    ['E-posta', email],
    ['Şirket', company || '-'],
    ['Proje türü', typeLabel],
    ['Site dili', lang.toUpperCase()],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`;
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#5a5e66">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  if (!RESEND_API_KEY) {
    if (import.meta.env.DEV) {
      console.info('[contact] RESEND_API_KEY yok, mesaj gönderilmedi (geliştirme):\n' + text);
      return reply(true, 200);
    }
    console.error('[contact] RESEND_API_KEY tanımlı değil.');
    return reply(false, 503, 'not_configured');
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM || 'StackWD <onboarding@resend.dev>',
        to: [CONTACT_TO || site.contact.email],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error('[contact] Resend hatası', res.status, await res.text());
      return reply(false, 502, 'send_failed');
    }
  } catch (err) {
    console.error('[contact] Resend isteği başarısız', err);
    return reply(false, 502, 'send_failed');
  }

  return reply(true, 200);
};

export const ALL: APIRoute = () => new Response(null, { status: 405, headers: { Allow: 'POST' } });
