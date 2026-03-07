import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* ─── Hook: fade-in al hacer scroll ─────────────────────────── */
function useFadeIn(threshold = 0.12) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return ref;
}

/* ─── Pilares / valores ──────────────────────────────────────── */
const pillars = [
    {
        title: 'Creatividad sin límites',
        desc: 'Cada evento es una oportunidad para sorprender. Diseñamos propuestas originales que reflejan la identidad de tu marca o celebración, convirtiéndolas en experiencias visuales y emocionales únicas.',
    },
    {
        title: 'Compromiso total',
        desc: 'Desde la primera reunión hasta el último aplauso, acompañamos cada etapa con dedicación absoluta. Tu tranquilidad es nuestra prioridad: nos encargamos de cada detalle para que vos solo disfrutes.',
    },
    {
        title: 'Excelencia en producción',
        desc: 'Contamos con tecnología profesional, equipo técnico especializado y proveedores de primer nivel para garantizar que cada evento supere las expectativas en sonido, iluminación, escenografía y logística.',
    },
];

export default function About({ auth }) {
    const heroRef    = useFadeIn(0.05);
    const mediaRef   = useFadeIn(0.1);
    const pillarsRef = useFadeIn(0.1);
    const splitRef   = useFadeIn(0.12);
    const ctaRef     = useFadeIn(0.12);

    return (
        <>
            <Head>
                <title>Sobre Nosotros | JR Eventos — Productora de Eventos en Argentina</title>
                <meta
                    name="description"
                    content="JR Eventos es una productora de eventos profesionales en Argentina. Especializados en eventos corporativos, sociales y artísticos. Creatividad, tecnología y producción de excelencia."
                />
                <meta
                    name="keywords"
                    content="productora de eventos Argentina, organización de eventos corporativos, eventos sociales, producción de shows, JR Eventos"
                />
            </Head>

            <Navbar auth={auth} />

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 1 — HERO CENTRADO (estilo screenshot)
            ══════════════════════════════════════════════════════════ */}
            <section
                className="relative w-full overflow-hidden pt-36 pb-20 px-8 text-center"
                style={{ background: 'linear-gradient(160deg, #05001a 0%, #0d0030 40%, #080d2a 75%, #02080f 100%)' }}
            >
                {/* Glow central */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-25"
                    style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.55) 0%, transparent 65%)' }}
                />

                <div ref={heroRef} className="fade-in-up relative z-10 mx-auto max-w-4xl flex flex-col items-center gap-7">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 border border-white/10">
                        <span className="text-yellow-400 text-sm">✦</span>
                        <span className="text-xs font-semibold text-white/70 tracking-widest uppercase">Sobre Nosotros</span>
                    </div>

                    {/* H1 — SEO principal */}
                    <h1 className="text-5xl font-black leading-[0.9] tracking-tight text-white uppercase lg:text-7xl xl:text-8xl">
                        Producimos<br />
                        <span className="text-yellow-300">experiencias</span><br />
                        extraordinarias
                    </h1>

                    {/* Descripción SEO */}
                    <p className="max-w-2xl text-lg text-white/60 leading-relaxed">
                        En <strong className="text-white font-semibold">JR Eventos</strong> transformamos ideas en momentos que perduran.
                        Somos una productora integral especializada en eventos corporativos, sociales y artísticos en Argentina,
                        con más de una década de experiencia creando experiencias que conectan marcas con personas.
                    </p>

                    {/* CTA */}
                    <a
                        href="/shows-servicios"
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-yellow-400/30 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        Conocer nuestros servicios
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 2 — IMAGEN DESTACADA (estilo screenshot)
            ══════════════════════════════════════════════════════════ */}
            <section
                className="relative w-full px-8 pb-24 overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #02080f 0%, #000000 100%)' }}
            >
                <div ref={mediaRef} className="fade-in-up mx-auto max-w-screen-xl">
                    <div
                        className="relative w-full rounded-3xl overflow-hidden"
                        style={{
                            border: '2px solid rgba(168,85,247,0.35)',
                            boxShadow: '0 0 60px rgba(168,85,247,0.15), 0 0 120px rgba(168,85,247,0.07)',
                        }}
                    >
                        <img
                            src="/images/about-banner.jpg"
                            alt="Producción profesional de eventos — JR Eventos Argentina"
                            className="w-full h-auto max-h-[560px] object-cover"
                            onError={(e) => {
                                e.target.parentElement.style.minHeight = '420px';
                                e.target.parentElement.style.background =
                                    'linear-gradient(135deg, #1a0035 0%, #1e1060 50%, #0a1a4a 100%)';
                                e.target.style.display = 'none';
                            }}
                        />
                        {/* Overlay con texto flotante */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                            <div>
                                <span className="text-xs font-semibold text-white/50 tracking-widest uppercase">Producción integral</span>
                                <p className="text-2xl font-black text-white leading-tight">Cada evento, una obra maestra.</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-5 py-2.5 border border-white/10">
                                <span className="text-yellow-300 text-lg">★★★★★</span>
                                <span className="text-sm font-medium text-white/80">+300 eventos realizados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 3 — 3 PILARES (estilo columnas del screenshot)
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black py-24 px-8 relative overflow-hidden">
                {/* Línea decorativa superior */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                <div ref={pillarsRef} className="fade-in-up mx-auto max-w-screen-xl">

                    {/* Header centrado */}
                    <div className="mb-16 flex flex-col items-center gap-3 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10">
                            <span className="text-yellow-400 text-sm">✦</span>
                            <span className="text-xs font-semibold text-white/60 tracking-widest uppercase">Lo que nos define</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase lg:text-5xl leading-tight">
                            Nuestros <span className="text-yellow-300">pilares</span>
                        </h2>
                    </div>

                    {/* Grid 3 columnas */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {pillars.map((p, i) => (
                            <article
                                key={p.title}
                                className="group flex flex-col items-center text-center gap-5 rounded-2xl border border-white/6 bg-white/[0.025] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.04]"
                                style={{ animationDelay: `${i * 120}ms` }}
                            >
                                {/* Número decorativo */}
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full border border-yellow-300/30 text-yellow-300 font-black text-lg"
                                    style={{ background: 'rgba(253,224,71,0.07)' }}
                                >
                                    0{i + 1}
                                </div>

                                <h3 className="text-xl font-bold text-white">{p.title}</h3>

                                {/* Divider */}
                                <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-yellow-300/60 to-purple-400/60" />

                                <p className="text-white/55 text-base leading-relaxed">{p.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Línea decorativa inferior */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 4 — SPLIT: imagen izq + headline derecha
                (estilo "RESPONSABILIDAD CON CONVICCIÓN" del screenshot)
            ══════════════════════════════════════════════════════════ */}
            <section
                className="py-24 px-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #08001f 0%, #0d0030 50%, #02080f 100%)' }}
            >
                {/* Glow ambiental */}
                <div
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.5) 0%, transparent 70%)' }}
                />

                <div ref={splitRef} className="fade-in-up relative z-10 mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

                        {/* LEFT — imagen con borde de color (igual screenshot) */}
                        <div className="relative">
                            <div
                                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                                style={{
                                    border: '2px solid rgba(168,85,247,0.4)',
                                    boxShadow: '0 0 50px rgba(168,85,247,0.12)',
                                }}
                            >
                                <img
                                    src="/images/about-story.jpg"
                                    alt="Equipo de JR Eventos en producción — eventos corporativos y sociales"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.parentElement.style.background =
                                            'linear-gradient(135deg, #1a0035 0%, #0a1a4a 100%)';
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
                            </div>
                            {/* Elemento decorativo esquina */}
                            <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl border border-yellow-300/15 bg-yellow-300/3" />
                        </div>

                        {/* RIGHT — headline grande con fondo destaque (estilo screenshot) */}
                        <div className="flex flex-col gap-7">

                            {/* Headline con "highlight" de fondo como en la screenshot */}
                            <h2 className="text-4xl font-black uppercase leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                                <span
                                    className="inline text-black px-2 py-0.5 leading-snug"
                                    style={{ background: 'linear-gradient(90deg, #fde047, #facc15)' }}
                                >
                                    PASIÓN Y DETALLE
                                </span>
                                <br />
                                <span
                                    className="inline text-black px-2 py-0.5 leading-snug mt-1"
                                    style={{ background: 'linear-gradient(90deg, #fde047, #facc15)' }}
                                >
                                    EN CADA EVENTO
                                </span>
                            </h2>

                            <p className="text-white/60 text-lg leading-relaxed">
                                Cada proyecto que tomamos es mucho más que una lista de tareas.
                                Es la historia de alguien que merece vivir algo único.
                                Por eso nos involucramos desde el concepto hasta el último instante,
                                asegurándonos de que cada persona que asista al evento lo recuerde para siempre.
                            </p>

                            {/* Stats inline */}
                            <div className="flex gap-8 py-2">
                                <div>
                                    <p className="text-3xl font-black text-white leading-none">+300</p>
                                    <p className="text-xs text-white/45 mt-1 uppercase tracking-wide">Eventos realizados</p>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div>
                                    <p className="text-3xl font-black text-white leading-none">10+</p>
                                    <p className="text-xs text-white/45 mt-1 uppercase tracking-wide">Años de experiencia</p>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div>
                                    <p className="text-3xl font-black text-white leading-none">+50</p>
                                    <p className="text-xs text-white/45 mt-1 uppercase tracking-wide">Marcas que confiaron</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href="https://wa.me/tuNumero"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-3 rounded-full border-2 border-white/25 px-7 py-3.5 text-sm font-bold text-white uppercase tracking-widest backdrop-blur-sm transition duration-200 hover:border-yellow-300 hover:text-yellow-300 hover:scale-105 active:scale-95"
                            >
                                Consultanos por WhatsApp
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 5 — CTA FINAL con glow
            ══════════════════════════════════════════════════════════ */}
            <section
                className="relative overflow-hidden py-32 px-8 text-center"
                style={{ background: 'linear-gradient(135deg, #0d001a 0%, #1a0035 30%, #1e1060 65%, #05111e 100%)' }}
            >
                {/* Glows */}
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-35"
                    style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-3xl opacity-25"
                    style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.4) 0%, transparent 70%)' }}
                />

                <div ref={ctaRef} className="fade-in-up relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 border border-white/10">
                        <span className="text-yellow-400 text-sm">✦</span>
                        <span className="text-xs font-semibold text-white/70 tracking-widest uppercase">¿Listo para empezar?</span>
                    </div>

                    <h2
                        className="text-5xl font-black uppercase leading-[0.92] tracking-tight text-white lg:text-6xl xl:text-7xl"
                        style={{ textShadow: '0 0 80px rgba(168,85,247,0.4)' }}
                    >
                        Hagamos realidad<br />
                        tu <span className="text-yellow-300">próximo evento</span>
                    </h2>

                    <p className="max-w-lg text-lg text-white/55 leading-relaxed">
                        Contanos tu idea y nuestro equipo te acompañará desde el concepto hasta el último detalle.
                        Sin compromisos, sin costos ocultos.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href="https://wa.me/tuNumero"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-yellow-400/40 hover:shadow-2xl hover:scale-105 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.428a.5.5 0 0 0 .609.61l5.7-1.49A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.888 9.888 0 0 1-5.031-1.371l-.36-.214-3.733.976.998-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/>
                            </svg>
                            Hablar con un asesor
                        </a>
                        <a
                            href="/shows-servicios"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-4 text-base font-semibold text-white transition duration-200 hover:border-white/60 hover:bg-white/10 hover:scale-105 active:scale-95"
                        >
                            Ver servicios
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
