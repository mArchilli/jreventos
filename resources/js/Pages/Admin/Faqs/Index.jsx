import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useMemo, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function FaqsIndex({ faqs }) {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ question: '', answer: '', order: 0 });
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const quillContainerRef = useRef(null);
    const quillRef = useRef(null);

    const filteredFaqs = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return [...faqs]
            .filter(f => f.question?.toLowerCase().includes(term))
            .sort((a, b) => a.order - b.order);
    }, [faqs, searchTerm]);

    function openCreate() {
        setEditing(null);
        setForm({ question: '', answer: '', order: faqs.length + 1 });
        setModal(true);
    }

    function openEdit(faq) {
        setEditing(faq);
        setForm({ question: faq.question, answer: faq.answer, order: faq.order });
        setModal(true);
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
                        ['link']
                    ]
                }
            });

            const q = quillRef.current;
            const _handleTextChange = () => {
                try {
                    setForm(f => ({ ...f, answer: q.root.innerHTML }));
                } catch (e) {}
            };
            q.on('text-change', _handleTextChange);
        }

        if (quillRef.current) {
            const current = quillRef.current.root.innerHTML;
            if ((form.answer || '') !== current) {
                quillRef.current.clipboard.dangerouslyPasteHTML(form.answer || '');
            }
        }
    }, [modal, form.answer]);

    // Cleanup Quill when modal closes so edit opens fresh
    useEffect(() => {
        if (modal) return;
        if (quillRef.current) {
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
        const answer = quillRef.current ? quillRef.current.root.innerHTML : form.answer;
        if (!answer || answer.replace(/<[^>]*>/g, '').trim() === '') {
            alert('La respuesta es requerida');
            return;
        }

        const payload = {
            question: form.question,
            answer: DOMPurify.sanitize(answer),
            order: form.order,
        };

        if (editing) {
            router.put(route('admin.faqs.update', editing.id), payload);
        } else {
            router.post(route('admin.faqs.store'), payload);
        }
        setModal(false);
    }

    function handleDelete(id) {
        router.delete(route('admin.faqs.destroy', id));
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Preguntas Frecuentes" />

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
                <main className="relative z-10 mx-auto w-full max-w-4xl px-4 py-12">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h1>
                            <p className="mt-1 text-sm text-violet-500">Gestioná las preguntas frecuentes del sitio</p>
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nueva
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Buscar pregunta..."
                            className="w-full sm:max-w-md rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    {/* Flash */}
                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700">
                            {flash.success}
                        </div>
                    )}

                    {/* List */}
                    {faqs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-violet-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No hay preguntas frecuentes cargadas aún.</p>
                        </div>
                    ) : filteredFaqs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm border border-violet-100 py-20 shadow-md">
                            <p className="text-gray-500 text-sm">No se encontraron preguntas para la búsqueda.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filteredFaqs.map((faq) => (
                                <div key={faq.id} className="rounded-2xl bg-white/75 backdrop-blur-md border border-violet-200 shadow-lg overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl">
                                    <div className="flex items-start gap-4 p-5">
                                        {/* Order number */}
                                        <span className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-violet-100 text-violet-700 font-bold text-sm">
                                            {String(faq.order).padStart(2, '0')}
                                        </span>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-gray-800 leading-tight">{faq.question}</h3>
                                            <div className="mt-1 text-sm text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer || '') }} />
                                        </div>

                                        {/* Actions */}
                                        <div className="shrink-0 flex gap-2">
                                            <button
                                                onClick={() => openEdit(faq)}
                                                className="rounded-xl border border-violet-300 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget({ id: faq.id, question: faq.question })}
                                                className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
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

            {/* ───── Modal Eliminar ───── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl p-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                        <h3 className="text-center text-lg font-bold text-gray-800">¿Eliminar pregunta?</h3>
                        <p className="mt-2 text-center text-sm text-gray-500">
                            Estás por eliminar <span className="font-semibold text-violet-700 break-words">{deleteTarget.question}</span>.
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deleteTarget.id)}
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
                            {editing ? 'Editar Pregunta' : 'Nueva Pregunta'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Question */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
                                <input
                                    type="text"
                                    required
                                    value={form.question}
                                    onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
                                    className="w-full rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Ej: ¿Con cuánta anticipación debo reservar?"
                                />
                            </div>

                            {/* Answer */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Respuesta</label>
                                <div className="rounded-xl border border-violet-200 bg-white overflow-hidden focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
                                    <div ref={quillContainerRef} className="min-h-[160px]" />
                                </div>
                            </div>

                            {/* Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form.order}
                                    onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                                    className="w-32 rounded-xl border border-violet-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
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
