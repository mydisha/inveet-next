<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::middleware('guest')->group(function () {
    // Authentication routes
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);
});

// Public logout route (for expired sessions)
Route::post('/logout-public', function (Request $request) {
    $sessionId = null;

    // Check if session exists before trying to access it
    if ($request->hasSession()) {
        $sessionId = $request->session()->getId();
        \Log::info('Public logout called', ['session_id' => $sessionId]);
    } else {
        \Log::info('Public logout called - no session');
    }

    // Try to logout if user is still authenticated
    if (Auth::check()) {
        $userId = Auth::id();
        \Log::info('User still authenticated, logging out', ['user_id' => $userId]);
        Auth::guard('web')->logout();
        Auth::guard('sanctum')->logout();
    }

    // Only invalidate session if it exists
    if ($request->hasSession()) {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Force delete session from database if we have a session ID
        if ($sessionId) {
            \DB::table('sessions')->where('id', $sessionId)->delete();
        }

        // Clear any cached user data
        $request->session()->flush();
    }

    \Log::info('Public logout completed', ['session_id' => $sessionId]);

    return response()->json([
        'message' => 'Logged out successfully',
        'success' => true
    ]);
});

// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    // Current user route
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                ];
            }),
        ]);
    });

    // Email verification routes
    Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['signed', 'throttle:6,1']);
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1');

    // Password management routes
    Route::put('/user/password', [PasswordController::class, 'update']);
    Route::post('/user/confirm-password', [ConfirmablePasswordController::class, 'store']);
});
