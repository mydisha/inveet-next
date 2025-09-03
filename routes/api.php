<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ReceptionController;
use App\Http\Controllers\SpecialInvitationController;
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
    Route::get('/packages/{id}', [PackageController::class, 'show']);
    Route::get('/packages/{id}/calculate-price', [PackageController::class, 'calculatePrice']);
    Route::get('/packages/stats', [PackageController::class, 'getStats']);

    // Public wedding routes
    Route::get('/weddings', [WeddingController::class, 'index']);
    Route::get('/weddings/published', [WeddingController::class, 'index']);
    Route::get('/weddings/{id}', [WeddingController::class, 'show']);
    Route::get('/weddings/slug/{slug}', [WeddingController::class, 'findBySlug']);
    Route::post('/weddings/{id}/increment-view', [WeddingController::class, 'incrementViewCount']);

    // Public special invitation routes
    Route::get('/invitations/{id}/validate-password', [SpecialInvitationController::class, 'validatePassword']);

    // Reception QR scanner routes (public for guest access)
    Route::post('/reception/scan', [ReceptionController::class, 'scanQrCode']);
    Route::get('/reception/stats', [ReceptionController::class, 'getStats']);
    Route::get('/reception/recent-scans', [ReceptionController::class, 'getRecentScans']);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // User profile routes
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/find-by-email', [UserController::class, 'findByEmail']);

    // Wedding management routes
    Route::post('/weddings', [WeddingController::class, 'store']);
    Route::put('/weddings/{id}', [WeddingController::class, 'update']);
    Route::delete('/weddings/{id}', [WeddingController::class, 'destroy']);
    Route::get('/user/weddings', [WeddingController::class, 'findByUserId']);
    Route::get('/user/weddings/drafts', [WeddingController::class, 'getDraftWeddings']);
    Route::post('/weddings/{id}/publish', [WeddingController::class, 'publish']);
    Route::post('/weddings/{id}/unpublish', [WeddingController::class, 'unpublish']);
    Route::post('/weddings/{id}/activate', [WeddingController::class, 'activate']);
    Route::post('/weddings/{id}/deactivate', [WeddingController::class, 'deactivate']);
    Route::post('/weddings/{id}/mark-draft', [WeddingController::class, 'markAsDraft']);
    Route::get('/weddings/theme/{themeId}', [WeddingController::class, 'findByThemeId']);

    // Order management routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
    Route::get('/user/orders', [OrderController::class, 'findByUserId']);
    Route::get('/weddings/{weddingId}/orders', [OrderController::class, 'findByWeddingId']);
    Route::get('/orders/invoice/{invoiceNumber}', [OrderController::class, 'findByInvoiceNumber']);
    Route::post('/orders/{id}/mark-paid', [OrderController::class, 'markAsPaid']);
    Route::post('/orders/{id}/mark-void', [OrderController::class, 'markAsVoid']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('/packages/{packageId}/orders', [OrderController::class, 'findByPackageId']);
    Route::post('/orders/{id}/process-payment', [OrderController::class, 'processPayment']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);

    // Special invitation management routes
    Route::post('/invitations', [SpecialInvitationController::class, 'store']);
    Route::put('/invitations/{id}', [SpecialInvitationController::class, 'update']);
    Route::delete('/invitations/{id}', [SpecialInvitationController::class, 'destroy']);
    Route::get('/weddings/{weddingId}/invitations', [SpecialInvitationController::class, 'findByWeddingId']);
    Route::get('/invitations/slug/{slug}', [SpecialInvitationController::class, 'findBySlug']);
    Route::post('/invitations/bulk', [SpecialInvitationController::class, 'createBulk']);
    Route::post('/invitations/{id}/lock', [SpecialInvitationController::class, 'lock']);
    Route::post('/invitations/{id}/unlock', [SpecialInvitationController::class, 'unlock']);
    Route::put('/invitations/{id}/password', [SpecialInvitationController::class, 'updatePassword']);
    Route::delete('/invitations/{id}/password', [SpecialInvitationController::class, 'removePassword']);
    Route::get('/weddings/{weddingId}/invitations/active', [SpecialInvitationController::class, 'getByWeddingIdAndActive']);
    Route::post('/invitations/{id}/toggle-lock', [SpecialInvitationController::class, 'toggleLock']);

    // Logout route
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

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
    Route::get('/admin/users/{id}', [UserController::class, 'show']);
    Route::put('/admin/users/{id}', [UserController::class, 'update']);
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
    Route::post('/admin/users/{id}/activate', [UserController::class, 'activate']);
    Route::post('/admin/users/{id}/deactivate', [UserController::class, 'deactivate']);
    Route::post('/admin/users/{id}/assign-role', [UserController::class, 'assignRole']);
    Route::post('/admin/users/{id}/remove-role', [UserController::class, 'removeRole']);
    Route::post('/admin/users/{id}/sync-roles', [UserController::class, 'syncRoles']);

    // Package management routes
    Route::post('/admin/packages', [PackageController::class, 'store']);
    Route::put('/admin/packages/{id}', [PackageController::class, 'update']);
    Route::delete('/admin/packages/{id}', [PackageController::class, 'destroy']);
    Route::post('/admin/packages/{id}/toggle-recommendation', [PackageController::class, 'toggleRecommendation']);
    Route::post('/admin/packages/{id}/activate', [PackageController::class, 'activate']);
    Route::post('/admin/packages/{id}/deactivate', [PackageController::class, 'deactivate']);
    Route::put('/admin/packages/{id}/discount', [PackageController::class, 'updateDiscount']);

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
