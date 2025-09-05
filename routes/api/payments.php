<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TestXenditController;
use Illuminate\Support\Facades\Route;

// Public payment routes
// Xendit webhook (public route for payment callbacks)
Route::post('/payment/xendit/webhook', [PaymentController::class, 'handleWebhook']);

// Test Xendit integration (for development/testing)
Route::get('/test/xendit/connection', [TestXenditController::class, 'testConnection']);
Route::post('/test/xendit/invoice', [TestXenditController::class, 'testInvoice']);

// Protected payment routes
Route::middleware('auth:sanctum')->group(function () {
    // Payment management routes
    Route::post('/payments', [PaymentController::class, 'createPayment']);
    Route::get('/payments/{paymentUuid}/status', [PaymentController::class, 'getPaymentStatus']);
    Route::get('/payments/methods', [PaymentController::class, 'getPaymentMethods']);
});
