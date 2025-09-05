<?php

use Illuminate\Support\Facades\Route;

// System routes
// CSRF token refresh route (public - needed for token refresh)
Route::get('/csrf-token', function () {
    // Ensure session is started
    if (!session()->isStarted()) {
        session()->start();
    }

    $csrfToken = csrf_token();

    return response()->json([
        'csrf_token' => $csrfToken,
        'timestamp' => now()->toISOString(),
        'session_id' => session()->getId(),
        'debug' => [
            'session_started' => session()->isStarted(),
            'csrf_token_length' => strlen($csrfToken),
            'session_name' => session()->getName(),
            'csrf_token_empty' => empty($csrfToken),
            'csrf_token_null' => is_null($csrfToken)
        ]
    ]);
});

// Test CSRF token generation
Route::get('/test-csrf', function () {
    return response()->json([
        'message' => 'CSRF test endpoint',
        'csrf_token' => csrf_token(),
        'session_id' => session()->getId(),
        'session_started' => session()->isStarted()
    ]);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});

// Backoffice search routes (public for now)
// User search for backoffice
Route::get('/backoffice/users/search', [App\Http\Controllers\FrontendController::class, 'backofficeUsersSearch']);
