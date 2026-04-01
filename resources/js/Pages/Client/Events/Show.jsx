import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_HERO = '/images/fondo-hero.jpg';

export default function EventsShow({ event, relatedEvents = [] }) {
    const [lightbox, setLightbox] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [pinch, setPinch] = useState({ dist: null, startZoom: 1 });

    const images = event.images ?? [];
    const heroImage = images[0]?.image_path ? `/${images[0].image_path}` : FALLBACK_HERO;

    const getTouchDist = (touches) => {
        const [t1, t2] = touches;
        return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    };

    const closeLightbox = () => {
        setLightbox(null);
        setZoom(1);
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    return (
        <>
            <Head title={event.title} />

            <Navbar />

            <section className="relative flex h-[65vh] min-h-[440px] w-full items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{
                        backgroundImage: `url('${heroImage}')`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/95" />

                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-8 pb-14 lg:px-16">
                    <div className="mb-5 flex items-center gap-2 text-sm text-white/40">
                        <Link href="/" className="transition hover:text-white/70">Inicio</Link>
                        <span>/</span>
                        <Link href={route('eventos.index')} className="transition hover:text-white/70">Eventos</Link>
                        <span>/</span>
                        <span className="text-white/70">{event.title}</span>
                    </div>

                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {event.title}
                    </h1>
                </div>
            </section>

            <section className="bg-black pt-10 px-6 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl">
                    <Link
                        href={route('eventos.index')}
                        className="inline-flex items-center gap-2 text-sm text-white/40 transition duration-200 hover:text-white/80"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Volver a Eventos
                    </Link>
                </div>
            </section>

            <section className="bg-black py-20 px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl space-y-14">
                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                                <span className="text-yellow-400 text-sm leading-none">Evento destacado</span>
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tight lg:text-4xl">
                                Sobre este <span className="text-yellow-300">evento</span>
                            </h2>

                            <div
                                className="text-white/60 text-base leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description || '') }}
                            />

                            <div className="h-px w-24 bg-gradient-to-r from-yellow-300 to-transparent" />

                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                Consultar por este evento
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {images.length > 0 ? (
                                images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setLightbox(`/${image.image_path}`)}
                                        className="group/img relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl cursor-zoom-in focus:outline-none"
                                    >
                                        <img
                                            src={`/${image.image_path}`}
                                            alt={`Imagen de ${event.title}`}
                                            className="h-56 w-full object-cover transition duration-300 group-hover/img:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition duration-200 bg-black/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
                                    </button>
                                ))
                            ) : (
                                <div className="flex h-80 items-center justify-center rounded-3xl border border-white/10 bg-white/5 sm:col-span-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {relatedEvents.length > 0 && (
                <section className="bg-black pb-20 px-6 lg:px-8 border-t border-white/5">
                    <div className="mx-auto max-w-screen-xl pt-14">
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Segui explorando</p>
                                <h3 className="mt-2 text-3xl font-black tracking-tight text-white lg:text-4xl">
                                    Eventos <span className="text-yellow-300">relacionados</span>
                                </h3>
                            </div>
                            <Link
                                href={route('eventos.index')}
                                className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                            >
                                Ver todos
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedEvents.map((item) => {
                                const cover = item.images?.[0]?.image_path ? `/${item.images[0].image_path}` : null;

                                return (
                                    <article
                                        key={item.id}
                                        className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-300/30"
                                    >
                                        <div className="relative h-52 w-full overflow-hidden bg-white/5 shrink-0">
                                            {cover ? (
                                                <img
                                                    src={cover}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                                            <h4 className="text-lg font-black text-white tracking-tight line-clamp-2">
                                                {item.title}
                                            </h4>

                                            <Link
                                                href={route('eventos.show', item.id)}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-md transition duration-200 hover:bg-yellow-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                Ver evento
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <Footer />

            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    <div
                        className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                            <span className="w-14 text-center text-sm font-medium text-white/60 tabular-nums">
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
                        </div>

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
                                    : { width: `${zoom * 70}vw`, maxWidth: 'none', maxHeight: 'none' }),
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
