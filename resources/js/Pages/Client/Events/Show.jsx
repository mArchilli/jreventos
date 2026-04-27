import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_HERO = '/images/fondo-hero.jpg';

/* ─────────────────────────────────────────────
   SISTEMA DE TEMAS POR TIPO DE EVENTO
───────────────────────────────────────────── */
const THEMES = {
    xv: {
        keys: ['15', 'xv', 'quince'],
        hero: '/images/hero-xv.png',
        accent: '#f472b6',
        badge: 'Fiesta de XV',
        label: 'Tu noche de reina',
        tagline: 'El comienzo de la mejor etapa de tu vida',
        mood: 'Magia, brillo y una noche que vas a recordar para siempre. Porque los quince años solo se viven una vez.',
        ctaLabel: 'Quiero mis XV así',
        ctaQuestion: '¿Querés unos XV así?',
        ctaDesc: 'Hacemos realidad la fiesta de quince que siempre soñaste, desde la decoración hasta el último detalle de tu noche.',
        emotionalTitle: 'No es solo una fiesta. Es tu noche.',
        emotionalDesc: 'Los XV años son ese momento único donde la niña que fuiste se convierte en la mujer que serás. Merece una noche irrepetible, llena de magia, emoción y todos los detalles que siempre imaginaste.',
        differentials: ['Diseño personalizado desde cero', 'Coordinación completa el día del evento', 'Producción integral de decoración y ambientación', 'Experiencia en cientos de fiestas de quince'],
        styles: [
            { name: 'Princesa', desc: 'Tonos pastel, flores y detalles románticos', bg: '#f9a8d4' },
            { name: 'Glamour', desc: 'Dorado, negro y un toque de sofisticación', bg: '#c9a84c' },
            { name: 'Boho', desc: 'Rústico, natural y lleno de personalidad', bg: '#c4a07a' },
            { name: 'Minimalista', desc: 'Líneas limpias, elegancia en la sencillez', bg: '#94a3b8' },
        ],
    },
    casamiento: {
        keys: ['casamiento', 'boda', 'wedding', 'matrimonio'],
        hero: '/images/hero-bodas.png',
        accent: '#d4af7a',
        badge: 'Bodas & Casamientos',
        label: 'Tu gran día',
        tagline: 'Porque el amor merece la celebración perfecta',
        mood: 'Elegancia, emoción y recuerdos que perduran toda la vida. Cada detalle pensado para que solo pienses en disfrutarlo.',
        ctaLabel: 'Quiero mi boda así',
        ctaQuestion: '¿Tu gran día viene?',
        ctaDesc: 'Coordinamos cada detalle de tu boda para que solo tengas que disfrutar del momento más especial de tu vida.',
        emotionalTitle: 'El día más importante de tu vida merece ser perfecto.',
        emotionalDesc: 'Una boda no es solo una fiesta: es la celebración de una historia de amor. Cada flor, cada luz, cada canción debe contar algo de ustedes. Eso es lo que hacemos posible.',
        differentials: ['Wedding planning integral', 'Coordinación en tiempo real el día del evento', 'Proveedores de confianza con años de experiencia', 'Personalización total según su historia'],
        styles: [
            { name: 'Clásico', desc: 'Blanco, marfil y detalles atemporales', bg: '#e8dcc8' },
            { name: 'Romántico', desc: 'Flores, velas y una atmósfera íntima', bg: '#f4c2c2' },
            { name: 'Moderno', desc: 'Líneas contemporáneas y elegancia urbana', bg: '#94a3b8' },
            { name: 'Jardín', desc: 'Verde, natural y lleno de vida', bg: '#86efac' },
        ],
    },
    deportivo: {
        keys: ['deport', 'competenc', 'torneo', 'sport', 'futbol', 'fútbol', 'running'],
        hero: '/images/hero-deportivos.png',
        accent: '#4ade80',
        badge: 'Evento Deportivo',
        label: 'En la cancha',
        tagline: 'La energía del deporte, la producción de los grandes',
        mood: 'Adrenalina, pasión y una producción a la altura de los campeones. Transformamos tu competencia en un espectáculo.',
        ctaLabel: 'Quiero este evento',
        ctaQuestion: '¿Tenés un evento deportivo?',
        ctaDesc: 'Producción integral para competencias y encuentros: escenografía, sonido, comunicación y logística completa.',
        emotionalTitle: 'Donde el esfuerzo se convierte en espectáculo.',
        emotionalDesc: 'Un evento deportivo bien producido eleva la experiencia de atletas y espectadores. La energía del campo, amplificada por una producción profesional, crea momentos que se graban en la memoria.',
        differentials: ['Sonido e iluminación profesional para exteriores', 'Comunicación y cobertura en tiempo real', 'Logística y coordinación de espacios', 'Experiencia en torneos y competencias de alto nivel'],
        styles: [
            { name: 'Profesional', desc: 'Estética de grandes ligas deportivas', bg: '#1d4ed8' },
            { name: 'Universitario', desc: 'Energético, colorido y lleno de pasión', bg: '#16a34a' },
            { name: 'Comunitario', desc: 'Cercano, familiar y festivo', bg: '#f59e0b' },
            { name: 'Premium', desc: 'Gala deportiva de alto nivel', bg: '#6d28d9' },
        ],
    },
    empresarial: {
        keys: ['empresa', 'corporat', 'gala', 'lanzamiento', 'conferencia', 'congreso', 'jornada'],
        hero: '/images/hero-empresarial.png',
        accent: '#60a5fa',
        badge: 'Evento Corporativo',
        label: 'Tu marca, en escena',
        tagline: 'Eventos corporativos que generan impacto y resultados',
        mood: 'Profesionalismo, creatividad y logística impecable. Tu empresa merece una puesta en escena que esté a la altura.',
        ctaLabel: 'Cotizar mi evento',
        ctaQuestion: '¿Planeás un evento corporativo?',
        ctaDesc: 'Jornadas, galas, lanzamientos y conferencias organizadas con los más altos estándares de producción.',
        emotionalTitle: 'Tu marca merece una puesta en escena de primer nivel.',
        emotionalDesc: 'Un evento corporativo bien ejecutado no solo transmite profesionalismo: construye cultura, genera conexiones y potencia el impacto de tu mensaje. Cada detalle habla de quiénes son.',
        differentials: ['Producción audiovisual y escénica profesional', 'Planificación estratégica del evento', 'Logística integral y coordinación on-site', 'Experiencia con marcas líderes de la región'],
        styles: [
            { name: 'Corporativo', desc: 'Serio, impecable y con identidad de marca', bg: '#1e40af' },
            { name: 'Gala', desc: 'Elegancia y distinción en cada detalle', bg: '#b45309' },
            { name: 'Moderno', desc: 'Tecnología, innovación y diseño de vanguardia', bg: '#0f766e' },
            { name: 'Outdoor', desc: 'Frescura y dinamismo fuera de la oficina', bg: '#15803d' },
        ],
    },
    egresados: {
        keys: ['egresad', 'upd', 'graduac', 'promoci'],
        hero: '/images/hero-egresados.png',
        accent: '#a78bfa',
        badge: 'Fiesta de Egresados',
        label: 'El cierre más épico',
        tagline: 'Cerrá una etapa con la fiesta que siempre soñaste',
        mood: 'Amistad, música y una noche que marca el inicio de lo que viene. El mejor final para la mejor etapa de tu vida.',
        ctaLabel: 'Quiero mi fiesta así',
        ctaQuestion: '¿Se vienen los egresados?',
        ctaDesc: 'Organizamos la fiesta de egresados perfecta: producción, música, decoración y todo lo que necesitás.',
        emotionalTitle: 'El final épico que esta etapa se merece.',
        emotionalDesc: 'Años de esfuerzo, momentos compartidos, amigos de por vida. La fiesta de egresados es el cierre perfecto antes de que cada uno tome su propio camino. Que sea una noche que nadie olvide.',
        differentials: ['Producción pensada para grupos grandes', 'DJ y animación de primer nivel', 'Coordinación con delegados del curso', 'Precios accesibles sin sacrificar calidad'],
        styles: [
            { name: 'Fiesta total', desc: 'Energía máxima, luces y una pista que no para', bg: '#7c3aed' },
            { name: 'Gala elegante', desc: 'Sofisticación y glamour para cerrar con clase', bg: '#1e3a5f' },
            { name: 'Temática', desc: 'Un concepto creativo que da identidad al grupo', bg: '#b45309' },
            { name: 'Open air', desc: 'Al aire libre, con toda la libertad del verano', bg: '#0f766e' },
        ],
    },
    cumple: {
        keys: ['cumpleaños', 'cumpleanos', 'birthday', 'aniversario'],
        hero: '/images/hero-cumpleaños.png',
        accent: '#fde047',
        badge: 'Cumpleaños',
        label: 'Tu fiesta',
        tagline: 'Porque cada año merece ser celebrado a lo grande',
        mood: 'Diversión, música y momentos únicos. Hacemos de tu cumpleaños una experiencia que supera todas las expectativas.',
        ctaLabel: 'Quiero mi fiesta así',
        ctaQuestion: '¿Se viene tu cumpleaños?',
        ctaDesc: 'Desde el concepto hasta el último detalle, nos encargamos de que tu fiesta sea exactamente lo que imaginaste.',
        emotionalTitle: 'Tu cumpleaños, tu historia. Celebrala en grande.',
        emotionalDesc: 'Un cumpleaños no es solo otro año más: es una excusa perfecta para juntar a los que amás y crear una noche memorable. Nosotros nos encargamos de que todo salga perfecto para que vos solo disfrutes.',
        differentials: ['Concepto personalizado según tu estilo', 'Decoración a medida y producción integral', 'DJ, animación y shows en vivo', 'Coordinación total el día del festejo'],
        styles: [
            { name: 'Íntimo', desc: 'Cena privada con ambiente cálido y personal', bg: '#92400e' },
            { name: 'Festivo', desc: 'Colores, música y energía al máximo', bg: '#c2410c' },
            { name: 'Glam', desc: 'Elegancia y sofisticación para brillar', bg: '#be185d' },
            { name: 'Temático', desc: 'Un concepto creativo que te define', bg: '#1d4ed8' },
        ],
    },
    infantil: {
        keys: ['infantil', 'niño', 'nino', 'nena', 'niña', 'kids', 'bautismo', 'baby'],
        hero: '/images/hero-infantiles.png',
        accent: '#fb923c',
        badge: 'Fiesta Infantil',
        label: 'Su día especial',
        tagline: 'La magia de la infancia convertida en fiesta',
        mood: 'Diversión sin límites, sorpresas y sonrisas que duran para siempre. Creamos un mundo mágico para el protagonista del día.',
        ctaLabel: 'Quiero esta fiesta',
        ctaQuestion: '¿Se viene la fiesta?',
        ctaDesc: 'Animación, decoración temática y toda la producción para que el festejado tenga el día más especial de su vida.',
        emotionalTitle: 'Un mundo mágico para el protagonista del día.',
        emotionalDesc: 'La infancia está hecha de momentos que se recuerdan para siempre. Una fiesta bien organizada, llena de color, juego y sorpresas, se convierte en uno de esos momentos especiales que llevan guardados toda la vida.',
        differentials: ['Animación especializada para niños', 'Decoración temática 100% personalizada', 'Producción segura y adaptada a todas las edades', 'Coordinación para que los papás también disfruten'],
        styles: [
            { name: 'Superhéroes', desc: 'Aventura, poder y mucha acción', bg: '#1d4ed8' },
            { name: 'Princesas', desc: 'Magia, colores pastel y coronas', bg: '#db2777' },
            { name: 'Naturaleza', desc: 'Animales, flores y mundo natural', bg: '#16a34a' },
            { name: 'Personaje favorito', desc: 'El universo de lo que más les gusta', bg: '#d97706' },
        ],
    },
};

