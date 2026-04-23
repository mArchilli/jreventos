import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_SHOWANDSERVICES_IMAGES_PATH ?? '/images/show-and-services/';
const FALLBACK_HERO = '/images/fondo-hero.jpg';

export default function ShowAndServicesShow({ show }) {
    const heroImg = show.img_portada ? `${IMAGES_PATH}${show.img_portada}` : FALLBACK_HERO;

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

            {/* ── HERO ── */}
            <section className="relative flex h-[75vh] min-h-[480px] w-full flex-col justify-between overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${heroImg}')` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(14,14,14,0.95) 100%)' }} />

                {/* Breadcrumb */}
                <div className="relative z-10 w-full px-8 lg:px-32 pt-28">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/40 tracking-widest uppercase">
                        <Link href="/" className="transition hover:text-white/70">Inicio</Link>
                        <span>/</span>
                        <Link href={route('shows-servicios.index')} className="transition hover:text-white/70">Shows y Servicios</Link>
                        <span>/</span>
                        <span className="text-white/60">{show.title}</span>
                    </div>
                </div>

                {/* Título + badge */}
                <div className="relative z-10 w-full px-8 lg:px-32 pb-16">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#fdd835]/30 bg-[#fdd835]/10 px-4 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#fdd835]" />
                        <span className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase">Show &amp; Servicio</span>
                    </div>
                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-7xl">
                        {show.title}
                    </h1>
                </div>
            </section>

            <main className="bg-[#0e0e0e] text-white">

                {/* ── DESCRIPCIÓN ── */}
                <section className="px-8 lg:px-32 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Texto */}
                        <div className="lg:col-span-7">
                            <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-4">Sobre este show</p>
                            <div
                                className="text-white/70 text-lg leading-relaxed prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.description || '') }}
                            />
                        </div>

                        {/* CTA lateral */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-5 bg-[#131313] rounded-2xl border border-white/5 p-8">
                            <div>
                                <p className="text-xs font-black tracking-[0.2em] text-[#ababab] uppercase mb-2">¿Querés este show?</p>
                                <h3 className="text-2xl font-extrabold tracking-tight leading-tight">
                                    Coordinamos cada detalle para vos
                                </h3>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://wa.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-[#fdd835] text-[#5b4b00] font-extrabold py-4 px-6 rounded-full text-base hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#fdd835]/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Consultar por WhatsApp
                                </a>
                                <Link
                                    href={route('shows-servicios.index')}
                                    className="flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white/60 font-bold py-4 px-6 rounded-full text-sm hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver a Shows y Servicios
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── IMAGEN DESTACADA ── */}
                {show.img_vista && (
                    <section className="px-8 lg:px-32 pb-24">
                        <div className="mb-10">
                            <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-2">Imagen</p>
                            <h2 className="text-3xl font-extrabold tracking-tighter uppercase">
                                Vista del <span className="text-[#fdd835]">show</span>
                            </h2>
                            <div className="mt-3 h-px w-16 bg-[#fdd835]" />
                        </div>
                        <button
                            onClick={() => setLightbox(`${IMAGES_PATH}${show.img_vista}`)}
                            className="group relative block w-full overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none"
                        >
                            <img
                                src={`${IMAGES_PATH}${show.img_vista}`}
                                alt={`Vista de ${show.title}`}
                                className="w-full max-h-[600px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="rounded-full bg-black/50 backdrop-blur-sm p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </section>
                )}

            </main>

            <Footer />

            {/* ── LIGHTBOX ── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
                    onClick={closeLightbox}
                >
                    {/* Barra superior */}
                    <div
                        className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-sm text-white/40 font-medium">{show.title}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setZoom((z) => Math.max(1, parseFloat((z - 0.25).toFixed(2))))}
                                disabled={zoom <= 1}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-30 focus:outline-none"
                                aria-label="Alejar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                                </svg>
                            </button>
                            <span className="w-12 text-center text-xs font-medium text-white/50 tabular-nums">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                onClick={() => setZoom((z) => Math.min(4, parseFloat((z + 0.25).toFixed(2))))}
                                disabled={zoom >= 4}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-30 focus:outline-none"
                                aria-label="Acercar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                </svg>
                            </button>
                            {zoom !== 1 && (
                                <button
                                    onClick={() => setZoom(1)}
                                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/25 focus:outline-none"
                                >
                                    Restablecer
                                </button>
                            )}
                            <button
                                onClick={closeLightbox}
                                className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#fdd835] hover:text-[#5b4b00] focus:outline-none"
                                aria-label="Cerrar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div
                        className="flex flex-1 items-center justify-center overflow-auto p-6"
                        onClick={closeLightbox}
                    >
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
