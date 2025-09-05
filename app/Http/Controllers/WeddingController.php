<?php

namespace App\Http\Controllers;

use App\Services\WeddingService;
use App\Services\GuestService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeddingController extends BaseController
{
    protected $weddingService;
    protected $guestService;

    public function __construct(WeddingService $weddingService, GuestService $guestService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->weddingService = $weddingService;
        $this->guestService = $guestService;
    }

    /**
     * Show a specific wedding by slug
     */
    public function show($slug)
    {
        $wedding = $this->weddingService->findBySlug($slug);

        if (!$wedding) {
            abort(404);
        }

        return Inertia::render('Wedding/Show', [
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show user's weddings
     */
    public function myWeddings(Request $request)
    {
        $this->ensureFreshCsrfToken($request);

        $user = $this->getUser($request);
        $weddings = $this->weddingService->findByUserId($user->id);

        return $this->renderWithUser('Wedding/MyWeddings', [
            'weddings' => $weddings,
        ], $request);
    }

    /**
     * Show wedding invitation with theme
     */
    public function showInvitation(Request $request, $slug)
    {
        // Mock wedding data for now - in real app, fetch from database
        $wedding = (object) [
            'id' => 1,
            'title' => 'Levi & Dio Wedding',
            'slug' => $slug,
            'groom_name' => 'Dio',
            'bride_name' => 'Levi',
            'groom_father_name' => 'Ahmad',
            'groom_mother_name' => 'Dio',
            'bride_father_name' => 'Lorem',
            'bride_mother_name' => 'Ipsum',
            'akad_date' => '2024-12-12',
            'akad_time' => '08.00 AM',
            'akad_location' => 'HOUSE OF THE BRIDE',
            'reception_date' => '2024-12-13',
            'reception_time' => '02.00 - 05.00 PM',
            'reception_location' => 'ROOTPIXEL HALL',
            'theme_id' => 'overlay-shadow-01',
        ];

        // Render the theme template
        return view('themes.overlay-shadow-01.index', compact('wedding'));
    }

    /**
     * Show wedding couple information page
     */
    public function coupleInfo(Request $request, $id)
    {
        // Mock wedding data for now - in real app, fetch from database
        $wedding = (object) [
            'id' => $id,
            'couple_name_1' => 'Rafi',
            'couple_name_2' => 'Nuna',
            'slug' => 'sample-wedding',
            'groom_name' => 'Rafi Ahmad',
            'groom_nickname' => 'Rafi',
            'groom_email' => 'rafi@example.com',
            'groom_phone' => '+62 812 3456 7890',
            'groom_instagram' => '@rafi_ahmad',
            'groom_father_name' => 'Ahmad Suryadi',
            'groom_mother_name' => 'Siti Aminah',
            'bride_name' => 'Nuna Sari',
            'bride_nickname' => 'Nuna',
            'bride_email' => 'nuna@example.com',
            'bride_phone' => '+62 812 3456 7891',
            'bride_instagram' => '@nuna_sari',
            'bride_father_name' => 'Budi Santoso',
            'bride_mother_name' => 'Rina Wati',
            'groom_photo' => null,
            'bride_photo' => null,
        ];

        return $this->renderWithUser('Wedding/CoupleInfo', [
            'wedding' => $wedding,
        ], $request);
    }
}
