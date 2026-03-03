import { Head, Link, usePage } from '@inertiajs/react';

const cards = [
    {
        title: 'Shows y Servicios',
        description: 'Anuncios y actualizaciones',
        href: route('admin.shows.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        ),
    },
    {
        title: 'Productos',
        description: 'Gestión completa del catálogo',
        href: route('admin.products.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c0 0-1.5 3-1.5 5.25a1.5 1.5 0 003 0C13.5 5.25 12 2.25 12 2.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.343 5.093c0 0 .415 3.272 2.122 4.979a1.5 1.5 0 002.121-2.121C8.88 6.243 6.343 5.093 6.343 5.093z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 5.093c0 0-2.537 1.15-4.243 2.858a1.5 1.5 0 002.121 2.121c1.707-1.707 2.122-4.979 2.122-4.979z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 10.5c0 0 2.693 1.857 5.032 1.857A1.5 1.5 0 008.782 9.41C6.443 9.41 3.75 10.5 3.75 10.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 10.5c0 0-2.693 1.857-5.032 1.857a1.5 1.5 0 01-.001-2.946c2.34 0 5.033 1.089 5.033 1.089z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.357v9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.357c-1.5 0-4.5 1.125-4.5 1.125v6.75S10.5 21.357 12 21.357s4.5-1.125 4.5-1.125v-6.75s-3-1.125-4.5-1.125z" />
            </svg>
        ),
    },
    {
        title: 'Artistas',
        description: 'Artistas con los que trabajamos',
        href: route('admin.artists.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
];

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 30%, #faf5ff 55%, #ede9fe 80%, #ddd6fe 100%)' }}>

                {/* Bubbles background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #a78bfa55 0%, transparent 70%)', top: '-120px', left: '-150px', filter: 'blur(48px)', position: 'absolute' }} />
                    <div style={{ width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, #c4b5fd44 0%, transparent 70%)', top: '10%', right: '-100px', filter: 'blur(56px)', position: 'absolute' }} />
                    <div style={{ width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, #7c3aed33 0%, transparent 70%)', bottom: '80px', left: '15%', filter: 'blur(60px)', position: 'absolute' }} />
                    <div style={{ width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, #ddd6fe66 0%, transparent 70%)', bottom: '-60px', right: '20%', filter: 'blur(44px)', position: 'absolute' }} />
                    <div style={{ width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, #8b5cf644 0%, transparent 70%)', top: '40%', left: '45%', filter: 'blur(40px)', position: 'absolute' }} />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-violet-100 shadow-sm">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/">
                                <img src="/images/logo-jr-eventos.png" alt="JR Eventos" className="h-10 w-auto" />
                            </Link>

                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-800">JR Eventos</p>
                                    <p className="text-xs text-violet-500">{auth.user.name}</p>
                                </div>

                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
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
                                    className="inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:bg-violet-800"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16">

                    {/* Title */}
                    <div className="mb-14 text-center">
                        <h1
                            className="text-6xl font-black tracking-tight sm:text-7xl text-violet-700"
                            
                        >
                            JR Eventos
                        </h1>
                        {/* Decorative underline */}
                        <div className="mx-auto mt-3 h-1 w-32 rounded-full"
                            style={{ background: 'linear-gradient(90deg, #7c3aed, #f59e0b)' }} />
                        <p className="mt-4 text-base text-violet-500">
                            Desde aca vas a poder gestionar shows, servicios y productos
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <div key={card.title} className="relative">
                                {/* Glow blur behind card */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-3xl"
                                    style={{ background: 'radial-gradient(ellipse at center, #a78bfa55 0%, transparent 75%)', filter: 'blur(24px)', transform: 'scale(1.08)' }}
                                />
                                <Link
                                    href={card.href}
                                    className="group relative flex flex-col items-center rounded-3xl bg-white/75 backdrop-blur-md border border-violet-200 px-8 py-10 shadow-xl transition duration-200 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    {/* Icon */}
                                    <div className="mb-6 text-violet-500 transition group-hover:text-violet-700">
                                        {card.icon}
                                    </div>

                                    {/* Text */}
                                    <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
                                    <p className="mt-2 text-sm text-gray-500 text-center">{card.description}</p>

                                    {/* Divider */}
                                    <div className="mt-8 w-full border-t border-violet-100" />

                                    {/* Link */}
                                    <span className="mt-5 text-sm font-semibold text-violet-500 transition group-hover:text-violet-700">
                                        Acceder &rarr;
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
                    JR Eventos&copy;. todos los derechos reservados.
                </footer>
            </div>
        </>
    );
}
