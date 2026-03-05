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
                    className="lg:hidden text-white p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
            </div>

            {/* Menú mobile */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen ? 'max-h-screen pb-6' : 'max-h-0'
                } bg-black/80 backdrop-blur-md`}
            >
                <ul className="flex flex-col gap-1 px-8 pt-2">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-2 text-sm font-medium transition duration-200 hover:text-yellow-300 ${
                                    isActive(link.href)
                                        ? 'text-white underline underline-offset-4 decoration-yellow-300 decoration-2'
                                        : 'text-white/80'
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    );
}
