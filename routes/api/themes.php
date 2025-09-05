<?php

use App\Http\Controllers\ThemeController;
use Illuminate\Support\Facades\Route;

// Public theme routes
Route::get('/themes', [ThemeController::class, 'index']);
Route::get('/themes/active', [ThemeController::class, 'active']);
Route::get('/themes/{uuid}', [ThemeController::class, 'show']);
Route::get('/themes/slug/{slug}', [ThemeController::class, 'showBySlug']);
