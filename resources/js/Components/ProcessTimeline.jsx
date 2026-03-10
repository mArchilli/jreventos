import { useRef, useEffect, useState } from 'react';

const STEPS = [
    {
        number: '01',
        title: 'Contactanos',
        description:
            'Escribinos a través de nuestras redes o líneas de contacto. Contanos qué tipo de evento estás soñando y qué ideas tenés en mente. Nuestro equipo está listo para escucharte y empezar a planificar contigo.',
    },
    {
        number: '02',
        title: 'Conocemos tu idea',
        description:
            'Un profesional en organización de eventos se pondrá en contacto contigo para entender en detalle lo que buscás: tipo de evento, estilo, cantidad de invitados y todo lo necesario para crear una propuesta a tu medida.',
    },
    {
        number: '03',
        title: 'Recibí tu propuesta',
        description:
            'Con toda la información recopilada, elaboramos un presupuesto personalizado y una propuesta pensada especialmente para tu evento. Podrás revisarla con tranquilidad y decidir si avanzar.',
    },
    {
        number: '04',
        title: 'Confirmá tu evento',
        description:
            'Si la propuesta te convence, confirmás el evento abonando una seña. Desde ese momento comenzamos a trabajar juntos y te acompañamos durante todo el proceso de organización.',
    },
    {
        number: '05',
        title: 'Viví tu evento',
        description:
            'Nuestro equipo estará a tu lado durante toda la preparación y, si lo deseás, también el día del evento para asegurarnos de que todo salga exactamente como lo soñaste.',
    },
    {
        number: '06',
        title: 'Compartí tu experiencia',
        description:
            'Días después del evento nos pondremos en contacto para saber cómo fue tu experiencia. Si tu fiesta cumplió tu sueño, te pediremos una reseña para nuestras redes y te devolveremos un 5% en efectivo como agradecimiento.',
    },
];

// 6 steps + 1 CTA slide
const TOTAL_SLIDES = STEPS.length + 1;

export default function ProcessTimeline() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const { top, height } = section.getBoundingClientRect();
            const scrolled = -top;
            const scrollable = height - window.innerHeight;

            if (scrolled <= 0) { setActiveIndex(0); return; }
            if (scrolled >= scrollable) { setActiveIndex(TOTAL_SLIDES - 1); return; }

            const progress = scrolled / scrollable;
            setActiveIndex(Math.floor(progress * TOTAL_SLIDES));
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isCTA = activeIndex === STEPS.length;

    return (
        <section
            ref={sectionRef}
            className="relative bg-black"
            style={{ height: `${TOTAL_SLIDES * 65 + 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* ── Etiqueta superior ───────────────────────────────────────── */}
                <div
                    className="absolute top-10 left-6 sm:left-12 lg:left-24 z-20 transition-all duration-700"
                    style={{ opacity: isCTA ? 0 : 1 }}
                >
                    <span className="text-[10px] tracking-[0.45em] text-white/30 uppercase font-semibold">
                        Cómo trabajamos
                    </span>
                </div>

                {/* ── Flecha scroll ───────────────────────────────────────────── */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700"
                    style={{ opacity: isCTA ? 0 : 1 }}
                    aria-hidden="true"
                >
                    <div className="animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                        </svg>
                    </div>
                </div>

                {/* ── Indicador de pasos (puntos laterales) ───────────────────── */}
                <div
                    className="absolute right-5 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 transition-opacity duration-700"
                    style={{ opacity: isCTA ? 0 : 1 }}
                    aria-hidden="true"
                >
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: '6px',
                                height: i === activeIndex ? '28px' : '6px',
                                background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>

                {/* ── Slides de pasos ─────────────────────────────────────────── */}
                {STEPS.map((step, i) => {
                    const isActive = i === activeIndex;
                    const isPast   = i < activeIndex;
                    const offset   = isActive ? 0 : isPast ? -44 : 44;

                    return (
                        <div
                            key={i}
                            aria-hidden={!isActive}
                            className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24"
                            style={{
                                opacity: isActive ? 1 : 0,
                                transform: `translateY(${offset}px)`,
                                transition:
                                    'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            <div className="w-full" style={{ maxWidth: '1100px' }}>

                                {/* Número de paso */}
                                <span
                                    className="block font-black text-white leading-none select-none mb-6"
                                    style={{
                                        fontSize: 'clamp(18px, 2vw, 26px)',
                                        letterSpacing: '0.35em',
                                        opacity: 0.75,
                                    }}
                                >
                                    {step.number}
                                </span>

                                {/* Línea separadora superior */}
                                <div className="w-full bg-white/10" style={{ height: '1px', marginBottom: '32px' }} />

                                {/* Título con subrayado animado */}
                                <h3
                                    className="font-black text-white leading-none tracking-tight"
                                    style={{
                                        fontSize: 'clamp(42px, 8vw, 100px)',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'rgba(255,255,255,0.15)',
                                        textUnderlineOffset: 'clamp(6px, 1vw, 14px)',
                                        textDecorationThickness: '1px',
                                    }}
                                >
                                    {step.title}
                                </h3>

                                {/* Descripción */}
                                <p
                                    className="mt-8 leading-relaxed text-white/45"
                                    style={{
                                        fontSize: 'clamp(15px, 1.6vw, 19px)',
                                        maxWidth: '680px',
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* ── Slide CTA ───────────────────────────────────────────────── */}
                <div
                    aria-hidden={!isCTA}
                    className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24"
                    style={{
                        opacity: isCTA ? 1 : 0,
                        transform: `translateY(${isCTA ? 0 : 44}px)`,
                        transition:
                            'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: isCTA ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full" style={{ maxWidth: '1100px' }}>

                        {/* Número / etiqueta */}
                        <span
                            className="block font-black text-white leading-none select-none mb-6"
                            style={{ fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '0.35em', opacity: 0.75 }}
                        >
                            07
                        </span>

                        {/* Línea separadora */}
                        <div className="w-full bg-white/10" style={{ height: '1px', marginBottom: '32px' }} />

                        {/* Título con subrayado */}
                        <h2
                            className="font-black text-white leading-none tracking-tight"
                            style={{
                                fontSize: 'clamp(42px, 8vw, 100px)',
                                textDecoration: 'underline',
                                textDecorationColor: 'rgba(255,255,255,0.15)',
                                textUnderlineOffset: 'clamp(6px, 1vw, 14px)',
                                textDecorationThickness: '1px',
                            }}
                        >
                            ¿Listo para empezar?
                        </h2>

                        {/* Descripción */}
                        <p
                            className="mt-8 leading-relaxed text-white/45"
                            style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', maxWidth: '680px' }}
                        >
                            Contanos tu sueño y nosotros nos encargamos del resto. Un asesor de JR Eventos te está esperando para empezar a planificar juntos.
                        </p>

                        {/* Botón */}
                        <a
                            href="https://wa.me/?text=Hola%2C%20quiero%20planificar%20mi%20evento%20con%20JR%20Eventos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center gap-3 mt-12
                                bg-white text-black font-bold rounded-full
                                py-4 px-9 text-base
                                transition-all duration-300
                                hover:bg-yellow-300 hover:scale-105
                                active:scale-95
                                shadow-[0_0_50px_rgba(255,255,255,0.12)]
                                hover:shadow-[0_0_70px_rgba(253,224,71,0.28)]
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 shrink-0"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.428a.5.5 0 0 0 .609.61l5.7-1.49A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.888 9.888 0 0 1-5.031-1.371l-.36-.214-3.733.976.998-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
                            </svg>
                            Quiero mi evento
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
