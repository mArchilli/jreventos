import { Link } from '@inertiajs/react';

const exploreLinks = [
    { label: 'Sobre Nosotros',    href: '/sobre-nosotros'    },
    { label: 'Shows y Servicios', href: '/shows-servicios'   },
    { label: 'Productos',         href: '/productos'         },
    { label: 'Artistas',          href: '/artistas'          },
    { label: 'Eventos',           href: '/eventos'           },
];

const socialLinks = [
    {
        href: 'https://instagram.com/jreventos',
        label: 'Instagram',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
            </svg>
        ),
    },
    {
        href: 'https://facebook.com/jreventos',
        label: 'Facebook',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"/>
            </svg>
        ),
    },
    {
        href: 'https://youtube.com/jreventos',
        label: 'YouTube',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
            </svg>
        ),
    },
    {
        href: 'https://wa.me/541123456789',
        label: 'WhatsApp',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className="w-full relative overflow-hidden bg-[#0e0e0e] leading-relaxed min-h-screen flex flex-col justify-end">
            {/* Ambient Light Leaks */}
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-300/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-end flex-1 px-8 lg:px-32 pt-12 md:pt-16 pb-4 md:pb-6">

                {/* ── CTA Header ── */}
                <div className="md:flex items-end justify-between gap-12 mb-14 md:mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 md:mb-8 leading-none uppercase">
                            HABLEMOS DE{' '}
                            <br className="hidden md:block" />
                            <span className="text-yellow-300">TU GRAN MOMENTO</span>
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
                            Transformamos visiones en experiencias cinéticas que perduran en la memoria. Nuestro equipo de producción está a un clic de distancia.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 shrink-0">
                        <Link
                            href="/sobre-nosotros"
                            className="w-full md:w-auto inline-flex items-center justify-between md:justify-center gap-4 bg-white md:bg-white text-black px-10 py-5 rounded-full font-extrabold text-lg hover:bg-yellow-300 transition-all duration-300 group shadow-lg shadow-white/10 md:shadow-none"
                        >
                            <span>Empezar Proyecto</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-2">
                                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 py-10 md:py-14 border-t border-white/5">

                    {/* Brand Column */}
                    <div className="col-span-1">
                        <div className="text-4xl font-black tracking-tight text-yellow-300 mb-4 uppercase">
                            JR EVENTOS
                        </div>
                        <p className="text-white/50 mb-8 max-w-xs text-base">
                            Líderes en producción de eventos, combinando tecnología de vanguardia con diseño artístico excepcional.
                        </p>
                        <img
                            src="/images/logo-jr-eventos.png"
                            alt="JR Eventos"
                            className="hidden md:block h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Explorar */}
                    <div>
                        <h4 className="font-black text-white mb-5 md:mb-8 text-sm uppercase tracking-tight md:text-xl">
                            EXPLORAR
                        </h4>
                        <nav className="flex flex-col gap-3 md:gap-4">
                            {exploreLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/50 hover:text-yellow-300 transition-all duration-300 hover:translate-x-1 inline-block md:text-lg text-xl font-bold md:font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h4 className="font-black text-white mb-5 md:mb-8 text-sm uppercase tracking-tight md:text-xl">
                            REDES SOCIALES
                        </h4>
                        <ul className="space-y-4">
                            {socialLinks.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-white/50 hover:text-yellow-300 transition-all duration-300 hover:translate-x-1 md:text-lg"
                                    >
                                        <span className="w-5 h-5 shrink-0">{s.icon}</span>
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-black text-white mb-5 md:mb-8 text-sm uppercase tracking-tight md:text-xl">
                            CONTACTO
                        </h4>
                        <div className="space-y-6">
                            <a href="https://wa.me/541123456789" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                                <div className="mt-0.5 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-yellow-300 group-hover:bg-yellow-300 group-hover:text-black transition-colors">
                                    {/* WhatsApp logo */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-0.5">WhatsApp</p>
                                    <span className="text-white/70 group-hover:text-white transition-colors text-sm">+54 11 2345-6789</span>
                                </div>
                            </a>
                            <a href="mailto:hola@jreventos.com" className="flex items-start gap-4 group">
                                <div className="mt-0.5 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-yellow-300 group-hover:bg-yellow-300 group-hover:text-black transition-colors">
                                    {/* Email envelope */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-0.5">Email</p>
                                    <span className="text-white/70 group-hover:text-white transition-colors text-sm">hola@jreventos.com</span>
                                </div>
                            </a>
                            <div className="flex items-start gap-4 group">
                                <div className="mt-0.5 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-yellow-300">
                                    {/* Map pin */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-0.5">Ubicación</p>
                                    <p className="text-white/70 text-sm">Buenos Aires, Argentina</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm font-medium tracking-wide">
                        &copy; {year} JR Eventos.
                    </p>

                    <p className="text-white/30 text-sm">
                        Powered by{' '}
                        <a
                            href="https://archillimatias.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-300 hover:text-yellow-200 transition-colors uppercase font-bold"
                        >
                            PAMPA LABS
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
