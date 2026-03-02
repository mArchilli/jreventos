<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ShowServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin - Shows & Services
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/shows-services',         [ShowServiceController::class, 'index'])->name('shows.index');
        Route::post('/shows-services',        [ShowServiceController::class, 'store'])->name('shows.store');
        Route::put('/shows-services/{show}',  [ShowServiceController::class, 'update'])->name('shows.update');
        Route::delete('/shows-services/{show}', [ShowServiceController::class, 'destroy'])->name('shows.destroy');
    });
});

require __DIR__.'/auth.php';
