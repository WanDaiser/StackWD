import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as setOnSetGetEnv, n as getEnv$1, t as createInvalidVariablesError } from "./runtime_BhYcB0M4.mjs";
//#region node_modules/astro/dist/env/validators.js
function getEnvFieldType(options) {
	const optional = options.optional ? options.default !== void 0 ? false : true : false;
	let type;
	if (options.type === "enum") type = options.values.map((v) => `'${v}'`).join(" | ");
	else type = options.type;
	return `${type}${optional ? " | undefined" : ""}`;
}
var stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
	if (typeof input !== "string") return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (max !== void 0 && !(input.length <= max)) errors.push("max");
	if (min !== void 0 && !(input.length >= min)) errors.push("min");
	if (length !== void 0 && !(input.length === length)) errors.push("length");
	if (url !== void 0 && !URL.canParse(input)) errors.push("url");
	if (includes !== void 0 && !input.includes(includes)) errors.push("includes");
	if (startsWith !== void 0 && !input.startsWith(startsWith)) errors.push("startsWith");
	if (endsWith !== void 0 && !input.endsWith(endsWith)) errors.push("endsWith");
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: input
	};
};
var numberValidator = ({ gt, min, lt, max, int }) => (input) => {
	const num = Number.parseFloat(input ?? "");
	if (isNaN(num)) return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (gt !== void 0 && !(num > gt)) errors.push("gt");
	if (min !== void 0 && !(num >= min)) errors.push("min");
	if (lt !== void 0 && !(num < lt)) errors.push("lt");
	if (max !== void 0 && !(num <= max)) errors.push("max");
	if (int !== void 0) {
		const isInt = Number.isInteger(num);
		if (!(int ? isInt : !isInt)) errors.push("int");
	}
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: num
	};
};
var booleanValidator = (input) => {
	const bool = input === "true" ? true : input === "false" ? false : void 0;
	if (typeof bool !== "boolean") return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: bool
	};
};
var enumValidator = ({ values }) => (input) => {
	if (!(typeof input === "string" ? values.includes(input) : false)) return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: input
	};
};
function selectValidator(options) {
	switch (options.type) {
		case "string": return stringValidator(options);
		case "number": return numberValidator(options);
		case "boolean": return booleanValidator;
		case "enum": return enumValidator(options);
	}
}
function validateEnvVariable(value, options) {
	const isOptional = options.optional || options.default !== void 0;
	if (isOptional && value === void 0) return {
		ok: true,
		value: options.default
	};
	if (!isOptional && value === void 0) return {
		ok: false,
		errors: ["missing"]
	};
	return selectValidator(options)(value);
}
//#endregion
//#region \0virtual:astro:env/internal
var schema = {
	"RESEND_API_KEY": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"CONTACT_TO": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"CONTACT_FROM": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	}
};
//#endregion
//#region \0astro:env/server
/** @returns {string} */
var getEnv = (key) => {
	return getEnv$1(key);
};
var _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === "" ? void 0 : rawVariable;
	const options = schema[key];
	const result = validateEnvVariable(variable, options);
	if (result.ok) return result.value;
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};
setOnSetGetEnv(() => {
	RESEND_API_KEY = _internalGetSecret("RESEND_API_KEY");
	CONTACT_TO = _internalGetSecret("CONTACT_TO");
	CONTACT_FROM = _internalGetSecret("CONTACT_FROM");
});
var RESEND_API_KEY = _internalGetSecret("RESEND_API_KEY");
var CONTACT_TO = _internalGetSecret("CONTACT_TO");
var CONTACT_FROM = _internalGetSecret("CONTACT_FROM");
//#endregion
//#region src/data/site.ts
/**
* Stüdyonun sabit bilgileri. İletişim kanalları ve alan adı yalnızca burada değişir.
*/
var site = {
	name: "StackWD",
	url: "https://stackwd.vercel.app",
	contact: {
		email: "salihefeggl@gmail.com",
		phoneDisplay: "0552 479 32 33",
		phoneE164: "+905524793233",
		whatsapp: "https://wa.me/905524793233"
	}
};
//#endregion
//#region src/i18n/content.ts
var serviceKeys = [
	"corporate",
	"landing",
	"ecommerce",
	"webapp",
	"uiux",
	"redesign",
	"seo",
	"care"
];
var content = {
	tr: {
		services: {
			title: "Bir web sitesinin ihtiyaç duyduğu her katman.",
			lead: "Tek sayfalık bir kampanyadan kapsamlı bir web uygulamasına kadar, fikirden yayına ve sonrasına tüm işi aynı özenle üstleniyoruz.",
			includesLabel: "Kapsam",
			items: {
				corporate: {
					title: "Kurumsal web sitesi",
					text: "Markanızı doğru anlatan, içeriği kolayca güncellenen ve arama motorlarında bulunabilen çok sayfalı siteler.",
					includes: [
						"İçerik mimarisi",
						"Çok dilli yapı",
						"Yönetim paneli"
					]
				},
				landing: {
					title: "Landing page",
					text: "Kampanya ve lansmanlar için tek bir hedefe odaklanan, hızlı açılan dönüşüm sayfaları.",
					includes: [
						"Mesaj kurgusu",
						"Form ve ölçümleme",
						"Test edilebilir yapı"
					]
				},
				ecommerce: {
					title: "E-ticaret",
					text: "Ürünlerinizi sade ve güven veren bir alışveriş deneyimiyle sunan online mağazalar.",
					includes: [
						"Katalog yapısı",
						"Ödeme entegrasyonu",
						"Sipariş akışı"
					]
				},
				webapp: {
					title: "Web uygulaması",
					text: "Randevu, rezervasyon ya da müşteri paneli gibi iş süreçlerinizi tarayıcıya taşıyan özel uygulamalar.",
					includes: [
						"Kullanıcı hesapları",
						"Veri tabanı ve API",
						"Yönetim ekranları"
					]
				},
				uiux: {
					title: "UI/UX tasarım",
					text: "Kullanıcı akışlarına dayanan arayüz tasarımı, tasarım sistemi ve geliştirmeye hazır dosyalar.",
					includes: [
						"Kullanıcı akışları",
						"Prototip",
						"Tasarım sistemi"
					]
				},
				redesign: {
					title: "Yeniden tasarım",
					text: "Mevcut sitenizi içeriğini ve arama sıralamasını koruyarak modern, hızlı ve tutarlı bir yapıya taşıma.",
					includes: [
						"Mevcut durum analizi",
						"SEO geçiş planı",
						"İçerik taşıma"
					]
				},
				seo: {
					title: "SEO ve performans",
					text: "Yavaş açılan ya da aramada görünmeyen siteler için teknik SEO, hız ve erişilebilirlik iyileştirmeleri.",
					includes: [
						"Core Web Vitals",
						"Teknik SEO",
						"Erişilebilirlik denetimi"
					]
				},
				care: {
					title: "Bakım ve destek",
					text: "Yayından sonra güncelleme, yedekleme, güvenlik takibi ve küçük geliştirmelerle süreklilik.",
					includes: [
						"Güncelleme ve yedek",
						"Güvenlik takibi",
						"İçerik desteği"
					]
				}
			}
		},
		work: {
			eyebrow: "Seçili işler",
			title: "Her proje kendi sorusuyla başlar.",
			lead: "Her vaka problemi, yaklaşımı ve sonucu adım adım anlatır.",
			viewCase: "Vakayı incele",
			concept: "Konsept çalışma",
			placeholder: "Yer tutucu",
			coverPending: "Proje görseli eklenecek"
		},
		process: {
			title: "Dört katman, net bir süreç.",
			lead: "Her aşamada ne yapılacağı ve sonunda ne teslim edileceği baştan bellidir. Süreç boyunca aynı kişiyle, doğrudan çalışırsınız.",
			youLabel: "Sizden",
			deliverableLabel: "Teslim",
			steps: [
				{
					name: "Keşif",
					layer: "Strateji",
					text: "İşinizi, hedef kitlenizi ve rakiplerinizi dinleyerek başlarız. Sitenin neyi başarması gerektiğini birlikte netleştiririz.",
					you: "Hedefleriniz, varsa mevcut içerik ve marka dosyaları.",
					deliverable: "Kapsam, site haritası ve takvim."
				},
				{
					name: "Tasarım",
					layer: "Arayüz",
					text: "İçerik mimarisini ve arayüzü önce taslakta, sonra detaylı tasarımda kurarız. Masaüstü ve mobil birlikte tasarlanır.",
					you: "Taslaklar üzerine geri bildirim.",
					deliverable: "Onaylı arayüz tasarımı ve tıklanabilir prototip."
				},
				{
					name: "Geliştirme",
					layer: "Kod",
					text: "Tasarımı hızlı, erişilebilir ve kolay güncellenen bir koda dönüştürürüz. İlerlemeyi canlı bir önizleme adresinden takip edersiniz.",
					you: "Son içerikler ve önizleme üzerindeki notlar.",
					deliverable: "Test edilmiş, yayına hazır site."
				},
				{
					name: "Yayın",
					layer: "Yayın",
					text: "Alan adı, sunucu, analitik ve arama motoru ayarlarını yapıp siteyi yayına alırız. Destek yayından sonra da sürer.",
					you: "Alan adı erişimi ve son onay.",
					deliverable: "Canlı site, kullanım rehberi ve bakım seçenekleri."
				}
			]
		},
		about: {
			title: "Küçük stüdyo, doğrudan iletişim.",
			statement: "StackWD tek kişilik bir stüdyo. Projenizi baştan sona aynı kişi tasarlar, geliştirir ve yayına alır.",
			body: "Aracı katman olmadığı için kararlar hızlı alınır, bilgi el değiştirirken kaybolmaz ve kime ulaşacağınızı her zaman bilirsiniz. Stüdyo, markanızın dijital yüzünü uzun süre taşıyacak sağlam ve sade işler üretmek için var.",
			valuesTitle: "Çalışma ilkeleri",
			values: [
				{
					title: "Doğrudan iletişim",
					text: "Projenin her aşamasında aynı kişiyle, aracısız konuşursunuz."
				},
				{
					title: "Ölçülebilir kalite",
					text: "Hız, erişilebilirlik ve SEO zevke değil ölçüme dayanır ve yayından önce test edilir."
				},
				{
					title: "Şeffaflık",
					text: "Kapsam, takvim ve maliyet baştan yazılı olarak netleşir."
				},
				{
					title: "Sahiplik sizde",
					text: "Alan adı, içerik ve kaynak kod size aittir. Dilediğiniz zaman başka biriyle devam edebilirsiniz."
				}
			]
		},
		faq: {
			title: "Sık sorulan sorular",
			lead: "Aradığınız yanıt burada yoksa doğrudan yazın.",
			items: [
				{
					q: "Bir web sitesi projesi ne kadar sürer?",
					a: "Süre kapsama göre belirlenir. Tek sayfalık bir landing page ile çok dilli bir kurumsal site aynı takvimde ilerlemez. İlk görüşmenin ardından aşama aşama yazılı bir takvim paylaşıyoruz."
				},
				{
					q: "Fiyatlandırma nasıl yapılıyor?",
					a: "Her proje kapsamına göre fiyatlanır. Keşif görüşmesinden sonra neyin dahil olduğunu tek tek listeleyen yazılı bir teklif gönderiyoruz. Kapsam dışı istekler önceden konuşulur."
				},
				{
					q: "Site içeriklerini kim hazırlıyor?",
					a: "Metin ve görselleri siz sağlayabilirsiniz. İçerik yapısı ve sayfa başlıkları için yol gösteriyoruz. Metin yazarlığı gerekiyorsa teklifte ayrı bir kalem olarak yer alır."
				},
				{
					q: "Siteyi yayından sonra kendim güncelleyebilir miyim?",
					a: "Evet. İhtiyaca göre kolay kullanılan bir içerik yönetim paneli kuruluyor ve kısa bir kullanım rehberi teslim ediliyor."
				},
				{
					q: "Alan adı ve barındırma kimin adına olur?",
					a: "Sizin adınıza. Hesaplar sizin kontrolünüzde açılır, kurulumu birlikte yapıyoruz."
				},
				{
					q: "Mevcut sitemizi yenilersek arama sıralamamız etkilenir mi?",
					a: "Geçiş doğru planlanırsa sıralama korunur. Eski adresler yeni sayfalara yönlendirilir, meta bilgiler taşınır ve geçişten sonra sonuçlar takip edilir."
				},
				{
					q: "Tek kişilik bir stüdyoyla çalışmak risk değil mi?",
					a: "Yerinde bir soru. Bu yüzden kaynak kod, hesaplar ve belgeler en baştan sizin erişiminizde tutulur. Süreç yazılı ilerler, gerektiğinde başka bir geliştirici kaldığı yerden devam edebilir."
				}
			]
		},
		contact: {
			eyebrow: "İletişim",
			title: "Projenizi konuşalım.",
			lead: "Birkaç cümleyle ne yapmak istediğinizi anlatın. Mesajınız doğrudan stüdyoya ulaşır ve bizzat yanıtlanır.",
			channelsTitle: "Doğrudan ulaşın",
			email: "E-posta",
			whatsapp: "WhatsApp",
			phone: "Telefon",
			form: {
				name: "Adınız",
				email: "E-posta adresiniz",
				company: "Şirket",
				optional: "isteğe bağlı",
				type: "Proje türü",
				typePlaceholder: "Bir seçenek belirleyin",
				typeUnsure: "Henüz emin değilim",
				message: "Projenizden kısaca bahsedin",
				messageHelp: "Hedefiniz, varsa mevcut siteniz ve aklınızdaki takvim yeterli.",
				privacy: "Bu formdaki bilgiler yalnızca talebinize yanıt vermek için kullanılır.",
				submit: "Mesajı gönder",
				sending: "Gönderiliyor",
				successTitle: "Mesajınız ulaştı.",
				successText: "Teşekkürler. Yanıt, yazdığınız e-posta adresine gönderilecek.",
				error: "Mesaj gönderilemedi. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.",
				errorName: "Lütfen adınızı yazın.",
				errorEmail: "Geçerli bir e-posta adresi yazın.",
				errorType: "Lütfen bir proje türü seçin.",
				errorMessage: "Mesaj çok kısa. Projenizi en az 20 karakterle anlatın."
			}
		},
		footer: {
			tagline: "Katman katman kurulan web siteleri.",
			nav: "Site haritası",
			contact: "İletişim",
			rights: "Tüm hakları saklıdır.",
			backToTop: "Başa dön"
		},
		caseStudy: {
			back: "Tüm işler",
			client: "Müşteri",
			sector: "Sektör",
			year: "Yıl",
			services: "Hizmetler",
			next: "Sonraki vaka",
			placeholderNotice: "Bu sayfa bir yer tutucudur. Gerçek proje içeriği eklenecek."
		},
		notFound: {
			metaTitle: "Sayfa bulunamadı | StackWD",
			title: "Bu sayfa katmanlar arasında kayboldu.",
			text: "Aradığınız adres taşınmış ya da hiç var olmamış olabilir.",
			cta: "Ana sayfaya dön"
		}
	},
	en: {
		services: {
			title: "Every layer a website needs.",
			lead: "From a single campaign page to a full web application, we take on the whole job with the same care, from idea to launch and beyond.",
			includesLabel: "Scope",
			items: {
				corporate: {
					title: "Corporate website",
					text: "Multi-page sites that tell your brand story clearly, are easy to update and can be found in search.",
					includes: [
						"Content architecture",
						"Multilingual setup",
						"Admin panel"
					]
				},
				landing: {
					title: "Landing page",
					text: "Fast conversion pages focused on a single goal, built for campaigns and launches.",
					includes: [
						"Message structure",
						"Forms and tracking",
						"Test-ready build"
					]
				},
				ecommerce: {
					title: "E-commerce",
					text: "Online stores that present your products through a clear shopping experience that earns trust.",
					includes: [
						"Catalog structure",
						"Payment integration",
						"Order flow"
					]
				},
				webapp: {
					title: "Web application",
					text: "Custom apps that move processes such as bookings, reservations or client portals into the browser.",
					includes: [
						"User accounts",
						"Database and API",
						"Admin screens"
					]
				},
				uiux: {
					title: "UI/UX design",
					text: "Interface design grounded in user flows, a design system and files ready for development.",
					includes: [
						"User flows",
						"Prototype",
						"Design system"
					]
				},
				redesign: {
					title: "Redesign",
					text: "Moving your current site to a modern, fast and consistent build while keeping its content and search rankings.",
					includes: [
						"Current state audit",
						"SEO migration plan",
						"Content migration"
					]
				},
				seo: {
					title: "SEO and performance",
					text: "Technical SEO, speed and accessibility improvements for sites that load slowly or stay invisible in search.",
					includes: [
						"Core Web Vitals",
						"Technical SEO",
						"Accessibility audit"
					]
				},
				care: {
					title: "Care and support",
					text: "Continuity after launch through updates, backups, security monitoring and small improvements.",
					includes: [
						"Updates and backups",
						"Security monitoring",
						"Content help"
					]
				}
			}
		},
		work: {
			eyebrow: "Selected work",
			title: "Every project starts with its own question.",
			lead: "Each case walks through the problem, the approach and the outcome.",
			viewCase: "View case",
			concept: "Concept work",
			placeholder: "Placeholder",
			coverPending: "Project image coming soon"
		},
		process: {
			title: "Four layers, one clear process.",
			lead: "What happens at each stage, and what you receive at the end of it, is clear from the start. You work directly with the same person throughout.",
			youLabel: "From you",
			deliverableLabel: "Delivered",
			steps: [
				{
					name: "Discovery",
					layer: "Strategy",
					text: "We start by listening to your business, your audience and your competitors, then agree on what the site must achieve.",
					you: "Your goals, plus any existing content and brand files.",
					deliverable: "Scope, sitemap and timeline."
				},
				{
					name: "Design",
					layer: "Interface",
					text: "Content structure and interface come first as wireframes, then as detailed design. Desktop and mobile are designed together.",
					you: "Feedback on the drafts.",
					deliverable: "Approved interface design and a clickable prototype."
				},
				{
					name: "Development",
					layer: "Code",
					text: "The design becomes fast, accessible code that is easy to update. You follow progress on a live preview link.",
					you: "Final content and notes on the preview.",
					deliverable: "A tested site, ready to launch."
				},
				{
					name: "Launch",
					layer: "Launch",
					text: "We set up the domain, hosting, analytics and search settings, then put the site live. Support continues after launch.",
					you: "Domain access and final approval.",
					deliverable: "Live site, a short guide and care options."
				}
			]
		},
		about: {
			title: "A small studio, direct communication.",
			statement: "StackWD is a one-person studio. The same person designs, builds and launches your project from start to finish.",
			body: "With no layers in between, decisions are quick, nothing gets lost in hand-offs and you always know who to reach. The studio exists to make solid, simple work that carries your brand online for years.",
			valuesTitle: "How we work",
			values: [
				{
					title: "Direct communication",
					text: "At every stage you talk to the same person, with no middlemen."
				},
				{
					title: "Measurable quality",
					text: "Speed, accessibility and SEO rely on measurement, not taste, and are tested before launch."
				},
				{
					title: "Transparency",
					text: "Scope, timeline and cost are agreed in writing from the start."
				},
				{
					title: "You own it",
					text: "The domain, content and source code are yours. You can continue with anyone, anytime."
				}
			]
		},
		faq: {
			title: "Frequently asked questions",
			lead: "If your question is not here, just write to us.",
			items: [
				{
					q: "How long does a website project take?",
					a: "It depends on the scope. A single landing page and a multilingual corporate site do not follow the same timeline. After the first call we share a written, stage-by-stage schedule."
				},
				{
					q: "How is pricing done?",
					a: "Each project is priced by scope. After the discovery call we send a written proposal that lists exactly what is included. Anything outside that scope is discussed in advance."
				},
				{
					q: "Who prepares the content?",
					a: "You can provide the text and images. We guide you on content structure and page headings. If copywriting is needed, it appears as a separate line in the proposal."
				},
				{
					q: "Can I update the site myself after launch?",
					a: "Yes. When needed, an easy-to-use content management panel is set up and a short guide is included."
				},
				{
					q: "Who owns the domain and hosting?",
					a: "You do. Accounts are opened under your control and we set them up together."
				},
				{
					q: "Will a redesign affect our search rankings?",
					a: "With a well-planned migration, rankings are preserved. Old addresses are redirected to new pages, metadata is carried over and results are monitored after the switch."
				},
				{
					q: "Is working with a one-person studio a risk?",
					a: "A fair question. That is why the source code, accounts and documents stay in your hands from day one. The process is documented, so another developer could pick it up if ever needed."
				}
			]
		},
		contact: {
			eyebrow: "Contact",
			title: "Let’s talk about your project.",
			lead: "Tell us in a few sentences what you want to build. Your message goes straight to the studio and is answered personally.",
			channelsTitle: "Reach out directly",
			email: "Email",
			whatsapp: "WhatsApp",
			phone: "Phone",
			form: {
				name: "Your name",
				email: "Your email",
				company: "Company",
				optional: "optional",
				type: "Project type",
				typePlaceholder: "Choose an option",
				typeUnsure: "Not sure yet",
				message: "Tell us briefly about your project",
				messageHelp: "Your goal, your current site if any, and the timing you have in mind are enough.",
				privacy: "The information in this form is used only to reply to your request.",
				submit: "Send message",
				sending: "Sending",
				successTitle: "Your message has arrived.",
				successText: "Thank you. The reply will go to the email address you entered.",
				error: "The message could not be sent. Please try again or send an email directly.",
				errorName: "Please enter your name.",
				errorEmail: "Enter a valid email address.",
				errorType: "Please choose a project type.",
				errorMessage: "The message is too short. Describe your project in at least 20 characters."
			}
		},
		footer: {
			tagline: "Websites built layer by layer.",
			nav: "Sitemap",
			contact: "Contact",
			rights: "All rights reserved.",
			backToTop: "Back to top"
		},
		caseStudy: {
			back: "All work",
			client: "Client",
			sector: "Sector",
			year: "Year",
			services: "Services",
			next: "Next case",
			placeholderNotice: "This page is a placeholder. The real project content will be added."
		},
		notFound: {
			metaTitle: "Page not found | StackWD",
			title: "This page got lost between the layers.",
			text: "The address may have moved, or it may never have existed.",
			cta: "Back to home"
		}
	},
	es: {
		services: {
			title: "Cada capa que necesita un sitio web.",
			lead: "Desde una página de campaña hasta una aplicación web completa, asumimos todo el trabajo con el mismo cuidado, de la idea al lanzamiento y después.",
			includesLabel: "Alcance",
			items: {
				corporate: {
					title: "Sitio corporativo",
					text: "Sitios de varias páginas que cuentan bien su marca, se actualizan con facilidad y se encuentran en los buscadores.",
					includes: [
						"Arquitectura de contenidos",
						"Estructura multilingüe",
						"Panel de gestión"
					]
				},
				landing: {
					title: "Landing page",
					text: "Páginas de conversión rápidas, centradas en un solo objetivo, para campañas y lanzamientos.",
					includes: [
						"Estructura del mensaje",
						"Formularios y medición",
						"Base lista para pruebas"
					]
				},
				ecommerce: {
					title: "Comercio electrónico",
					text: "Tiendas online que presentan sus productos con una experiencia de compra clara y confiable.",
					includes: [
						"Estructura del catálogo",
						"Integración de pagos",
						"Flujo de pedidos"
					]
				},
				webapp: {
					title: "Aplicación web",
					text: "Aplicaciones a medida que llevan al navegador procesos como citas, reservas o portales de clientes.",
					includes: [
						"Cuentas de usuario",
						"Base de datos y API",
						"Pantallas de gestión"
					]
				},
				uiux: {
					title: "Diseño UI/UX",
					text: "Diseño de interfaz basado en flujos de usuario, un sistema de diseño y archivos listos para desarrollo.",
					includes: [
						"Flujos de usuario",
						"Prototipo",
						"Sistema de diseño"
					]
				},
				redesign: {
					title: "Rediseño",
					text: "Llevar su sitio actual a una base moderna, rápida y coherente, conservando su contenido y su posicionamiento.",
					includes: [
						"Análisis del estado actual",
						"Plan de migración SEO",
						"Migración de contenidos"
					]
				},
				seo: {
					title: "SEO y rendimiento",
					text: "Mejoras técnicas de SEO, velocidad y accesibilidad para sitios lentos o poco visibles en los buscadores.",
					includes: [
						"Core Web Vitals",
						"SEO técnico",
						"Auditoría de accesibilidad"
					]
				},
				care: {
					title: "Mantenimiento y soporte",
					text: "Continuidad tras el lanzamiento con actualizaciones, copias de seguridad, seguridad y pequeñas mejoras.",
					includes: [
						"Actualizaciones y copias",
						"Supervisión de seguridad",
						"Apoyo con contenidos"
					]
				}
			}
		},
		work: {
			eyebrow: "Proyectos seleccionados",
			title: "Cada proyecto empieza con su propia pregunta.",
			lead: "Cada caso explica paso a paso el problema, el enfoque y el resultado.",
			viewCase: "Ver el caso",
			concept: "Trabajo conceptual",
			placeholder: "Marcador de posición",
			coverPending: "Imagen del proyecto próximamente"
		},
		process: {
			title: "Cuatro capas, un proceso claro.",
			lead: "Desde el principio está claro qué se hace en cada etapa y qué recibe al final. Durante todo el proceso trabaja directamente con la misma persona.",
			youLabel: "De su parte",
			deliverableLabel: "Entrega",
			steps: [
				{
					name: "Descubrimiento",
					layer: "Estrategia",
					text: "Empezamos escuchando sobre su negocio, su público y su competencia, y definimos juntos lo que el sitio debe lograr.",
					you: "Sus objetivos y, si existen, contenidos y archivos de marca.",
					deliverable: "Alcance, mapa del sitio y calendario."
				},
				{
					name: "Diseño",
					layer: "Interfaz",
					text: "La estructura de contenidos y la interfaz se definen primero en bocetos y luego en diseño detallado. Escritorio y móvil se diseñan a la vez.",
					you: "Comentarios sobre los bocetos.",
					deliverable: "Diseño de interfaz aprobado y prototipo navegable."
				},
				{
					name: "Desarrollo",
					layer: "Código",
					text: "El diseño se convierte en código rápido, accesible y fácil de actualizar. Puede seguir el avance en un enlace de vista previa.",
					you: "Contenidos finales y notas sobre la vista previa.",
					deliverable: "Un sitio probado y listo para publicar."
				},
				{
					name: "Lanzamiento",
					layer: "Lanzamiento",
					text: "Configuramos dominio, alojamiento, analítica y buscadores, y publicamos el sitio. El soporte continúa después del lanzamiento.",
					you: "Acceso al dominio y aprobación final.",
					deliverable: "Sitio publicado, guía breve y opciones de mantenimiento."
				}
			]
		},
		about: {
			title: "Un estudio pequeño, comunicación directa.",
			statement: "StackWD es un estudio de una sola persona. La misma persona diseña, desarrolla y publica su proyecto de principio a fin.",
			body: "Sin intermediarios, las decisiones son rápidas, nada se pierde entre traspasos y siempre sabe a quién dirigirse. El estudio existe para crear trabajos sólidos y sencillos que representen su marca en internet durante años.",
			valuesTitle: "Principios de trabajo",
			values: [
				{
					title: "Comunicación directa",
					text: "En cada etapa habla con la misma persona, sin intermediarios."
				},
				{
					title: "Calidad medible",
					text: "Velocidad, accesibilidad y SEO se basan en mediciones, no en gustos, y se prueban antes del lanzamiento."
				},
				{
					title: "Transparencia",
					text: "Alcance, calendario y coste quedan por escrito desde el principio."
				},
				{
					title: "La propiedad es suya",
					text: "El dominio, el contenido y el código fuente son suyos. Puede continuar con quien quiera, cuando quiera."
				}
			]
		},
		faq: {
			title: "Preguntas frecuentes",
			lead: "Si no encuentra aquí su respuesta, escríbanos directamente.",
			items: [
				{
					q: "¿Cuánto dura un proyecto web?",
					a: "Depende del alcance. Una landing page y un sitio corporativo multilingüe no siguen el mismo calendario. Tras la primera conversación compartimos un calendario escrito por etapas."
				},
				{
					q: "¿Cómo se calcula el precio?",
					a: "Cada proyecto se presupuesta según su alcance. Tras la reunión inicial enviamos una propuesta escrita que detalla todo lo incluido. Lo que quede fuera se habla antes."
				},
				{
					q: "¿Quién prepara los contenidos?",
					a: "Usted puede aportar textos e imágenes. Le orientamos sobre la estructura de contenidos y los títulos. Si hace falta redacción, figura como una partida aparte en la propuesta."
				},
				{
					q: "¿Podré actualizar el sitio yo mismo?",
					a: "Sí. Cuando hace falta, se instala un panel de gestión de contenidos sencillo y se entrega una guía breve."
				},
				{
					q: "¿A nombre de quién quedan el dominio y el alojamiento?",
					a: "A su nombre. Las cuentas se abren bajo su control y las configuramos juntos."
				},
				{
					q: "¿Un rediseño afectará a nuestro posicionamiento?",
					a: "Con una migración bien planificada, el posicionamiento se mantiene. Las direcciones antiguas se redirigen, los metadatos se trasladan y los resultados se siguen tras el cambio."
				},
				{
					q: "¿Es un riesgo trabajar con un estudio de una sola persona?",
					a: "Es una pregunta razonable. Por eso el código fuente, las cuentas y los documentos están en sus manos desde el primer día. El proceso queda documentado, así que otro desarrollador podría continuarlo si fuera necesario."
				}
			]
		},
		contact: {
			eyebrow: "Contacto",
			title: "Hablemos de su proyecto.",
			lead: "Cuéntenos en pocas frases lo que quiere hacer. Su mensaje llega directamente al estudio y se responde personalmente.",
			channelsTitle: "Contacto directo",
			email: "Correo",
			whatsapp: "WhatsApp",
			phone: "Teléfono",
			form: {
				name: "Su nombre",
				email: "Su correo electrónico",
				company: "Empresa",
				optional: "opcional",
				type: "Tipo de proyecto",
				typePlaceholder: "Elija una opción",
				typeUnsure: "Aún no lo sé",
				message: "Háblenos brevemente de su proyecto",
				messageHelp: "Basta con su objetivo, su sitio actual si lo tiene y el plazo que tiene en mente.",
				privacy: "La información de este formulario se usa solo para responder a su solicitud.",
				submit: "Enviar mensaje",
				sending: "Enviando",
				successTitle: "Su mensaje ha llegado.",
				successText: "Gracias. La respuesta llegará al correo que ha indicado.",
				error: "No se pudo enviar el mensaje. Inténtelo de nuevo o escriba directamente por correo.",
				errorName: "Escriba su nombre.",
				errorEmail: "Escriba un correo electrónico válido.",
				errorType: "Elija un tipo de proyecto.",
				errorMessage: "El mensaje es demasiado corto. Describa su proyecto en al menos 20 caracteres."
			}
		},
		footer: {
			tagline: "Sitios web construidos capa a capa.",
			nav: "Mapa del sitio",
			contact: "Contacto",
			rights: "Todos los derechos reservados.",
			backToTop: "Volver arriba"
		},
		caseStudy: {
			back: "Todos los proyectos",
			client: "Cliente",
			sector: "Sector",
			year: "Año",
			services: "Servicios",
			next: "Siguiente caso",
			placeholderNotice: "Esta página es un marcador de posición. Se añadirá el contenido real del proyecto."
		},
		notFound: {
			metaTitle: "Página no encontrada | StackWD",
			title: "Esta página se perdió entre las capas.",
			text: "Puede que la dirección haya cambiado o que nunca haya existido.",
			cta: "Volver al inicio"
		}
	}
};
var langs = Object.keys({
	tr: {
		label: "Türkçe",
		short: "TR",
		htmlLang: "tr",
		ogLocale: "tr_TR"
	},
	en: {
		label: "English",
		short: "EN",
		htmlLang: "en",
		ogLocale: "en_US"
	},
	es: {
		label: "Español",
		short: "ES",
		htmlLang: "es",
		ogLocale: "es_ES"
	}
});
//#endregion
//#region src/i18n/utils.ts
function isLang(value) {
	return !!value && langs.includes(value);
}
/** Dilin ana sayfa yolu. Varsayılan dil kökte yaşar. */
function homePath(lang) {
	return lang === "tr" ? "/" : `/${lang}/`;
}
//#endregion
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var MIN_FILL_MS = 3e3;
var WINDOW_MS = 6e5;
var MAX_PER_WINDOW = 5;
var hits = /* @__PURE__ */ new Map();
function rateLimited(key) {
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
	recent.push(now);
	hits.set(key, recent);
	return recent.length > MAX_PER_WINDOW;
}
var escapeHtml = (s) => s.replace(/[&<>"']/g, (ch) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[ch]);
var str = (v) => typeof v === "string" ? v.trim() : "";
var POST = async ({ request, clientAddress }) => {
	const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
	let lang = "tr";
	const reply = (ok, status, code) => {
		if (wantsJson) return new Response(JSON.stringify({
			ok,
			code
		}), {
			status,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		const target = `${homePath(lang)}?${ok ? "sent=1" : "error=1"}#contact`;
		return new Response(null, {
			status: 303,
			headers: { Location: target }
		});
	};
	let form;
	try {
		form = await request.formData();
	} catch {
		return reply(false, 400, "bad_request");
	}
	const rawLang = str(form.get("lang"));
	if (isLang(rawLang)) lang = rawLang;
	const honeypot = str(form.get("website"));
	const ts = Number(str(form.get("ts")));
	if (honeypot || ts && Date.now() - ts < MIN_FILL_MS) return reply(true, 200);
	let ip = "unknown";
	try {
		ip = clientAddress;
	} catch {}
	if (rateLimited(ip)) return reply(false, 429, "rate_limited");
	const name = str(form.get("name"));
	const email = str(form.get("email"));
	const company = str(form.get("company"));
	const type = str(form.get("type"));
	const message = str(form.get("message"));
	const typeValid = type === "unsure" || serviceKeys.includes(type);
	if (!name || name.length > 100 || !EMAIL_RE.test(email) || email.length > 200 || company.length > 120 || !typeValid || message.length < 20 || message.length > 5e3) return reply(false, 422, "invalid");
	const typeLabel = type === "unsure" ? content.tr.contact.form.typeUnsure : content.tr.services.items[type].title;
	const subject = `Yeni proje talebi: ${name}${company ? ` (${company})` : ""}`;
	const rows = [
		["Ad", name],
		["E-posta", email],
		["Şirket", company || "-"],
		["Proje türü", typeLabel],
		["Site dili", lang.toUpperCase()]
	];
	const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

${message}`;
	const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td style="color:#5a5e66">${k}</td><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(message)}</p>`;
	if (!RESEND_API_KEY) {
		console.error("[contact] RESEND_API_KEY tanımlı değil.");
		return reply(false, 503, "not_configured");
	}
	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from: CONTACT_FROM || "StackWD <onboarding@resend.dev>",
				to: [CONTACT_TO || site.contact.email],
				reply_to: email,
				subject,
				text,
				html
			})
		});
		if (!res.ok) {
			console.error("[contact] Resend hatası", res.status, await res.text());
			return reply(false, 502, "send_failed");
		}
	} catch (err) {
		console.error("[contact] Resend isteği başarısız", err);
		return reply(false, 502, "send_failed");
	}
	return reply(true, 200);
};
var ALL = () => new Response(null, {
	status: 405,
	headers: { Allow: "POST" }
});
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
