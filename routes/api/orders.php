<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Protected order routes
Route::middleware('auth:sanctum')->group(function () {
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
});
