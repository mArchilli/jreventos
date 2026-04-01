import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_HERO = '/images/fondo-hero.jpg';

export default function EventsIndex({ events }) {
    const heroImage = events?.[0]?.images?.[0]?.image_path
        ? `/${events[0].images[0].image_path}`
        : FALLBACK_HERO;

    return (
        <>
            <Head title="Eventos" />

            <Navbar />

            <section
                className="relative flex h-[55vh] min-h-[380px] w-full items-end overflow-hidden"
                style={{
                    backgroundImage: `url('${heroImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-8 pb-14 lg:px-16">
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                        <span className="text-yellow-400 text-sm leading-none">JR Eventos</span>
                        <span className="text-sm text-white/80">momentos inolvidables</span>
                    </div>

                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl">
                        Nuestros<br />
                        <span className="text-yellow-300">Eventos</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-white/60">
                        Reviví experiencias, puestas en escena y celebraciones que marcaron cada fecha.
                    </p>
                </div>
            </section>

            <section className="bg-black py-20 px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl">
                    {events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-28 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/15 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-white/30 text-lg font-medium">
                                Próximamente nuevos eventos.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-black py-16 px-6 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl flex flex-col items-center text-center gap-6">
                    <h2 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
                        ¿Querés que tu evento<br />
                        sea el <span className="text-yellow-300">próximo</span>?
                    </h2>
                    <p className="text-white/50 max-w-md text-base">
                        Escribinos y diseñamos juntos una experiencia hecha a medida.
                    </p>
                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}

function EventCard({ event }) {
    const cover = event.images?.[0]?.image_path ? `/${event.images[0].image_path}` : null;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-300/30">
            <div className="relative h-64 w-full overflow-hidden bg-white/5 shrink-0">
                {cover ? (
                    <img
                        src={cover}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                    {event.title}
                </h3>

                <Link
                    href={route('eventos.show', event.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black shadow-md transition duration-200 hover:bg-yellow-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                    Ver evento
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
