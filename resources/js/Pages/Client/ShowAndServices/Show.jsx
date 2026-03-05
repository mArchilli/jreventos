import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_SHOWANDSERVICES_IMAGES_PATH ?? '/images/show-and-services/';

export default function ShowAndServicesShow({ show }) {
    return (
        <>
            <Head title={show.title} />

            <Navbar />

            {/* ── HERO con img_portada como fondo ── */}
            <section className="relative flex h-[65vh] min-h-[440px] w-full items-end overflow-hidden">
                {/* Fondo: portada del show o fondo-hero como fallback */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{
                        backgroundImage: show.img_portada
                            ? `url('${IMAGES_PATH}${show.img_portada}')`
                            : "url('/images/fondo-hero.jpg')",
                    }}
                />

                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/95" />

                {/* Breadcrumb + título */}
                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-8 pb-14 lg:px-16">
                    {/* Breadcrumb */}
                    <div className="mb-5 flex items-center gap-2 text-sm text-white/40">
                        <Link href="/" className="transition hover:text-white/70">Inicio</Link>
                        <span>/</span>
                        <Link href={route('shows-servicios.index')} className="transition hover:text-white/70">Shows y Servicios</Link>
                        <span>/</span>
                        <span className="text-white/70">{show.title}</span>
                    </div>

                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl">
                        {show.title}
                    </h1>
                </div>
            </section>

            {/* ── VOLVER AL LISTADO ── */}
            <section className="bg-black pt-10 px-6 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl">
                    <Link
                        href={route('shows-servicios.index')}
                        className="inline-flex items-center gap-2 text-sm text-white/40 transition duration-200 hover:text-white/80"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Volver a Shows y Servicios
                    </Link>
                </div>
            </section>

            {/* ── CONTENIDO PRINCIPAL ── */}
            <section className="bg-black py-20 px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">

                        {/* Descripción */}
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                                <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                                <span className="text-sm text-white/70">experiencia única</span>
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tight lg:text-4xl">
                                Sobre este <span className="text-yellow-300">show</span>
                            </h2>

                            <p className="text-white/60 text-base leading-relaxed whitespace-pre-line">
                                {show.description}
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
                                Consultar por este show
                            </a>
                        </div>

                        {/* Imagen vista */}
                        {show.img_vista ? (
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                                <img
                                    src={`${IMAGES_PATH}${show.img_vista}`}
                                    alt={`Vista de ${show.title}`}
                                    className="h-full w-full object-cover"
                                />
                                {/* Acento amarillo esquina */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
                            </div>
                        ) : (
                            /* Placeholder si no hay img_vista */
                            <div className="flex h-80 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            

            <Footer />
        </>
    );
}
