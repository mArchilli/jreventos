import { useRef, useEffect, useState } from 'react';

const stats = [
    { value: '+17', label: 'Años de experiencia' },
    { value: '+150', label: 'Eventos realizados' },
    { value: '100%', label: 'Compromiso con tu visión' },
];

export default function AboutUs() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-20 px-8 lg:px-32 overflow-hidden"
        >
            <div>

                {/* Badge */}
                <span
                    className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs tracking-[0.3em] text-white/40 uppercase font-semibold mb-10 select-none transition-all duration-700 ${
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    ¿Qué es JR Eventos?
                </span>

                {/* Línea separadora */}
                <div
                    className={`w-full bg-white/10 transition-all duration-700 delay-100 ${
                        visible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ height: '1px', marginBottom: '40px' }}
                />

                {/* Título + Texto en dos columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-28">

                    {/* Columna izquierda — Título + Botón */}
                    <div className="flex flex-col gap-8">
                        <h2
                            className={`font-black text-white leading-none tracking-tight uppercase transition-all duration-700 delay-150 ${
                                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                            style={{
                                fontSize: 'clamp(40px, 8vw, 96px)',
                            }}
                        >
                            Creamos
                            <br />
                            <span className="text-yellow-300">sensaciones</span>
                            <br />
                            que perduran
                        </h2>

                        <a
                            href="/eventos"
                            className={`inline-flex w-fit items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-black text-black shadow-2xl transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_60px_rgba(253,224,71,0.35)] hover:scale-105 active:scale-95 delay-200 ${
                                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        >
                            Conoce nuestros eventos
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>

                    {/* Columna derecha — Texto + Stats */}
                    <div className="flex flex-col gap-8 justify-center">
                        <p
                            className={`text-white/50 leading-relaxed transition-all duration-700 delay-200 ${
                                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                            style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
                        >
                            Con más de 17 años en la industria de eventos, en JR&nbsp;Eventos nos especializamos en transformar ideas en celebraciones memorables. Desde bodas íntimas hasta grandes producciones corporativas, nuestro equipo de profesionales acompaña cada proyecto con dedicación, creatividad y una gestión integral que garantiza resultados impecables.
                        </p>

                        <p
                            className={`text-white/50 leading-relaxed transition-all duration-700 delay-300 ${
                                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                            style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
                        >
                            Trabajamos codo a codo con cada cliente para entender su visión, cuidar cada detalle y superar expectativas. Nuestra única finalidad es que vivas los mejores momentos, rodeado de quienes más querés.
                        </p>

                        {/* Stats */}
                        <div
                            className={`w-full bg-white/10 transition-all duration-700 delay-300 ${
                                visible ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ height: '1px' }}
                        />

                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col gap-2 transition-all duration-700 ${
                                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                    }`}
                                    style={{ transitionDelay: `${400 + i * 120}ms` }}
                                >
                                    <span
                                        className="font-black text-white leading-none"
                                        style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="text-white/35 text-xs sm:text-sm tracking-wide uppercase font-semibold">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
