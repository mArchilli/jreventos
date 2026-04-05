import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const IMAGES_PATH = import.meta.env.VITE_PRODUCTS_IMAGES_PATH ?? '/images/products/';

export default function ProductsIndex({ products }) {
    return (
        <>
            <Head title="Productos" />

            <Navbar />

            {/* ── HERO ── */}
            <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
                <img
                    src="/images/fondo-hero.jpg"
                    alt="Productos"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

                <div className="relative z-10 w-full px-8 lg:px-32 pb-16 md:pb-24">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase">
                        <span className="text-white">NUESTROS</span> <span className="text-yellow-300">PRODUCTOS</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/50 text-sm md:text-lg leading-relaxed">
                        Explorá todo lo que tenemos disponible para hacer de tu evento algo inolvidable.
                    </p>
                </div>
            </section>

            {/* ── LISTADO ── */}
            <section className="bg-black px-8 lg:px-32 pb-20 md:pb-28">

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/15 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <p className="text-white/30 text-lg font-medium">
                            Próximamente más productos disponibles.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* ── CTA ── */}
            <section className="bg-black px-8 lg:px-32 py-16 border-t border-white/5">
                <div className="flex flex-col items-center text-center gap-6">
                    <h2 className="text-4xl font-black text-white tracking-tight lg:text-5xl">
                        ¿Necesitás algo<br />
                        <span className="text-yellow-300">especial</span> para tu evento?
                    </h2>
                    <p className="text-white/50 max-w-md text-base">
                        Contactanos y te armamos una propuesta a medida.
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

function stripHtml(html) {
    return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

function ProductCard({ product }) {
    const mainImage = product.main_image ?? null;
    const preview = stripHtml(product.description ?? '').slice(0, 100);
    const hasPrice = Number(product.price) > 0;

    return (
        <Link
            href={route('productos.show', product.id)}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-neutral-900 aspect-[3/4]"
        >
            {/* Imagen */}
            {mainImage ? (
                <img
                    src={`${IMAGES_PATH}${mainImage.filename}`}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-white/5" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

            {/* Precio */}
            {hasPrice && (
                <div className="absolute top-4 right-4 rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black shadow-lg z-10">
                    ${Number(product.price).toLocaleString('es-AR')}
                </div>
            )}

            {/* Contenido */}
            <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">
                            {product.title}
                        </h3>
                        {preview && (
                            <p className="text-white/50 text-sm line-clamp-2">{preview}{preview.length >= 100 ? '…' : ''}</p>
                        )}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300 shrink-0 ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
