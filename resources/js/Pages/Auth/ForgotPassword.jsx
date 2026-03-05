import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Recuperar Contraseña" />

            <div
                className="relative min-h-screen w-full flex items-center justify-center px-4 font-sans antialiased"
                style={{
                    backgroundImage: "url('/images/fondo-hero.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/65" />

                <div className="relative z-10 w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <a href="/" className="transition duration-200 hover:opacity-80 hover:scale-105">
                            <img src="/images/logo-jr-eventos.png" alt="JR Eventos" className="h-16 w-auto" />
                        </a>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-1">
                            Recuperar contraseña
                        </h1>
                        <p className="text-white/50 text-sm mb-7">
                            Ingresá tu correo y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        {status && (
                            <div className="mb-5 rounded-xl bg-green-500/20 border border-green-400/30 px-4 py-3 text-sm font-medium text-green-300">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="tu@email.com"
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/20"
                                />
                                <InputError message={errors.email} className="mt-1.5 !text-red-300" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Enviando…' : 'Enviar enlace de recuperación'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                href={route('login')}
                                className="text-sm text-white/45 transition duration-200 hover:text-white/80 underline-offset-2 hover:underline"
                            >
                                ← Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-white/25">
                        © {new Date().getFullYear()} JR Eventos. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </>
    );
}
