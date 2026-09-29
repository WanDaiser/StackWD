# StackWD

Tek kişilik dijital stüdyo StackWD'nin tanıtım sitesi. Türkçe (kök), İngilizce (`/en/`) ve İspanyolca (`/es/`) tek sayfalık site. Astro, Tailwind CSS v4, Vercel.

Görsel kararların tek kaynağı [DESIGN.md](DESIGN.md). Renk, font, boşluk, köşe, gölge ve süre değerleri yalnızca `src/styles/global.css` içindeki token'lardan gelir. Tailwind'in varsayılan renk, font, gölge ve köşe skalaları bilinçli olarak kapatıldı. Token dışı değer ekleme.

## Dürüstlük kuralları (kesin, istisnasız)

- Stüdyo tek kişidir. "Biz" dili kullanılabilir ama sahte ekip üyesi, uydurma müşteri logosu, sahte yorum ya da uydurma rakam ("100+ mutlu müşteri" gibi) asla yazılmaz.
- Güven; net hizmet anlatımı, adım adım süreç, vaka çalışmaları ve şeffaf iletişimle kurulur.
- Örnek işler ya gerçek projedir ya da görünür biçimde "Konsept çalışma" etiketi taşır. İçeriklerini site sahibi doldurur. O zamana kadar açıkça işaretlenmiş yer tutucu kullanılır.
- Stok fotoğraf ve rastgele yer tutucu fotoğraf kullanılmaz. Görseller özgün SVG ve CSS kompozisyonlarıdır.
- Site sahibinin adı ve fotoğrafı şimdilik kullanılmaz.

## Referanslar

Hiçbiri kopyalanmaz. Her birinden yalnızca belirtilen rol alınır. Çatışma olursa Linear'ın sakinliği kazanır.

- **linear.app: tasarım sistemi ve genel ton.** Koyu zemin varsayılandır. Tek ve kısıtlı aksan, 1px ince kenarlar, hassas boşluk ölçeği, özenli bileşen detayları.
- **locomotive.ca: tipografi ve hareket.** Büyük editoryal başlıklar ve Lenis ile ince, akıcı kaydırma. Hareket azaltma açıkken Lenis hiç başlamaz.
- **basicagency.com: yalnızca işlerin sunumu.** Büyük görsel alanlı vaka kartları ve problem, yaklaşım, sonuç kurgulu detay sayfaları. Başlangıçta açıkça işaretlenmiş üç yer tutucu vaka.

## Marka

- Hedef kitle: orta ve üst ölçekli işletmelerin karar vericileri.
- His: premium, sakin, özgüvenli, teknik olarak güçlü, modern ama zamansız.
- Hizmetler: temel web hizmetlerinin tamamı. Kurumsal web sitesi, landing page, e-ticaret, web uygulaması, UI/UX tasarım, yeniden tasarım, SEO ve performans iyileştirme, bakım ve destek.
- İletişim bilgileri yalnızca `src/data/site.ts` içinde tutulur. İletişim niyeti için sitenin her yerinde tek CTA etiketi kullanılır: "Projenizi konuşalım" ve diğer dillerdeki karşılıkları.
- Metinlerde uzun tire kullanılmaz. Her yeni metin anahtarı üç dile birden eklenir (`src/i18n/ui.ts`). İspanyolca metinlerde "usted" hitabı kullanılır.

## Çalışma şekli

- Ana tasarım skill'i `design-taste-frontend`'dir. Kuralları DESIGN.md'ye işlendi. Bilinçli sapmalar DESIGN.md'nin 11. bölümünde yazılıdır.
- Yeni web özelliğine başlamadan önce `modern-web-guidance` skill'iyle ilgili kılavuz aranır.
- Yeni bölüm ya da büyük değişiklik tek tek yapılır ve sonunda kısa özet verilir.
- Her bölümden sonra playwright-cli ile 375px ve 1440px genişlikte, açık ve koyu temada ekran görüntüsü alınır, incelenir ve sorunlar düzeltilir. Görüntüler `screenshots/` klasörüne kaydedilir. Bu klasör git dışıdır.
- Kaydırma olay dinleyicisi kullanılmaz. Kaydırma efektleri CSS scroll-driven animasyonlarla, `@supports` ve `prefers-reduced-motion` korumasıyla yazılır. Durum takibi gerekiyorsa IntersectionObserver kullanılır.
- Bölüm çapaları tüm dillerde aynıdır ve `src/i18n/utils.ts` içindeki `sectionIds` listesinden gelir.

