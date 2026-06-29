<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| Public Routes (No Auth Required)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (All Roles: Admin & Client)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Phase 5 will add: Route::get('/products', ...);
});

/*
|--------------------------------------------------------------------------
| Admin Only Routes (Requires Auth + IsAdmin Middleware)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    // Phase 5: Product CRUD
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::get('/products', [ProductController::class, 'index']);

    // Phase 6: User Listing
    Route::get('/users', [UserController::class, 'index']);
});