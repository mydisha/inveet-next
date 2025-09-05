<?php

namespace App\Http\Controllers;

use App\Services\MusicService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MusicController extends BaseController
{
    protected $musicService;

    public function __construct(MusicService $musicService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->musicService = $musicService;
    }

    /**
     * Show the music library page
     */
    public function index(Request $request)
    {
        return $this->renderWithUser('Music/Index', [], $request);
    }

    /**
     * Show the music library page (alias for index)
     */
    public function library(Request $request)
    {
        return $this->index($request);
    }

    /**
     * Show the music upload page
     */
    public function upload(Request $request)
    {
        return $this->renderWithUser('Music/Upload', [], $request);
    }
}
