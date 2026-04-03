import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import Quill from 'quill';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';

const IMAGES_PATH = import.meta.env.VITE_PRODUCTS_IMAGES_PATH ?? '/images/products/';

const emptyForm = {
    title: '',
    description: '',
    price: '',
    newFiles: [],       // File objects to upload
    newPreviews: [],    // blob URLs for preview
    mainImageId: null,  // id of existing image set as main
    removeIds: [],      // ids of existing images to delete
};

const sanitizeDescription = (html) => ({ __html: DOMPurify.sanitize(html ?? '') });

export default function ProductsIndex({ products }) {
    const { flash } = usePage().props;
    const quillRef = useRef(null);
    const quillInstanceRef = useRef(null);

    const [modal, setModal]         = useState(false);
    const [editing, setEditing]     = useState(null);
    const [form, setForm]           = useState(emptyForm);
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredProducts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return [...products]
            .filter(product => product.title?.toLowerCase().includes(term))
            .sort((a, b) => {
                const direction = sortOrder === 'asc' ? 1 : -1;
                return direction * (a.title ?? '').localeCompare(b.title ?? '', 'es', { sensitivity: 'base' });
            });
    }, [products, searchTerm, sortOrder]);

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

    function openEdit(product) {
        setEditing(product);
        setForm({
            ...emptyForm,
            title:       product.title,
            description: product.description,
            price:       product.price,
            mainImageId: product.main_image?.id ?? product.images?.[0]?.id ?? null,
        });
        setModal(true);
    }

    function addFiles(e) {
        const files   = Array.from(e.target.files);
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
            removeIds: f.removeIds.includes(id)
                ? f.removeIds.filter(x => x !== id)
                : [...f.removeIds, id],
            // if we're marking main for removal, clear it
            mainImageId: f.mainImageId === id ? null : f.mainImageId,
        }));
    }

    /* ───── submit ───── */
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);
        data.append('price', form.price);

        if (editing) {
            data.append('_method', 'PUT');
            if (form.mainImageId) data.append('main_image_id', form.mainImageId);
            form.removeIds.forEach(id => data.append('remove_image_ids[]', id));
            form.newFiles.forEach(f => data.append('new_images[]', f));
            router.post(route('admin.products.update', editing.id), data, { forceFormData: true });
        } else {
            const mainIdx = form.newFiles.length > 0 ? 0 : null; // default first as main
            if (mainIdx !== null) data.append('main_image_index', mainIdx);
            form.newFiles.forEach(f => data.append('images[]', f));
            router.post(route('admin.products.store'), data, { forceFormData: true });
        }
        setModal(false);
    }

    function handleDelete(id) {
        router.delete(route('admin.products.destroy', id));
        setDeleteTarget(null);
    }

    /* ───── render ───── */
    return (
        <>
            <Head title="Productos" />

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
                                <Link href={route('logout')} method="post" as="button"
                                    className="inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95">
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main */}
                <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12">

                    <div className="mb-10 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-300/70 mb-2">Admin</p>
                            <h1 className="font-black uppercase text-white" style={{ fontSize: 'clamp(28px,5vw,56px)' }}>Productos</h1>
                            <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
                        </div>
                        <button onClick={openCreate}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95">
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
                            placeholder="Buscar producto por título..."
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

                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-yellow-300/20 bg-yellow-300/5 px-4 py-3 text-sm text-yellow-200">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p className="text-white/40 text-sm">No hay productos cargados aún.</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 py-20">
                            <p className="text-white/40 text-sm">No se encontraron productos para la búsqueda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map(product => {
                                const mainImg = product.main_image ?? product.images?.[0] ?? null;
                                return (
                                    <div key={product.id} className="flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition duration-200 hover:border-yellow-300/30 hover:-translate-y-0.5">

                                        {/* Main image */}
                                        <div className="h-48 w-full bg-white/5 overflow-hidden">
                                            {mainImg
                                                ? <img src={`${IMAGES_PATH}${mainImg.filename}`} alt={product.title} className="h-full w-full object-cover" />
                                                : <div className="h-full w-full flex items-center justify-center text-white/10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                                                    </svg>
                                                  </div>
                                            }
                                        </div>

                                        <div className="flex flex-col flex-1 p-5 justify-between">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="text-lg font-black uppercase text-white truncate">{product.title}</h3>
                                                    <span className="shrink-0 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-300">
                                                        ${Number(product.price).toLocaleString('es-AR')}
                                                    </span>
                                                </div>
                                                <div
                                                    className="mt-1 text-sm text-white/40 line-clamp-2"
                                                    dangerouslySetInnerHTML={sanitizeDescription(product.description)}
                                                />

                                                {/* Thumbnails strip */}
                                                {product.images?.length > 1 && (
                                                    <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                                                        {product.images.map(img => (
                                                            <img
                                                                key={img.id}
                                                                src={`${IMAGES_PATH}${img.filename}`}
                                                                className={`h-10 w-10 shrink-0 rounded-lg object-cover border-2 ${img.is_main ? 'border-yellow-300' : 'border-white/10'}`}
                                                                alt=""
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4 flex gap-2">
                                                <button onClick={() => openEdit(product)}
                                                    className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:border-yellow-300/40 hover:text-yellow-300">
                                                    Editar
                                                </button>
                                                <button onClick={() => setDeleteTarget({ id: product.id, title: product.title })}
                                                    className="flex-1 rounded-full border border-red-500/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500/50">
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
                        <h3 className="text-center text-lg font-black uppercase text-white">¿Eliminar producto?</h3>
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

                    <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-white/10 p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-black uppercase text-white mb-6">
                            {editing ? 'Editar Producto' : 'Nuevo Producto'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Título</label>
                                <input type="text" required value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-300/50 focus:ring-0"
                                    placeholder="Nombre del producto" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Descripción</label>
                                <div className="rounded-xl overflow-hidden [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:border-white/10 [&_.ql-editor]:text-white [&_.ql-editor]:bg-transparent [&_.ql-editor]:min-h-[140px] [&_.ql-editor.ql-blank::before]:text-white/20 [&_.ql-picker-label]:text-white/60 [&_.ql-stroke]:stroke-white/60 [&_.ql-fill]:fill-white/60">
                                    <div ref={quillRef} />
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">Precio</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40">$</span>
                                    <input type="number" required min="0" step="0.01" value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-7 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-300/50 focus:ring-0"
                                        placeholder="0.00" />
                                </div>
                            </div>

                            {/* ── Existing images (edit mode) ── */}
                            {editing && editing.images?.length > 0 && (
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-2">
                                        Imágenes actuales
                                        <span className="ml-1 text-[11px] text-white/30 font-normal normal-case">(tildá la principal · ✕ para eliminar)</span>
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
                                                            ${markedRemove ? 'opacity-30 border-red-500/50' : isMain ? 'border-yellow-300' : 'border-white/10'}`}
                                                        alt=""
                                                    />
                                                    {/* Set main */}
                                                    {!markedRemove && (
                                                        <button type="button"
                                                            onClick={() => setForm(f => ({ ...f, mainImageId: img.id }))}
                                                            title="Imagen principal"
                                                            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold transition
                                                                ${isMain ? 'bg-yellow-300 text-black' : 'border border-white/20 bg-zinc-900 text-white/40 hover:border-yellow-300/50 hover:text-yellow-300'}`}>
                                                            {isMain ? '★ Principal' : '☆'}
                                                        </button>
                                                    )}
                                                    {/* Remove toggle */}
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
                                    {!editing && <span className="ml-1 text-[11px] text-white/30 font-normal normal-case">(la primera será la principal por defecto)</span>}
                                </label>

                                {/* Upload zone */}
                                <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-white/10 px-4 py-3 cursor-pointer hover:border-yellow-300/40 transition text-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm">Seleccionar imágenes (múltiple)</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={addFiles} />
                                </label>

                                {/* New previews */}
                                {form.newPreviews.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {form.newPreviews.map((src, i) => (
                                            <div key={i} className="relative">
                                                <img src={src} className="h-20 w-20 rounded-xl object-cover border-2 border-white/10" alt="" />
                                                {i === 0 && !editing && (
                                                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-black whitespace-nowrap">
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
                                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">
                                    Cancelar
                                </button>
                                <button type="submit"
                                    className="flex-1 rounded-full bg-yellow-300 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-200 active:scale-95">
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
