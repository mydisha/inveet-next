<?php

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

// Include domain-specific API route files
require __DIR__.'/api/auth.php';
require __DIR__.'/api/user.php';
require __DIR__.'/api/wedding.php';
require __DIR__.'/api/packages.php';
require __DIR__.'/api/themes.php';
require __DIR__.'/api/orders.php';
require __DIR__.'/api/payments.php';
require __DIR__.'/api/reception.php';
require __DIR__.'/api/system.php';
require __DIR__.'/api/backoffice.php';
