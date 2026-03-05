import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_ARTISTS_IMAGES_PATH ?? '/images/artists/';

export default function ArtistsShow({ artist }) {
    const mainImage = artist.main_image ?? artist.images?.[0] ?? null;
    const allImages = artist.images ?? [];

    const [activeImg, setActiveImg] = useState(mainImage?.filename ?? null);
    const [lightbox, setLightbox] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [pinch, setPinch] = useState({ dist: null, startZoom: 1 });

    const activeOrFallback = activeImg ?? mainImage?.filename ?? null;

    const getTouchDist = (touches) => {
        const [t1, t2] = touches;
        return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    };

    const closeLightbox = () => { setLightbox(null); setZoom(1); };

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    return (
        <>
            <Head title={artist.name} />

            <Navbar />

            {/* ── HERO con imagen principal como fondo ── */}
            <section className="relative flex h-[65vh] min-h-[440px] w-full items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: mainImage
                            ? `url('${IMAGES_PATH}${mainImage.filename}')`
                            : "url('/images/fondo-hero.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/95" />

                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-8 pb-14 lg:px-16">
                    {/* Breadcrumb */}
                    <div className="mb-5 flex items-center gap-2 text-sm text-white/40">
                        <Link href="/" className="transition hover:text-white/70">Inicio</Link>
                        <span>/</span>
                        <Link href={route('artistas.index')} className="transition hover:text-white/70">Artistas</Link>
                        <span>/</span>
                        <span className="text-white/70">{artist.name}</span>
                    </div>

                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {artist.name}
                    </h1>
                </div>
            </section>

            {/* ── VOLVER ── */}
            <section className="bg-black pt-10 px-6 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl">
                    <Link
                        href={route('artistas.index')}
                        className="inline-flex items-center gap-2 text-sm text-white/40 transition duration-200 hover:text-white/80"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Volver a Artistas
                    </Link>
                </div>
            </section>

            {/* ── CONTENIDO PRINCIPAL ── */}
            <section className="bg-black py-20 px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">

                        {/* Info */}
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                                <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                                <span className="text-sm text-white/70">talento único</span>
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tight lg:text-4xl">
                                Sobre este <span className="text-yellow-300">artista</span>
                            </h2>

                            <p className="text-white/60 text-base leading-relaxed whitespace-pre-line">
                                {artist.description}
                            </p>

                            {/* Línea decorativa */}
                            <div className="h-px w-24 bg-gradient-to-r from-yellow-300 to-transparent" />

                            {/* CTA WhatsApp */}
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Contratar este artista
                            </a>
                        </div>

                        {/* Galería de imágenes */}
                        <div className="flex flex-col gap-4">
                            {/* Imagen activa grande */}
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-white/5 aspect-[4/3]">
                                {activeOrFallback ? (
                                    <button
                                        onClick={() => setLightbox(`${IMAGES_PATH}${activeOrFallback}`)}
                                        className="group/img relative block h-full w-full cursor-zoom-in focus:outline-none"
                                    >
                                        <img
                                            key={activeOrFallback}
                                            src={`${IMAGES_PATH}${activeOrFallback}`}
                                            alt={artist.name}
                                            className="h-full w-full object-cover transition duration-300 group-hover/img:scale-105"
                                        />
                                        {/* Icono lupa al hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition duration-200 bg-black/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                            </svg>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                )}
                                {/* Acento amarillo */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
                            </div>

                            {/* Thumbnails (solo si hay más de 1 imagen) */}
                            {allImages.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-1">
                                    {allImages.map((img) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImg(img.filename)}
                                            className={`shrink-0 h-20 w-20 overflow-hidden rounded-xl border-2 transition duration-200 hover:border-yellow-300 focus:outline-none ${
                                                activeImg === img.filename
                                                    ? 'border-yellow-300 scale-105'
                                                    : 'border-white/10'
                                            }`}
                                        >
                                            <img
                                                src={`${IMAGES_PATH}${img.filename}`}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

            {/* ── LIGHTBOX ── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    {/* Barra de controles */}
                    <div
                        className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Controles de zoom */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setZoom(z => Math.max(1, parseFloat((z - 0.25).toFixed(2))))}
                                disabled={zoom <= 1}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-30 focus:outline-none"
                                aria-label="Alejar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                                </svg>
                            </button>
                            <span className="w-14 text-center text-sm font-medium text-white/60 tabular-nums">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                onClick={() => setZoom(z => Math.min(4, parseFloat((z + 0.25).toFixed(2))))}
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
                        </div>

                        {/* Cerrar */}
                        <button
                            onClick={closeLightbox}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-yellow-300 hover:text-black focus:outline-none"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Contenedor de imagen desplazable */}
                    <div
                        className="flex flex-1 items-start justify-center overflow-auto p-6"
                        onClick={closeLightbox}
                    >
                        <img
                            src={lightbox}
                            alt=""
                            className="rounded-2xl shadow-2xl object-contain transition-all duration-150"
                            style={{
                                touchAction: 'none',
                                ...(zoom === 1
                                    ? { maxWidth: '90vw', maxHeight: 'calc(100vh - 100px)' }
                                    : { width: `${zoom * 70}vw`, maxWidth: 'none', maxHeight: 'none' }
                                ),
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={(e) => {
                                if (e.touches.length === 2) {
                                    setPinch({ dist: getTouchDist(e.touches), startZoom: zoom });
                                }
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
