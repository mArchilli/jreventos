import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

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
                            Bienvenido de vuelta
                        </h1>
                        <p className="text-white/50 text-sm mb-7">
                            Ingresá a tu cuenta para continuar
                        </p>

                        {status && (
                            <div className="mb-5 rounded-xl bg-green-500/20 border border-green-400/30 px-4 py-3 text-sm font-medium text-green-300">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
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
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/20"
                                />
                                <InputError message={errors.email} className="mt-1.5 !text-red-300" />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1.5">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/20"
                                />
                                <InputError message={errors.password} className="mt-1.5 !text-red-300" />
                            </div>

                            {/* Recordarme + Olvidé contraseña */}
                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-white/30 bg-white/10 text-yellow-300 focus:ring-yellow-300/30 focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-white/55">Recordarme</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-yellow-300/70 transition duration-200 hover:text-yellow-300 underline-offset-2 hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            {/* Botón submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Ingresando…' : 'Ingresar'}
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-white/25">
                        © {new Date().getFullYear()} JR Eventos. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </>
    );
}
