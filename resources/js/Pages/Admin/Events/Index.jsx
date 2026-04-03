
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import Quill from 'quill';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';

const IMAGES_PATH = import.meta.env.VITE_EVENTS_IMAGES_PATH ?? '/images/events/';

const emptyForm = {
    title: '',
    description: '',
    newFiles: [],
    newPreviews: [],
    removeIds: [],
};

const sanitizeDescription = (html) => ({ __html: DOMPurify.sanitize(html ?? '') });

export default function EventsIndex({ events }) {
    const { flash } = usePage().props;
    const quillRef = useRef(null);
    const quillInstanceRef = useRef(null);

    const [modal, setModal]               = useState(false);
    const [editing, setEditing]           = useState(null);
    const [form, setForm]                 = useState(emptyForm);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [searchTerm, setSearchTerm]     = useState('');
    const [sortOrder, setSortOrder]       = useState('asc');

    const filteredEvents = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return [...events.data]
            .filter(event => event.title?.toLowerCase().includes(term))
            .sort((a, b) => {
                const direction = sortOrder === 'asc' ? 1 : -1;
                return direction * (a.title ?? '').localeCompare(b.title ?? '', 'es', { sensitivity: 'base' });
            });
    }, [events.data, searchTerm, sortOrder]);

    useEffect(() => {
        if (!modal || !quillRef.current || quillInstanceRef.current) return;

        const quill = new Quill(quillRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'clean'],
                ],
            },
        });

        quill.on('text-change', () => {
            const html = quill.root.innerHTML;
            setForm(f => ({
                ...f,
                description: html === '<p><br></p>' ? '' : html,
            }));
        });

        quillInstanceRef.current = quill;
    }, [modal]);

    useEffect(() => {
        if (!modal || !quillInstanceRef.current) return;
        quillInstanceRef.current.root.innerHTML = form.description || '';
    }, [modal, editing?.id]);

    function openCreate() {
        setEditing(null);
        setForm(emptyForm);
        setModal(true);
    }

    function openEdit(event) {
        setEditing(event);
        setForm({
            ...emptyForm,
            title:       event.title,
            description: event.description,
        });
        setModal(true);
    }

    function addFiles(e) {
        const files    = Array.from(e.target.files);
        const previews = files.map(f => URL.createObjectURL(f));
        setForm(f => ({
            ...f,
            newFiles:    [...f.newFiles, ...files],
            newPreviews: [...f.newPreviews, ...previews],
        }));
        e.target.value = '';
    }

    function removeNewFile(idx) {
        setForm(f => ({
            ...f,
            newFiles:    f.newFiles.filter((_, i) => i !== idx),
            newPreviews: f.newPreviews.filter((_, i) => i !== idx),
        }));
    }

    function toggleRemoveExisting(id) {
        setForm(f => ({
            ...f,
            removeIds:   f.removeIds.includes(id)
                ? f.removeIds.filter(x => x !== id)
                : [...f.removeIds, id],
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);

        if (editing) {
            data.append('_method', 'PUT');
            form.removeIds.forEach(id => data.append('remove_image_ids[]', id));
            // Enviar nuevas imágenes como images[] también en edición
            form.newFiles.forEach(f => data.append('images[]', f));
            router.post(route('admin.events.update', editing.id), data, { forceFormData: true });
        } else {
            form.newFiles.forEach(f => data.append('images[]', f));
            router.post(route('admin.events.store'), data, { forceFormData: true });
        }
        setModal(false);
    }

    function handleDelete(id) {
        router.delete(route('admin.events.destroy', id));
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Eventos" />

            <div className="min-h-screen flex flex-col bg-black relative overflow-hidden font-sans antialiased">

                {/* Glow accents */}
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
                                <Link href={route('logout')} method="post" as="button"
                                    className="inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-200 active:scale-95">
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main */}
                <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12">

                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-300/70 mb-2">Admin</p>
                            <h1 className="font-black uppercase text-white" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>Eventos</h1>
                            <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
                        </div>
                        <button onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-bold text-black shadow-md transition hover:bg-yellow-200 active:scale-95">
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
                            placeholder="Buscar evento por título..."
                            className="w-full sm:max-w-md rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-300/50 focus:ring-0"
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

                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-yellow-300/20 bg-yellow-300/5 px-4 py-3 text-sm text-yellow-200">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {events.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <p className="text-white/40 text-sm">No hay eventos cargados aún.</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <p className="text-white/40 text-sm">No se encontraron eventos para la búsqueda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map(event => {
                                return (
                                    <div key={event.id} className="relative group rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition duration-200 hover:border-yellow-300/30 hover:-translate-y-0.5">

                                        {/* Main image */}
                                        <div className="h-48 w-full bg-white/5 overflow-hidden">
                                            {event.images?.[0]
                                                ? <img src={`/${event.images[0].image_path}`} alt={event.title} className="h-full w-full object-cover" />
                                                : <div className="h-full w-full flex items-center justify-center text-white/10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                    </svg>
                                                  </div>
                                            }
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-black uppercase text-white truncate">{event.title}</h3>
                                            <div
                                                className="mt-1 text-sm text-white/40 line-clamp-2"
                                                dangerouslySetInnerHTML={sanitizeDescription(event.description)}
                                            />

                                            {/* Thumbnails strip */}
                                            {event.images?.length > 1 && (
                                                <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                                                    {event.images.map(img => (
                                                        <img
                                                            key={img.id}
                                                            src={`/${img.image_path}`}
                                                            className="h-10 w-10 shrink-0 rounded-lg object-cover border-2 border-white/10"
                                                            alt=""
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-4 flex gap-2">
                                                <button onClick={() => openEdit(event)}
                                                    className="flex-1 rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:border-yellow-300/40 hover:text-yellow-300">
                                                    Editar
                                                </button>
                                                <button onClick={() => setDeleteTarget({ id: event.id, title: event.title })}
                                                    className="flex-1 rounded-xl border border-red-500/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500/50">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>

                <footer className="relative z-10 py-6 text-center text-xs text-white/20">
                    JR Eventos&copy;. todos los derechos reservados.
                </footer>
            </div>

            {/* ───── Modal Eliminar ───── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-center text-lg font-black uppercase text-white">¿Eliminar evento?</h3>
                        <p className="mt-2 text-center text-sm text-white/50">
                            Estás por eliminar <span className="font-semibold text-yellow-300">{deleteTarget.title}</span>.
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">
                                Cancelar
                            </button>
                            <button onClick={() => handleDelete(deleteTarget.id)}
                                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600">
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

                    <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-black uppercase text-white mb-6">
                            {editing ? 'Editar Evento' : 'Nuevo Evento'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1">Título</label>
                                <input type="text" required value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-300/50 focus:ring-0"
                                    placeholder="Título del evento" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1">Descripción</label>
                                <div className="rounded-xl border border-white/10 overflow-hidden [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:border-white/10 [&_.ql-editor]:text-white [&_.ql-editor]:bg-transparent [&_.ql-editor]:min-h-[140px] [&_.ql-editor.ql-blank::before]:text-white/20 [&_.ql-picker-label]:text-white/60 [&_.ql-stroke]:stroke-white/60 [&_.ql-fill]:fill-white/60">
                                    <div ref={quillRef} />
                                </div>
                            </div>

                            {/* ── Existing images (edit mode) ── */}
                            {editing && editing.images?.length > 0 && (
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-2">
                                        Imágenes actuales
                                        <span className="ml-1 text-white/30 normal-case font-normal">(✕ para eliminar)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {editing.images.map(img => {
                                            const markedRemove = form.removeIds.includes(img.id);
                                            return (
                                                <div key={img.id} className="relative">
                                                    <img
                                                        src={`/${img.image_path}`}
                                                        className={`h-20 w-20 rounded-xl object-cover border-2 transition
                                                            ${markedRemove ? 'opacity-30 border-red-500/50' : 'border-white/10'}`}
                                                        alt=""
                                                    />
                                                    <button type="button"
                                                        onClick={() => toggleRemoveExisting(img.id)}
                                                        className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow transition
                                                            ${markedRemove ? 'bg-white/20 text-white/60' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                                                        {markedRemove ? '↩' : '✕'}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ── New images upload ── */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-2">
                                    {editing ? 'Agregar imágenes' : 'Imágenes'}
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-white/10 px-4 py-3 cursor-pointer hover:border-yellow-300/40 hover:text-yellow-300/70 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm text-white/30">Seleccionar imágenes (múltiple)</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={addFiles} />
                                </label>

                                {form.newPreviews.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {form.newPreviews.map((src, i) => (
                                            <div key={i} className="relative">
                                                <img src={src} className="h-20 w-20 rounded-xl object-cover border-2 border-white/10" alt="" />
                                                <button type="button" onClick={() => removeNewFile(i)}
                                                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow hover:bg-red-600">
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setModal(false)}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">
                                    Cancelar
                                </button>
                                <button type="submit"
                                    className="flex-1 rounded-xl bg-yellow-300 px-4 py-2.5 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-200">
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
