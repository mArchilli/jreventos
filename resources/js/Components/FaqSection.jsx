import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function FaqSection() {
    const { faqs = [] } = usePage().props;
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    if (faqs.length === 0) return null;

    return (
        <section className="bg-black py-24 px-6 sm:px-12 lg:px-24">
            <div className="mx-auto" style={{ maxWidth: '1300px' }}>

                {/* Título */}
                <h2
                    className="font-black text-white uppercase leading-none tracking-tight mb-16"
                    style={{ fontSize: 'clamp(32px, 11vw, 140px)' }}
                >
                    <span className="text-yellow-300">PREGUNTAS</span>
                    <span className="text-white"> frecuentes</span>
                </h2>

                {/* Items */}
                <div className="flex flex-col">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <button
                                key={item.id}
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
                                        {String(item.order).padStart(2, '0')}
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
                                    <div
                                        className="text-white/50 leading-relaxed pt-6 pl-0 sm:pl-16"
                                        style={{
                                            fontSize: 'clamp(15px, 1.6vw, 20px)',
                                            maxWidth: '900px',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.answer || '') }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
