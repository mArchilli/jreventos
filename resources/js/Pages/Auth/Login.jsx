import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans antialiased">

                {/* Imagen hero — mismo recurso que todas las secciones del sitio */}
                <img
                    src="/images/fondo-hero.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay con gradiente — idéntico al de Eventos y Shows */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-black" />

                {/* Ambient light leaks — igual que Footer */}
                <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[180px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-300/8 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                {/* Contenido */}
                <div className="relative z-10 w-full max-w-md px-6 py-14">

                    {/* Logo — mismo tratamiento que Navbar */}
                    <div className="flex justify-center mb-10">
                        <a href="/" className="transition duration-200 hover:opacity-75 hover:scale-105">
                            <img
                                src="/images/logo-jr-eventos.png"
                                alt="JR Eventos"
                                className="h-16 w-auto mix-blend-lighten"
                            />
                        </a>
                    </div>

                    {/* Heading editorial — igual tipografía que Eventos / Shows */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-black leading-none tracking-tight uppercase text-white">
                            BIENVENIDO<br />
                            <span className="text-yellow-300">DE VUELTA</span>
                        </h1>
                        <p className="mt-3 text-white/50 text-sm leading-relaxed">
                            Ingresá a tu cuenta para continuar
                        </p>
                    </div>

                    {/* Estado (reset/verificación) */}
                    {status && (
                        <div className="mb-5 rounded-2xl bg-green-500/15 border border-green-400/20 px-4 py-3 text-sm font-medium text-green-300 text-center">
                            {status}
                        </div>
                    )}

                    {/* Formulario */}
                    <form onSubmit={submit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="tu@email.com"
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition duration-200 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/15"
                            />
                            <InputError message={errors.email} className="mt-1.5 !text-red-300 text-xs" />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 pr-12 text-sm text-white placeholder-white/25 outline-none transition duration-200 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/15"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition duration-200 hover:text-white/70 focus:outline-none"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        /* Ojo tachado */
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        /* Ojo normal */
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5 !text-red-300 text-xs" />
                        </div>

                        {/* Recordarme + Olvidé contraseña */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-yellow-300 focus:ring-yellow-300/30 focus:ring-offset-0"
                                />
                                <span className="text-xs text-white/45 tracking-wide">Recordarme</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-xs text-yellow-300/60 transition duration-200 hover:text-yellow-300 underline-offset-2 hover:underline tracking-wide"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        {/* Botón — misma clase CTA que Shows y Hero */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-white px-8 py-3.5 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Ingresando…' : 'Ingresar'}
                            </button>
                        </div>
                    </form>

                    {/* Volver al sitio */}
                    <div className="mt-8 border-t border-white/5 pt-6 text-center">
                        <Link
                            href="/"
                            className="text-xs text-white/35 transition duration-200 hover:text-white/70 underline-offset-2 hover:underline tracking-widest uppercase"
                        >
                            ← Volver al sitio
                        </Link>
                    </div>

                    <p className="mt-4 text-center text-xs text-white/20 tracking-wide">
                        © {new Date().getFullYear()} JR Eventos. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </>
    );
}
