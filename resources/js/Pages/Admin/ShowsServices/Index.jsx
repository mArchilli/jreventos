import { Head, Link, router, usePage } from '@inertiajs/react';

const IMAGES_PATH = import.meta.env.VITE_SHOWANDSERVICES_IMAGES_PATH ?? '/images/show-and-services/';
import { useState } from 'react';

export default function ShowsServicesIndex({ shows }) {
    const { flash } = usePage().props;

    const [modal, setModal]   = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm]     = useState({ title: '', description: '', img_portada: null, img_vista: null });
    const [previews, setPreviews] = useState({ img_portada: null, img_vista: null });

    function openCreate() {
        setEditing(null);
        setForm({ title: '', description: '', img_portada: null, img_vista: null });
        setPreviews({ img_portada: null, img_vista: null });
        setModal(true);
    }

    function openEdit(show) {
        setEditing(show);
        setForm({ title: show.title, description: show.description, img_portada: null, img_vista: null });
        setPreviews({
            img_portada: show.img_portada ? `${IMAGES_PATH}${show.img_portada}` : null,
            img_vista:   show.img_vista   ? `${IMAGES_PATH}${show.img_vista}`   : null,
        });
        setModal(true);
    }

    function handleFile(e, field) {
        const file = e.target.files[0];
        if (!file) return;
        setForm(f => ({ ...f, [field]: file }));
        setPreviews(p => ({ ...p, [field]: URL.createObjectURL(file) }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);
        if (form.img_portada) data.append('img_portada', form.img_portada);
        if (form.img_vista)   data.append('img_vista',   form.img_vista);

        if (editing) {
            data.append('_method', 'PUT');
            router.post(route('admin.shows.update', editing.id), data, { forceFormData: true });
        } else {
            router.post(route('admin.shows.store'), data, { forceFormData: true });
        }
        setModal(false);
    }

    function handleDelete(id) {
        if (!confirm('¿Eliminar este show/servicio?')) return;
        router.delete(route('admin.shows.destroy', id));
    }

    return (
        <>
            <Head title="Shows y Servicios" />

            <div className="min-h-screen flex flex-col relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 30%, #faf5ff 55%, #ede9fe 80%, #ddd6fe 100%)' }}>

                {/* Bubbles */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #a78bfa55 0%, transparent 70%)', top: '-120px', left: '-150px', filter: 'blur(48px)', position: 'absolute' }} />
                    <div style={{ width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, #c4b5fd44 0%, transparent 70%)', top: '10%', right: '-100px', filter: 'blur(56px)', position: 'absolute' }} />
                    <div style={{ width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, #7c3aed33 0%, transparent 70%)', bottom: '80px', left: '15%', filter: 'blur(60px)', position: 'absolute' }} />
                    <div style={{ width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, #ddd6fe66 0%, transparent 70%)', bottom: '-60px', right: '20%', filter: 'blur(44px)', position: 'absolute' }} />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-violet-100 shadow-sm">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/">
                                <img src="/images/logo-jr-eventos.png" alt="JR Eventos" className="h-10 w-auto" />
                            </Link>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Volver al panel
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main */}
                <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Shows y Servicios</h1>
                            <p className="mt-1 text-sm text-violet-500">Gestioná todos los shows y servicios disponibles</p>
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nuevo
                        </button>
                    </div>

                    {/* Flash */}
                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {shows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-violet-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No hay shows ni servicios cargados aún.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {shows.map((show) => (
                                <div key={show.id} className="relative group rounded-3xl bg-white/75 backdrop-blur-md border border-violet-200 shadow-lg overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                                    {/* Portada */}
                                    <div className="h-44 w-full bg-violet-50 overflow-hidden">
                                        {show.img_portada
                                            ? <img src={`${IMAGES_PATH}${show.img_portada}`} alt={show.title} className="h-full w-full object-cover" />
                                            : <div className="h-full w-full flex items-center justify-center text-violet-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" /></svg>
                                              </div>
                                        }
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{show.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{show.description}</p>

                                        {/* Vista thumbnail */}
                                        {show.img_vista && (
                                            <div className="mt-3">
                                                <span className="text-xs text-violet-400 font-medium uppercase tracking-wide">Vista</span>
                                                <img src={`${IMAGES_PATH}${show.img_vista}`} alt="vista" className="mt-1 h-16 w-full rounded-xl object-cover border border-violet-100" />
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => openEdit(show)}
                                                className="flex-1 rounded-xl border border-violet-300 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(show.id)}
                                                className="flex-1 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
                    JR Eventos&copy;. todos los derechos reservados.
                </footer>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(false)} />

                    <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {editing ? 'Editar Show/Servicio' : 'Nuevo Show/Servicio'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Nombre del show o servicio"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 resize-none"
                                    placeholder="Descripción del show o servicio"
                                />
                            </div>

                            {/* Images row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* img_portada */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Img. Portada</label>
                                    <label className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-violet-200 cursor-pointer hover:border-violet-400 transition overflow-hidden">
                                        {previews.img_portada
                                            ? <img src={previews.img_portada} className="h-full w-full object-cover" alt="portada" />
                                            : <span className="text-xs text-violet-400 text-center px-2">Seleccionar imagen</span>
                                        }
                                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'img_portada')} />
                                    </label>
                                </div>

                                {/* img_vista */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Img. Vista</label>
                                    <label className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-violet-200 cursor-pointer hover:border-violet-400 transition overflow-hidden">
                                        {previews.img_vista
                                            ? <img src={previews.img_vista} className="h-full w-full object-cover" alt="vista" />
                                            : <span className="text-xs text-violet-400 text-center px-2">Seleccionar imagen</span>
                                        }
                                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'img_vista')} />
                                    </label>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                                >
                                    {editing ? 'Guardar cambios' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
