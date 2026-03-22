import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navLinks = [
    { label: 'Inicio',            href: '/'                },
    { label: 'Eventos',           href: '/eventos'         },
    { label: 'Shows y Servicios', href: '/shows-servicios' },
    { label: 'Productos',         href: '/productos'       },
    { label: 'Sobre Nosotros',    href: '/sobre-nosotros'  },
    { label: 'Artistas',          href: '/artistas'        },
];

export default function Navbar({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href) =>
        href === '/' ? url === '/' : url.startsWith(href);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-black/70 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-4">

                {/* Logo */}
                <a href="/" className="shrink-0 transition duration-200 hover:opacity-75 hover:scale-105">
                    <img
                        src="/images/logo-jr-eventos.png"
                        alt="JR Eventos"
                        className="h-12 w-auto"
                    />
                </a>

                {/* Links — derecha (desktop) */}
                <ul className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`text-sm font-medium transition duration-200 hover:text-yellow-300 ${
                                    isActive(link.href)
                                        ? 'text-white underline underline-offset-4 decoration-yellow-300 decoration-2'
                                        : 'text-white/80 hover:underline hover:underline-offset-4 hover:decoration-yellow-300 hover:decoration-2'
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger (mobile) */}
                <button
                    className="lg:hidden flex items-center gap-2 text-white p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase">Menu</span>
                    <div className="flex flex-col justify-center">
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Menú mobile — desliza desde arriba */}
            <div
                className="lg:hidden fixed inset-0 z-40 pointer-events-none"
                style={{ top: 0 }}
            >
                <div
                    className="pointer-events-auto bg-black w-full h-full flex flex-col transition-transform duration-500 ease-in-out"
                    style={{
                        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
                    }}
                >
                    {/* Header del menú (logo + cerrar) */}
                    <div className="flex items-center justify-between px-8 py-4">
                        <a href="/" className="shrink-0">
                            <img
                                src="/images/logo-jr-eventos.png"
                                alt="JR Eventos"
                                className="h-12 w-auto"
                            />
                        </a>
                        <button
                            className="flex items-center gap-2 text-white p-2"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Cerrar menú"
                        >
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Cerrar</span>
                            <div className="flex flex-col justify-center">
                                <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-1.5 transition-all duration-300" />
                                <span className="block w-6 h-0.5 bg-white my-1 opacity-0 transition-all duration-300" />
                                <span className="block w-6 h-0.5 bg-white -rotate-45 -translate-y-1.5 transition-all duration-300" />
                            </div>
                        </button>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-col gap-2 px-8 pt-8 flex-1">
                        {navLinks.map((link, i) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block py-3 text-2xl font-black uppercase tracking-tight transition-all duration-300 hover:text-yellow-300 ${
                                        isActive(link.href)
                                            ? 'text-white underline underline-offset-8 decoration-yellow-300 decoration-2'
                                            : 'text-white/80'
                                    }`}
                                    style={{
                                        transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
