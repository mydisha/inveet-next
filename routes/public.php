<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;

// Public routes (no auth required)
Route::get('/', [LandingController::class, 'index'])->name('home');

// Test routes
Route::get('/test', function () {
    try {
        \Illuminate\Support\Facades\Log::info('Attempting to render Inertia page: Test');

        // Try to render a very simple page using the helper
        return inertia('Test', [
            'message' => 'Hello from Inertia!',
            'timestamp' => now()->toISOString()
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Inertia render failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
});

// Simple test route for React component
Route::get('/simple-test', function () {
    return inertia('SimpleTest');
});

// Simple test route without Inertia
Route::get('/simple-test-json', function () {
    \Illuminate\Support\Facades\Log::info('Simple test route executed');
    return response()->json(['message' => 'Simple route is working!']);
});

// Simple dashboard test route
Route::get('/dashboard-simple', function () {
    return inertia('DashboardSimple', [
        'user' => null
    ]);
});

// Debug route for backoffice
Route::get('/backoffice-debug', function () {
    return response()->json([
        'auth' => auth()->check(),
        'user' => auth()->user(),
        'roles' => auth()->user() ? auth()->user()->roles->pluck('name') : null,
        'middleware' => 'working'
    ]);
})->middleware(['auth', 'backoffice']);

// Test routes
Route::get('/test/qr', function () {
    return inertia('Test/QRTest');
})->name('test.qr');

// Test 404 page
Route::get('/test/404', function () {
    return inertia('NotFound', [
        'status' => 404,
        'message' => 'Test 404 page - Halaman yang Anda cari tidak ditemukan'
    ]);
})->name('test.404');

// Error pages
Route::get('/419', [LandingController::class, 'pageExpired'])->name('page.expired');

// 404 Not Found route
Route::fallback([LandingController::class, 'notFound']);
