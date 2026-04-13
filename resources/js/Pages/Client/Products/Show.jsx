import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_PRODUCTS_IMAGES_PATH ?? '/images/products/';

export default function ProductsShow({ product, relatedProducts = [] }) {
    const mainImage = product.main_image ?? product.images?.[0] ?? null;
    const allImages = product.images ?? [];

    const [activeImg, setActiveImg] = useState(mainImage?.filename ?? null);
    const [lightbox, setLightbox] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [pinch, setPinch] = useState({ dist: null, startZoom: 1 });

    const activeOrFallback = activeImg ?? mainImage?.filename ?? null;
    const thumbs = allImages.slice(0, 4);

    const closeLightbox = () => { setLightbox(null); setZoom(1); };

    const getTouchDist = (touches) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

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
            <Head title={product.title} />
            <Navbar />

            <main className="min-h-screen bg-[#0e0e0e] text-white">
                <div className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto">

                    {/* ── BREADCRUMB ── */}
                    <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ababab]">
                        <Link href="/" className="hover:text-[#fdd835] transition-colors">
                            Inicio
                        </Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1.5 1l5 5-5 5" />
                        </svg>
                        <Link href={route('productos.index')} className="hover:text-[#fdd835] transition-colors">
                            Productos
                        </Link>
                        <svg className="h-2 w-2 shrink-0" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1.5 1l5 5-5 5" />
                        </svg>
                        <span className="text-white truncate max-w-[180px]">{product.title}</span>
                    </nav>

                    {/* ── PRODUCT DETAIL ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* ── GALERÍA (izquierda, 7 cols) ── */}
                        <div className="lg:col-span-7 space-y-4">

                            {/* Imagen principal */}
                            <div className="relative aspect-[4/5] md:aspect-square rounded-xl overflow-hidden bg-[#1f1f1f] group">
                                {activeOrFallback ? (
                                    <button
                                        onClick={() => setLightbox(`${IMAGES_PATH}${activeOrFallback}`)}
                                        className="block h-full w-full cursor-zoom-in focus:outline-none"
                                    >
                                        <img
                                            key={activeOrFallback}
                                            src={`${IMAGES_PATH}${activeOrFallback}`}
                                            alt={product.title}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/60 to-transparent pointer-events-none" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                            <div className="rounded-full bg-black/40 backdrop-blur-sm p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                                        </svg>
                                    </div>
                                )}

                                {/* Badge PREMIUM FX */}
                                <div className="absolute top-5 left-5 pointer-events-none">
                                    <span className="bg-[#fdd835] text-[#5b4b00] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                                        PREMIUM FX
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnails (solo si hay más de 1 imagen) */}
                            {allImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {thumbs.map((img) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImg(img.filename)}
                                            className={`aspect-square rounded-lg overflow-hidden border transition-all duration-200 focus:outline-none ${
                                                activeImg === img.filename
                                                    ? 'border-[#fdd835]/70 scale-[1.03]'
                                                    : 'border-white/5 hover:border-[#fdd835]/40'
                                            }`}
                                        >
                                            <img
                                                src={`${IMAGES_PATH}${img.filename}`}
                                                alt=""
                                                className={`h-full w-full object-cover transition-all duration-300 ${
                                                    activeImg === img.filename ? '' : 'grayscale hover:grayscale-0'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── INFO (derecha, 5 cols) ── */}
                        <div className="lg:col-span-5 flex flex-col gap-8">

                            {/* Título y descripción */}
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4 uppercase">
                                    {product.title}
                                </h1>
                                <div
                                    className="text-[#ababab] text-lg leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>

                            {/* Precio / consultar */}
                            <div className="flex items-baseline gap-4 py-4 border-y border-white/5">
                                {Number(product.price) > 0 ? (
                                    <>
                                        <span className="text-3xl font-bold text-white tracking-tight">
                                            ${Number(product.price).toLocaleString('es-AR')}
                                        </span>
                                        <span className="bg-[#1f1f1f] text-[#ababab] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            STOCK DISPONIBLE
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-3xl font-bold text-white tracking-tight">
                                            Consultar precio
                                        </span>
                                        <span className="bg-[#1f1f1f] text-[#ababab] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            STOCK DISPONIBLE
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col gap-4">
                                <a
                                    href="https://wa.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-[#fdd835] text-[#5b4b00] font-extrabold py-5 px-8 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#fdd835]/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Consultar por WhatsApp
                                </a>
                                <Link
                                    href={route('productos.index')}
                                    className="flex items-center justify-center bg-transparent border border-white/20 text-white font-extrabold py-5 px-8 rounded-full text-lg hover:bg-white/5 hover:border-white/40 transition-all"
                                >
                                    ← Volver a Productos
                                </Link>
                            </div>

                            {/* Nota adicional */}
                            <div className="flex gap-3 items-start pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ababab] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <p className="text-sm text-[#ababab]">
                                    Ideal para eventos corporativos, bodas y lanzamientos de producto. Nuestro equipo te asesorará en la mejor opción para tu espectáculo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── PRODUCTOS RELACIONADOS ── */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-32">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl font-extrabold tracking-tighter uppercase mb-2">
                                        PRODUCTOS <span className="text-[#fdd835]">RELACIONADOS</span>
                                    </h2>
                                    <div className="h-1 w-20 bg-[#fdd835]" />
                                </div>
                                <Link
                                    href={route('productos.index')}
                                    className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest text-[#ababab] hover:text-white transition-colors"
                                >
                                    VER TODO EL CATÁLOGO
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((rel) => {
                                    const relImg = rel.main_image ?? rel.images?.[0] ?? null;
                                    return (
                                        <Link
                                            key={rel.id}
                                            href={route('productos.show', rel.id)}
                                            className="bg-[#1f1f1f] rounded-xl overflow-hidden group hover:bg-[#262626] transition-all duration-300"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                {relImg ? (
                                                    <img
                                                        src={`${IMAGES_PATH}${relImg.filename}`}
                                                        alt={rel.title}
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-[#262626]" />
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-extrabold text-lg mb-4 leading-tight tracking-tight uppercase">
                                                    {rel.title}
                                                </h3>
                                                <span className="block w-full py-3 rounded-full border border-white/10 text-xs font-bold tracking-widest uppercase text-center group-hover:bg-[#fdd835] group-hover:text-[#5b4b00] group-hover:border-transparent transition-all">
                                                    ver producto
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                </div>
            </main>

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

                        <button
                            onClick={closeLightbox}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#fdd835] hover:text-[#5b4b00] focus:outline-none"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Imagen desplazable */}
                    <div
                        className="flex flex-1 items-start justify-center overflow-auto p-6"
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
