import { useRef, useEffect, useState, useCallback } from 'react';
// CAROUSEL VERSION — replaced scroll-snap with click/swipe navigation

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

// intro + 6 steps + CTA
const TOTAL = STEPS.length + 2;
const DISPLAY_TOTAL = STEPS.length + 1;

const SLIDE_TRANSITION = 'opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1)';

export default function ProcessTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const prev = useCallback(() => setActiveIndex(i => Math.max(0, i - 1)), []);
    const next = useCallback(() => setActiveIndex(i => Math.min(TOTAL - 1, i + 1)), []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
        const dx = touchStartX.current - e.changedTouches[0].clientX;
        const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
        if (Math.abs(dx) < 50 || dy > Math.abs(dx)) return;
        if (dx > 0) next(); else prev();
    };

    const isIntro = activeIndex === 0;
    const isCTA = activeIndex === TOTAL - 1;
    const currentDisplayStep = isCTA ? DISPLAY_TOTAL : Math.max(activeIndex, 1);

    return (
        <section
            id="como-trabajamos"
            className="relative bg-black h-screen flex items-center justify-center overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >

                {/* ── Etiqueta superior ───────────────────────────────────────── */}
                <div
                    className="absolute top-10 left-8 lg:left-32 z-20 transition-all duration-700"
                    style={{ opacity: (isIntro || isCTA) ? 0 : 1 }}
                >
                    <span className="text-[10px] tracking-[0.45em] text-white/30 uppercase font-semibold">
                        ¿Cómo trabajamos?
                    </span>
                </div>

                {/* ── Indicadores laterales — desktop ─────────────────────────── */}
                <div
                    className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3 z-20 transition-opacity duration-700"
                    style={{ opacity: isIntro ? 0 : 1 }}
                    aria-hidden="true"
                >
                    {Array.from({ length: DISPLAY_TOTAL }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: '8px',
                                height: i === currentDisplayStep - 1 ? '40px' : '8px',
                                background: i === currentDisplayStep - 1 ? 'rgba(253,224,71,0.95)' : 'rgba(255,255,255,0.18)',
                            }}
                        />
                    ))}
                </div>

                {/* ── Slide de introducción ───────────────────────────────────── */}
                <div
                    aria-hidden={!isIntro}
                    className="absolute inset-0 flex flex-col justify-center px-8 lg:px-32"
                    style={{
                        paddingTop: '64px',
                        paddingBottom: '96px',
                        opacity: isIntro ? 1 : 0,
                        transform: `translateX(${isIntro ? 0 : -60}px)`,
                        transition: SLIDE_TRANSITION,
                        pointerEvents: isIntro ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full">

                        {/* Badge */}
                        <span
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs tracking-[0.3em] text-white/40 uppercase font-semibold mb-8 select-none"
                        >
                            Nuestro proceso &mdash; {DISPLAY_TOTAL} pasos
                        </span>

                        {/* Línea separadora */}
                        <div className="w-full bg-white/10" style={{ height: '1px', marginBottom: '32px' }} />

                        {/* Heading */}
                        <h2
                            className="font-black text-white leading-none tracking-tight uppercase"
                            style={{
                                fontSize: 'clamp(32px, 11vw, 140px)',
                                textDecoration: 'underline',
                                textDecorationColor: 'rgba(255,255,255,0.15)',
                                textUnderlineOffset: 'clamp(8px, 1.2vw, 18px)',
                                textDecorationThickness: '1px',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            ¿Cómo trabajamos?
                        </h2>

                        {/* Descripción */}
                        <p
                            className="mt-10 leading-relaxed text-white/45"
                            style={{ fontSize: 'clamp(17px, 2vw, 24px)', maxWidth: '820px' }}
                        >
                            Seguimos un proceso simple y personalizado para que tu evento sea exactamente como lo soñaste. Usá las flechas para conocer cada paso.
                        </p>

                        {/* Mini indicadores de pasos + hint */}
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: DISPLAY_TOTAL }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="rounded-full bg-white/20"
                                        style={{ width: '6px', height: '6px' }}
                                    />
                                ))}
                            </div>
                            <span className="text-white/25 text-[11px] tracking-[0.35em] uppercase font-semibold">
                                seguí las flechas
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Slides de pasos ─────────────────────────────────────────── */}
                {STEPS.map((step, i) => {
                    const isActive = i + 1 === activeIndex;
                    const isPast   = i + 1 < activeIndex;
                    const offset   = isActive ? 0 : isPast ? -60 : 60;

                    return (
                        <div
                            key={i}
                            aria-hidden={!isActive}
                            className="absolute inset-0 flex flex-col justify-center px-8 lg:px-32"
                            style={{
                                paddingTop: '64px',
                                paddingBottom: '96px',
                                opacity: isActive ? 1 : 0,
                                transform: `translateX(${offset}px)`,
                                transition: SLIDE_TRANSITION,
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            <div className="w-full">

                                {/* Número de paso */}
                                <span
                                    className="block font-black text-white leading-none select-none mb-6"
                                    style={{
                                        fontSize: 'clamp(22px, 2.5vw, 36px)',
                                        letterSpacing: '0.35em',
                                        opacity: 0.75,
                                    }}
                                >
                                    {step.number}
                                </span>

                                {/* Línea separadora superior */}
                                <div className="w-full bg-white/10" style={{ height: '1px', marginBottom: '40px' }} />

                                {/* Título con subrayado animado */}
                                <h3
                                    className="font-black text-white leading-none tracking-tight uppercase"
                                    style={{
                                        fontSize: 'clamp(32px, 11vw, 140px)',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'rgba(255,255,255,0.15)',
                                        textUnderlineOffset: 'clamp(8px, 1.2vw, 18px)',
                                        textDecorationThickness: '1px',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                    }}
                                >
                                    {step.title}
                                </h3>

                                {/* Descripción */}
                                <p
                                    className="mt-10 leading-relaxed text-white/65 font-medium"
                                    style={{
                                        fontSize: 'clamp(17px, 2vw, 24px)',
                                        maxWidth: '820px',
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
                    className="absolute inset-0 flex flex-col justify-center px-8 lg:px-32"
                    style={{
                        paddingTop: '64px',
                        paddingBottom: '96px',
                        opacity: isCTA ? 1 : 0,
                        transform: `translateX(${isCTA ? 0 : 60}px)`,
                        transition: SLIDE_TRANSITION,
                        pointerEvents: isCTA ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full">

                        {/* Número / etiqueta */}
                        <span
                            className="block font-black text-white leading-none select-none mb-6"
                            style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', letterSpacing: '0.35em', opacity: 0.75 }}
                        >
                            07
                        </span>

                        {/* Línea separadora */}
                        <div className="w-full bg-white/10" style={{ height: '1px', marginBottom: '40px' }} />

                        {/* Título con subrayado */}
                        <h2
                            className="font-black text-white leading-none tracking-tight uppercase"
                            style={{
                                fontSize: 'clamp(32px, 11vw, 140px)',
                                textDecoration: 'underline',
                                textDecorationColor: 'rgba(255,255,255,0.15)',
                                textUnderlineOffset: 'clamp(8px, 1.2vw, 18px)',
                                textDecorationThickness: '1px',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            ¿Listo para empezar?
                        </h2>

                        {/* Descripción */}
                        <p
                            className="mt-10 leading-relaxed text-white/45"
                            style={{ fontSize: 'clamp(17px, 2vw, 24px)', maxWidth: '820px' }}
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

            {/* ── Flechas de navegación ─────────────────────────────────────── */}
            {/* Mobile: centradas y mas cerca del contenido | Desktop: alineadas a la izquierda */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-20 lg:left-32 lg:top-[76%] lg:bottom-auto lg:translate-x-0 z-20 flex items-center gap-4 lg:gap-6">
                <button
                    onClick={prev}
                    disabled={activeIndex === 0}
                    aria-label="Paso anterior"
                    className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] rounded-full border border-yellow-300/60 bg-black/35 text-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.12)] backdrop-blur-sm transition-all duration-200 hover:bg-yellow-300/15 hover:border-yellow-300 hover:scale-110 active:scale-90 active:bg-yellow-300/25 disabled:opacity-20 disabled:pointer-events-none"
                >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 stroke-current">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Contador — visible solo en mobile, en el centro */}
                <span
                    className="min-w-[92px] text-center text-sm font-bold tracking-[0.32em] text-white/70 uppercase sm:text-base"
                    aria-live="polite"
                >
                    {String(currentDisplayStep).padStart(2, '0')}&thinsp;/&thinsp;{String(DISPLAY_TOTAL).padStart(2, '0')}
                </span>

                <button
                    onClick={next}
                    disabled={activeIndex === TOTAL - 1}
                    aria-label="Paso siguiente"
                    className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] rounded-full border border-yellow-300/60 bg-black/35 text-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.12)] backdrop-blur-sm transition-all duration-200 hover:bg-yellow-300/15 hover:border-yellow-300 hover:scale-110 active:scale-90 active:bg-yellow-300/25 disabled:opacity-20 disabled:pointer-events-none"
                >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 stroke-current">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* ── Barra de progreso ─────────────────────────────────────────── */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-20" aria-hidden="true">
                <div
                    className="h-full bg-white/50 transition-all duration-700 ease-in-out"
                    style={{ width: `${(activeIndex / (TOTAL - 1)) * 100}%` }}
                />
            </div>

        </section>
    );
}
