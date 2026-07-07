<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyEmailController;

Route::get('/', function () {
    if (! Auth::check()) {
        return redirect()->route('login');
    }
    return redirect()->route('admin.dashboard');
});

Route::middleware(['auth', \App\Http\Middleware\AdminOnly::class])
    ->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('products', ProductController::class)->except(['show']);
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::put('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.role');
        Route::put('/users/{user}/verify', [UserController::class, 'verifyEmail'])->name('users.verify');
        Route::put('/users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
        Route::post('/users/{user}/upload-photo', [UserController::class, 'uploadPhoto'])->name('users.upload-photo');
        Route::delete('/users/{user}/remove-photo', [UserController::class, 'removePhoto'])->name('users.remove-photo');
    });

Route::middleware(['auth', \App\Http\Middleware\AdminOnly::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::get('/email/verified', fn () => view('email-verified'))
    ->name('verification.verified');

require __DIR__.'/auth.php';
