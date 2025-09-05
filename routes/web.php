<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ReceptionController;
use App\Http\Controllers\BackofficeController;

// Include domain-specific route files
require __DIR__.'/public.php';
require __DIR__.'/auth.php';
require __DIR__.'/user.php';
require __DIR__.'/wedding.php';
require __DIR__.'/packages.php';
require __DIR__.'/backoffice.php';

// Include existing auth routes
require __DIR__.'/auth.php';
