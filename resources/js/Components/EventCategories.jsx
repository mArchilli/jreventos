import { useState, useRef } from 'react';

const CATEGORIES = [
    {
        title: 'Bodas',
        description: 'El día más importante de tu vida merece una celebración a la altura de tu amor.',
        image: '/images/bodas-bg.png',
    },
    {
        title: 'Cumpleaños',
        description: 'Festejá cada año con una fiesta única e inolvidable.',
        image: '/images/cumpleaños-bg.png',
    },
    {
        title: 'Eventos deportivos',
        description: 'Producción integral para competencias y encuentros deportivos.',
        image: '/images/deportivos-bg.png',
    },
    {
        title: 'Eventos empresariales',
        description: 'Jornadas corporativas, lanzamientos y galas con estilo profesional.',
        image: '/images/empresariales-bg.png',
    },
    {
        title: "XV's",
        description: 'Hacé realidad la fiesta soñada de los quince.',
        image: '/images/xvs-bg.png',
    },
    {
        title: 'Fiestas de egresados - UPD',
        description: 'Cerrá una etapa con la mejor fiesta junto a tus compañeros.',
        image: '/images/upd-bg.png',
    },
    {
        title: 'Fiestas infantiles',
        description: 'Diversión garantizada para los más pequeños de la casa.',
        image: '/images/infantiles-bg.png',
    },
];

function Card({ category, className = '' }) {
    return (
        <div className={`group relative overflow-hidden rounded-2xl ${className}`}>
            {/* Imagen placeholder / real */}
            <div className="absolute inset-0 bg-white/5" />
            <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Contenido */}
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-black text-white uppercase leading-none tracking-tight text-xl sm:text-2xl lg:text-3xl">
                    {category.title}
                </h3>
                <p className="mt-2 text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                    {category.description}
                </p>
            </div>
        </div>
    );
}

export default function EventCategories() {
    const gridRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleMouseMove = (e) => {
        const rect = gridRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <section
            id="carta-eventos"
            className="relative bg-black px-8 lg:px-32 py-20 lg:h-screen lg:flex lg:flex-col lg:justify-center"
        >
            <div
                ref={gridRef}
                className="relative grid gap-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-[2fr_1.5fr_1.5fr] lg:h-[85vh] cursor-none overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {/* Cursor personalizado global */}
                <div
                    className="pointer-events-none absolute z-50 flex items-center justify-center transition-opacity duration-200"
                    style={{
                        left: pos.x,
                        top: pos.y,
                        transform: 'translate(-50%, -50%)',
                        opacity: visible ? 1 : 0,
                    }}
                >
                    <span
                        className="flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold uppercase tracking-widest shadow-xl"
                        style={{ width: '140px', height: '140px' }}
                    >
                        Ver eventos
                    </span>
                </div>

                {/* Fila 1: Bodas — full width */}
                <Card category={CATEGORIES[0]} className="min-h-[240px] lg:min-h-0 lg:col-span-4" />

                {/* Fila 2: Egresados (grande) + XV's + Cumpleaños (iguales) */}
                <Card category={CATEGORIES[5]} className="min-h-[200px] lg:min-h-0 lg:col-span-2" />
                <Card category={CATEGORIES[4]} className="min-h-[200px] lg:min-h-0 lg:col-span-1" />
                <Card category={CATEGORIES[1]} className="min-h-[200px] lg:min-h-0 lg:col-span-1" />

                {/* Fila 3: Empresariales + Deportivos (iguales) + Infantiles (grande) */}
                <Card category={CATEGORIES[3]} className="min-h-[200px] lg:min-h-0 lg:col-span-1" />
                <Card category={CATEGORIES[2]} className="min-h-[200px] lg:min-h-0 lg:col-span-1" />
                <Card category={CATEGORIES[6]} className="min-h-[200px] lg:min-h-0 lg:col-span-2" />
            </div>
        </section>
    );
}
