import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

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

export default function ProductsIndex({ products }) {
    const { flash } = usePage().props;

    const [modal, setModal]     = useState(false);
    const [editing, setEditing] = useState(null);  // full product object when editing
    const [form, setForm]       = useState(emptyForm);

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
        if (!confirm('¿Eliminar este producto?')) return;
        router.delete(route('admin.products.destroy', id));
    }

    /* ───── render ───── */
    return (
        <>
            <Head title="Productos" />

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
                            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
                            <p className="mt-1 text-sm text-violet-500">Gestioná el catálogo completo de productos</p>
                        </div>
                        <button onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nuevo
                        </button>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700">
                            {flash.success}
                        </div>
                    )}

                    {/* Grid */}
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-violet-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No hay productos cargados aún.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map(product => {
                                const mainImg = product.main_image ?? product.images?.[0] ?? null;
                                return (
                                    <div key={product.id} className="relative group rounded-3xl bg-white/75 backdrop-blur-md border border-violet-200 shadow-lg overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">

                                        {/* Main image */}
                                        <div className="h-48 w-full bg-violet-50 overflow-hidden">
                                            {mainImg
                                                ? <img src={`${IMAGES_PATH}${mainImg.filename}`} alt={product.title} className="h-full w-full object-cover" />
                                                : <div className="h-full w-full flex items-center justify-center text-violet-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 4.5h6m0 0v6m0-6L13.5 10.5" />
                                                    </svg>
                                                  </div>
                                            }
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
                                                <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                                                    ${Number(product.price).toLocaleString('es-AR')}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>

                                            {/* Thumbnails strip */}
                                            {product.images?.length > 1 && (
                                                <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                                                    {product.images.map(img => (
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
                                                <button onClick={() => openEdit(product)}
                                                    className="flex-1 rounded-xl border border-violet-300 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50">
                                                    Editar
                                                </button>
                                                <button onClick={() => handleDelete(product.id)}
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

            {/* ───── Modal ───── */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(false)} />

                    <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {editing ? 'Editar Producto' : 'Nuevo Producto'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input type="text" required value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Nombre del producto" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea required rows={3} value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 resize-none"
                                    placeholder="Descripción del producto" />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                                    <input type="number" required min="0" step="0.01" value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                        className="w-full rounded-xl border border-violet-200 pl-7 pr-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="0.00" />
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
                                                    {/* Set main */}
                                                    {!markedRemove && (
                                                        <button type="button"
                                                            onClick={() => setForm(f => ({ ...f, mainImageId: img.id }))}
                                                            title="Imagen principal"
                                                            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold transition
                                                                ${isMain ? 'bg-violet-600 text-white' : 'bg-white border border-violet-300 text-violet-500 hover:bg-violet-50'}`}>
                                                            {isMain ? '★ Principal' : '☆'}
                                                        </button>
                                                    )}
                                                    {/* Remove toggle */}
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

                                {/* Upload zone */}
                                <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-violet-200 px-4 py-3 cursor-pointer hover:border-violet-400 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm text-violet-400">Seleccionar imágenes (múltiple)</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={addFiles} />
                                </label>

                                {/* New previews */}
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
