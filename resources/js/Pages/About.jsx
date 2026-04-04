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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-cyan-400">
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
        ),
        accentColor: 'purple',
    },
    {
        title: 'Tecnología de Vanguardia',
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        ),
        accentColor: 'purple',
    },
    {
        title: 'Calidad Premium',
        desc: 'Estándares internacionales en producción técnica y logística de eventos corporativos y sociales.',
        span: 1,
        stats: [
            { value: '500+', label: 'Eventos anuales' },
            { value: '100%', label: 'Pasión técnica' },
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-cyan-400">
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
    const heroRef = useFadeIn(0.05);
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
                SECCIÓN 1 — HERO SPLIT
            ══════════════════════════════════════════════════════════ */}
            <section className="relative bg-black overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[40%] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none" />

                <div
                    ref={heroRef}
                    className="fade-in-up relative z-10 max-w-7xl mx-auto px-8 lg:px-32 pt-36 pb-20 md:py-32 md:pt-44 flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Left — Text */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight leading-none uppercase mb-8">
                            SOBRE<br />
                            <span className="text-yellow-300">NOSOTROS</span>
                        </h1>

                        {/* Mobile: divider */}
                        <div className="w-12 h-1 bg-yellow-300 mb-8 md:hidden" />

                        <div className="space-y-6 max-w-xl">
                            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                                En JR Eventos, llevamos <span className="text-yellow-300 font-bold">17 años</span> perfeccionando el arte de lo efímero.
                            </p>
                            <p className="text-white/50 text-base md:text-lg leading-relaxed">
                                No solo organizamos eventos; <span className="text-white">transformamos espacios</span> físicos en experiencias sensoriales. Nuestra misión es orquestar momentos que se queden grabados en la memoria, utilizando tecnología de vanguardia y un diseño estético impecable.
                            </p>
                        </div>
                    </div>

                    {/* Right — Asymmetrical Image Composition */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute -top-8 -left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />

                        <div className="relative rounded-xl overflow-hidden border border-white/5 aspect-[4/5] md:aspect-[3/4]" style={{ boxShadow: '0 0 60px -15px rgba(255, 228, 131, 0.15)' }}>
                            <img
                                src="/images/about-banner.jpg"
                                alt="Producción profesional de eventos — JR Eventos Argentina"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Floating Info Card */}
                        <div className="absolute bottom-12 -left-4 md:-left-12 bg-neutral-900/80 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-2xl max-w-xs">
                            <p className="text-yellow-300 text-4xl font-black mb-2">17+</p>
                            <p className="text-white font-bold tracking-tight uppercase text-sm">Años transformando la industria de eventos en la región</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 2 — VALUES BENTO GRID
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-20 md:py-28">
                <div ref={gridRef} className="fade-in-up max-w-7xl mx-auto">

                    {/* Desktop bento grid (3 cols) */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
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

                    {/* Visual asset image (mobile only) */}
                    <div className="md:hidden mt-10 h-[300px] rounded-xl overflow-hidden relative">
                        <img
                            src="/images/about-story.jpg"
                            alt="Producción profesional de eventos"
                            className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                            onError={(e) => {
                                e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-px bg-yellow-300" />
                                <span className="text-[10px] uppercase tracking-widest text-yellow-300 font-black">Performance & Precision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                SECCIÓN 3 — CTA FINAL
            ══════════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-20 md:py-28 text-center">
                <div ref={ctaRef} className="fade-in-up max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
                        ¿LISTO PARA <span className="text-yellow-300">TRANSFORMAR</span> TU PRÓXIMO ESPACIO?
                    </h2>
                    <p className="text-white/50 text-sm md:text-base max-w-md">
                        Hablemos sobre cómo llevar tu evento al siguiente nivel de excelencia técnica.
                    </p>
                    <Link
                        href="/sobre-nosotros"
                        className="inline-flex items-center gap-3 rounded-full bg-neutral-800 border border-white/10 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                    >
                        Hablemos de tu visión
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}

/* ─── Desktop Value Card ────────────────────────────────────── */
function ValueCard({ value }) {
    const isWide = value.span === 2;
    const bgClass = isWide ? 'bg-neutral-950' : 'bg-neutral-900/50';

    return (
        <div className={`${isWide ? 'col-span-2' : 'col-span-1'} ${bgClass} p-10 rounded-xl flex flex-col justify-between group overflow-hidden relative border border-white/5`}>
            {/* Ambient glow */}
            {isWide && (
                <div className={`absolute top-0 right-0 w-64 h-64 ${value.accentColor === 'cyan' ? 'bg-cyan-400/5' : value.accentColor === 'yellow' ? 'bg-yellow-300/5' : 'bg-purple-500/5'} rounded-full blur-3xl -mr-32 -mt-32 transition-colors ${value.accentColor === 'cyan' ? 'group-hover:bg-cyan-400/10' : value.accentColor === 'yellow' ? 'group-hover:bg-yellow-300/10' : 'group-hover:bg-purple-500/10'}`} />
            )}

            <div>
                <div className="mb-6">{value.icon}</div>
                <h3 className={`${isWide ? 'text-3xl' : 'text-2xl'} font-bold uppercase tracking-tight mb-4`}>
                    {value.titleAccent ? (
                        <>
                            {value.title.replace(value.titleAccent, '').trim()}{' '}
                            <span className={value.accentColor === 'cyan' ? 'text-cyan-400' : value.accentColor === 'yellow' ? 'text-yellow-300' : 'text-purple-400'}>
                                {value.titleAccent}
                            </span>
                        </>
                    ) : (
                        value.title
                    )}
                </h3>
                <p className={`text-white/50 ${isWide ? 'text-lg max-w-lg' : ''} leading-relaxed`}>
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
                <div className="mt-12 flex gap-4 items-center">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs font-bold tracking-widest text-white/30 uppercase">{value.footer}</span>
                </div>
            )}
        </div>
    );
}

/* ─── Mobile Value Card (glass card style) ──────────────────── */
function MobileValueCard({ value }) {
    return (
        <div className="relative p-6 rounded-xl overflow-hidden group border border-yellow-300/8" style={{ background: 'linear-gradient(135deg, rgba(32, 31, 31, 0.7) 0%, rgba(19, 19, 19, 0.8) 100%)', backdropFilter: 'blur(12px)' }}>
            {/* Ghost icon background */}
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="scale-[3]">{value.icon}</div>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-300/10 p-3 rounded-lg shrink-0">
                    {value.icon}
                </div>
                <h3 className="font-bold text-lg leading-tight uppercase tracking-wide">{value.title}</h3>
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
