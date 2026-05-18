import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { getMainWhatsAppHref } from '@/utils/whatsapp';

/* ─── Hook: fade-in al hacer scroll ─────────────────────────── */
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

const pillars = [
    {
        num: '01',
        title: 'Experiencias Inmersivas',
        desc: 'Diseñamos cada ángulo visual y cada frecuencia sonora para crear sensaciones duraderas. La técnica y la emoción se fusionan en cada escenario.',
    },
    {
        num: '02',
        title: 'Tecnología de Vanguardia',
        desc: 'Equipamiento de audio y video de última generación que garantiza una fidelidad absoluta y una potencia visual inigualable en cada montaje.',
    },
    {
        num: '03',
        title: 'Diseño Emocional',
        desc: 'Entendemos que el impacto real de un evento ocurre en el corazón de los asistentes. Creamos narrativas visuales que conectan y conmueven.',
    },
    {
        num: '04',
        title: 'Gestión Integral',
        desc: 'Desde la conceptualización inicial hasta el desmontaje final, coordinamos cada recurso para una ejecución perfecta y sin contratiempos.',
    },
];

const processSteps = [
    { step: '01', title: 'Primera reunión',   desc: 'Escuchamos tu visión, entendemos tus necesidades y comenzamos a trazar el concepto del evento.' },
    { step: '02', title: 'Propuesta y diseño', desc: 'Presentamos una propuesta personalizada con ambientación, logística y todos los detalles técnicos.' },
    { step: '03', title: 'Producción',         desc: 'Nuestro equipo ejecuta cada aspecto del plan con precisión: montaje, sonido, iluminación y coordinación.' },
    { step: '04', title: 'El gran día',        desc: 'Estamos presentes en cada momento para garantizar que todo fluya perfectamente sin que te preocupes por nada.' },
    { step: '05', title: 'Post-evento',        desc: 'Hacemos un seguimiento para asegurarnos de que todo quedó como esperabas y recibir tu valoración.' },
];

const ABOUT_WHATSAPP_HREF = getMainWhatsAppHref('Hola, quiero consultar sobre JR Eventos y sus servicios.');

