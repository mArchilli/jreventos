import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_ARTISTS_IMAGES_PATH ?? '/images/artists/';

export default function ArtistsIndex({ artists }) {
    return (
        <>
            <Head title="Artistas" />

            <Navbar />

            {/* ── HERO ── */}
            <section
                className="relative flex h-[55vh] min-h-[380px] w-full items-end overflow-hidden"
                style={{
                    backgroundImage: "url('/images/fondo-hero.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

                <div className="relative z-10 mx-auto w-full max-w-screen-xl px-8 pb-14 lg:px-16">
                    {/* Badge */}
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                        <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                        <span className="text-sm text-white/80">talento único</span>
                    </div>

                    <h1 className="text-5xl font-black leading-none tracking-tight text-white lg:text-6xl xl:text-7xl">
                        Nuestros<br />
                        <span className="text-yellow-300">Artistas</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-white/60">
                        Conocé a los artistas que hacen de cada evento una experiencia inolvidable.
                    </p>
                </div>
            </section>

            {/* ── LISTADO ── */}
            <section className="bg-black py-20 px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl">

                    {artists.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-28 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/15 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <p className="text-white/30 text-lg font-medium">
                                Próximamente más artistas disponibles.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {artists.map((artist) => (
                                <ArtistCard key={artist.id} artist={artist} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-black py-16 px-6 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl flex flex-col items-center text-center gap-6">
                    <h2 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
                        ¿Querés contratar<br />
                        <span className="text-yellow-300">un artista</span> para tu evento?
                    </h2>
                    <p className="text-white/50 max-w-md text-base">
                        Contactanos y te armamos una propuesta a medida con los mejores talentos.
                    </p>
                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}

function ArtistCard({ artist }) {
    const mainImage = artist.main_image ?? null;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-300/30">

            {/* Imagen principal */}
            <div className="relative h-64 w-full overflow-hidden bg-white/5 shrink-0">
                {mainImage ? (
                    <img
                        src={`${IMAGES_PATH}${mainImage.filename}`}
                        alt={artist.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                )}
                {/* Degradado inferior */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Nombre + botón */}
            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                    {artist.name}
                </h3>

                <Link
                    href={route('artistas.show', artist.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black shadow-md transition duration-200 hover:bg-yellow-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                    Más información
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
