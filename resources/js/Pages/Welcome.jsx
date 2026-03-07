import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const carouselImages = [
    '/images/carrusel-hero-1.jpg',
];

const clientLogos = [
    '/images/clientes-1.png',
    '/images/clientes-3.png',
    '/images/clientes-5.png',
    '/images/clientes-7.png',
    '/images/clientes-8.png',
];

const clientLogos2 = [
    '/images/clientes-2.png',
    '/images/clientes-4.png',
    '/images/clientes-6.png',
    '/images/clientes-1.png',
];

function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % carouselImages.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
            {carouselImages.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Evento ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === current ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}
            {/* dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                            i === current
                                ? 'bg-white scale-110'
                                : 'bg-white/40'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />

            <Navbar auth={auth} />

            {/* HERO */}
            <section
                className="relative h-screen w-full overflow-hidden"
                style={{
                    backgroundImage: "url('/images/fondo-hero.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >


                {/* content */}
                <div className="relative z-10 flex h-full items-center px-8 lg:px-32">
                    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center">

                        {/* LEFT */}
                        <div className="flex flex-col gap-6">
                            {/* badge con estrellas */}
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                                <span className="text-yellow-400 text-base leading-none tracking-wide">★★★★★</span>
                                <span className="text-sm text-white/90">nuestros clientes nos respaldan</span>
                            </div>

                            {/* heading */}
                            <h1 className="text-6xl font-black leading-none tracking-tight text-white lg:text-7xl xl:text-8xl uppercase">
                                Hacemos<br />
                                posible<br />
                                <span className="text-yellow-300">el evento</span><br />
                                de tus sueños
                            </h1>

                            {/* buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="#contacto"
                                    className="rounded-full bg-white px-7 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95"
                                >
                                    Construyamos juntos tu evento
                                </a>
                                <a
                                    href="https://wa.me/tuNumero"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full border-2 border-white/70 bg-transparent p-3.5 backdrop-blur-sm transition duration-200 hover:bg-white/20 hover:border-white hover:scale-110 active:scale-95"
                                    aria-label="Contactar por WhatsApp"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.428a.5.5 0 0 0 .609.61l5.7-1.49A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.888 9.888 0 0 1-5.031-1.371l-.36-.214-3.733.976.998-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* RIGHT carousel */}
                        <div className="hidden lg:flex h-[55vh] max-h-[560px] w-full items-center justify-center">
                            <HeroCarousel />
                        </div>

                    </div>
                </div>
            </section>

            {/* SECCIÓN CLIENTES */}
            <section className="bg-black py-20 px-8 overflow-hidden">
                <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center gap-16">

                    {/* Texto izquierda */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h2 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl uppercase">
                            Somos expertos en cumplir las{' '}
                            <span className="text-yellow-300">expectativas</span>{' '}
                            para tus eventos
                        </h2>
                        <p className="text-white/60 text-lg font-medium">Ellos ya confiaron en nosotros, podes hacerlo vos también</p>
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95 text-gray-900 font-semibold py-2 px-4 rounded-full transition duration-200 w-fit text-sm shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Contactar a un asesor por WhatsApp
                        </a>
                    </div>

                    {/* Columnas de logos */}
                    <div className="flex-1 flex gap-8 h-[560px] overflow-hidden">
                        {/* Columna que sube */}
                        <div
                            className="flex flex-col animate-scroll-up will-change-transform"
                            style={{ '--set-height': `${clientLogos.length * (160 + 32)}px` }}
                        >
                            {[...clientLogos, ...clientLogos, ...clientLogos].map((src, i) => (
                                <div key={`up-${i}`} className="flex items-center justify-center bg-white/5 rounded-2xl p-6 w-64 shrink-0 mb-8" style={{ height: '160px' }}>
                                    <img src={src} alt="cliente" className="max-h-24 max-w-full object-contain" />
                                </div>
                            ))}
                        </div>
                        {/* Columna que baja */}
                        <div
                            className="flex flex-col animate-scroll-down will-change-transform"
                            style={{ '--set-height': `${clientLogos2.length * (160 + 32)}px` }}
                        >
                            {[...clientLogos2, ...clientLogos2, ...clientLogos2].map((src, i) => (
                                <div key={`down-${i}`} className="flex items-center justify-center bg-white/5 rounded-2xl p-6 w-64 shrink-0 mb-8" style={{ height: '160px' }}>
                                    <img src={src} alt="cliente" className={`max-h-24 max-w-full object-contain${src.includes('clientes-2') ? ' brightness-0 invert' : ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* secciones futuras */}
            <div className="bg-gray-950 dark:bg-black"></div>

            <Footer />
        </>
    );
}