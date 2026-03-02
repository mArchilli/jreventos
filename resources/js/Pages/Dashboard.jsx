import { Head, Link, usePage } from '@inertiajs/react';

const cards = [
    {
        title: 'Shows y Servicios',
        description: 'Anuncios y actualizaciones',
        href: route('admin.shows.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
            </svg>
        ),
    },
    {
        title: 'Productos',
        description: 'Gestión completa del catálogo',
        href: route('admin.products.index'),
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
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
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Bienvenido al{' '}
                            <span className="text-violet-600">Panel</span>{' '}
                            <span className="text-violet-400">de</span>{' '}
                            <span className="text-amber-500">Administración</span>
                        </h1>
                        <p className="mt-3 text-base text-violet-500">
                            Desde aquí vas a poder gestionar shows, servicios y productos
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
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
                                    className="group relative flex flex-col items-center rounded-3xl bg-white/75 backdrop-blur-md border border-violet-200 px-12 py-14 shadow-xl transition duration-200 hover:shadow-2xl hover:-translate-y-1"
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
