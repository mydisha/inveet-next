<?php

use App\Http\Controllers\PackageController;
use Illuminate\Support\Facades\Route;

// Public package routes
Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/active', [PackageController::class, 'getActivePackages']);
Route::get('/packages/recommended', [PackageController::class, 'getRecommendedPackages']);
Route::get('/packages/discounted', [PackageController::class, 'getDiscountedPackages']);
Route::get('/packages/{uuid}', [PackageController::class, 'show']);
Route::get('/packages/{uuid}/calculate-price', [PackageController::class, 'calculatePrice']);
Route::get('/packages/stats', [PackageController::class, 'getStats']);
