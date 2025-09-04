<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ReceptionController;
use App\Http\Controllers\SpecialInvitationController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::middleware('guest')->group(function () {
    // Authentication routes
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);

    // Public package routes
    Route::get('/packages', [PackageController::class, 'index']);
    Route::get('/packages/active', [PackageController::class, 'getActivePackages']);
    Route::get('/packages/recommended', [PackageController::class, 'getRecommendedPackages']);
    Route::get('/packages/discounted', [PackageController::class, 'getDiscountedPackages']);
    Route::get('/packages/{uuid}', [PackageController::class, 'show']);
    Route::get('/packages/{uuid}/calculate-price', [PackageController::class, 'calculatePrice']);
    Route::get('/packages/stats', [PackageController::class, 'getStats']);

    // Public theme routes
    Route::get('/themes', [ThemeController::class, 'index']);
    Route::get('/themes/active', [ThemeController::class, 'active']);
    Route::get('/themes/{uuid}', [ThemeController::class, 'show']);
    Route::get('/themes/slug/{slug}', [ThemeController::class, 'showBySlug']);

    // Public wedding routes
    Route::get('/weddings', [WeddingController::class, 'index']);
    Route::get('/weddings/published', [WeddingController::class, 'index']);
    Route::get('/weddings/{uuid}', [WeddingController::class, 'show']);
    Route::get('/weddings/slug/{slug}', [WeddingController::class, 'findBySlug']);
    Route::post('/weddings/{uuid}/increment-view', [WeddingController::class, 'incrementViewCount']);

    // Public special invitation routes
    Route::get('/invitations/{uuid}/validate-password', [SpecialInvitationController::class, 'validatePassword']);

    // Reception QR scanner routes (public for guest access)
    Route::post('/reception/scan', [ReceptionController::class, 'scanQrCode']);
    Route::get('/reception/stats', [ReceptionController::class, 'getStats']);
    Route::get('/reception/recent-scans', [ReceptionController::class, 'getRecentScans']);

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

// Protected routes (require authentication)
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

    // User profile routes
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/find-by-email', [UserController::class, 'findByEmail']);

    // Wedding management routes
    Route::post('/weddings', [WeddingController::class, 'store']);
    Route::put('/weddings/{uuid}', [WeddingController::class, 'update']);
    Route::delete('/weddings/{uuid}', [WeddingController::class, 'destroy']);
    Route::get('/user/weddings', [WeddingController::class, 'findByUserId']);
    Route::get('/user/weddings/drafts', [WeddingController::class, 'getDraftWeddings']);
    Route::post('/weddings/{uuid}/publish', [WeddingController::class, 'publish']);
    Route::post('/weddings/{uuid}/unpublish', [WeddingController::class, 'unpublish']);
    Route::post('/weddings/{uuid}/activate', [WeddingController::class, 'activate']);
    Route::post('/weddings/{uuid}/deactivate', [WeddingController::class, 'deactivate']);
    Route::post('/weddings/{uuid}/mark-draft', [WeddingController::class, 'markAsDraft']);
    Route::get('/weddings/theme/{themeId}', [WeddingController::class, 'findByThemeId']);

    // Order management routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{uuid}', [OrderController::class, 'update']);
    Route::delete('/orders/{uuid}', [OrderController::class, 'destroy']);
    Route::get('/user/orders', [OrderController::class, 'findByUserId']);
    Route::get('/weddings/{weddingUuid}/orders', [OrderController::class, 'findByWeddingId']);
    Route::get('/orders/invoice/{invoiceNumber}', [OrderController::class, 'findByInvoiceNumber']);
    Route::post('/orders/{uuid}/mark-paid', [OrderController::class, 'markAsPaid']);
    Route::post('/orders/{uuid}/mark-void', [OrderController::class, 'markAsVoid']);
    Route::put('/orders/{uuid}/status', [OrderController::class, 'updateStatus']);
    Route::get('/packages/{packageUuid}/orders', [OrderController::class, 'findByPackageId']);
    Route::post('/orders/{uuid}/process-payment', [OrderController::class, 'processPayment']);
    Route::post('/orders/{uuid}/cancel', [OrderController::class, 'cancel']);

    // Special invitation management routes
    Route::post('/invitations', [SpecialInvitationController::class, 'store']);
    Route::put('/invitations/{uuid}', [SpecialInvitationController::class, 'update']);
    Route::delete('/invitations/{uuid}', [SpecialInvitationController::class, 'destroy']);
    Route::get('/weddings/{weddingUuid}/invitations', [SpecialInvitationController::class, 'findByWeddingId']);
    Route::get('/invitations/slug/{slug}', [SpecialInvitationController::class, 'findBySlug']);
    Route::post('/invitations/bulk', [SpecialInvitationController::class, 'createBulk']);
    Route::post('/invitations/{uuid}/lock', [SpecialInvitationController::class, 'lock']);
    Route::post('/invitations/{uuid}/unlock', [SpecialInvitationController::class, 'unlock']);
    Route::put('/invitations/{uuid}/password', [SpecialInvitationController::class, 'updatePassword']);
    Route::delete('/invitations/{uuid}/password', [SpecialInvitationController::class, 'removePassword']);
    Route::get('/weddings/{weddingUuid}/invitations/active', [SpecialInvitationController::class, 'getByWeddingIdAndActive']);
    Route::post('/invitations/{uuid}/toggle-lock', [SpecialInvitationController::class, 'toggleLock']);

    // Logout route - API version that returns JSON
    Route::post('/logout-api', [\App\Http\Controllers\Auth\LogoutController::class, 'apiLogout']);

    // Email verification routes
    Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['signed', 'throttle:6,1']);
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1');

    // Password management routes
    Route::put('/user/password', [PasswordController::class, 'update']);
    Route::post('/user/confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Settings management routes
    Route::get('/settings/title', [UserController::class, 'getTitleSettings']);
    Route::patch('/settings/title/{weddingId?}', [UserController::class, 'updateTitleSettings']);
});

