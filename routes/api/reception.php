<?php

use App\Http\Controllers\ReceptionController;
use Illuminate\Support\Facades\Route;

// Public reception routes (for guest access)
// Reception QR scanner routes (public for guest access)
Route::post('/reception/scan', [ReceptionController::class, 'scanQrCode']);
Route::get('/reception/stats', [ReceptionController::class, 'getStats']);
Route::get('/reception/recent-scans', [ReceptionController::class, 'getRecentScans']);
