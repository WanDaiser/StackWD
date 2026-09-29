---
version: 0.3
name: StackWD
description: Tek kişilik bir dijital stüdyonun tanıtım sitesi. Nötr ve hafif sıcak bir açık zemin, derin mürekkep rengi metin ve tek bir kobalt aksan üzerine kurulu. Başlıklarda optik boyutlu bir grotesk, gövdede sakin bir sans kullanılır. Görsel kimliği "katmanlar" fikri taşır. Strateji, arayüz, kod ve yayın üst üste binen soyut düzlemler olarak çizilir. His premium, sakin, özgüvenli ve teknik olarak güçlüdür.

design-read: "Tek kişilik dijital stüdyo için tanıtım sitesi, orta ve üst ölçekli işletme karar vericilerine yönelik. Linear'ın sakin ve ölçülü koyu arayüzü temel his, Locomotive tarzı büyük editoryal tipografi karakter, BASIC tarzı geniş vaka sunumu yalnızca işler bölümünde. Astro, Tailwind v4, yerel CSS hareketleri ve Lenis."

references:
  linear.app: "Tasarım sistemi ve genel ton. Koyu zemin, tek ve kısıtlı aksan, 1px ince kenarlar, hassas boşluk ölçeği, bileşen detayları."
  locomotive.ca: "Tipografi ve hareket. Büyük editoryal başlıklar ve akıcı kaydırma hissi."
  basicagency.com: "İşlerin sunumu. Büyük görsel alanlı vaka kartları ve problem, yaklaşım, sonuç kurgulu detay sayfaları."
  kural: "Hiçbiri kopyalanmaz. Her referanstan yalnızca belirtilen rol alınır. Çatışma olursa Linear'ın sakinliği kazanır."

dials:
  DESIGN_VARIANCE: 6
  MOTION_INTENSITY: 5
  VISUAL_DENSITY: 3

colors:
  light:
    canvas: "#F1F0EC"
    surface: "#F9F8F5"
    surface-sunk: "#E6E4DE"
    ink: "#121417"
    body: "#2E3136"
    muted: "#5A5E66"
    hairline: "#D8D5CD"
    hairline-strong: "#7C8087"
    accent: "#2B40D6"
    accent-hover: "#1F31B3"
    on-accent: "#F9F8F5"
    error: "#B3261E"
    success: "#2F7D4F"
  dark:
    canvas: "#0D0E10"
    surface: "#16181B"
    surface-sunk: "#1E2024"
    ink: "#EDEAE2"
    body: "#C9C6BE"
    muted: "#9A9DA3"
    hairline: "#2A2D32"
    hairline-strong: "#6B6F77"
    accent: "#8C99FF"
    accent-hover: "#A9B3FF"
    on-accent: "#0D0E10"
    error: "#FF8A80"
    success: "#7FD19B"

typography:
  families:
    display: "Bricolage Grotesque Variable, system-ui, sans-serif"
    body: "Instrument Sans Variable, system-ui, sans-serif"
    mono: "IBM Plex Mono, ui-monospace, monospace"
  display-xl: { size: "clamp(2.75rem, 1rem + 6.4vw, 7rem)", weight: 460, lineHeight: 0.98, tracking: "-0.036em", opsz: 96 }
  display-lg: { size: "clamp(2.25rem, 1.2rem + 3.6vw, 4.5rem)", weight: 460, lineHeight: 1.02, tracking: "-0.032em", opsz: 96 }
  display-md: { size: "clamp(1.5rem, 1.2rem + 1.3vw, 2.5rem)", weight: 480, lineHeight: 1.12, tracking: "-0.022em", opsz: 48 }
  title: { size: "1.25rem", weight: 550, lineHeight: 1.3, tracking: "-0.005em" }
  lead: { size: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", weight: 400, lineHeight: 1.55, tracking: "0" }
  body: { size: "1rem", weight: 400, lineHeight: 1.6, tracking: "0" }
  small: { size: "0.875rem", weight: 400, lineHeight: 1.5, tracking: "0" }
  eyebrow: { size: "0.75rem", weight: 500, lineHeight: 1.4, tracking: "0.08em", transform: uppercase, family: mono }
  button: { size: "0.9375rem", weight: 550, lineHeight: 1, tracking: "0" }

spacing:
  base: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160]
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(96px, 12vw, 160px)"
  container: 1280px
  measure: 65ch

