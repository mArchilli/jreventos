import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/**
 * Bento-grid layout pattern (desktop 12-col).
 * Cycles through rows of varying spans so any number of cards looks good.
 */
const DESKTOP_PATTERNS = [
    [8, 4],       // row A: 1 big + 1 small
    [4, 4, 4],    // row B: 3 equal
    [6, 6],       // row C: 2 equal
];

function getDesktopSpan(index) {
    let i = 0;
    let row = 0;
    while (true) {
        const pattern = DESKTOP_PATTERNS[row % DESKTOP_PATTERNS.length];
        for (const span of pattern) {
            if (i === index) return span;
            i++;
        }
        row++;
    }
}

function isLargeCard(span) {
    return span >= 6;
}

export default function EventsIndex({ events }) {
    const gridRef = useRef(null);

    return (
        <>
            <Head title="Eventos" />
            <Navbar />

            {/* ── Header ── */}
            <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
                {/* Hero image with gradient to black */}
                <img
                    src="/images/fondo-hero.jpg"
                    alt="Eventos"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

                <div className="relative z-10 w-full px-8 lg:px-32 pb-16 md:pb-24">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase">
                        <span className="text-white">HUB DE</span> <span className="text-yellow-300">EVENTOS</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-white/50 text-sm md:text-lg leading-relaxed">
                        Cada evento es una historia que cobra vida. Descubrí las puestas en escena, la energía y la magia detrás de cada celebración que dejó huella.
                    </p>
                </div>
            </section>

            {/* ── Bento Grid ── */}
            <section className="bg-black px-8 lg:px-32 pb-20 md:pb-28">
                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/15 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <p className="text-white/30 text-lg font-medium">Próximamente nuevos eventos.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop bento grid */}
                        <div
                            ref={gridRef}
                            className="relative hidden md:grid grid-cols-12 gap-5 auto-rows-[300px]"
                        >
                            {events.map((event, i) => {
                                const span = getDesktopSpan(i);
                                const large = isLargeCard(span);
                                return (
                                    <DesktopCard key={event.id} event={event} span={span} large={large} />
                                );
                            })}
                        </div>

                        {/* Mobile grid */}
                        <div className="grid md:hidden grid-cols-2 gap-4">
                            {events.map((event, i) => (
                                <MobileCard key={event.id} event={event} featured={i === 0} />
                            ))}
                        </div>
                    </>
                )}
            </section>

            <Footer />
        </>
    );
}

/* ── Desktop Card ── */
function DesktopCard({ event, span, large }) {
    const cover = event.images?.[0]?.image_path ? `/${event.images[0].image_path}` : null;
    const preview = stripHtml(event.description ?? '').slice(0, 100);

    return (
        <Link
            href={route('eventos.show', event.id)}
            className={`group relative overflow-hidden rounded-xl bg-neutral-900 col-span-${span}`}
            style={{ gridColumn: `span ${span}` }}
        >
            {cover ? (
                <img
                    src={cover}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className={`absolute bottom-0 left-0 w-full ${large ? 'p-8' : 'p-6'}`}>
                {large ? (
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2">
                                {event.title}
                            </h3>
                            {preview && (
                                <p className="text-white/50 font-medium text-sm max-w-md">{preview}{preview.length >= 100 ? '…' : ''}</p>
                            )}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-300 shrink-0 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                            <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-none">
                            {event.title}
                        </h3>
                        {preview && (
                            <p className="mt-1 text-white/50 text-sm line-clamp-2">{preview}{preview.length >= 100 ? '…' : ''}</p>
                        )}
                    </>
                )}
            </div>

            {event.images?.length > 1 && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                    </svg>
                    {event.images.length}
                </div>
            )}
        </Link>
    );
}

/* ── Mobile Card ── */
function MobileCard({ event, featured }) {
    const cover = event.images?.[0]?.image_path ? `/${event.images[0].image_path}` : null;

    return (
        <Link
            href={route('eventos.show', event.id)}
            className={`group relative overflow-hidden rounded-xl bg-neutral-900 ${
                featured ? 'col-span-2 aspect-[4/3]' : 'col-span-1 aspect-[1/1.2]'
            }`}
        >
            {cover ? (
                <img
                    src={cover}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className={`absolute bottom-0 left-0 w-full ${featured ? 'p-6' : 'p-4'}`}>
                <div className="flex items-center justify-between">
                    <h3 className={`font-black text-white uppercase tracking-tight leading-none ${featured ? 'text-2xl' : 'text-base'}`}>
                        {event.title}
                    </h3>
                    {featured && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300 shrink-0">
                            <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            </div>

            {event.images?.length > 1 && (
                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white/70 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                    </svg>
                    {event.images.length}
                </div>
            )}
        </Link>
    );
}

function stripHtml(html) {
    return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}
