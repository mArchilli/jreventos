<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ShowServiceController;
use App\Http\Controllers\Admin\ArtistController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Client\ShowServiceController as ClientShowServiceController;
use App\Http\Controllers\Client\ProductController as ClientProductController;
use App\Http\Controllers\Client\ArtistController as ClientArtistController;
use App\Http\Controllers\Client\EventController as ClientEventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/shows-servicios', [ClientShowServiceController::class, 'index'])->name('shows-servicios.index');
Route::get('/shows-servicios/{show}', [ClientShowServiceController::class, 'show'])->name('shows-servicios.show');

Route::get('/productos', [ClientProductController::class, 'index'])->name('productos.index');
Route::get('/productos/{product}', [ClientProductController::class, 'show'])->name('productos.show');

Route::get('/artistas', [ClientArtistController::class, 'index'])->name('artistas.index');
Route::get('/artistas/{artist}', [ClientArtistController::class, 'show'])->name('artistas.show');

Route::get('/eventos', [ClientEventController::class, 'index'])->name('eventos.index');
Route::get('/eventos/{event}', [ClientEventController::class, 'show'])->name('eventos.show');

Route::get('/sobre-nosotros', function () {
    return Inertia::render('About');
})->name('sobre-nosotros');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin - Shows & Services
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/shows-services',           [ShowServiceController::class, 'index'])->name('shows.index');
        Route::post('/shows-services',            [ShowServiceController::class, 'store'])->name('shows.store');
        Route::put('/shows-services/{show}',      [ShowServiceController::class, 'update'])->name('shows.update');
        Route::delete('/shows-services/{show}',   [ShowServiceController::class, 'destroy'])->name('shows.destroy');

        Route::get('/products',                   [ProductController::class, 'index'])->name('products.index');
        Route::post('/products',                  [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}',         [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}',      [ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/artists',                    [ArtistController::class, 'index'])->name('artists.index');
        Route::post('/artists',                   [ArtistController::class, 'store'])->name('artists.store');
        Route::put('/artists/{artist}',           [ArtistController::class, 'update'])->name('artists.update');
        Route::delete('/artists/{artist}',        [ArtistController::class, 'destroy'])->name('artists.destroy');

        // Eventos CRUD
        Route::resource('events', \App\Http\Controllers\EventController::class);
        Route::delete('events/image/{image}', [\App\Http\Controllers\EventController::class, 'destroyImage'])->name('events.image.destroy');
    });
});

require __DIR__.'/auth.php';
