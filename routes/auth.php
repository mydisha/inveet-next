<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Authentication routes (guest only)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.request');
    Route::get('/reset-password/{token}', [AuthController::class, 'resetPassword'])->name('password.reset');
});
