<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Página no encontrada — JR Eventos</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css'])

    <style>
        body { margin: 0; padding: 0; }
    </style>
</head>
<body class="font-sans antialiased">

    <div
        class="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
        style="
            background-image: url('/images/fondo-hero.jpg');
            background-size: cover;
            background-position: center;
        "
    >
        {{-- Overlay --}}
        <div class="absolute inset-0 bg-black/70"></div>

        {{-- Contenido --}}
        <div class="relative z-10 flex flex-col items-center text-center max-w-xl w-full">

            {{-- Logo --}}
            <a href="/" class="mb-10 transition duration-200 hover:opacity-80 hover:scale-105 inline-block">
                <img src="/images/logo-jr-eventos.png" alt="JR Eventos" class="h-16 w-auto mx-auto">
            </a>

            {{-- Número 404 grande --}}
            <p class="text-9xl font-black leading-none tracking-tight text-white/10 select-none" style="font-size: clamp(7rem, 20vw, 12rem);">
                404
            </p>

            {{-- Mensaje --}}
            <h1 class="mt-4 text-4xl font-black text-white tracking-tight leading-tight md:text-5xl">
                Esta página no<br>
                <span class="text-yellow-300">existe</span>
            </h1>

            <p class="mt-4 text-white/50 text-base max-w-sm">
                La página que estás buscando fue movida, eliminada o nunca existió.
            </p>

            {{-- Botón volver --}}
            <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                    href="/"
                    class="rounded-full bg-white px-8 py-3 text-base font-bold text-black shadow-lg transition duration-200 hover:bg-yellow-300 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    Volver al inicio
                </a>
                <a
                    href="javascript:history.back()"
                    class="rounded-full border-2 border-white/40 bg-transparent px-8 py-3 text-base font-bold text-white/80 backdrop-blur-sm transition duration-200 hover:border-white hover:text-white hover:scale-105 active:scale-95"
                >
                    Página anterior
                </a>
            </div>
        </div>

        {{-- Footer --}}
        <p class="absolute bottom-5 left-0 right-0 text-center text-xs text-white/20">
            &copy; {{ date('Y') }} JR Eventos. Todos los derechos reservados.
        </p>
    </div>

</body>
</html>
