import { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_SLIDES = 2;

export default function AboutTimeLine() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isSnapping = useRef(false);
    const touchStartY = useRef(0);
    const targetSlideRef = useRef(0);

    const scrollToSlide = useCallback((index) => {
        const section = sectionRef.current;
        if (!section || isSnapping.current) return;
        const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
        targetSlideRef.current = clamped;
        const scrollable = section.offsetHeight - window.innerHeight;
        const target = section.offsetTop + (clamped / TOTAL_SLIDES) * scrollable;
        isSnapping.current = true;
        window.scrollTo({ top: target, behavior: 'smooth' });
        setTimeout(() => { isSnapping.current = false; }, 800);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;
            const { top, height } = section.getBoundingClientRect();
            const scrolled = -top;
            const scrollable = height - window.innerHeight;
            let idx = 0;
            if (scrolled <= 0) { idx = 0; }
            else if (scrolled >= scrollable) { idx = TOTAL_SLIDES - 1; }
            else { idx = Math.floor((scrolled / scrollable) * TOTAL_SLIDES); }
            setActiveIndex(idx);
            if (!isSnapping.current) {
                targetSlideRef.current = idx;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const isInSection = () => {
            const { top, bottom } = section.getBoundingClientRect();
            return top < window.innerHeight && bottom > 0 && top <= 0;
        };

        const isMobileViewport = () => window.innerWidth < 1024;

        // Wheel snap (works in DevTools mobile emulation)
        const onWheel = (e) => {
            if (!isMobileViewport() || !isInSection()) return;
            const t = targetSlideRef.current;
            // Allow scrolling past the timeline at boundaries
            if (e.deltaY > 0 && t >= TOTAL_SLIDES - 1) return;
            if (e.deltaY < 0 && t <= 0) return;
            e.preventDefault();
            if (!isSnapping.current) {
                if (e.deltaY > 0) scrollToSlide(t + 1);
                else scrollToSlide(t - 1);
            }
        };

        // Touch snap (works on real mobile)
        const onTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };
        const onTouchMove = (e) => {
            if (!isMobileViewport() || !isInSection()) return;
            const t = targetSlideRef.current;
            const deltaY = touchStartY.current - e.touches[0].clientY;
            // Allow scrolling past at boundaries
            if (deltaY > 0 && t >= TOTAL_SLIDES - 1) return;
            if (deltaY < 0 && t <= 0) return;
            e.preventDefault();
        };
        const onTouchEnd = (e) => {
            if (!isMobileViewport() || !isInSection() || isSnapping.current) return;
            const deltaY = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(deltaY) < 30) return;
            const t = targetSlideRef.current;
            if (deltaY > 0 && t < TOTAL_SLIDES - 1) scrollToSlide(t + 1);
            else if (deltaY < 0 && t > 0) scrollToSlide(t - 1);
        };

        section.addEventListener('wheel', onWheel, { passive: false });
        section.addEventListener('touchstart', onTouchStart, { passive: true });
        section.addEventListener('touchmove', onTouchMove, { passive: false });
        section.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            section.removeEventListener('wheel', onWheel);
            section.removeEventListener('touchstart', onTouchStart);
            section.removeEventListener('touchmove', onTouchMove);
            section.removeEventListener('touchend', onTouchEnd);
        };
    }, [scrollToSlide]);

    const isIntro = activeIndex === 0;
    const isAbout = activeIndex === 1;

    return (
        <section
            ref={sectionRef}
            className="relative bg-black"
            style={{ height: `${TOTAL_SLIDES * 65 + 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* ── Flecha scroll ───────────────────────────────────────────── */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700"
                    style={{ opacity: isAbout ? 0 : 1 }}
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

                {/* ── Indicador de slides ─────────────────────────────────────── */}
                <div
                    className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4 z-20"
                    aria-hidden="true"
                >
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: '10px',
                                height: i === activeIndex ? '48px' : '10px',
                                background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.25)',
                            }}
                        />
                    ))}
                </div>
                <div
                    className="lg:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-row gap-2.5 z-20"
                    aria-hidden="true"
                >
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-500"
                            style={{
                                height: '6px',
                                width: i === activeIndex ? '28px' : '6px',
                                background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>

                {/* ── Slide 0: ¿Qué es JR Eventos? ───────────────────────────── */}
                <div
                    aria-hidden={!isIntro}
                    className="absolute inset-0 flex items-center justify-center px-8 lg:px-32"
                    style={{
                        opacity: isIntro ? 1 : 0,
                        transform: `translateY(${isIntro ? 0 : -44}px)`,
                        transition:
                            'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: isIntro ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full">
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
                            ¿Qué es <span className="text-yellow-300">JR Eventos</span>?
                        </h2>
                        <p
                            className="mt-10 leading-relaxed text-white/60 font-semibold"
                            style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', maxWidth: '900px' }}
                        >
                            Porque somos más que una productora de eventos, somos especialistas en que puedas cumplir el evento de tus sueños, deslizá hacia abajo y descubrí qué nos hace la opción correcta para vos.
                        </p>
                    </div>
                </div>

                {/* ── Slide 1: Creamos sensaciones ────────────────────────────── */}
                <div
                    aria-hidden={!isAbout}
                    className="absolute inset-0 flex items-center px-8 lg:px-32"
                    style={{
                        opacity: isAbout ? 1 : 0,
                        transform: `translateY(${isAbout ? 0 : 44}px)`,
                        transition:
                            'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: isAbout ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full">
                        {/* Título + Texto en dos columnas */}
                        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 lg:gap-16 items-stretch">
                            {/* Columna izquierda — Título */}
                            <div className="flex flex-col justify-end">
                                <h2
                                    className="font-black text-white leading-none tracking-tight uppercase"
                                    style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}
                                >
                                    Creamos
                                    <br />
                                    <span className="text-yellow-300">sensaciones</span>
                                    <br />
                                    que perduran
                                </h2>
                            </div>

                            {/* Columna derecha — Texto + Botones */}
                            <div className="flex flex-col justify-between gap-4">
                                <p
                                    className="text-white/50 leading-relaxed"
                                    style={{ fontSize: 'clamp(15px, 1.8vw, 22px)' }}
                                >
                                    Con más de 17 años de experiencia, en JR&nbsp;Eventos nos especializamos en transformar ideas en celebraciones memorables. Desde bodas, íntimas, pasando por XV's y hasta grandes producciones corporativas, nuestro equipo de profesionales dedicados acompañan cada evento con dedicación, creatividad y una gestión integral que garantiza resultados impecables.
                                </p>

                                <p
                                    className="text-white/50 leading-relaxed"
                                    style={{ fontSize: 'clamp(15px, 1.8vw, 22px)' }}
                                >
                                    Trabajamos codo a codo con cada cliente para entender su visión, cuidar cada detalle y superar sus expectativas. Nuestra única finalidad es que vivas los mejores momentos, rodeado de quienes más querés, el resto lo hacemos nosotros.
                                </p>

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
                </div>

            </div>
        </section>
    );
}
