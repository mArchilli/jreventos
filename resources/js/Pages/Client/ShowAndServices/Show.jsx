import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_SHOWANDSERVICES_IMAGES_PATH ?? '/images/show-and-services/';
const FALLBACK_HERO = '/images/fondo-hero.jpg';

const WA_MSG = encodeURIComponent('Hola, vi un show/servicio en su página y quiero consultarles para mi evento');

/* ── Íconos de confianza ── */
const PILLARS = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
        ),
        title: 'Calidad garantizada',
        desc: 'Cada show cuenta con equipamiento profesional y ensayos previos al evento.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.98 14.98 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
        ),
        title: 'Producción integral',
        desc: 'Nos encargamos de la logística, el montaje y la coordinación en tiempo real.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
        title: 'Equipo con experiencia',
        desc: 'Anos de trayectoria en fiestas, empresas y espectáculos de todo el país.',
    },
];

export default function ShowAndServicesShow({ show }) {
    const heroImg = show.img_portada ? `${IMAGES_PATH}${show.img_portada}` : FALLBACK_HERO;
    const vistaImg = show.img_vista ? `${IMAGES_PATH}${show.img_vista}` : null;

    const [lightbox, setLightbox] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [pinch, setPinch] = useState({ dist: null, startZoom: 1 });

    const getTouchDist = (touches) => Math.sqrt(
        (touches[0].clientX - touches[1].clientX) ** 2 +
        (touches[0].clientY - touches[1].clientY) ** 2
    );

    const closeLightbox = () => { setLightbox(null); setZoom(1); };

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox]);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    return (
        <>
            <Head title={show.title} />
            <Navbar />

            {/* HERO pantalla completa */}
            <section className="relative flex h-screen min-h-[600px] w-full flex-col justify-between overflow-hidden">
                <img
                    src={heroImg}
                    alt={show.title}
                    className="absolute inset-0 h-full w-full object-cover object-center scale-105"
                    style={{ filter: 'brightness(0.45)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/60 via-transparent to-transparent" />
                <div
                    className="pointer-events-none absolute bottom-0 right-0 h-[35vh] w-[35vw] rounded-full opacity-10 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #fdd835 0%, transparent 70%)' }}
                />

                {/* Breadcrumb */}
                <div className="relative z-10 w-full px-8 lg:px-32 pt-28">
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                        <Link href="/" className="hover:text-[#fdd835] transition-colors">Inicio</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <Link href={route('shows-servicios.index')} className="hover:text-[#fdd835] transition-colors">Shows y Servicios</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <span className="text-white/70 truncate max-w-[200px]">{show.title}</span>
                    </nav>
                </div>

                {/* Titulo + badge */}
                <div className="relative z-10 w-full px-8 lg:px-32 pb-20 lg:pb-24">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fdd835]/30 bg-[#fdd835]/10 px-4 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#fdd835] animate-pulse" />
                        <span className="text-xs font-black tracking-[0.25em] text-[#fdd835] uppercase">Show &amp; Servicio</span>
                    </div>
                    <h1 className="text-5xl font-black leading-none tracking-tighter text-white lg:text-7xl xl:text-8xl uppercase max-w-4xl">
                        {show.title}
                    </h1>
                    <p className="mt-4 text-base text-white/50 font-medium max-w-lg">
                        Experiencias diseñadas para marcar la diferencia en tu evento
                    </p>
                    <div className="mt-10 flex items-center gap-3 text-white/30">
                        <div className="flex flex-col gap-1">
                            <span className="block h-[2px] w-8 bg-white/20 rounded-full" />
                            <span className="block h-[2px] w-5 bg-white/10 rounded-full" />
                        </div>
                        <span className="text-xs tracking-widest uppercase font-bold">Scroll para explorar</span>
                    </div>
                </div>
            </section>

            {/* MOOD BAR */}
            <div className="bg-[#0a0a0a] border-y border-white/5">
                <div className="px-8 lg:px-32 py-10 flex items-start gap-6">
                    <span className="mt-1 shrink-0 h-16 w-[3px] rounded-full bg-[#fdd835]" />
                    <p className="text-lg lg:text-xl italic text-white/60 leading-relaxed max-w-3xl font-light">
                        "Cada espectáculo que sumamos a tu evento es una experiencia que tus invitados van a recordar para siempre."
                    </p>
                </div>
            </div>

            <main className="bg-[#0e0e0e] text-white">

                {/* DESCRIPCION + CTA */}
                <section className="px-8 lg:px-32 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        <div className="lg:col-span-7">
                            <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-3">Sobre este show</p>
                            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter leading-tight mb-8">
                                Todo lo que necesitás saber
                            </h2>
                            <div
                                className="text-white/65 text-lg leading-relaxed prose prose-invert max-w-none prose-p:mb-5 prose-p:text-white/65"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.description || '') }}
                            />
                        </div>

                        {/* CTA Card sticky */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28">
                            <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: 'linear-gradient(135deg, #161616 0%, #1a1a1a 100%)' }}>
                                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #fdd835 0%, #f59e0b 100%)' }} />
                                <div className="p-8 flex flex-col gap-6">
                                    <div>
                                        <p className="text-xs font-black tracking-[0.2em] text-[#fdd835]/70 uppercase mb-2">¿Lo querés en tu evento?</p>
                                        <h3 className="text-2xl font-extrabold tracking-tight leading-tight">{show.title}</h3>
                                        <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                            Coordinamos cada detalle para que este show sea exactamente lo que imaginaste.
                                        </p>
                                    </div>
                                    <div className="h-px bg-white/8" />
                                    <ul className="flex flex-col gap-3">
                                        {['Respuesta rápida vía WhatsApp', 'Presupuesto sin compromiso', 'Adaptamos el show a tu evento'].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                                                <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#fdd835]/15">
                                                    <svg className="h-3 w-3 text-[#fdd835]" fill="none" viewBox="0 0 12 10" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M1 5l3 3 7-7" /></svg>
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="h-px bg-white/8" />
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={`https://wa.me/?text=${WA_MSG}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 bg-[#fdd835] text-[#5b4b00] font-extrabold py-4 px-6 rounded-full text-base hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#fdd835]/15"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                            Consultar por WhatsApp
                                        </a>
                                        <Link
                                            href={route('shows-servicios.index')}
                                            className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3.5 px-6 text-sm font-bold text-white/50 transition hover:bg-white/5 hover:text-white hover:border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                                            Ver todos los shows
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* IMAGEN DESTACADA */}
                {vistaImg && (
                    <section className="px-8 lg:px-32 pb-24">
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-2">En acción</p>
                                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter uppercase">
                                    Lo que verán tus <span className="text-[#fdd835]">invitados</span>
                                </h2>
                            </div>
                            <div className="hidden lg:block h-px flex-1 bg-white/5 mb-2" />
                        </div>
                        <button
                            onClick={() => { setLightbox(vistaImg); setZoom(1); }}
                            className="group relative block w-full overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none"
                            aria-label="Ver imagen ampliada"
                        >
                            <img
                                src={vistaImg}
                                alt={`Vista de ${show.title}`}
                                className="w-full max-h-[70vh] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="rounded-full bg-black/60 backdrop-blur-md p-5 border border-white/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                                <p className="text-white/50 text-sm font-bold tracking-widest uppercase">{show.title} · JR Eventos</p>
                            </div>
                        </button>
                    </section>
                )}

                {/* 3 PILARES */}
                <section className="px-8 lg:px-32 pb-24 lg:pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PILLARS.map((p) => (
                            <div
                                key={p.title}
                                className="flex flex-col gap-4 rounded-2xl border border-white/6 bg-[#111] p-8 transition hover:border-[#fdd835]/20 hover:bg-[#131313]"
                            >
                                <span className="text-[#fdd835]">{p.icon}</span>
                                <div>
                                    <h3 className="text-lg font-extrabold tracking-tight mb-1">{p.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BANNER CTA FULL-BLEED */}
                <section className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
                    <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[600px] rounded-full opacity-[0.07] blur-[100px]" style={{ background: '#fdd835' }} />
                    <div className="relative px-8 lg:px-32 py-24 lg:py-32 text-center flex flex-col items-center gap-8">
                        <p className="text-xs font-black tracking-[0.3em] text-[#fdd835] uppercase">Agendá el tuyo ahora</p>
                        <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none uppercase max-w-3xl">
                            ¿Querés este show en tu <span className="text-[#fdd835]">evento</span>?
                        </h2>
                        <p className="text-white/50 text-base max-w-md leading-relaxed">
                            Hablá con nosotros hoy y te armamos una propuesta personalizada sin costo.
                        </p>
                        <a
                            href={`https://wa.me/?text=${WA_MSG}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#fdd835] text-[#5b4b00] font-extrabold py-4 px-10 rounded-full text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fdd835]/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Consultar por WhatsApp
                        </a>
                    </div>
                </section>

            </main>

            <Footer />

            {/* MOBILE CTA FIJO */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/8 px-5 py-4">
                <a
                    href={`https://wa.me/?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 bg-[#fdd835] text-[#5b4b00] font-extrabold py-4 rounded-full text-base active:scale-95 transition-all shadow-lg shadow-[#fdd835]/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Consultar por WhatsApp
                </a>
            </div>

            {/* LIGHTBOX */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
                    onClick={closeLightbox}
                >
                    <div
                        className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-sm text-white/40 font-medium">{show.title}</span>
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
                            <button onClick={closeLightbox} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#fdd835] hover:text-[#5b4b00] focus:outline-none" aria-label="Cerrar">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center overflow-auto p-6" onClick={closeLightbox}>
                        <img
                            src={lightbox}
                            alt=""
                            className="rounded-xl shadow-2xl object-contain transition-all duration-150"
                            style={{
                                touchAction: 'none',
                                ...(zoom === 1
                                    ? { maxWidth: '90vw', maxHeight: 'calc(100vh - 100px)' }
                                    : { width: `${zoom * 70}vw`, maxWidth: 'none', maxHeight: 'none' }),
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={(e) => {
                                if (e.touches.length === 2) setPinch({ dist: getTouchDist(e.touches), startZoom: zoom });
                            }}
                            onTouchMove={(e) => {
                                if (e.touches.length === 2 && pinch.dist) {
                                    const ratio = getTouchDist(e.touches) / pinch.dist;
                                    setZoom(Math.min(4, Math.max(1, parseFloat((pinch.startZoom * ratio).toFixed(2)))));
                                }
                            }}
                            onTouchEnd={() => setPinch({ dist: null, startZoom: 1 })}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
