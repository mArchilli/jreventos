const footerColumns = [
    {
        title: 'Navegación',
        links: [
            { label: 'Inicio',            href: '/'                },
            { label: 'Eventos',           href: '/eventos'         },
            { label: 'Shows y Servicios', href: '/shows-servicios' },
            { label: 'Productos',         href: '/productos'       },
        ],
    },
    {
        title: 'Nosotros',
        links: [
            { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
            { label: 'Artistas',       href: '/artistas'       },
            { label: 'Preguntas frecuentes', href: '/faq'      },
        ],
    },
    {
        title: 'Contacto',
        links: [
            { label: 'Contáctanos',  href: '/contacto'  },
            { label: 'Presupuesto', href: '/presupuesto' },
        ],
    },
];

const socialLinks = [
    {
        href: 'https://instagram.com',
        label: 'Instagram',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
            </svg>
        ),
    },
    {
        href: 'https://facebook.com',
        label: 'Facebook',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"/>
            </svg>
        ),
    },
    {
        href: 'https://youtube.com',
        label: 'YouTube',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
            </svg>
        ),
    },
    {
        href: 'https://tiktok.com',
        label: 'TikTok',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z"/>
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">

            {/* Franja superior amarilla decorativa */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />

            {/* Cuerpo principal */}
            <div className="mx-auto max-w-screen-xl px-8 py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">

                    {/* Logo + descripción */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <a href="/">
                            <img
                                src="/images/logo-jr-eventos.png"
                                alt="JR Eventos"
                                className="h-14 w-auto"
                            />
                        </a>
                        <p className="text-sm text-white/55 leading-relaxed max-w-xs">
                            Hacemos realidad el evento de tus sueños. Producción,
                            shows y servicios para cada ocasión.
                        </p>

                        {/* Redes sociales */}
                        <div className="flex gap-3 mt-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-yellow-300 hover:text-yellow-300"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columnas de links */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
                        {footerColumns.map((col) => (
                            <div key={col.title}>
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow-300">
                                    {col.title}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {col.links.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-white/55 transition hover:text-yellow-300"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-white/10" />

            {/* Barra de copyright */}
            <div className="mx-auto max-w-screen-xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-white/40">
                    &copy; {year} JR Eventos.
                </p>
                <p className="text-xs text-white/25">
                    Powered by Pampa Labs
                </p>
            </div>

        </footer>
    );
}
