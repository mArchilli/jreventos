import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import Quill from 'quill';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';

const IMAGES_PATH = import.meta.env.VITE_ARTISTS_IMAGES_PATH ?? '/images/artists/';

const emptyForm = {
    name: '',
    description: '',
    newFiles: [],
    newPreviews: [],
    mainImageId: null,
    removeIds: [],
};

const sanitizeDescription = (html) => ({ __html: DOMPurify.sanitize(html ?? '') });

export default function ArtistsIndex({ artists }) {
    const { flash } = usePage().props;
    const quillRef = useRef(null);
    const quillInstanceRef = useRef(null);

    const [modal, setModal]               = useState(false);
    const [editing, setEditing]           = useState(null);
    const [form, setForm]                 = useState(emptyForm);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [searchTerm, setSearchTerm]     = useState('');
    const [sortOrder, setSortOrder]       = useState('asc');

    const filteredArtists = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return [...artists]
            .filter(artist => artist.name?.toLowerCase().includes(term))
            .sort((a, b) => {
                const direction = sortOrder === 'asc' ? 1 : -1;
                return direction * (a.name ?? '').localeCompare(b.name ?? '', 'es', { sensitivity: 'base' });
            });
    }, [artists, searchTerm, sortOrder]);

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

    /* ───── helpers ───── */
    function openCreate() {
        setEditing(null);
        setForm(emptyForm);
        setModal(true);
    }

    function openEdit(artist) {
        setEditing(artist);
        setForm({
            ...emptyForm,
            name:        artist.name,
            description: artist.description,
            mainImageId: artist.main_image?.id ?? artist.images?.[0]?.id ?? null,
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
            mainImageId: f.mainImageId === id ? null : f.mainImageId,
        }));
    }

    /* ───── submit ───── */
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('description', form.description);

        if (editing) {
            data.append('_method', 'PUT');
            if (form.mainImageId) data.append('main_image_id', form.mainImageId);
            form.removeIds.forEach(id => data.append('remove_image_ids[]', id));
            form.newFiles.forEach(f => data.append('new_images[]', f));
            router.post(route('admin.artists.update', editing.id), data, { forceFormData: true });
        } else {
            if (form.newFiles.length > 0) data.append('main_image_index', 0);
            form.newFiles.forEach(f => data.append('images[]', f));
            router.post(route('admin.artists.store'), data, { forceFormData: true });
        }
        setModal(false);
    }

    function handleDelete(id) {
        router.delete(route('admin.artists.destroy', id));
        setDeleteTarget(null);
    }

    /* ───── render ───── */
    return (
        <>
            <Head title="Artistas" />

            <div className="min-h-screen flex flex-col relative overflow-hidden font-sans antialiased"
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
                                <Link href={route('logout')} method="post" as="button"
                                    className="inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
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
                            <h1 className="text-3xl font-bold text-gray-900">Artistas</h1>
                            <p className="mt-1 text-sm text-violet-500">Gestioná los artistas con los que trabajó la empresa</p>
                        </div>
                        <button onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700">
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
                            placeholder="Buscar artista por nombre..."
                            className="w-full sm:max-w-md rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                        <div className="inline-flex rounded-xl border border-violet-200 bg-white p-1">
                            <button
                                onClick={() => setSortOrder('asc')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${sortOrder === 'asc' ? 'bg-violet-600 text-white' : 'text-violet-700 hover:bg-violet-50'}`}
                            >
                                A - Z
                            </button>
                            <button
                                onClick={() => setSortOrder('desc')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${sortOrder === 'desc' ? 'bg-violet-600 text-white' : 'text-violet-700 hover:bg-violet-50'}`}
                            >
                                Z - A
                            </button>
                        </div>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {artists.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-violet-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No hay artistas cargados aún.</p>
                        </div>
                    ) : filteredArtists.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <p className="text-gray-500 text-sm">No se encontraron artistas para la búsqueda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredArtists.map(artist => {
                                const mainImg = artist.main_image ?? artist.images?.[0] ?? null;
                                return (
                                    <div key={artist.id} className="relative group rounded-3xl bg-white/75 backdrop-blur-md border border-violet-200 shadow-lg overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">

                                        {/* Main image */}
                                        <div className="h-48 w-full bg-violet-50 overflow-hidden">
                                            {mainImg
                                                ? <img src={`${IMAGES_PATH}${mainImg.filename}`} alt={artist.name} className="h-full w-full object-cover" />
                                                : <div className="h-full w-full flex items-center justify-center text-violet-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                  </div>
                                            }
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-800 truncate">{artist.name}</h3>
                                            <div
                                                className="mt-1 text-sm text-gray-500 line-clamp-2"
                                                dangerouslySetInnerHTML={sanitizeDescription(artist.description)}
                                            />

                                            {/* Thumbnails strip */}
                                            {artist.images?.length > 1 && (
                                                <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                                                    {artist.images.map(img => (
                                                        <img
                                                            key={img.id}
                                                            src={`${IMAGES_PATH}${img.filename}`}
                                                            className={`h-10 w-10 shrink-0 rounded-lg object-cover border-2 ${img.is_main ? 'border-violet-500' : 'border-transparent'}`}
                                                            alt=""
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-4 flex gap-2">
                                                <button onClick={() => openEdit(artist)}
                                                    className="flex-1 rounded-xl border border-violet-300 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50">
                                                    Editar
                                                </button>
                                                <button onClick={() => setDeleteTarget({ id: artist.id, name: artist.name })}
                                                    className="flex-1 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50">
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

                <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
                    JR Eventos&copy;. todos los derechos reservados.
                </footer>
            </div>

            {/* ───── Modal Eliminar ───── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl p-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-center text-lg font-bold text-gray-800">¿Eliminar artista?</h3>
                        <p className="mt-2 text-center text-sm text-gray-500">
                            Estás por eliminar <span className="font-semibold text-violet-700">{deleteTarget.name}</span>.
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
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
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(false)} />

                    <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {editing ? 'Editar Artista' : 'Nuevo Artista'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" required value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Nombre del artista" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <div className="rounded-xl border border-violet-200 bg-white overflow-hidden focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
                                    <div ref={quillRef} className="min-h-[180px]" />
                                </div>
                            </div>

                            {/* ── Existing images (edit mode) ── */}
                            {editing && editing.images?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Imágenes actuales
                                        <span className="ml-1 text-xs text-gray-400 font-normal">(tildá la principal · ✕ para eliminar)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {editing.images.map(img => {
                                            const markedRemove = form.removeIds.includes(img.id);
                                            const isMain       = form.mainImageId === img.id;
                                            return (
                                                <div key={img.id} className="relative">
                                                    <img
                                                        src={`${IMAGES_PATH}${img.filename}`}
                                                        className={`h-20 w-20 rounded-xl object-cover border-2 transition
                                                            ${markedRemove ? 'opacity-30 border-red-300' : isMain ? 'border-violet-500' : 'border-violet-100'}`}
                                                        alt=""
                                                    />
                                                    {!markedRemove && (
                                                        <button type="button"
                                                            onClick={() => setForm(f => ({ ...f, mainImageId: img.id }))}
                                                            title="Imagen principal"
                                                            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold transition
                                                                ${isMain ? 'bg-violet-600 text-white' : 'bg-white border border-violet-300 text-violet-500 hover:bg-violet-50'}`}>
                                                            {isMain ? '★ Principal' : '☆'}
                                                        </button>
                                                    )}
                                                    <button type="button"
                                                        onClick={() => toggleRemoveExisting(img.id)}
                                                        className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow transition
                                                            ${markedRemove ? 'bg-gray-300 text-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editing ? 'Agregar imágenes' : 'Imágenes'}
                                    {!editing && <span className="ml-1 text-xs text-gray-400 font-normal">(la primera será la principal por defecto)</span>}
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-violet-200 px-4 py-3 cursor-pointer hover:border-violet-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm text-violet-400">Seleccionar imágenes (múltiple)</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={addFiles} />
                                </label>

                                {form.newPreviews.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {form.newPreviews.map((src, i) => (
                                            <div key={i} className="relative">
                                                <img src={src} className="h-20 w-20 rounded-xl object-cover border-2 border-violet-100" alt="" />
                                                {i === 0 && !editing && (
                                                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap">
                                                        ★ Principal
                                                    </span>
                                                )}
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
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button type="submit"
                                    className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
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
