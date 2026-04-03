import { Head, Link, router, usePage } from '@inertiajs/react';

const IMAGES_PATH = import.meta.env.VITE_SHOWANDSERVICES_IMAGES_PATH ?? '/images/show-and-services/';
import { useState } from 'react';
import { useRef, useEffect, useMemo } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function ShowsServicesIndex({ shows }) {
    const { flash } = usePage().props;

    const [modal, setModal]           = useState(false);
    const [editing, setEditing]       = useState(null);
    const [form, setForm]             = useState({ title: '', description: '', img_portada: null, img_vista: null });
    const [previews, setPreviews]     = useState({ img_portada: null, img_vista: null });
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const quillContainerRef = useRef(null);
    const quillRef = useRef(null);

    const filteredShows = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return [...shows]
            .filter(show => show.title?.toLowerCase().includes(term))
            .sort((a, b) => {
                const direction = sortOrder === 'asc' ? 1 : -1;
                return direction * (a.title ?? '').localeCompare(b.title ?? '', 'es', { sensitivity: 'base' });
            });
    }, [shows, searchTerm, sortOrder]);

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

    useEffect(() => {
        if (!modal) return;
        if (quillContainerRef.current && !quillRef.current) {
            quillRef.current = new Quill(quillContainerRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image']
                    ]
                }
            });

            const q = quillRef.current;
            const _handleTextChange = () => {
                try {
                    setForm(f => ({ ...f, description: q.root.innerHTML }));
                } catch (e) {}
            };
            q.on('text-change', _handleTextChange);
        }

        if (quillRef.current) {
            const current = quillRef.current.root.innerHTML;
            if ((form.description || '') !== current) {
                quillRef.current.clipboard.dangerouslyPasteHTML(form.description || '');
            }
        }
    }, [modal, form.description]);

    // Cleanup Quill when modal closes so edit opens fresh
    useEffect(() => {
        if (modal) return;
        if (quillRef.current) {
            // clear editor reference and DOM so next open initializes cleanly
            try {
                if (quillRef.current.root && quillRef.current.root.innerHTML) {
                    quillRef.current.root.innerHTML = '';
                }
            } catch (e) {}
            quillRef.current = null;
        }
        if (quillContainerRef.current) {
            quillContainerRef.current.innerHTML = '';
        }
    }, [modal]);

    function handleSubmit(e) {
        e.preventDefault();
        const description = quillRef.current ? quillRef.current.root.innerHTML : form.description;
        if (!description || description.replace(/<[^>]*>/g, '').trim() === '') {
            alert('La descripción es requerida');
            return;
        }

        const data = new FormData();
        data.append('title', form.title);
        data.append('description', DOMPurify.sanitize(description));
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
        router.delete(route('admin.shows.destroy', id));
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Shows y Servicios" />

            <div className="min-h-screen flex flex-col bg-black relative overflow-hidden font-sans antialiased">

                {/* Glows */}
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #1a1a0e 0%, #000 70%)' }} />
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #fde04722 0%, transparent 70%)', top: '-200px', left: '-100px', filter: 'blur(80px)', position: 'absolute' }} />
                    <div style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #fbbf2411 0%, transparent 70%)', bottom: '-100px', right: '-100px', filter: 'blur(80px)', position: 'absolute' }} />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 border-b border-white/10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/">
                                <img src="/images/logo-jr-eventos.png" alt="JR Eventos" className="h-10 w-auto mix-blend-lighten" />
                            </Link>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:border-white/40"
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
                                    className="inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95"
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
                    <div className="mb-10 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-300/70 mb-2">Admin</p>
                            <h1 className="font-black uppercase text-white" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>Shows y Servicios</h1>
                            <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nuevo
                        </button>
                    </div>

                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Buscar show o servicio por título..."
                            className="w-full sm:max-w-md rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-300/50 focus:ring-0"
                        />
                        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                            <button
                                onClick={() => setSortOrder('asc')}
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${sortOrder === 'asc' ? 'bg-yellow-300 text-black' : 'text-white/40 hover:text-white'}`}
                            >
                                A - Z
                            </button>
                            <button
                                onClick={() => setSortOrder('desc')}
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${sortOrder === 'desc' ? 'bg-yellow-300 text-black' : 'text-white/40 hover:text-white'}`}
                            >
                                Z - A
                            </button>
                        </div>
                    </div>

                    {/* Flash */}
                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-yellow-300/20 bg-yellow-300/5 px-4 py-3 text-sm text-yellow-200">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {shows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            <p className="text-white/40 text-sm">No hay shows ni servicios cargados aún.</p>
                        </div>
                    ) : filteredShows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <p className="text-white/40 text-sm">No se encontraron shows o servicios para la búsqueda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredShows.map((show) => (
                                <div key={show.id} className="flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition duration-200 hover:border-yellow-300/30 hover:-translate-y-0.5">
                                    {/* Portada */}
                                    <div className="h-44 w-full bg-white/5 overflow-hidden">
                                        {show.img_portada
                                            ? <img src={`${IMAGES_PATH}${show.img_portada}`} alt={show.title} className="h-full w-full object-cover" />
                                            : <div className="h-full w-full flex items-center justify-center text-white/10">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" /></svg>
                                              </div>
                                        }
                                    </div>

                                    <div className="flex flex-col flex-1 p-5 justify-between">
                                        <div>
                                            <h3 className="text-lg font-black uppercase text-white truncate">{show.title}</h3>
                                            <div className="mt-1 text-sm text-white/40 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.description || '') }} />

                                            {/* Vista thumbnail */}
                                            {show.img_vista && (
                                                <div className="mt-3">
                                                    <span className="text-xs text-yellow-300/70 font-semibold uppercase tracking-wide">Vista</span>
                                                    <img src={`${IMAGES_PATH}${show.img_vista}`} alt="vista" className="mt-1 h-16 w-full rounded-xl object-cover border border-white/10" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => openEdit(show)}
                                                className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:border-yellow-300/40 hover:text-yellow-300"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget({ id: show.id, title: show.title })}
                                                className="flex-1 rounded-full border border-red-500/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500/50"
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

                <footer className="relative z-10 py-6 text-center text-xs text-white/20">
                    JR Eventos&copy;. Todos los derechos reservados.
                </footer>
            </div>

            {/* ───── Modal Eliminar ───── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl bg-zinc-900 border border-white/10 p-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                        <h3 className="text-center text-lg font-black uppercase text-white">¿Eliminar show/servicio?</h3>
                        <p className="mt-2 text-center text-sm text-white/50">
                            Estás por eliminar <span className="font-semibold text-yellow-300">{deleteTarget.title}</span>.
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deleteTarget.id)}
                                className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── Modal Crear/Editar ───── */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(false)} />

                    <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-white/10 p-8 max-h-[85vh] overflow-y-auto">
                        <h2 className="text-xl font-black uppercase text-white mb-6">
                            {editing ? 'Editar Show/Servicio' : 'Nuevo Show/Servicio'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Título</label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-300/50 focus:ring-0"
                                    placeholder="Nombre del show o servicio"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Descripción</label>
                                <div className="rounded-xl overflow-hidden [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:border-white/10 [&_.ql-editor]:text-white [&_.ql-editor]:bg-transparent [&_.ql-editor]:min-h-[110px] [&_.ql-editor.ql-blank::before]:text-white/20 [&_.ql-picker-label]:text-white/60 [&_.ql-stroke]:stroke-white/60 [&_.ql-fill]:fill-white/60">
                                    <div ref={quillContainerRef} />
                                </div>
                            </div>

                            {/* Images row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* img_portada */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Img. Portada</label>
                                    <label className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-white/10 cursor-pointer hover:border-yellow-300/40 transition overflow-hidden">
                                        {previews.img_portada
                                            ? <img src={previews.img_portada} className="h-full w-full object-cover" alt="portada" />
                                            : <span className="text-xs text-white/30 text-center px-2">Seleccionar imagen</span>
                                        }
                                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'img_portada')} />
                                    </label>
                                </div>

                                {/* img_vista */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Img. Vista</label>
                                    <label className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-white/10 cursor-pointer hover:border-yellow-300/40 transition overflow-hidden">
                                        {previews.img_vista
                                            ? <img src={previews.img_vista} className="h-full w-full object-cover" alt="vista" />
                                            : <span className="text-xs text-white/30 text-center px-2">Seleccionar imagen</span>
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
                                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-full bg-yellow-300 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95"
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
