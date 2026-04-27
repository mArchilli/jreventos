import { useRef, useEffect } from 'react';

function useFadeIn(threshold = 0.12) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return ref;
}

export default function AboutTimeLine() {
    const ref1 = useFadeIn(0.1);
    const ref2 = useFadeIn(0.1);

    return (
        <>
            {/* ── ¿Qué es JR Eventos? ─────────────────────────────────────── */}
            <section
                id="sobre-nosotros"
                className="bg-black px-8 lg:px-32 border-b border-white/5 flex items-center min-h-screen"
            >
                <div ref={ref1} className="fade-in-up py-24 lg:py-0 w-full">
                    <h2
                        className="font-black text-white leading-none tracking-tight uppercase"
                        style={{
                            fontSize: 'clamp(32px, 8vw, 115px)',
                            textDecoration: 'underline',
                            textDecorationColor: 'rgba(255,255,255,0.15)',
                            textUnderlineOffset: 'clamp(6px, 1vw, 14px)',
                            textDecorationThickness: '1px',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                        }}
                    >
                        ¿Qué es <span className="text-yellow-300">JR Eventos</span>?
                    </h2>
                    <p
                        className="mt-8 leading-relaxed text-white/60 font-semibold"
                        style={{ fontSize: 'clamp(17px, 2vw, 26px)', maxWidth: '820px' }}
                    >
                        Porque somos más que una productora de eventos, somos especialistas en que puedas cumplir el evento de tus sueños, seguí leyendo y descubrí qué nos hace la opción correcta para vos.
                    </p>
                    <div className="mt-10">
                        <a
                            href="/sobre-nosotros"
                            className="rounded-full bg-white px-7 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95 inline-block"
                        >
                            Conocénos en detalle
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Creamos sensaciones que perduran ────────────────────────── */}
            <section className="bg-black px-8 lg:px-32 border-b border-white/5 flex items-center min-h-screen">
                <div ref={ref2} className="fade-in-up py-24 lg:py-0 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 lg:gap-16 items-stretch">
                        {/* Columna izquierda — Título */}
                        <div className="flex flex-col justify-end">
                            <h2
                                className="font-black text-white leading-none tracking-tight uppercase"
                                style={{ fontSize: 'clamp(40px, 7.5vw, 110px)' }}
                            >
                                Creamos
                                <br />
                                <span className="text-yellow-300">sensaciones</span>
                                <br />
                                que perduran
                            </h2>
                        </div>

                        {/* Columna derecha — Texto + Botones */}
                        <div className="flex flex-col justify-between gap-8">
                            <div className="flex flex-col gap-5">
                                <p
                                    className="text-white/50 leading-relaxed"
                                    style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}
                                >
                                    Con más de 17 años de experiencia, en JR&nbsp;Eventos nos especializamos en transformar ideas en celebraciones memorables. Desde bodas íntimas, pasando por XV's y hasta grandes producciones corporativas, nuestro equipo de profesionales dedicados acompañan cada evento con dedicación, creatividad y una gestión integral que garantiza resultados impecables.
                                </p>
                                <p
                                    className="text-white/50 leading-relaxed"
                                    style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}
                                >
                                    Trabajamos codo a codo con cada cliente para entender su visión, cuidar cada detalle y superar sus expectativas. Nuestra única finalidad es que vivas los mejores momentos, rodeado de quienes más querés, el resto lo hacemos nosotros.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#carta-eventos"
                                    className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_60px_rgba(253,224,71,0.35)] hover:scale-105 active:scale-95"
                                >
                                    Carta de eventos
                                </a>
                                <a
                                    href="#como-trabajamos"
                                    className="inline-flex items-center gap-3 rounded-full border-2 border-white/30 px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95"
                                >
                                    Mirá cómo trabajamos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
