<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageController;

// Public package routes
Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{uuid}', [PackageController::class, 'show'])->name('packages.show');