export default function About() {
    const identityRef = useFadeIn(0.08);
    const pillarsRef  = useFadeIn(0.06);
    const timelineRef = useFadeIn(0.06);

    return (
        <>
            <Head>
                <title>Sobre Nosotros | JR Eventos — Productora de Eventos en Argentina</title>
                <meta
                    name="description"
                    content="JR Eventos es una productora de eventos profesionales en Argentina. Especializados en eventos corporativos, sociales y artísticos. Creatividad, tecnología y producción de excelencia."
                />
                <meta
                    name="keywords"
                    content="productora de eventos Argentina, organización de eventos corporativos, eventos sociales, producción de shows, JR Eventos"
                />
            </Head>

            <Navbar />

            {/* ══════════════════════════════════════════════════════
                HERO
            ══════════════════════════════════════════════════════ */}
            <section className="relative h-screen w-full overflow-hidden">
                <img
                    src="/images/hero-sobrenosotros.png"
                    alt="Sobre Nosotros"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    style={{ transform: 'scale(1.06)', transformOrigin: 'center center' }}
                />

                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)' }}
                />

                {/* Content — abajo izquierda */}
                <div className="absolute bottom-0 left-0 px-8 lg:px-32 pb-16 lg:pb-24 z-10">
                    <h1
                        className="font-black leading-none tracking-tight text-white uppercase"
                        style={{ fontSize: 'clamp(48px, 10vw, 130px)' }}
                    >
                        Sobre<br />
                        <span className="text-yellow-300">nosotros</span>
                    </h1>
                    <p
                        className="mt-5 text-white/45 font-medium leading-relaxed"
                        style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', maxWidth: '540px' }}
                    >
                        No solo organizamos eventos; transformamos espacios en experiencias sensoriales que se quedan grabadas en la memoria.
                    </p>
                </div>


            </section>

            {/* ══════════════════════════════════════════════════════
                IDENTIDAD
            ══════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-24 lg:py-32 border-b border-white/5">
                <div ref={identityRef} className="fade-in-up flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-28">

                    {/* Izquierda — logo */}
                    <div className="flex flex-col gap-6 lg:w-[38%] shrink-0">
                        <img
                            src="/images/logo-jr-eventos.png"
                            alt="JR Eventos"
                            className="h-28 lg:h-56 w-auto object-contain mx-auto mix-blend-lighten"
                        />
                    </div>

                    {/* Derecha — texto */}
                    <div className="flex flex-col gap-6">
                        <h2
                            className="font-black text-white leading-none tracking-tight uppercase"
                            style={{ fontSize: 'clamp(26px, 3.8vw, 54px)' }}
                        >
                            17 años perfeccionando<br />
                            <span className="text-yellow-300">el arte de lo efímero</span>
                        </h2>
                        <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                            En JR Eventos transformamos ideas en experiencias que dejan huella. Con más de quince años de trayectoria, nos especializamos en crear momentos únicos, donde cada detalle está pensado para emocionar y sorprender.
                        </p>
                        <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                            Nuestro enfoque combina creatividad, planificación estratégica y tecnología de última generación para dar vida a eventos que no solo se ven increíbles, sino que se sienten inolvidables. Acompañamos cada proyecto desde su concepto inicial hasta su ejecución final, cuidando cada instancia con precisión y dedicación.
                        </p>
                        <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                            Creemos que un gran evento no se trata solo de lo que sucede, sino de lo que permanece. Por eso trabajamos para convertir cada celebración en un recuerdo que trasciende el tiempo.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/eventos"
                                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                Mira los eventos que realizamos
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                PILARES
            ══════════════════════════════════════════════════════ */}
            <section className="bg-black px-8 lg:px-32 py-24 lg:py-32 border-b border-white/5">
                <div ref={pillarsRef} className="fade-in-up">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-24 mb-16">
                        <div className="lg:flex-1">
                            <h2
                                className="font-black text-white leading-none tracking-tight uppercase"
                                style={{ fontSize: 'clamp(34px, 5.5vw, 80px)' }}
                            >
                                Nuestros <span className="text-yellow-300">pilares</span>
                            </h2>
                        </div>
                        <div className="lg:flex-1">
                            <p className="text-white/45 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                                Cada proyecto nace desde la convicción de que un evento bien producido cambia la vida de quien lo vive. Estos principios guían cada decisión que tomamos.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                        {pillars.map(({ num, title, desc }) => (
                            <div
                                key={num}
                                className="relative flex flex-col justify-between gap-10 p-10 lg:p-14 bg-black hover:bg-white/[0.03] transition-colors duration-500 group overflow-hidden"
                            >
                                {/* Número pequeño */}
                                <span className="text-[10px] tracking-[0.45em] text-yellow-300/60 font-black uppercase">
                                    {num}
                                </span>

                                {/* Contenido */}
                                <div className="flex flex-col gap-4">
                                    <h3
                                        className="font-black text-white uppercase tracking-wide leading-tight transition-colors duration-300 group-hover:text-yellow-300"
                                        style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}
                                    >
                                        {title}
                                    </h3>
                                    <p className="text-white/40 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
                                        {desc}
                                    </p>
                                </div>

                                {/* Línea inferior amarilla en hover */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-300/60 transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                PROCESO — TIMELINE
            ══════════════════════════════════════════════════════ */}
            <section
                className="px-8 lg:px-32 py-24 lg:py-32 border-b border-white/5"
                style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)' }}
            >
                <div ref={timelineRef} className="fade-in-up">
                    <div className="mb-14">
                        <h2
                            className="font-black text-white leading-none tracking-tight uppercase"
                            style={{ fontSize: 'clamp(34px, 5.5vw, 80px)' }}
                        >
                            Así hacemos<br />
                            <span className="text-yellow-300">posible tu evento</span>
                        </h2>
                    </div>

                    <div className="flex flex-col divide-y divide-white/[0.08]">
                        {processSteps.map(({ step, title, desc }) => (
                            <div
                                key={step}
                                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8 group"
                            >
                                <span className="text-yellow-300/50 font-black text-xs tracking-[0.35em] shrink-0 pt-1 sm:w-10">
                                    {step}
                                </span>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-16 flex-1">
                                    <h3 className="font-black text-white uppercase tracking-wide text-base sm:text-lg shrink-0 sm:w-52 transition-colors duration-300 group-hover:text-yellow-300">
                                        {title}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed mt-2 sm:mt-0">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón contactar */}
                    <div className="mt-14 flex justify-center">
                        <a
                            href={ABOUT_WHATSAPP_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Contactar con un asesor
                        </a>
                    </div>
                </div>
            </section>



            <Footer />
        </>
    );
}