const DEFAULT_THEME = {
    hero: '/images/fondo-hero.jpg',
    accent: '#fde047',
    badge: 'Producción JR Eventos',
    label: 'Experiencias únicas',
    tagline: 'Creamos sensaciones que perduran',
    mood: 'Cada evento es una historia que merece ser contada con pasión, creatividad y un equipo comprometido de principio a fin.',
    ctaLabel: 'Quiero un evento así',
    ctaQuestion: '¿Querés un evento así?',
    ctaDesc: 'Coordinamos cada detalle para que tu evento sea exactamente como lo soñaste.',
    emotionalTitle: 'Cada evento es una historia única.',
    emotionalDesc: 'No existe un evento igual a otro. Cada celebración tiene su propia energía, sus propias emociones y sus propios protagonistas. Nuestro trabajo es capturar esa esencia y llevarla al máximo nivel.',
    differentials: ['Producción integral de principio a fin', 'Diseño y concepto personalizado', 'Coordinación completa el día del evento', 'Experiencia en todo tipo de eventos'],
    styles: [
        { name: 'Elegante', desc: 'Clásico, sofisticado y atemporal', bg: '#1e3a5f' },
        { name: 'Moderno', desc: 'Vanguardista y con diseño contemporáneo', bg: '#0f172a' },
        { name: 'Festivo', desc: 'Colorido, dinámico y lleno de energía', bg: '#c2410c' },
        { name: 'Íntimo', desc: 'Cálido, personal y cercano', bg: '#92400e' },
    ],
};