// Admin routes (require admin role)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // User management routes
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::post('/admin/users', [UserController::class, 'store']);
    Route::get('/admin/users/{uuid}', [UserController::class, 'show']);
    Route::put('/admin/users/{uuid}', [UserController::class, 'update']);
    Route::delete('/admin/users/{uuid}', [UserController::class, 'destroy']);
    Route::post('/admin/users/{uuid}/activate', [UserController::class, 'activate']);
    Route::post('/admin/users/{uuid}/deactivate', [UserController::class, 'deactivate']);
    Route::post('/admin/users/{uuid}/assign-role', [UserController::class, 'assignRole']);
    Route::post('/admin/users/{uuid}/remove-role', [UserController::class, 'removeRole']);
    Route::post('/admin/users/{uuid}/sync-roles', [UserController::class, 'syncRoles']);

    // Package management routes
    Route::post('/admin/packages', [PackageController::class, 'store']);
    Route::put('/admin/packages/{uuid}', [PackageController::class, 'update']);
    Route::delete('/admin/packages/{uuid}', [PackageController::class, 'destroy']);
    Route::post('/admin/packages/{uuid}/toggle-recommendation', [PackageController::class, 'toggleRecommendation']);
    Route::post('/admin/packages/{uuid}/activate', [PackageController::class, 'activate']);
    Route::post('/admin/packages/{uuid}/deactivate', [PackageController::class, 'deactivate']);
    Route::put('/admin/packages/{uuid}/discount', [PackageController::class, 'updateDiscount']);

    // Order management routes
    Route::get('/admin/orders', [OrderController::class, 'index']);
    Route::get('/admin/orders/paid', [OrderController::class, 'index']);
    Route::get('/admin/orders/pending', [OrderController::class, 'index']);
    Route::get('/admin/orders/void', [OrderController::class, 'index']);

    // Wedding management routes
    Route::get('/admin/weddings', [WeddingController::class, 'index']);
    Route::get('/admin/weddings/active', [WeddingController::class, 'index']);
    Route::get('/admin/weddings/published', [WeddingController::class, 'index']);

    // Special invitation management routes
    Route::get('/admin/invitations', [SpecialInvitationController::class, 'index']);
    Route::get('/admin/invitations/active', [SpecialInvitationController::class, 'index']);
    Route::get('/admin/invitations/locked', [SpecialInvitationController::class, 'index']);
});

// Additional utility routes
Route::get('/packages/price-range', [PackageController::class, 'getByPriceRange']);
Route::get('/invitations/active', [SpecialInvitationController::class, 'getActiveInvitations']);
Route::get('/invitations/locked', [SpecialInvitationController::class, 'getLockedInvitations']);

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});
