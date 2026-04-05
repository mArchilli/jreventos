import { Head, Link } from '@inertiajs/react';
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

/* ─── Values / Bento cards ───────────────────────────────────── */
const values = [
    {
        title: 'Experiencias Inmersivas',
        titleAccent: 'Inmersivas',
        desc: 'Diseñamos cada ángulo visual y cada frecuencia sonora para crear sensaciones duraderas. La técnica y la emoción se fusionan en cada escenario.',
        footer: 'Sensaciones Kinéticas',
        span: 2, // col-span-2 on desktop
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
        ),
        accentColor: 'cyan',
    },
    {
        title: 'Ingeniería del Espacio',
        desc: 'Desde la acústica hasta la iluminación arquitectónica, cada detalle técnico es una pieza de un rompecabezas emocional.',
        span: 1,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
        ),
        accentColor: 'purple',
    },
    {
        title: 'Tecnología de Vanguardia',
        titleAccent: 'Vanguardia',
        desc: 'Equipamiento de audio y video de última generación que garantiza una fidelidad absoluta y una potencia visual inigualable en cada montaje.',
        span: 1,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
            </svg>
        ),
        accentColor: 'yellow',
    },
    {
        title: 'Diseño Emocional',
        titleAccent: 'Emocional',
        desc: 'Entendemos que el impacto real de un evento ocurre en el corazón de los asistentes. Creamos narrativas visuales que conectan y conmueven.',
        footer: 'Impacto Humano',
        span: 2,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        ),
        accentColor: 'purple',
    },
    {
        title: 'Calidad Premium',
        titleAccent: 'Premium',
        desc: 'Estándares internacionales en producción técnica y logística de eventos corporativos y sociales.',
        span: 1,
        stats: [
            { value: '500+', label: 'Eventos anuales' },
            { value: '100%', label: 'Pasión técnica' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
        ),
        accentColor: 'cyan',
    },
    {
        title: 'Gestión Integral',
        titleAccent: 'Integral',
        desc: 'Desde la conceptualización inicial hasta el desmontaje final, coordinamos cada recurso para una ejecución perfecta y sin contratiempos.',
        footer: 'Eficiencia Logística',
        span: 2,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
            </svg>
        ),
        accentColor: 'yellow',
    },
];

