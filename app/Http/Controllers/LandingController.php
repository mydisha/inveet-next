<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LandingController extends BaseController
{
    /**
     * Show the landing page
     */
    public function index()
    {
        return Inertia::render('Landing');
    }

    /**
     * Show 404 Not Found page
     */
    public function notFound()
    {
        return Inertia::render('NotFound', [
            'status' => 404,
            'message' => 'Halaman yang Anda cari tidak ditemukan'
        ]);
    }

    /**
     * Show 419 Page Expired page
     */
    public function pageExpired()
    {
        return Inertia::render('PageExpired', [
            'status' => 419,
            'message' => 'Sesi Anda telah berakhir'
        ]);
    }
}