## Bilinen tuzaklar

- Node 22.12 veya üstü gerekir (Astro 7). `npm run build` önce `astro check` çalıştırır.
- `path-to-regexp` için package.json'daki override, Vercel eklentisinin eski bağımlılığındaki güvenlik açığını kapatır. Kaldırmadan önce `npm audit` çalıştır.
- Proje klasörünün bir üstünde, masaüstünde başka bir projeye ait `postcss.config.mjs` var. Vite onu okumasın diye `astro.config.mjs` içinde `css.postcss` boş nesne olarak verildi. Bu satırı silme.
- Site Vercel'de `https://stack-wd.vercel.app` adresinde yayında (tireli). `site.url` ve `public/robots.txt` bu adresle aynı olmalıdır. Canonical, hreflang, sitemap ve OG adresleri `site.url` değerinden türetilir. Özel alan adı bağlanınca ikisi birlikte güncellenir.
- Sunucu uç noktalarında `clientAddress` değerini parametrede açma. Vercel eklentisinde okunduğu anda hata fırlatır. Adres `x-forwarded-for` başlığından okunur (`src/pages/api/contact.ts` içindeki `clientIp`).
- Metinler iki dosyadadır: kısa arayüz metinleri `src/i18n/ui.ts`, bölüm içerikleri `src/i18n/content.ts`. SSS yanıtları ve süreç anlatımı stüdyonun çalışma biçimine dair iddialardır. Site sahibi onaylamadan yeni iddia eklenmez.
- Vakalar `src/content/work/{tr,en,es}/<slug>.md` dosyalarındadır. Şu an üç vaka vardır ve üçü de `concept: true` olan, markası kurgusal konsept çalışmalardır: Kıyı Mimarlık, Tane Kahve, Denge Fizyoterapi. Her vaka gövdesi bunu açıkça yazan bir notla başlar. Gerçek müşteri işi eklenince `concept: false` ve `client` alanı kullanılır. `placeholder: true` olan bir vaka "Yer tutucu" etiketi taşır ve noindex olur.
- Vaka görselleri stok değil, stüdyonun kodladığı konsept sayfalarının ekran görüntüleridir. Kaynak sayfalar `scripts/concepts/*.html` içindedir. Üretim: klasörü geçici olarak `public/_concepts` adıyla kopyala, geliştirme sunucusunda her sayfanın 1440x900 görüntüsünü (`<ad>-d.png`), tam sayfa masaüstü görüntüsünü (`<ad>-dfull.png`) ve 390 genişlikte tam sayfa mobil görüntüsünü (`<ad>-mfull.png`) `screenshots/concepts/` klasörüne al, kopyayı sil, sonra `node scripts/concepts/compose.mjs` çalıştır. Çıktılar `src/content/work/assets/` klasörüne 2000x1250 WebP olarak yazılır.
- Simgeler `npm run icons` ile `scripts/make-icons.mjs` üzerinden üretilir. Open Graph görseli `scripts/og.html` şablonundan alınır: şablonu geçici olarak `public/_og.html` adıyla kopyala, geliştirme sunucusunda 1200x630 ekran görüntüsünü `public/og.png` olarak al, kopyayı sil.
- İletişim formu `src/pages/api/contact.ts` üzerinden Resend REST API ile e-posta gönderir. Ortam değişkenleri `.env.example` dosyasında açıklanmıştır. Anahtar yokken geliştirme ortamında mesaj konsola yazılır, yayında form 503 döner.
- Sayfa içi çapa tıklamaları `src/scripts/smooth-scroll.ts` içinde yönetilir. Lenis açıkken üst bar kadar boşluk bırakır ve odağı hedef bölüme taşır. Yeni bölüm eklerken `id` değerini `sectionIds` listesinden al.