function getTheme(title = '') {
    const lower = title.toLowerCase();
    for (const theme of Object.values(THEMES)) {
        if (theme.keys.some((k) => lower.includes(k))) return theme;
    }
    return DEFAULT_THEME;
}

const WA_MSG = encodeURIComponent('Hola, vi un evento en su página y quiero planificar algo similar con JR Eventos');

export default function EventsShow({ event, relatedEvents = [] }) {
    const images = event.images ?? [];
    const theme = getTheme(event.title);
    const heroImg = event.hero_image?.image_path
        ? `/${event.hero_image.image_path}`
        : (theme.hero ?? FALLBACK_HERO);

    const timeline     = event.timeline     ?? [];
    const includes     = event.includes     ?? [];
    const testimonials = event.testimonials ?? [];

    const featureImages = images.length >= 4 ? images.slice(1, 4) : [];
    const galleryImages = images.length >= 4 ? images.slice(4) : images.slice(1);

    const [lightbox, setLightbox] = useState(null);
    const [lightboxIdx, setLightboxIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [pinch, setPinch] = useState({ dist: null, startZoom: 1 });

    const openLightbox = (idx) => { setLightboxIdx(idx); setLightbox(`/${images[idx].image_path}`); setZoom(1); };
    const closeLightbox = () => { setLightbox(null); setZoom(1); };
    const prevImg = () => { const idx = (lightboxIdx - 1 + images.length) % images.length; setLightboxIdx(idx); setLightbox(`/${images[idx].image_path}`); setZoom(1); };
    const nextImg = () => { const idx = (lightboxIdx + 1) % images.length; setLightboxIdx(idx); setLightbox(`/${images[idx].image_path}`); setZoom(1); };

    const getTouchDist = (touches) => Math.sqrt(
        (touches[0].clientX - touches[1].clientX) ** 2 +
        (touches[0].clientY - touches[1].clientY) ** 2
    );

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && lightbox) prevImg();
            if (e.key === 'ArrowRight' && lightbox) nextImg();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox, lightboxIdx]);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    return (
        <>
            <Head title={event.title} />
            <Navbar />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden">
                <img src={heroImg} alt={event.title} className="absolute inset-0 h-full w-full object-cover object-center" style={{ transform: 'scale(1.06)', transformOrigin: 'center center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 0% 100%, ${theme.accent}22 0%, transparent 65%)` }} />
                <div className="absolute top-0 left-0 right-0 pt-28 px-8 lg:px-32 z-10">
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/35">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <Link href={route('eventos.index')} className="hover:text-white transition-colors">Eventos</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <span className="truncate max-w-[200px]" style={{ color: `${theme.accent}cc` }}>{event.title}</span>
                    </nav>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-32 pb-16 lg:pb-24 z-10">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase" style={{ background: `${theme.accent}22`, color: theme.accent, border: `1px solid ${theme.accent}44` }}>
                            {theme.badge}
                        </span>
                    </div>
                    <p className="text-sm font-black tracking-[0.4em] uppercase mb-3" style={{ color: `${theme.accent}bb` }}>{theme.label}</p>
                    <h1 className="font-black text-white leading-none tracking-tight uppercase" style={{ fontSize: 'clamp(38px, 8vw, 120px)', wordBreak: 'break-word' }}>{event.title}</h1>
                    <p className="mt-4 text-white/50 font-medium leading-relaxed" style={{ fontSize: 'clamp(15px, 1.5vw, 20px)', maxWidth: '600px' }}>{theme.tagline}</p>
                    {images.length > 0 && (
                        <p className="mt-5 text-xs text-white/25 font-bold tracking-[0.3em] uppercase">{images.length} {images.length === 1 ? 'fotografía' : 'fotografías'}</p>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${theme.accent}60, transparent 60%)` }} />
            </section>

            <main className="bg-black text-white">

                {/* MOOD STATEMENT */}
                <section className="px-8 lg:px-32 py-14 border-b border-white/5">
                    <div className="flex items-start gap-6">
                        <div className="w-1 flex-shrink-0 rounded-full mt-1" style={{ background: theme.accent, height: '64px' }} />
                        <p className="font-light italic leading-relaxed text-white/65" style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}>
                            "{theme.mood}"
                        </p>
                    </div>
                </section>

                {/* DESCRIPCIÓN + CTA STICKY */}
                <section className="px-8 lg:px-32 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-black tracking-[0.3em] uppercase mb-5" style={{ color: theme.accent }}>Sobre el evento</p>
                            {event.description ? (
                                <div className="text-white/65 text-lg leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />
                            ) : (
                                <p className="text-white/40 text-lg leading-relaxed italic">Cada evento que realizamos es el resultado de semanas de planificación, creatividad y dedicación. Contactanos para conocer todos los detalles y cómo podemos crear algo igual para vos.</p>
                            )}
                        </div>
                        <div className="lg:col-span-5 lg:sticky lg:top-28">
                            <div className="rounded-2xl border p-8 flex flex-col gap-6" style={{ background: `linear-gradient(135deg, ${theme.accent}0a 0%, #111 100%)`, borderColor: `${theme.accent}25` }}>
                                <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${theme.accent}60, transparent)` }} />
                                <div>
                                    <p className="text-xs font-black tracking-[0.2em] text-white/40 uppercase mb-2">{theme.ctaQuestion}</p>
                                    <h3 className="text-xl font-extrabold tracking-tight leading-snug">{theme.ctaDesc}</h3>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="flex flex-col gap-3">
                                    <a href={`https://wa.me/?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 font-extrabold py-4 px-6 rounded-full text-base hover:scale-[1.02] active:scale-95 transition-all" style={{ background: theme.accent, color: '#000', boxShadow: `0 8px 32px ${theme.accent}30` }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        {theme.ctaLabel}
                                    </a>
                                    <Link href={route('eventos.index')} className="flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white/50 font-bold py-4 px-6 rounded-full text-sm hover:bg-white/5 hover:text-white hover:border-white/20 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                                        Ver más eventos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOQUE EMOCIONAL + DIFERENCIAL */}
                <section className="px-8 lg:px-32 py-20 border-t border-white/5" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <p className="text-xs font-black tracking-[0.3em] uppercase mb-5" style={{ color: theme.accent }}>Por qué elegirnos</p>
                            <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight uppercase mb-6">
                                {theme.emotionalTitle}
                            </h2>
                            <p className="text-white/55 text-lg leading-relaxed mb-10">
                                {theme.emotionalDesc}
                            </p>
                            <ul className="flex flex-col gap-4">
                                {theme.differentials.map((d, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: `${theme.accent}20`, border: `1px solid ${theme.accent}40` }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: theme.accent }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-white/75 font-medium leading-relaxed">{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl p-8 lg:p-10 flex flex-col gap-6" style={{ background: `linear-gradient(135deg, ${theme.accent}12 0%, #111 100%)`, border: `1px solid ${theme.accent}30` }}>
                            <div className="w-12 h-1 rounded-full" style={{ background: theme.accent }} />
                            <h3 className="text-2xl lg:text-3xl font-black tracking-tight leading-snug uppercase">{theme.ctaQuestion}</h3>
                            <p className="text-white/55 leading-relaxed">{theme.ctaDesc}</p>
                            <div className="mt-2">
                                <a href={`https://wa.me/?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-extrabold py-4 px-8 rounded-full text-base hover:scale-105 active:scale-95 transition-all" style={{ background: theme.accent, color: '#000', boxShadow: `0 8px 40px ${theme.accent}35` }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    Consultá sin compromiso
                                </a>
                            </div>
                            <div className="flex flex-col gap-2 pt-2 border-t border-white/8">
                                {['Respuesta rápida por WhatsApp', 'Presupuesto sin compromiso', 'Más de 10 años de experiencia'].map((t) => (
                                    <p key={t} className="text-xs text-white/35 font-medium flex items-center gap-2">
                                        <span style={{ color: theme.accent }}>✓</span> {t}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* TIMELINE */}
                {timeline.length > 0 && (
                    <section className="px-8 lg:px-32 py-20 border-t border-white/5">
                        <div className="mb-14">
                            <p className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>Cómo se vive</p>
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase">
                                La experiencia, <span style={{ color: theme.accent }}>paso a paso</span>
                            </h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-px hidden lg:block" style={{ background: `linear-gradient(to bottom, ${theme.accent}60, transparent)` }} />
                            <div className="flex flex-col gap-0">
                                {timeline.map((step, i) => (
                                    <div key={i} className="relative flex gap-8 lg:gap-12 items-start group">
                                        <div className="flex-shrink-0 relative z-10">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-110" style={{ background: `${theme.accent}15`, border: `2px solid ${theme.accent}40`, color: theme.accent }}>
                                                {step.step}
                                            </div>
                                        </div>
                                        <div className="pb-12 flex-1">
                                            <h3 className="font-extrabold text-lg uppercase tracking-tight mb-2 group-hover:text-white transition-colors" style={{ color: `${theme.accent}cc` }}>{step.title}</h3>
                                            <p className="text-white/50 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FEATURE SPREAD */}
                {featureImages.length >= 2 && (
                    <section className="px-8 lg:px-32 pb-20">
                        <div className="grid gap-3" style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: featureImages.length >= 3 ? '1fr 1fr' : '1fr' }}>
                            <button onClick={() => openLightbox(1)} className="group relative overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none" style={{ gridRow: featureImages.length >= 3 ? 'span 2' : 'span 1' }}>
                                <img src={`/${featureImages[0].image_path}`} alt="Imagen destacada" className="w-full h-full object-cover min-h-[300px] lg:min-h-[480px] transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 rounded-2xl" />
                                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: theme.accent, color: '#000' }}>Ver foto</div>
                            </button>
                            {featureImages.slice(1).map((img, i) => (
                                <button key={img.id} onClick={() => openLightbox(i + 2)} className="group relative overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none">
                                    <img src={`/${img.image_path}`} alt={`Detalle ${i + 2}`} className="w-full h-full object-cover min-h-[140px] lg:min-h-0 transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* GALERÍA MASONRY */}
                {(galleryImages.length > 0 || (featureImages.length === 0 && images.length > 1)) && (() => {
                    const toShow = galleryImages.length > 0 ? galleryImages : images.slice(1);
                    const offset = galleryImages.length > 0 ? (images.length - galleryImages.length) : 1;
                    return (
                        <section className="px-8 lg:px-32 pb-28">
                            <div className="flex items-end justify-between mb-10">
                                <div>
                                    <p className="text-xs font-black tracking-[0.3em] uppercase mb-2" style={{ color: theme.accent }}>Galería</p>
                                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight uppercase">Momentos del <span style={{ color: theme.accent }}>evento</span></h2>
                                </div>
                                <span className="text-white/20 text-xs font-bold tracking-widest uppercase hidden lg:block">{images.length} fotos</span>
                            </div>
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
                                {toShow.map((img, idx) => (
                                    <button key={img.id} onClick={() => openLightbox(idx + offset)} className="group relative block w-full overflow-hidden rounded-xl cursor-zoom-in focus:outline-none break-inside-avoid">
                                        <img src={`/${img.image_path}`} alt={`Fotografía ${idx + 1}`} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 rounded-xl" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="rounded-full p-3" style={{ background: `${theme.accent}33`, backdropFilter: 'blur(8px)' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: theme.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    );
                })()}

                {/* ESTILOS DEL EVENTO */}
                <section className="px-8 lg:px-32 py-20 border-t border-white/5">
                    <div className="mb-12">
                        <p className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>Estética & concepto</p>
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase">
                            Encontrá tu <span style={{ color: theme.accent }}>estilo ideal</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {theme.styles.map((style, i) => (
                            <div key={i} className="group rounded-2xl p-6 border border-white/8 hover:border-white/20 transition-all duration-300 cursor-default" style={{ background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)' }}>
                                <div className="w-8 h-8 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: style.bg }} />
                                <h3 className="font-black text-base uppercase tracking-tight mb-1 group-hover:text-white transition-colors" style={{ color: `${theme.accent}cc` }}>{style.name}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{style.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* QUÉ INCLUYE */}
                {includes.length > 0 && (
                    <section className="px-8 lg:px-32 py-20 border-t border-white/5" style={{ background: 'linear-gradient(180deg, #050505 0%, #000 100%)' }}>
                        <div className="mb-12">
                            <p className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>Producción completa</p>
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase">
                                Todo lo que <span style={{ color: theme.accent }}>incluye</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {includes.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-4 border border-white/6 hover:border-white/15 transition-all" style={{ background: '#0d0d0d' }}>
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${theme.accent}15` }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme.accent }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-white/75 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* TESTIMONIOS */}
                {testimonials.length > 0 && (
                    <section className="px-8 lg:px-32 py-20 border-t border-white/5">
                        <div className="mb-12">
                            <p className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: theme.accent }}>Lo que dicen</p>
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase">
                                Experiencias <span style={{ color: theme.accent }}>reales</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {testimonials.map((t, i) => (
                                <div key={i} className="rounded-2xl p-8 border border-white/8 hover:border-white/15 transition-all duration-300 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)' }}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(to bottom, ${theme.accent}, ${theme.accent}20)` }} />
                                    <div className="text-5xl font-black leading-none mb-4 opacity-20" style={{ color: theme.accent }}>"</div>
                                    <p className="text-white/65 leading-relaxed mb-6 text-lg italic">"{t.text}"</p>
                                    <div>
                                        <p className="font-extrabold text-white text-sm">{t.name}</p>
                                        <p className="text-xs font-medium mt-0.5" style={{ color: `${theme.accent}99` }}>{t.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* BANNER CTA */}
                <section className="mx-8 lg:mx-32 mb-24 rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${theme.accent}18 0%, #111 60%)`, border: `1px solid ${theme.accent}25` }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 80% at 0% 50%, ${theme.accent}15, transparent)` }} />
                    <div className="relative px-8 lg:px-16 py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div>
                            <p className="text-xs font-black tracking-[0.35em] uppercase mb-3" style={{ color: theme.accent }}>¿Te inspiró este evento?</p>
                            <h3 className="font-black text-white leading-none tracking-tight uppercase" style={{ fontSize: 'clamp(26px, 4vw, 56px)' }}>
                                Hacemos el tuyo<br /><span style={{ color: theme.accent }}>igual de épico</span>
                            </h3>
                        </div>
                        <a href={`https://wa.me/?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-3 font-extrabold py-4 px-9 rounded-full text-base hover:scale-105 active:scale-95 transition-all" style={{ background: theme.accent, color: '#000', boxShadow: `0 8px 40px ${theme.accent}35` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            Empezar a planificar
                        </a>
                    </div>
                </section>

                {/* EVENTOS RELACIONADOS */}
                {relatedEvents.length > 0 && (
                    <section className="border-t border-white/5 px-8 lg:px-32 py-24">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <p className="text-xs font-black tracking-[0.3em] uppercase mb-2" style={{ color: theme.accent }}>También te puede interesar</p>
                                <h2 className="text-3xl font-extrabold tracking-tighter uppercase">Otros <span style={{ color: theme.accent }}>eventos</span></h2>
                            </div>
                            <Link href={route('eventos.index')} className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest text-white/30 hover:text-white transition-colors">
                                VER TODOS
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {relatedEvents.map((item) => {
                                const cover = item.card_image?.image_path
                                    ? `/${item.card_image.image_path}`
                                    : (item.images?.[0]?.image_path ? `/${item.images[0].image_path}` : null);
                                const relTheme = getTheme(item.title);
                                return (
                                    <Link key={item.id} href={route('eventos.show', item.id)} className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 hover:border-white/15 transition-all duration-300">
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            {cover ? (
                                                <img src={cover} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-90" />
                                            ) : (
                                                <div className="h-full w-full bg-white/5" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-[9px] font-black tracking-[0.3em] uppercase mb-2 block" style={{ color: relTheme.accent }}>{relTheme.badge}</span>
                                            <h3 className="font-extrabold text-base leading-tight tracking-tight uppercase line-clamp-2 mb-4">{item.title}</h3>
                                            <span className="text-xs font-bold tracking-widest uppercase group-hover:underline" style={{ color: relTheme.accent }}>Ver evento →</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            </main>

            <Footer />

            {/* CTA FIJO MOBILE */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                <a href={`https://wa.me/?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full font-extrabold py-4 px-6 rounded-full text-base active:scale-95 transition-all" style={{ background: theme.accent, color: '#000', boxShadow: `0 8px 40px ${theme.accent}50` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {theme.ctaLabel}
                </a>
            </div>

            {/* LIGHTBOX */}
            {lightbox && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-black/96 backdrop-blur-md" onClick={closeLightbox}>
                    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3" onClick={(e) => e.stopPropagation()}>
                        <span className="text-sm text-white/40 tabular-nums font-medium">{lightboxIdx + 1} / {images.length}</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setZoom((z) => Math.max(1, parseFloat((z - 0.25).toFixed(2))))} disabled={zoom <= 1} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-30 focus:outline-none" aria-label="Alejar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" /></svg>
                            </button>
                            <span className="w-12 text-center text-xs font-medium text-white/50 tabular-nums">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom((z) => Math.min(4, parseFloat((z + 0.25).toFixed(2))))} disabled={zoom >= 4} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-30 focus:outline-none" aria-label="Acercar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                            </button>
                            {zoom !== 1 && (
                                <button onClick={() => setZoom(1)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/25 focus:outline-none">Restablecer</button>
                            )}
                            <button onClick={closeLightbox} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none" aria-label="Cerrar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="relative flex flex-1 items-center justify-center overflow-auto p-6" onClick={closeLightbox}>
                        {images.length > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none" aria-label="Anterior">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                            </button>
                        )}
                        <img src={lightbox} alt="" className="rounded-xl shadow-2xl object-contain transition-all duration-150"
                            style={{ touchAction: 'none', ...(zoom === 1 ? { maxWidth: '90vw', maxHeight: 'calc(100vh - 100px)' } : { width: `${zoom * 70}vw`, maxWidth: 'none', maxHeight: 'none' }) }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={(e) => { if (e.touches.length === 2) setPinch({ dist: getTouchDist(e.touches), startZoom: zoom }); }}
                            onTouchMove={(e) => { if (e.touches.length === 2 && pinch.dist) { const ratio = getTouchDist(e.touches) / pinch.dist; setZoom(Math.min(4, Math.max(1, parseFloat((pinch.startZoom * ratio).toFixed(2))))); } }}
                            onTouchEnd={() => setPinch({ dist: null, startZoom: 1 })}
                        />
                        {images.length > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none" aria-label="Siguiente">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
