<?php

namespace App\Http\Controllers;

use App\Services\GuestService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceptionController extends BaseController
{
    protected $guestService;

    public function __construct(GuestService $guestService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->guestService = $guestService;
    }

    /**
     * Show the reception QR scanner page
     */
    public function scanner()
    {
        // Mock stats for now - in real app, fetch from database
        $stats = [
            'totalScanned' => 0,
            'todayScanned' => 0,
            'vipGuests' => 0,
        ];

        return Inertia::render('Reception/Scanner', [
            'stats' => $stats,
        ]);
    }

    /**
     * Show the monitor display page
     */
    public function monitorDisplay()
    {
        // Mock initial guests for now - in real app, fetch from database
        $initialGuests = [];

        return Inertia::render('Reception/MonitorDisplay', [
            'initialGuests' => $initialGuests,
        ]);
    }

    /**
     * Show the guest greeting page
     */
    public function guestGreeting(Request $request, $id)
    {
        // Mock guest data for now - in real app, fetch from database
        $guestData = [
            'id' => $id,
            'name' => 'Guest Name',
            'wedding' => [
                'id' => 1,
                'slug' => 'sample-wedding',
                'wedding_start' => '2024-06-15 08:00:00',
                'wedding_end' => '2024-06-15 18:00:00',
                'theme' => [
                    'name' => 'Elegant Garden'
                ],
                'user' => [
                    'name' => 'John & Jane'
                ]
            ],
            'invitation' => [
                'name' => 'VIP Guest',
                'description' => 'Thank you for being part of our special day. Your presence means the world to us!'
            ],
            'isVip' => true,
            'tableNumber' => 'A1',
            'seatNumber' => '12',
        ];

        $qrCode = $request->query('qrCode', '');

        return Inertia::render('Guest/GuestGreeting', [
            'guestData' => $guestData,
            'qrCode' => $qrCode,
        ]);
    }
}
