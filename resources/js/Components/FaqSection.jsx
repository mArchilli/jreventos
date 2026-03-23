import { useState } from 'react';

const FAQ_ITEMS = [
    {
        number: '01',
        question: '¿CON CUÁNTA ANTICIPACIÓN DEBO RESERVAR MI EVENTO?',
        answer:
            'Lo ideal es contactarnos con al menos 3 a 6 meses de anticipación, especialmente en temporada alta (fin de año, San Valentín, etc.). Sin embargo, hacemos lo posible por adaptarnos a cualquier plazo.',
    },
    {
        number: '02',
        question: '¿QUÉ TIPO DE EVENTOS ORGANIZAN?',
        answer:
            'Organizamos todo tipo de eventos: cumpleaños, casamientos, fiestas de 15, eventos corporativos, bautismos, baby showers, aniversarios y más. Cada evento lo personalizamos según tus necesidades.',
    },
    {
        number: '03',
        question: '¿PUEDO PERSONALIZAR TODOS LOS DETALLES DE MI EVENTO?',
        answer:
            'Por supuesto. Trabajamos 100% a medida. Desde la ambientación, la música, el catering y la decoración hasta los más mínimos detalles. Todo se adapta a tu visión y presupuesto.',
    },
    {
        number: '04',
        question: '¿CÓMO ES EL PROCESO DE PAGO Y RESERVA?',
        answer:
            'Una vez que aprobás la propuesta, se abona una seña para confirmar la fecha. El resto se puede abonar en cuotas o según el plan que acordemos juntos antes del evento.',
    },
    {
        number: '05',
        question: '¿OFRECEN SERVICIO DE COORDINACIÓN EL DÍA DEL EVENTO?',
        answer:
            'Sí. Nuestro equipo puede estar presente el día del evento para coordinar cada detalle y asegurarnos de que todo salga perfecto, para que vos solo te dediques a disfrutar.',
    },
    {
        number: '06',
        question: '¿TRABAJAN CON PROVEEDORES PROPIOS O PUEDO ELEGIR LOS MÍOS?',
        answer:
            'Contamos con una red de proveedores de confianza, pero también podemos trabajar con los que vos prefieras. Lo importante es que el resultado final sea exactamente lo que soñaste.',
    },
    {
        number: '07',
        question: '¿QUÉ PASA SI NECESITO CAMBIAR LA FECHA DE MI EVENTO?',
        answer:
            'Entendemos que pueden surgir imprevistos. Nos comunicás con la mayor anticipación posible y buscamos juntos una nueva fecha disponible sin inconvenientes.',
    },
    {
        number: '08',
        question: '¿TIENEN UN MONTO MÍNIMO PARA CONTRATAR SUS SERVICIOS?',
        answer:
            'No hay un monto mínimo fijo. Trabajamos con distintos presupuestos y siempre buscamos la mejor propuesta dentro de tus posibilidades. Contanos tu idea y te armamos algo a medida.',
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="bg-black py-24 px-6 sm:px-12 lg:px-24">
            <div className="mx-auto" style={{ maxWidth: '1300px' }}>

                {/* Título */}
                <h2
                    className="font-black text-white uppercase leading-none tracking-tight mb-16"
                    style={{ fontSize: 'clamp(32px, 11vw, 140px)' }}
                >
                    Preguntas frecuentes
                </h2>

                {/* Items */}
                <div className="flex flex-col">
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => toggle(i)}
                                className="w-full text-left border border-white/20 px-6 sm:px-10 py-7 sm:py-9 transition-colors duration-300 hover:bg-white/5 focus:outline-none"
                                style={{ marginTop: i === 0 ? 0 : '-1px' }}
                                aria-expanded={isOpen}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-6 sm:gap-10">

                                    {/* Número */}
                                    <span
                                        className="font-black text-white/40 leading-none select-none shrink-0"
                                        style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
                                    >
                                        {item.number}
                                    </span>

                                    {/* Pregunta */}
                                    <span
                                        className="flex-1 font-black text-white uppercase leading-tight tracking-tight"
                                        style={{ fontSize: 'clamp(18px, 3vw, 36px)' }}
                                    >
                                        {item.question}
                                    </span>

                                    {/* Icono +/- */}
                                    <span
                                        className="text-white shrink-0 transition-transform duration-300"
                                        style={{
                                            fontSize: 'clamp(28px, 3vw, 44px)',
                                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                        }}
                                    >
                                        +
                                    </span>
                                </div>

                                {/* Respuesta (colapsable) */}
                                <div
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                    style={{
                                        maxHeight: isOpen ? '300px' : '0',
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                >
                                    <p
                                        className="text-white/50 leading-relaxed pt-6 pl-0 sm:pl-16"
                                        style={{
                                            fontSize: 'clamp(15px, 1.6vw, 20px)',
                                            maxWidth: '900px',
                                        }}
                                    >
                                        {item.answer}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
