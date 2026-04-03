import { Head, Link, usePage } from '@inertiajs/react';

const cards = [
    {
        title: 'Shows y Servicios',
        description: 'Anuncios y actualizaciones',
        href: route('admin.shows.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        ),
    },
    {
        title: 'Productos',
        description: 'Gestión del catálogo',
        href: route('admin.products.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
        ),
    },
    {
        title: 'Artistas',
        description: 'Artistas con los que trabajamos',
        href: route('admin.artists.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
    {
        title: 'Eventos',
        description: 'Gestión de eventos',
        href: route('admin.events.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
    },
    {
        title: 'Preguntas Frecuentes',
        description: 'Gestión de FAQ del sitio',
        href: route('admin.faqs.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
        ),
    },
];

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">

                {/* Noise texture overlay */}
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #1a1a0e 0%, #000 70%)' }} />

                {/* Glow accents */}
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #fde04722 0%, transparent 70%)', top: '-200px', left: '-100px', filter: 'blur(80px)', position: 'absolute' }} />
                    <div style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #fbbf2411 0%, transparent 70%)', bottom: '-100px', right: '-100px', filter: 'blur(80px)', position: 'absolute' }} />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 border-b border-white/10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/">
                                <img src="/images/logo-jr-eventos.png" alt="JR Eventos" className="h-10 w-auto mix-blend-lighten" />
                            </Link>

                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-white">JR Eventos</p>
                                    <p className="text-xs text-yellow-300/80">{auth.user.name}</p>
                                </div>

                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:border-white/40"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver al sitio
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-200 active:scale-95"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">

                    {/* Title */}
                    <div className="mb-16 text-center">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-300/70">Panel de administración</p>
                        <h1 className="font-black uppercase leading-none tracking-tight text-white"
                            style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}>
                            JR <span className="text-yellow-300">Eventos</span>
                        </h1>
                        <div className="mx-auto mt-4 h-px w-48 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />
                        <p className="mt-5 text-base text-white/50">
                            Gestioná shows, servicios, productos, artistas y más
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {cards.map((card) => (
                            <Link
                                key={card.title}
                                href={card.href}
                                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-200 hover:border-yellow-300/40 hover:bg-white/8 hover:-translate-y-1"
                            >
                                {/* Top */}
                                <div>
                                    {/* Icon */}
                                    <div className="mb-5 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-yellow-300 transition group-hover:border-yellow-300/30 group-hover:bg-yellow-300/10">
                                        {card.icon}
                                    </div>

                                    <h2 className="text-lg font-black uppercase leading-tight tracking-tight text-white">
                                        {card.title}
                                    </h2>
                                    <p className="mt-1.5 text-sm text-white/40">{card.description}</p>
                                </div>

                                {/* Bottom */}
                                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/30 transition group-hover:text-yellow-300/70">
                                        Acceder
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>

                                {/* Hover glow */}
                                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                                    style={{ background: 'radial-gradient(ellipse at top left, #fde04708 0%, transparent 60%)' }} />
                            </Link>
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-6 text-center text-xs text-white/20">
                    JR Eventos&copy;. Todos los derechos reservados.
                </footer>
            </div>
        </>
    );
}