export default function About({ auth }) {
    const gridRef = useFadeIn(0.1);
    const ctaRef = useFadeIn(0.12);

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
                SECCIÓN 1 — HERO
            ══════════════════════════════════════════════════════════ */}
            <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
                <img
                    src="/images/fondo-hero.jpg"
                    alt="Sobre Nosotros"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

                <div className="relative z-10 w-full px-8 lg:px-32 pb-10 md:pb-14">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase">
                        <span className="text-white">SOBRE</span> <span className="text-yellow-300">NOSOTROS</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/50 text-sm md:text-lg leading-relaxed">
                        No solo organizamos eventos; transformamos espacios físicos en experiencias sensoriales que se quedan grabados en la memoria.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN — QUIÉNES SOMOS
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    {/* Imagen */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative rounded-xl overflow-hidden aspect-[4/5] md:aspect-[3/4]">
                            <img
                                src="/images/about-banner.jpg"
                                alt="Producción profesional de eventos — JR Eventos Argentina"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating card */}
                        <div className="absolute bottom-8 -right-2 md:-right-8 bg-neutral-900/90 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-2xl">
                            <p className="text-yellow-300 text-4xl font-black mb-1">17+</p>
                            <p className="text-white font-bold tracking-tight uppercase text-sm">Años transformando<br />la industria</p>
                        </div>
                    </div>

                    {/* Texto */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
                            <span className="text-yellow-300">17 AÑOS</span> <span className="text-white">PERFECCIONANDO EL ARTE DE LO EFÍMERO</span>
                        </h2>
                        <p className="text-white/50 text-base md:text-lg leading-relaxed">
                            En JR Eventos, llevamos más de una década y media diseñando momentos irrepetibles. Nuestra misión es orquestar experiencias que se queden grabadas en la memoria, utilizando tecnología de vanguardia y un diseño estético impecable.
                        </p>
                        <div className="flex gap-8 pt-4">
                            <div>
                                <p className="text-white font-black text-3xl">500+</p>
                                <p className="text-xs text-white/40 uppercase tracking-tight">Eventos anuales</p>
                            </div>
                            <div>
                                <p className="text-white font-black text-3xl">100%</p>
                                <p className="text-xs text-white/40 uppercase tracking-tight">Pasión técnica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 2 — VALUES BENTO GRID
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 pb-20 md:pb-28">
                <div ref={gridRef} className="fade-in-up">

                    {/* Desktop bento grid (3 cols) */}
                    <div className="hidden md:grid grid-cols-3 gap-5">
                        {values.map((v) => (
                            <ValueCard key={v.title} value={v} />
                        ))}
                    </div>

                    {/* Mobile stacked cards */}
                    <div className="flex md:hidden flex-col gap-5">
                        {values.map((v) => (
                            <MobileValueCard key={v.title} value={v} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 3 — CTA FINAL
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-16 border-t border-white/5">
                <div ref={ctaRef} className="fade-in-up flex flex-col items-center text-center gap-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                        ¿LISTO PARA <span className="text-yellow-300">TRANSFORMAR</span><br />TU PRÓXIMO ESPACIO?
                    </h2>
                    <p className="text-white/50 text-sm md:text-base max-w-md">
                        Hablemos sobre cómo llevar tu evento al siguiente nivel de excelencia técnica.
                    </p>
                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}

/* ─── Desktop Value Card ────────────────────────────────────── */
function ValueCard({ value }) {
    const isWide = value.span === 2;

    return (
        <div className={`${isWide ? 'col-span-2' : 'col-span-1'} bg-neutral-900/50 p-8 md:p-10 rounded-xl flex flex-col justify-between group overflow-hidden relative border border-white/5 transition duration-300 hover:border-white/10`}>
            <div>
                <div className="mb-5">{value.icon}</div>
                <h3 className={`${isWide ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-black uppercase tracking-tight mb-3 leading-tight text-white`}>
                    {value.titleAccent ? (
                        <>
                            {value.title.replace(value.titleAccent, '').trim()}{' '}
                            <span className="text-yellow-300">
                                {value.titleAccent}
                            </span>
                        </>
                    ) : (
                        value.title
                    )}
                </h3>
                <p className={`text-white/50 ${isWide ? 'text-base md:text-lg max-w-lg' : 'text-sm md:text-base'} leading-relaxed`}>
                    {value.desc}
                </p>
            </div>

            {value.stats && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {value.stats.map((s) => (
                        <div key={s.label}>
                            <p className="text-white font-black text-2xl">{s.value}</p>
                            <p className="text-xs text-white/40 uppercase tracking-tight">{s.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {value.footer && (
                <div className="mt-10 flex gap-4 items-center">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs font-bold tracking-widest text-white/30 uppercase">{value.footer}</span>
                </div>
            )}
        </div>
    );
}

/* ─── Mobile Value Card ─────────────────────────────────────── */
function MobileValueCard({ value }) {
    return (
        <div className="relative p-6 rounded-xl overflow-hidden border border-white/5 bg-neutral-900/50">
            <div className="flex items-center gap-4 mb-4">
                <div className="shrink-0">{value.icon}</div>
                <h3 className="font-black text-lg leading-tight uppercase tracking-tight text-white">{value.title}</h3>
            </div>

            <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>

            {value.stats && (
                <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/5">
                    {value.stats.map((s) => (
                        <div key={s.label}>
                            <p className="text-white font-black text-xl">{s.value}</p>
                            <p className="text-xs text-white/40 uppercase tracking-tight">{s.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
