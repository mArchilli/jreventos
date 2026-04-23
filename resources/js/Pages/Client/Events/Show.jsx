import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_HERO = '/images/fondo-hero.jpg';

export default function EventsShow({ event, relatedEvents = [] }) {
    const images = event.images ?? [];
    const heroImg = images[0]?.image_path ? `/${images[0].image_path}` : FALLBACK_HERO;

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

            {/* â”€â”€ HERO INMERSIVO â”€â”€ */}
            <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
                <img
                    src={heroImg}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover object-center scale-105"
                    style={{ filter: 'brightness(0.5)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-0 left-0 right-0 pt-28 px-8 lg:px-32">
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                        <Link href="/" className="hover:text-[#fdd835] transition-colors">Inicio</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <Link href={route('eventos.index')} className="hover:text-[#fdd835] transition-colors">Eventos</Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1l5 5-5 5" /></svg>
                        <span className="text-white/70 truncate max-w-[200px]">{event.title}</span>
                    </nav>
                </div>

                {/* TÃ­tulo sobre el hero */}
                <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-32 pb-16">
                    <div className="mb-4">
                        <span className="inline-block bg-[#fdd835] text-[#5b4b00] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                            PRODUCCIÃ“N JR EVENTOS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none uppercase text-white max-w-4xl">
                        {event.title}
                    </h1>
                    {images.length > 0 && (
                        <p className="mt-4 text-sm text-white/40 font-bold tracking-widest uppercase">
                            {images.length} {images.length === 1 ? 'fotografÃ­a' : 'fotografÃ­as'}
                        </p>
                    )}
                </div>
            </section>

            <main className="bg-[#0e0e0e] text-white">

                {/* â”€â”€ DESCRIPCIÃ“N â”€â”€ */}
                <section className="px-8 lg:px-32 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Texto */}
                        <div className="lg:col-span-7">
                            <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-4">Sobre el evento</p>
                            <div
                                className="text-white/70 text-lg leading-relaxed prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description || '') }}
                            />
                        </div>

                        {/* CTA lateral */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-5 bg-[#131313] rounded-2xl border border-white/5 p-8">
                            <div>
                                <p className="text-xs font-black tracking-[0.2em] text-[#ababab] uppercase mb-2">Â¿QuerÃ©s un evento asÃ­?</p>
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
                                    ConsultÃ¡ por WhatsApp
                                </a>
                                <Link
                                    href={route('eventos.index')}
                                    className="flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white/60 font-bold py-4 px-6 rounded-full text-sm hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver a Eventos
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ GALERÃA DE FOTOS â”€â”€ */}
                {images.length > 0 && (
                    <section className="px-8 lg:px-32 pb-24">
                        <div className="mb-10">
                            <p className="text-xs font-black tracking-[0.2em] text-[#fdd835] uppercase mb-2">GalerÃ­a</p>
                            <h2 className="text-3xl font-extrabold tracking-tighter uppercase">
                                Momentos del <span className="text-[#fdd835]">evento</span>
                            </h2>
                            <div className="mt-3 h-px w-16 bg-[#fdd835]" />
                        </div>

                        {/* Grid editorial de fotos */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => openLightbox(idx)}
                                    className="group relative block w-full overflow-hidden rounded-xl cursor-zoom-in focus:outline-none break-inside-avoid"
                                >
                                    <img
                                        src={`/${img.image_path}`}
                                        alt={`FotografÃ­a ${idx + 1} de ${event.title}`}
                                        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-xl" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="rounded-full bg-black/50 backdrop-blur-sm p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* â”€â”€ EVENTOS RELACIONADOS â”€â”€ */}
                {relatedEvents.length > 0 && (
                    <section className="border-t border-white/5 px-8 lg:px-32 py-24">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tighter uppercase mb-2">
                                    OTROS <span className="text-[#fdd835]">EVENTOS</span>
                                </h2>
                                <div className="h-1 w-16 bg-[#fdd835]" />
                            </div>
                            <Link
                                href={route('eventos.index')}
                                className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest text-[#ababab] hover:text-white transition-colors"
                            >
                                VER TODOS
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedEvents.map((item) => {
                                const cover = item.images?.[0]?.image_path ? `/${item.images[0].image_path}` : null;
                                return (
                                    <Link
                                        key={item.id}
                                        href={route('eventos.show', item.id)}
                                        className="group relative overflow-hidden rounded-xl bg-[#131313] border border-white/5 hover:border-[#fdd835]/20 transition-all duration-300"
                                    >
                                        <div className="aspect-[16/9] overflow-hidden">
                                            {cover ? (
                                                <img
                                                    src={cover}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-[#1f1f1f]" />
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-extrabold text-base leading-tight tracking-tight uppercase line-clamp-2 mb-4">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs font-bold tracking-widest text-[#fdd835] uppercase group-hover:underline">
                                                Ver evento â†’
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            </main>

            <Footer />

            {/* â”€â”€ LIGHTBOX â”€â”€ */}
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
                        <span className="text-sm text-white/40 tabular-nums font-medium">
                            {lightboxIdx + 1} / {images.length}
                        </span>
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

                    {/* Imagen + flechas */}
                    <div
                        className="relative flex flex-1 items-center justify-center overflow-auto p-6"
                        onClick={closeLightbox}
                    >
                        {/* Flecha anterior */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImg(); }}
                                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#fdd835] hover:text-[#5b4b00] focus:outline-none"
                                aria-label="Anterior"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        )}

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

                        {/* Flecha siguiente */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImg(); }}
                                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#fdd835] hover:text-[#5b4b00] focus:outline-none"
                                aria-label="Siguiente"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
