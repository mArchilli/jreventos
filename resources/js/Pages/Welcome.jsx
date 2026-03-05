import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const carouselImages = [
    '/images/show-and-services/show_69a5e183813587.23967872.png',
    '/images/show-and-services/show_69a5e1838195d3.11917561.jpg',
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

            {/* HERO */}
            <section
                className="relative h-screen w-full overflow-hidden"
                style={{
                    backgroundImage: "url('/images/fondo-hero.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* nav */}
                <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
                    <img
                        src="/images/logo-jr-eventos.png"
                        alt="JR Eventos"
                        className="h-12 w-auto"
                    />
                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-full border border-white/70 px-5 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-full border border-white/70 px-5 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* content */}
                <div className="relative z-10 flex h-full items-center px-8 lg:px-20">
                    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

                        {/* LEFT */}
                        <div className="flex flex-col gap-6">
                            {/* stars + badge */}
                            <div className="flex items-center gap-3">
                                <span className="text-yellow-400 text-2xl tracking-wide">★★★★★</span>
                                <span className="rounded-full bg-white/15 px-4 py-1 text-sm text-white/90 backdrop-blur-sm">
                                    nuestros clientes nos respaldan
                                </span>
                            </div>

                            {/* heading */}
                            <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl xl:text-7xl">
                                Hacemos posible <br />
                                <span className="text-yellow-300">El evento</span>
                                <br />
                                de tus sueños
                            </h1>

                            {/* buttons */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a
                                    href="#contacto"
                                    className="rounded-full bg-yellow-300 px-8 py-3 text-base font-bold text-black shadow-lg transition hover:bg-yellow-200"
                                >
                                    Empecemos
                                </a>
                                <a
                                    href="#contacto"
                                    className="rounded-full border-2 border-white/80 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                                >
                                    Contáctanos
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

            {/* secciones futuras */}
            <div className="bg-gray-50 dark:bg-black"></div>
        </>
    );
}