rounded:
  input: 8px
  card: 16px
  interactive: 9999px

elevation:
  flat: "none"
  lift: "0 1px 0 hairline, 0 16px 40px -20px rgb(18 20 23 / 0.16)"
  focus: "outline 2px solid accent, offset 3px"

motion:
  duration: { fast: 150ms, base: 280ms, slow: 600ms, scene: 900ms }
  easing:
    out: "cubic-bezier(0.16, 1, 0.3, 1)"
    in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
  stagger: 80ms
  distance: { reveal: 16px, layer: 24px }

z-index:
  base: 0
  sticky-nav: 40
  mobile-menu: 50
  grain: 60

breakpoints:
  sm: 375px
  md: 768px
  lg: 1024px
  xl: 1440px
---

# StackWD Tasarım Sistemi

Bu belge sitenin tek görsel kaynağıdır. Ana tasarım skill'i `design-taste-frontend`'dir. Belge o skill'in kurallarıyla uyumludur. Bilinçli sapmalar 11. bölümde gerekçeleriyle listelenmiştir.

## 1. Görsel tema ve atmosfer

StackWD'nin temel hissi Linear'dan gelir: sakin, ölçülü, güven veren. Varsayılan tema koyudur (`canvas` #0D0E10). Saf siyah kullanılmaz. Kontrastı ince çizgiler, yüzey adımları ve tek bir aksan kurar. Açık tema bir seçenek olarak durur ve aynı disiplini izler: nötr, çok hafif sıcak bir açık zemin (#F1F0EC) ve mürekkep rengi metin (#121417).

Karakteri Locomotive tarzı tipografi verir: büyük, sıkı aralıklı, editoryal başlıklar ve akıcı bir kaydırma hissi. İşler bölümü BASIC tarzında büyük görsel alanlarla öne çıkar. Sayfanın geri kalanı sakin kalır. Sayfa kendini sesle değil, düzen, boşluk ve tipografiyle anlatır.

Palet ailesi "kobalt ve nötr zemin"dir. Bej, pirinç ve espresso üçlüsünden bilinçli olarak uzak durulur.

Kimliğin merkezinde **katmanlar** fikri durur. İyi bir web sitesi dört katmandan oluşur: strateji, arayüz, kod ve yayın. Bu fikir iki yerde görünür:

1. **Hero kompozisyonu.** İzometrik perspektifte üst üste duran dört yarı saydam düzlem. Düzlemler sahte arayüz ya da sahte kod ekranı değildir. Her biri soyut bir geometri taşır: oran ızgarası, tipografi ritmi, modüler bloklar ve bir yayın sinyali.
2. **Süreç bölümü.** Keşif, tasarım, geliştirme ve yayın adımları aynı dört katmana karşılık gelir ve aynı düzlem motifini küçük ölçekte kullanır.

**Temel özellikler**
- Tek tema kilidi vardır. Varsayılan tema koyudur ve ziyaretçi açık temaya geçebilir. Sayfa seçilen temada baştan sona aynı kalır. Bölümler arası ton farkı yalnızca aynı tema içindeki yüzey adımlarıyla sağlanır.
- Tek kromatik renk kobalttır. Birincil CTA, bağlantılar, odak halkası ve hero kompozisyonundaki tek bir düzlemde kullanılır.
- Başlıklar Bricolage Grotesque ile, orta ağırlıkta ve sıkı harf aralığıyla yazılır. Optik boyut ekseni büyük puntoda karakteri sakinleştirir.
- Derinlik ağır gölgeyle değil, katman, yüzey adımı ve ince çizgiyle kurulur.
- Stok fotoğraf yoktur. Görsel zenginlik özgün SVG kompozisyonlardan, gren dokusundan, çok hafif gradyanlardan ve vaka çalışmalarındaki gerçek proje görsellerinden gelir.

## 2. Renk paleti ve rolleri

Her renk bir rol taşır. Bileşenler hex değeri değil, rol adını kullanır. Açık ve koyu tema aynı rol adlarını paylaşır ve CSS değişkenleriyle tanımlanır.

### Yüzeyler
- **Canvas.** Sayfanın zemini.
- **Surface.** Kartlar ve form alanları. Zeminden bir adım yukarıdadır.
- **Surface sunk.** Bölüm ayrımı için kullanılan gömülü yüzey. Seçili işler ve iletişim bölümleri bu yüzeyde durur. Tema değişmez, yalnızca ton bir adım iner.

### Metin
- **Ink.** Başlıklar ve önemli metin.
- **Body.** Uzun gövde metni.
- **Muted.** Açıklamalar, yardım metinleri, alt bilgiler.

### Çizgiler
- **Hairline.** Dekoratif ayraçlar ve kart kenarları. Kontrast şartı taşımaz.
- **Hairline strong.** Form alanı kenarları gibi işlevsel sınırlar. İki temada da 3:1 oranını geçer.

### Aksan ve durum
- **Accent.** Birincil buton zemini, bağlantılar, odak halkası.
- **Accent hover.** Üzerine gelme ve basılı hali.
- **On accent.** Aksan zemin üzerindeki metin. Saf beyaz kullanılmaz.
- **Error ve success.** Yalnızca form geri bildiriminde kullanılır. Her zaman bir ikon ve metinle birlikte gelir.

### Doğrulanmış kontrast oranları

| Eşleşme | Açık | Koyu | Hedef |
|---|---|---|---|
| Ink / canvas | 16.2 | 16.1 | 4.5 |
| Body / canvas | 11.5 | 11.3 | 4.5 |
| Muted / canvas | 5.7 | 7.1 | 4.5 |
| Muted / surface sunk | 5.1 | 6.0 | 4.5 |
| Accent / canvas | 6.6 | 7.5 | 4.5 |
| On accent / accent | 7.0 | 7.5 | 4.5 |
| Hairline strong / surface | 3.7 | 3.5 | 3.0 |
| Error / surface | 6.2 | 7.8 | 4.5 |

## 3. Tipografi

### Yazı tipleri
- **Bricolage Grotesque** başlıklar için kullanılır. Optik boyut ve ağırlık eksenli bir grotesk. Büyük puntodaki hafif mürekkep tuzakları teknik bir karakter verir, orta ağırlıkta sakin kalır.
- **Instrument Sans** gövde, navigasyon ve buton metni için kullanılır. Net ve hafif karakterli bir sans. Her yerde görülen sistem fontlarından ayrışır.
- **IBM Plex Mono** yalnızca sayfadaki en fazla üç eyebrow etiketinde ve form yardım metnindeki teknik notlarda kullanılır.

Üç yazı tipi de Türkçe karakterleri (ğ, ş, ı, İ, ç, ö, ü) içeren latin-ext alt kümesine sahiptir. Fontlar Fontsource paketleriyle kendi sunucumuzdan yüklenir. Google Fonts bağlantısı kullanılmaz. Yalnızca hero başlığında kullanılan kesim önceden yüklenir.

### Hiyerarşi

| Token | Boyut | Ağırlık | Satır | Harf aralığı | Kullanım |
|---|---|---|---|---|---|
| display-xl | 44 → 112px | 460 | 0.98 | -0.036em | Yalnızca hero başlığı |
| display-lg | 36 → 72px | 460 | 1.02 | -0.032em | Bölüm başlıkları |
| display-md | 24 → 40px | 480 | 1.12 | -0.022em | Vaka çalışması ve alt başlıklar |
| title | 20px | 550 | 1.3 | -0.005em | Kart başlıkları |
| lead | 17 → 20px | 400 | 1.55 | 0 | Bölüm giriş paragrafları |
| body | 16px | 400 | 1.6 | 0 | Gövde metni |
| small | 14px | 400 | 1.5 | 0 | Form yardım metni, footer |
| eyebrow | 12px | 500 | 1.4 | 0.08em | Mono, büyük harf, sayfada en fazla üç kez |
| button | 15px | 550 | 1 | 0 | Buton metni |

### İlkeler
- Hero başlığı masaüstünde en fazla iki satırdır. Sığmıyorsa metin kısaltılır ya da punto düşürülür.
- Başlıkta vurgu gerekiyorsa aynı ailenin farklı ağırlığı ya da ink ile muted renk farkı kullanılır. Başka bir font ailesinden kelime karıştırılmaz.
- Gövde metni satır başına en fazla 65 karakter taşır.
- Türkçe büyük harf dönüşümleri için sayfa `lang="tr"` ile işaretlenir, böylece "i" harfi doğru biçimde "İ" olur.

## 4. Bileşen stilleri

Köşe sistemi tek bir kurala bağlıdır: etkileşimli öğeler tam yuvarlak, kartlar 16px, form alanları 8px. Bu kural her yerde aynı uygulanır.

### Butonlar
- **Birincil.** Accent zemin, on-accent metin, tam yuvarlak, 48px yükseklik, solda 24px sağda 6px iç boşluk. Sağ uçta 36px çapında, on-accent tonunun %15 saydamında bir daire içinde ok ikonu bulunur. Hover durumunda zemin accent-hover olur, iç daire 2px sağa ve 1px yukarı kayar. Basılıyken buton %98 ölçeğe iner.
- **İkincil.** Şeffaf zemin, ink metin, 1px hairline-strong kenar. Hover durumunda zemin surface-sunk olur.
- **Metin bağlantısı.** Accent renk, 1px alt çizgi, 0.2em uzaklıkta. Hover durumunda alt çizgi kalınlaşır.
- **Odak.** Tüm etkileşimli öğelerde `elevation.focus` halkası görünür. Halka outline ile çizilir, böylece yüksek kontrast modunda da görünür kalır. Odak halkası hiçbir durumda kaldırılmaz.
- **Etiket uzunluğu.** Birincil CTA en fazla üç kelimedir ve masaüstünde tek satıra sığar.
- **Tek niyet, tek etiket.** İletişim niyeti sitenin her yerinde yalnızca "Projenizi konuşalım" etiketini kullanır. Navigasyon, hero ve footer aynı etiketi paylaşır.

### Kartlar
Kart yalnızca gerçek bir hiyerarşi anlatıyorsa kullanılır. Aksi halde gruplama boşluk ve ince çizgiyle yapılır.
- **Hizmet öğesi.** Kart değil, iki sütunlu bir düzen içinde üstte hairline çizgiyle ayrılan bloklar. Her blokta ikon, başlık, kısa açıklama ve teslimatlar yer alır.
- **Vaka çalışması kartı.** Dış kabuk ve iç çekirdekten oluşan iki katmanlı bir çerçeve kullanır. Dış kabuk surface-sunk zeminli, 1px hairline kenarlı ve 6px iç boşlukludur. İç çekirdek surface zeminlidir ve köşesi dış köşeden 6px küçüktür. Bu çerçeve "katman" fikrini tekrar eder ve yalnızca vaka çalışmalarında kullanılır.
- **Konsept etiketi.** Konsept çalışmalar görselin altında, başlığın yanında "Konsept çalışma" etiketini taşır. Etiket görselin üstüne bindirilmez.
- **Yer tutucu.** Vaka görseli gelene kadar, katman motifli ve "Görsel eklenecek" yazan açıkça işaretlenmiş bir alan gösterilir.

### Vaka çalışmaları (BASIC referansı)
- **Ana sayfa kartları.** Görsel alanı kartın ana öğesidir. İlk vaka tam genişlikte, 16:9 oranında. Sonrakiler asimetrik ikili düzende, 4:5 ve 4:3 oranlarında. Görselin altında başlık, sektör, yıl ve tek cümlelik özet yer alır. Hover durumunda görsel çok hafif büyür ve "Vakayı incele" bağlantısı belirir.
- **Detay sayfası.** Her vaka kendi sayfasına sahiptir. Kurgu sabittir: giriş (başlık, özet, künye), büyük kapak görseli, Problem, Yaklaşım, Sonuç bölümleri, ara görseller ve bir sonraki vakaya geçiş.
- **Künye.** Müşteri ya da "Konsept çalışma", sektör, yıl, verilen hizmetler. Rakam yalnızca doğrulanabilir gerçek veriyse yazılır.
- **İçerik.** Vakalar Markdown içerik koleksiyonunda, her dil için ayrı dosyayla tutulur. Başlangıçta açıkça işaretlenmiş üç yer tutucu vaka bulunur.

### Formlar
- Alanlar surface zeminli, 1px hairline-strong kenarlı ve 8px köşelidir. Yükseklik en az 48px'tir.
- Etiket her zaman alanın üstündedir. Placeholder etiketin yerini tutmaz.
- Yardım metni etiketin altında, hata metni alanın altında durur. Hata error renginde ve bir ikonla gösterilir. Yalnızca renkle hata bildirilmez.
- Doğrulama kullanıcı alandan çıkınca çalışır, yazarken çalışmaz.
- Gönderim sırasında buton metni "Gönderiliyor" olur ve buton devre dışı kalır. Başarı ve hata durumları formun yerinde, sayfa değiştirmeden gösterilir.

### Navigasyon
- Masaüstünde tek satırlık, en fazla 72px yüksekliğinde bir bar. Kaydırma başlayınca zemin canvas'ın yarı saydam hâline döner, altına hairline gelir ve arka plan bulanıklaşır. Bulanıklık yalnızca bu sabit bara uygulanır.
- Mobilde tam ekran bir menü açılır. Hamburger ikonu çarpıya dönüşür. Menü açıkken sayfa kaydırması kilitlenir, odak menü içinde kalır ve Escape tuşu menüyü kapatır.

### İkonlar
- Tek ikon ailesi Phosphor'dur, "light" ağırlığında. El ile çizilmiş ikon yolu kullanılmaz.
- Emoji kullanılmaz.

## 5. Yerleşim ilkeleri

- **Izgara.** Masaüstünde 12 sütun, tablette 8 sütun, mobilde tek sütun. Kenar boşluğu `spacing.gutter` ile akışkandır.
- **Konteyner.** İçerik en fazla 1280px genişliğindedir.
- **Bölüm aralığı.** Bölümler arasında `spacing.section` kadar boşluk bulunur.
- **Bölüm başlığı.** Başlık üstte, lead paragraf hemen altında, ikisi de aynı sütunda ve en fazla 65 karakter genişliğinde. Solda başlık sağda küçük paragraf düzeni kullanılmaz.
- **Eyebrow sınırı.** Sayfanın tamamında en fazla üç eyebrow etiketi bulunur. Etiketler numara değil, düz kelime taşır. Kullanılacak yerler: hero, seçili işler, iletişim.
- **Hero.** En fazla dört metin öğesi taşır: eyebrow, başlık, en fazla 20 kelimelik alt metin ve CTA. Üst boşluk masaüstünde 96px'i geçmez. CTA ilk ekranda görünür.
- **Düzen ailesi çeşitliliği.** Her bölüm farklı bir düzen ailesi kullanır:

| Bölüm | Düzen ailesi |
|---|---|
| Hero | Editoryal hero. Büyük başlık tam genişlikte iki satır. Altında solda alt metin ve CTA, sağda başlığın ikinci satırına hafifçe taşan katman kompozisyonu. |
| Hizmetler | İki sütunlu, çizgiyle ayrılmış liste. |
| Seçili işler | BASIC tarzı vaka sunumu. Büyük görsel alanlı kartlar, ilki tam genişlikte, diğerleri asimetrik ikili. |
| Süreç | Dikey zaman çizgisi. Kaydırdıkça ilerleyen bir çizgi adımları bağlar. |
| Hakkında | Tek sütunlu editoryal metin ve yanında değerler listesi. |
| SSS | Tam genişlikte akordeon. |
| İletişim | Form ve doğrudan kanallar yan yana. |
| Footer | Sade, iki satırlı alt bilgi. |

- **Mobil çöküş.** Her çok sütunlu düzen 768px altında tek sütuna iner. Bu davranış her bileşende açıkça yazılır.
- **Tam yükseklik.** Tam yükseklik gereken yerde `100dvh` tabanlı minimum yükseklik kullanılır.

## 6. Derinlik ve yüzey hiyerarşisi

| Seviye | Uygulama | Kullanım |
|---|---|---|
| 0 | Gölge ve kenar yok | Metin, hero, düz bölümler |
| 1 | Surface zemin ve hairline kenar | Form alanları, vaka çekirdeği |
| 2 | Seviye 1 ve `elevation.lift` | Hover durumundaki vaka kartları |
| Odak | `elevation.focus` halkası | Klavye ile odaklanan öğeler |

Gölgeler zemin tonuna göre renklendirilir. Saf siyah gölge kullanılmaz.

### Dekoratif derinlik
- **Gren dokusu.** Sabit konumlu, tıklamayı engellemeyen tek bir sözde öğe üzerinde, SVG gürültü filtresiyle. Açık temada %4, koyu temada %6 opaklık. Kaydırılan bir kapsayıcıya uygulanmaz.
- **Işık lekeleri.** Accent renginden türeyen, çok büyük yarıçaplı ve %8'i geçmeyen radyal gradyanlar. Yalnızca hero ve iletişim bölümünde kullanılır.

## 7. Hareket dili

Hareket sakin ve amaçlıdır. Her animasyon tek cümleyle gerekçelendirilebilmelidir. Bu gerekçe hiyerarşi, hikâye akışı, geri bildirim ya da durum değişikliği olabilir.

- **Hero açılışı.** Sayfanın tek büyük hareket anıdır. Katmanlar alttan üste, `stagger` aralığıyla ve `scene` süresinde yerine oturur. Gerekçe: katman fikrini ilk bakışta anlatmak.
- **Bölüm girişleri.** Başlık ve ilk içerik bloğu görünür alana girerken 16px aşağıdan ve saydamlıktan gelir. Gerekçe: okuma sırasını göstermek. CSS scroll-driven animasyonlarla yapılır. Desteklemeyen tarayıcılarda içerik doğrudan görünür.
- **Süreç çizgisi.** Adımları bağlayan çizgi kaydırmayla dolar. Gerekçe: ilerlemeyi göstermek.
- **Mikro etkileşimler.** Hover, odak ve basılı hal geçişleri `fast` ya da `base` süresinde, `out` eğrisiyle çalışır.
- **Akıcı kaydırma.** Lenis ile hafif bir yumuşatma uygulanır. Etkisi incedir: kısa süre, yalnızca fare tekerleği, dokunmatik ekranda yerel kaydırma. Klavye kaydırması yereldir. Hareket azaltma açıkken Lenis hiç başlatılmaz. Mobil menü açıkken durdurulur.
- **Yasaklar.** Sonsuz döngü animasyonu, kaydırma olay dinleyicisi, kaydırmayı ele geçirme, özel imleç, marquee.
- **Hareket azaltma.** `prefers-reduced-motion: reduce` açıkken tüm dönüşüm ve kaydırma animasyonları kapanır. Yalnızca 150ms'lik renk ve saydamlık geçişleri kalır. İçerik hiçbir durumda animasyona bağımlı değildir.
- **Performans.** Yalnızca `transform` ve `opacity` animasyonu yapılır.

## 8. Yapılacaklar ve yapılmayacaklar

### Yapılacaklar
- Her renk için rol adı kullan, bileşende hex değeri yazma.
- Bir bölümde tek bir birincil CTA kullan ve iletişim niyeti için her yerde aynı etiketi kullan.
- Vaka çalışmalarını sorun, yaklaşım ve sonuç düzeninde anlat.
- "Biz" dilini kullanırken tek kişilik yapıyı saklama. Hakkında bölümünde bunu açıkça söyle ve güçlü yan olarak anlat.
- Görünür her metni yayından önce yeniden oku. Belirsiz ya da süslü bir cümleyi sade ve işlevsel bir cümleyle değiştir.
- Her bölümü açık ve koyu temada, 375px ve 1440px genişlikte kontrol et.

### Yapılmayacaklar
- Sahte ekip üyesi, uydurma müşteri logosu, sahte yorum ya da uydurma rakam kullanma. Bu kural istisnasızdır.
- Konsept çalışmayı gerçek müşteri işi gibi gösterme.
- Stok fotoğraf, rastgele yer tutucu fotoğraf, stok illüstrasyon ya da emoji kullanma.
- Div'lerle sahte ekran görüntüsü, sahte kod penceresi ya da sahte panel çizme.
- İkinci bir kromatik renk ekleme. Mor gradyan, neon parıltı ve her yere cam efekti bu markaya ait değildir.
- Sayfanın ortasında temayı tersine çevirme.
- Bölüm numarası taşıyan eyebrow, "Adım 1" gibi genel adım etiketi, "Kaydır" ipucu, sürüm etiketi ya da dekoratif durum noktası kullanma.
- Süsleme amaçlı ızgara çizgisi ya da artı işareti kullanma.
- Uzun tire karakterini sitenin hiçbir metninde kullanma. Cümleyi nokta ya da virgülle böl.
- Aynı genişlikte üç kartlık özellik satırı kurma.
- Odak halkasını kaldırma, placeholder'ı etiket yerine kullanma.

## 9. Duyarlı davranış

| Ad | Genişlik | Temel değişiklikler |
|---|---|---|
| Mobil | 375px ve üstü | Tek sütun. Hero görseli başlığın altına iner ve ölçeklenir. Tam ekran menü. |
| Tablet | 768px ve üstü | Hizmetler iki sütun. Vaka ızgarası iki sütun. |
| Masaüstü | 1024px ve üstü | Asimetrik hero ve vaka ızgarası. Tek satırlık tam navigasyon. |
| Geniş | 1440px ve üstü | Konteyner 1280px'te sabitlenir. Hero kompozisyonu tam ölçekte çalışır. |

- **Dokunma hedefleri.** Tüm etkileşimli öğeler en az 44×44px'tir.
- **Tipografi.** Display boyutları akışkan küçülür, kırılma noktasında sıçrama olmaz.
- **Yatay kaydırma.** Hiçbir genişlikte sayfa yatay kaydırılmaz.

## 10. Ajan için hızlı rehber

Yeni bir bileşen ya da bölüm yazarken:

1. Renkleri yalnızca rol token'larından al.
2. Boşlukları 4px ölçeğinden seç.
3. Başlığı Bricolage Grotesque, metni Instrument Sans ile yaz. Mono yalnızca izinli üç eyebrow ve teknik notlarda kullanılır.
4. Bölümün düzen ailesini 5. bölümdeki tablodan al. Başka bir bölümün düzenini tekrarlama.
5. Hareketi yalnızca motion token'larıyla tanımla, gerekçesini yaz ve hareket azaltma durumunu ekle.
6. `design-taste-frontend` skill'inin son kontrol listesini çalıştır.
7. playwright-cli ile 375px ve 1440px ekran görüntüsü al, incele, sorunları düzelt.
8. İçerikte uydurma rakam, logo, yorum ya da kişi olmadığını doğrula.

## 11. Skill kurallarından bilinçli sapmalar

| Kural | Karar | Gerekçe |
|---|---|---|
| Gerçek fotoğraf ya da Picsum yer tutucu kullan | Kullanılmaz. Özgün SVG ve CSS kompozisyon kullanılır. | Marka sahibinin açık talebi. Rastgele fotoğraf, dürüstlük kuralıyla da çelişir. Vaka görselleri, stüdyonun gerçekten kodladığı konsept sayfaların ekran görüntülerinden oluşan sunum panolarıdır. Gerçek müşteri işi geldikçe onun görselleri eklenir. |
| El ile çizilmiş dekoratif SVG'den kaçın | Yalnızca hero kompozisyonu ve vaka yer tutucusu için kullanılır. | Kompozisyon basit geometriden oluşur ve markanın tek görsel imzasıdır. İkonlar yine kütüphaneden gelir. |
| Tema varsayılanı sistem tercihi olmalı | Varsayılan tema koyudur, açık tema seçilebilir. | Marka sahibinin Linear referansı. Koyu zemin sitenin temel tonudur. |
| Varsayılan yığın React ve Next.js | Astro kullanılır. | Site içerik ağırlıklı. Sıfır JavaScript varsayılanı Lighthouse hedefini güvenceye alır. Hareketler yerel CSS ile yapılır, Motion kütüphanesi gerekmez. |
