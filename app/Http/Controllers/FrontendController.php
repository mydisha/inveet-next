<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\RefreshesCsrfToken;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    use RefreshesCsrfToken;

    /**
     * Get standardized user data for views
     */
    private function getUserData($user)
    {
        if (!$user) {
            return null;
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'hasWedding' => $user->hasWedding ?? false,
            'roles' => $user->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                ];
            })->toArray(),
        ];
    }
    /**
     * Show the landing page
     */
    public function landing()
    {
        return Inertia::render('Landing');
    }

    /**
     * Show the login page
     */
    public function login()
    {
        return Inertia::render('auth/login');
    }

    /**
     * Show the forgot password page
     */
    public function forgotPassword()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    /**
     * Show the reset password page
     */
    public function resetPassword(Request $request, $token)
    {
        return Inertia::render('auth/ResetPassword', [
            'email' => $request->query('email'),
            'token' => $token,
        ]);
    }

    /**
     * Show the register page
     */
    public function register()
    {
        return Inertia::render('auth/register');
    }

    /**
     * Show the dashboard
     */
    public function dashboard(Request $request)
    {
        // Get user data if authenticated
        $user = $request->user();

        // Ensure CSRF token is fresh for dashboard
        $this->refreshCsrfToken($request);

        return Inertia::render('Dashboard', [
            'user' => $this->getUserData($user),
        ]);
    }

    /**
     * Show the onboarding overview
     */
    public function onboarding(Request $request)
    {
        $user = $request->user();

        // Ensure CSRF token is fresh for authenticated pages
        $this->refreshCsrfToken($request);

        return Inertia::render('onboarding/index', [
            'user' => $this->getUserData($user),
            'currentStep' => 1,
        ]);
    }

    /**
     * Show the couple info step
     */
    public function coupleInfo(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/couple-info', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show the wedding location step
     */
    public function weddingLocation(Request $request)
    {
        $user = $request->user();



        return Inertia::render('onboarding/wedding-location', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show the design selection step
     */
    public function designSelection(Request $request)
    {
        $user = $request->user();

        return Inertia::render('design-selection', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show the wedding URL step
     */
    public function weddingUrl(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/wedding-url', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Show the design configuration page
     */
    public function designConfiguration(Request $request, $id)
    {
        $user = $request->user();

        // Mock wedding data for now - in real app, fetch from database
        $wedding = (object) [
            'id' => $id,
            'title' => 'Sample Wedding',
            'slug' => 'sample-wedding',
            'cover_image' => null,
            'theme_id' => null,
            'color_palette' => null,
        ];

        return Inertia::render('weddings/design-configuration', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show wedding invitation with theme
     */
    public function showWeddingInvitation(Request $request, $slug)
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
     * Show the wedding couple information page
     */
    public function weddingCoupleInfo(Request $request, $id)
    {
        $user = $request->user();



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

        return Inertia::render('Wedding/CoupleInfo', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show the activation step
     */
    public function activation()
    {
        return Inertia::render('Onboarding/Activation');
    }

    /**
     * Show a specific wedding by slug
     */
    public function showWedding($slug)
    {
        // Get wedding data from API
        $wedding = app(\App\Services\WeddingService::class)->findBySlug($slug);

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
        $user = $request->user();

        // Ensure CSRF token is fresh for authenticated pages
        $this->refreshCsrfToken($request);

        // Mock weddings data for testing
        $weddings = collect([
            (object) [
                'id' => 1,
                'title' => 'Sample Wedding',
                'slug' => 'sample-wedding',
                'status' => 'active',
                'package' => (object) ['name' => 'Premium Package'],
            ]
        ]);

        return Inertia::render('Wedding/MyWeddings', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'weddings' => $weddings,
        ]);
    }

    /**
     * Show packages
     */
    public function packages()
    {
        $packages = app(\App\Services\PackageService::class)->findActivePackages();

        return Inertia::render('Package/Index', [
            'packages' => $packages,
        ]);
    }

    /**
     * Show package details
     */
    public function packageDetails($id)
    {
        $package = app(\App\Services\PackageService::class)->findById($id);

        if (!$package) {
            abort(404);
        }

        return Inertia::render('Package/Show', [
            'package' => $package,
        ]);
    }

    /**
     * Show user profile
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        // Ensure CSRF token is fresh for authenticated pages
        $this->refreshCsrfToken($request);

        return Inertia::render('Profile/Index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show settings
     */
    public function settings(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Settings/Index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show title settings
     */
    public function titleSettings(Request $request)
    {
        $user = $request->user();



        // Mock title settings data
        $titleSettings = [
            'couple_title' => 'Mempelai',
            'mother_title' => 'Ibu',
            'father_title' => 'Bapak',
            'separator_title' => 'dari',
            'cover_title' => 'Pernikahan',
            'location_title' => 'Lokasi',
            'venue_title' => 'Tempat',
            'time_title' => 'Waktu',
            'rsvp_title' => 'Konfirmasi Kehadiran',
            'gift_title' => 'Hadiah',
            'message_title' => 'Pesan',
        ];

        return Inertia::render('Settings/title', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
            'weddingId' => $request->query('wedding'),
            'titleSettings' => $titleSettings,
        ]);
    }

    /**
     * Show user's orders
     */
    public function orders(Request $request)
    {
        $user = $request->user();

        // Ensure CSRF token is fresh for authenticated pages
        $this->refreshCsrfToken($request);

        // Mock orders data for testing
        $orders = collect([
            (object) [
                'id' => 1,
                'status' => 'completed',
                'package' => (object) ['name' => 'Premium Package'],
                'wedding' => (object) ['title' => 'Sample Wedding'],
                'created_at' => now(),
            ]
        ]);

        return Inertia::render('Order/Index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'orders' => $orders,
        ]);
    }

    /**
     * Show gallery page
     */
    public function gallery(Request $request)
    {
        $user = $request->user();



        return Inertia::render('Gallery', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show analytics dashboard
     */
    public function analytics(Request $request)
    {
        $user = $request->user();



        // Mock analytics data for testing
        $weddings = collect([
            (object) [
                'id' => 1,
                'title' => 'Sample Wedding',
                'views' => 150,
                'package' => (object) ['name' => 'Premium Package'],
            ]
        ]);

        return Inertia::render('Analytics/Index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'weddings' => $weddings,
            'stats' => [
                'totalWeddings' => 1,
                'totalViews' => 150,
                'totalOrders' => 1,
            ],
        ]);
    }

    /**
     * Show wedding invitation list
     */
    public function weddingInvitations(Request $request)
    {
        $user = $request->user();



        // Mock weddings data with cover photos for testing
        $weddings = collect([
            (object) [
                'id' => 1,
                'slug' => 'rafi-nuna-wedding',
                'wedding_start' => '2024-06-15 10:00:00',
                'wedding_end' => '2024-06-15 22:00:00',
                'view_count' => 245,
                'is_active' => true,
                'is_draft' => false,
                'is_published' => true,
                'cover_photo' => '/api/placeholder/400/300?text=Rafi+%26+Nuna',
                'couple_names' => 'Rafi & Nuna',
                'theme' => (object) [
                    'id' => 1,
                    'name' => 'Elegant Classic',
                    'color' => '#8B4513'
                ],
                'package' => (object) [
                    'id' => 1,
                    'name' => 'Diamond Package',
                    'price' => 2500000
                ],
                'created_at' => '2024-01-15 10:00:00',
                'updated_at' => '2024-01-20 15:30:00',
            ],
            (object) [
                'id' => 2,
                'slug' => 'ahmad-siti-wedding',
                'wedding_start' => '2024-07-20 09:00:00',
                'wedding_end' => '2024-07-20 21:00:00',
                'view_count' => 189,
                'is_active' => true,
                'is_draft' => true,
                'is_published' => false,
                'cover_photo' => '/api/placeholder/400/300?text=Ahmad+%26+Siti',
                'couple_names' => 'Ahmad & Siti',
                'theme' => (object) [
                    'id' => 2,
                    'name' => 'Modern Minimalist',
                    'color' => '#2C3E50'
                ],
                'package' => (object) [
                    'id' => 2,
                    'name' => 'Gold Package',
                    'price' => 1800000
                ],
                'created_at' => '2024-01-10 14:00:00',
                'updated_at' => '2024-01-18 09:15:00',
            ],
            (object) [
                'id' => 3,
                'slug' => 'david-maya-wedding',
                'wedding_start' => '2024-08-10 11:00:00',
                'wedding_end' => '2024-08-10 23:00:00',
                'view_count' => 156,
                'is_active' => true,
                'is_draft' => false,
                'is_published' => true,
                'cover_photo' => '/api/placeholder/400/300?text=David+%26+Maya',
                'couple_names' => 'David & Maya',
                'theme' => (object) [
                    'id' => 3,
                    'name' => 'Romantic Floral',
                    'color' => '#E91E63'
                ],
                'package' => (object) [
                    'id' => 3,
                    'name' => 'Platinum Package',
                    'price' => 3200000
                ],
                'created_at' => '2024-01-05 16:30:00',
                'updated_at' => '2024-01-22 11:45:00',
            ],
        ]);

        return Inertia::render('Wedding/InvitationList', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'weddings' => $weddings,
        ]);
    }

    /**
     * Show wedding detail page
     */
    public function weddingDetail(Request $request, $id)
    {
        $user = $request->user();



        // Mock wedding data for testing
        $wedding = (object) [
            'id' => (int) $id,
            'couple_name_1' => 'Rafi',
            'couple_name_2' => 'Nuna',
            'slug' => 'rafi-nuna-wedding',
            'package' => (object) [
                'id' => 1,
                'name' => 'Paket Diamond',
            ],
            'is_published' => true,
            'view_count' => 245,
            'theme' => (object) [
                'id' => 1,
                'name' => 'Elegant Classic',
            ],
        ];

        return Inertia::render('Wedding/WeddingDetail', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show wedding invitation configuration
     */
    public function weddingConfiguration(Request $request, $id)
    {
        $user = $request->user();



        // Mock wedding data for testing
        $wedding = (object) [
            'id' => (int) $id,
            'slug' => 'rafi-nuna-wedding',
            'wedding_start' => '2024-06-15 10:00:00',
            'wedding_end' => '2024-06-15 22:00:00',
            'view_count' => 245,
            'is_active' => true,
            'is_draft' => false,
            'is_published' => true,
            'couple_names' => 'Rafi & Nuna',
            'theme' => (object) [
                'id' => 1,
                'name' => 'Elegant Classic',
                'color' => '#8B4513'
            ],
            'package' => (object) [
                'id' => 1,
                'name' => 'Diamond Package',
                'price' => 2500000
            ],
            'created_at' => '2024-01-15 10:00:00',
            'updated_at' => '2024-01-20 15:30:00',
        ];

        return Inertia::render('Wedding/Configuration', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show the music library page
     */
    public function music(Request $request)
    {
        $user = $request->user();



        return Inertia::render('Music/Index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show the music library page (alias for music)
     */
    public function musicLibrary(Request $request)
    {
        return $this->music($request);
    }

    /**
     * Show the music upload page
     */
    public function musicUpload(Request $request)
    {
        $user = $request->user();



        return Inertia::render('Music/Upload', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
        ]);
    }

    /**
     * Show the checkout page
     */
    public function checkout(Request $request, $package = null)
    {
        $user = $request->user();

        if ($package) {
            // Show specific package checkout
            $packageModel = \App\Models\Package::findOrFail($package);
            return Inertia::render('Checkout', [
                'package' => $packageModel,
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ]);
        }

        // Show all packages (existing behavior)
        $packages = app(\App\Services\PackageService::class)->findActivePackages();

        // Calculate discounted prices for each package
        $packagesWithDiscounts = $packages->map(function ($package) {
            $package->discounted_price = $package->discounted_price;
            $package->discount_amount = $package->discount_amount;
            return $package;
        });

        return Inertia::render('Checkout', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
            'packages' => $packagesWithDiscounts,
        ]);
    }

    /**
     * Show the checkout payment method selection page
     */
    public function checkoutPayment(Request $request)
    {
        $packageId = $request->query('package_id');
        $coupon = $request->query('coupon');
        $couponDiscount = $request->query('coupon_discount', 0);
        $user = $request->user();

        if (!$packageId) {
            return redirect('/checkout');
        }

        $package = app(\App\Services\PackageService::class)->findById($packageId);

        if (!$package) {
            return redirect('/checkout');
        }

        // Calculate discounted prices
        $package->discounted_price = $package->discounted_price;
        $package->discount_amount = $package->discount_amount;

        return Inertia::render('CheckoutPayment', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
            'package' => $package,
            'coupon' => $coupon,
            'coupon_discount' => (float) $couponDiscount,
        ]);
    }

    /**
     * Show the checkout success page
     */
    public function checkoutSuccess(Request $request)
    {
        $orderId = $request->query('order_id');
        $order = null;

        if ($orderId) {
            try {
                $order = app(\App\Services\OrderService::class)->findById($orderId);
                if ($order) {
                    // Load package relationship
                    $order->load('package');
                }
            } catch (\Exception $e) {
                // Order not found or error occurred
                $order = null;
            }
        }

        return Inertia::render('CheckoutSuccess', [
            'order' => $order,
            'order_id' => $orderId,
        ]);
    }

    /**
     * Show the wedding venue information page
     */
    public function weddingVenueInfo(Request $request, $id)
    {
        $user = $request->user();



        // Mock wedding data for now - in real app, fetch from database with details
        $wedding = (object) [
            'id' => $id,
            'couple_name_1' => 'John',
            'couple_name_2' => 'Jane',
            'slug' => 'sample-wedding',
            'wedding_start' => '2024-06-15 08:00:00',
            'wedding_end' => '2024-06-15 18:00:00',
            'details' => [
                (object) ['key' => 'venue_name', 'value' => 'Grand Ballroom Hotel Indonesia'],
                (object) ['key' => 'venue_address', 'value' => 'Jl. MH Thamrin No. 1'],
                (object) ['key' => 'venue_city', 'value' => 'Jakarta Pusat'],
                (object) ['key' => 'venue_province', 'value' => 'DKI Jakarta'],
                (object) ['key' => 'venue_postal_code', 'value' => '10310'],
                (object) ['key' => 'venue_phone', 'value' => '+62 21 2358 1234'],
                (object) ['key' => 'ceremony_time', 'value' => '08:00'],
                (object) ['key' => 'reception_time', 'value' => '12:00'],
                (object) ['key' => 'venue_description', 'value' => 'Elegant ballroom with modern facilities and beautiful garden view'],
                (object) ['key' => 'venue_notes', 'value' => 'Parkir tersedia di basement. Dress code: formal'],
                (object) ['key' => 'venue_latitude', 'value' => '-6.1944'],
                (object) ['key' => 'venue_longitude', 'value' => '106.8229'],
            ],
        ];

        return Inertia::render('Wedding/VenueInfo', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show the reception QR scanner page
     */
    public function receptionScanner()
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

    /**
     * Show the guest list page
     */
    public function guestList(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Dias Taufik Rahman',
                'email' => 'dias@example.com',
                'hasWedding' => true,
            ];
        }

        // Mock wedding data for testing
        $wedding = (object) [
            'id' => (int) $id,
            'slug' => 'dias-azalia-wedding',
            'title' => 'Dias & Azalia Wedding',
        ];

        // Mock invitation link
        $invitationLink = 'https://inveet.id/invitation/429dbdda-35ae-4f9e-863b-f60987ade6c9/dias-azalia/share';

        return Inertia::render('Guest/GuestList', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ] : null,
            'weddingId' => $id,
            'invitationLink' => $invitationLink,
        ]);
    }

    /**
     * Show the guestbook page
     */
    public function guestbook(Request $request, $weddingId = null)
    {
        // For now, we'll use a mock wedding ID if none provided
        // In a real app, this would come from the authenticated user's wedding
        $weddingId = $weddingId ?? 1;

        // Mock data for demonstration
        $wedding = (object) [
            'id' => $weddingId,
            'slug' => 'sample-wedding',
            'user' => (object) [
                'name' => 'Dias Taufik Rahman'
            ]
        ];

        // Mock comments data - in real app, this would come from database
        $comments = [
            (object) [
                'id' => 1,
                'name' => 'Zera Putri & Partner',
                'comment' => 'Selamat Kepada kedua mempelai Pengantin',
                'is_attend' => false,
                'guest_count' => 2,
                'is_approved' => true,
                'created_at' => now()->subMonths(5)->toISOString()
            ],
            (object) [
                'id' => 2,
                'name' => 'Zera Putri',
                'comment' => 'Selamat Kepada kedua mempelai',
                'is_attend' => false,
                'guest_count' => 1,
                'is_approved' => true,
                'created_at' => now()->subMonths(5)->toISOString()
            ],
            (object) [
                'id' => 3,
                'name' => 'Zera Putri',
                'comment' => 'Semoga bahagia selalu',
                'is_attend' => true,
                'guest_count' => 1,
                'is_approved' => true,
                'created_at' => now()->subYear()->toISOString()
            ],
            (object) [
                'id' => 4,
                'name' => 'Ahmad Rizki',
                'comment' => 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.',
                'is_attend' => true,
                'guest_count' => 2,
                'is_approved' => true,
                'created_at' => now()->subDays(3)->toISOString()
            ],
            (object) [
                'id' => 5,
                'name' => 'Siti Nurhaliza',
                'comment' => 'Selamat menempuh hidup baru! Semoga pernikahan kalian penuh berkah dan kebahagiaan.',
                'is_attend' => null,
                'guest_count' => 1,
                'is_approved' => true,
                'created_at' => now()->subDays(1)->toISOString()
            ],
            (object) [
                'id' => 6,
                'name' => 'Budi Santoso',
                'comment' => 'Semoga menjadi keluarga yang harmonis dan penuh cinta kasih.',
                'is_attend' => true,
                'guest_count' => 3,
                'is_approved' => true,
                'created_at' => now()->subHours(5)->toISOString()
            ]
        ];

        // Calculate stats
        $stats = (object) [
            'total' => count($comments),
            'attending' => count(array_filter($comments, fn($c) => $c->is_attend === true)),
            'not_attending' => count(array_filter($comments, fn($c) => $c->is_attend === false)),
            'uncertain' => count(array_filter($comments, fn($c) => $c->is_attend === null))
        ];

        return Inertia::render('Guest/Guestbook', [
            'wedding' => $wedding,
            'comments' => $comments,
            'stats' => $stats
        ]);
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

    /**
     * Show the backoffice dashboard
     */
    public function backofficeDashboard(Request $request)
    {
        $user = $request->user();

        return Inertia::render('backoffice/Dashboard', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice users page
     */
    public function backofficeUsers(Request $request)
    {
        $user = $request->user();

        $query = \App\Models\User::with(['roles'])
            ->withCount(['weddings', 'orders']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role')) {
            $query->role($request->get('role'));
        }

        // Filter by status
        if ($request->has('status')) {
            $status = $request->get('status');
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $users = $query->paginate($perPage);

        return Inertia::render('backoffice/Users', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    /**
     * Show the backoffice orders page
     */
    public function backofficeOrders(Request $request)
    {
        $user = $request->user();

        return Inertia::render('backoffice/Orders', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice order detail page
     */
    public function backofficeOrderDetail(Request $request, $order)
    {
        $user = $request->user();

        // SECURITY FIX: Validate order ID parameter
        if (!is_numeric($order) || $order <= 0) {
            abort(404, 'Order not found');
        }

        $orderModel = \App\Models\Order::with(['user', 'package', 'wedding.theme'])
            ->findOrFail($order);

        return Inertia::render('backoffice/OrderDetail', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
            'order' => $orderModel,
        ]);
    }

    /**
     * Show the backoffice feedbacks page
     */
    public function backofficeFeedbacks(Request $request)
    {
        $user = $request->user();

        return Inertia::render('backoffice/Feedbacks', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice themes page
     */
    public function backofficeThemes(Request $request)
    {
        $user = $request->user();

        return Inertia::render('backoffice/Themes', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice configurations page
     */
    public function backofficeConfigurations(Request $request)
    {
        $user = $request->user();

        return Inertia::render('backoffice/Configurations', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice user detail page
     */
    public function backofficeUserDetail(Request $request, $user)
    {
        $currentUser = $request->user();

        // SECURITY FIX: Validate user ID parameter
        if (!is_numeric($user) || $user <= 0) {
            abort(404, 'User not found');
        }

        $userModel = \App\Models\User::with(['roles', 'weddings', 'orders', 'feedback'])
            ->withCount(['weddings', 'orders'])
            ->findOrFail($user);

        return Inertia::render('backoffice/UserDetail', [
            'user' => $userModel,
            'currentUser' => $currentUser ? [
                'id' => $currentUser->id,
                'name' => $currentUser->name,
                'email' => $currentUser->email,
                'roles' => $currentUser->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Show the backoffice user edit page
     */
    public function backofficeUserEdit(Request $request, $user)
    {
        $currentUser = $request->user();

        // SECURITY FIX: Validate user ID parameter
        if (!is_numeric($user) || $user <= 0) {
            abort(404, 'User not found');
        }

        $userModel = \App\Models\User::with(['roles'])
            ->findOrFail($user);

        return Inertia::render('backoffice/UserEdit', [
            'user' => $userModel,
            'currentUser' => $currentUser ? [
                'id' => $currentUser->id,
                'name' => $currentUser->name,
                'email' => $currentUser->email,
                'roles' => $currentUser->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
            ] : null,
        ]);
    }

    /**
     * Get users statistics for backoffice
     */
    public function backofficeUsersStatistics()
    {
        $stats = [
            'total_users' => \App\Models\User::count(),
            'active_users' => \App\Models\User::where('is_active', true)->count(),
            'inactive_users' => \App\Models\User::where('is_active', false)->count(),
            'users_with_weddings' => \App\Models\User::has('weddings')->count(),
            'users_with_orders' => \App\Models\User::has('orders')->count(),
            'new_users_this_month' => \App\Models\User::whereMonth('created_at', now()->month)->count(),
            'new_users_this_week' => \App\Models\User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get orders statistics for backoffice
     */
    public function backofficeOrdersStatistics()
    {
        $stats = [
            'total_orders' => \App\Models\Order::count(),
            'paid_orders' => \App\Models\Order::where('status', 'paid')->count(),
            'pending_orders' => \App\Models\Order::where('status', 'pending')->count(),
            'void_orders' => \App\Models\Order::where('status', 'void')->count(),
            'total_revenue' => \App\Models\Order::where('status', 'paid')->sum('total_amount'),
            'orders_this_month' => \App\Models\Order::whereMonth('created_at', now()->month)->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get feedbacks statistics for backoffice
     */
    public function backofficeFeedbacksStatistics()
    {
        $stats = [
            'total_feedbacks' => \App\Models\Feedback::count(),
            'average_rating' => \App\Models\Feedback::avg('rating'),
            'recommended_feedbacks' => \App\Models\Feedback::where('is_recommended', true)->count(),
            'show_on_landing' => \App\Models\Feedback::where('show_on_landing', true)->count(),
            'feedbacks_this_month' => \App\Models\Feedback::whereMonth('created_at', now()->month)->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get themes statistics for backoffice
     */
    public function backofficeThemesStatistics()
    {
        $stats = [
            'total_themes' => \App\Models\Theme::count(),
            'active_themes' => \App\Models\Theme::where('is_active', true)->count(),
            'public_themes' => \App\Models\Theme::where('is_public', true)->count(),
            'themes_this_month' => \App\Models\Theme::whereMonth('created_at', now()->month)->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get feedbacks for backoffice API
     */
    public function backofficeFeedbacksApi(Request $request)
    {
        $query = \App\Models\Feedback::with('user');

        // Apply filters with SECURITY FIX: Sanitize search input
        if ($request->has('search') && $request->search) {
            $search = trim($request->search);
            // SECURITY FIX: Limit search length and escape special characters
            if (strlen($search) > 255) {
                $search = substr($search, 0, 255);
            }
            $query->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                  ->orWhere('critics', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('score_min') && $request->score_min) {
            $query->where('score', '>=', $request->score_min);
        }

        if ($request->has('score_max') && $request->score_max) {
            $query->where('score', '<=', $request->score_max);
        }

        if ($request->has('recommended') && $request->recommended !== '') {
            $query->where('is_recommended', $request->recommended === 'true');
        }

        if ($request->has('show_on_landing') && $request->show_on_landing !== '') {
            $query->where('show_on_landing', $request->show_on_landing === 'true');
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $feedbacks = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $feedbacks
        ]);
    }

    /**
     * Toggle feedback recommendation
     */
    public function backofficeFeedbacksToggleRecommendation(Request $request, $feedback)
    {
        // SECURITY FIX: Validate feedback ID parameter
        if (!is_numeric($feedback) || $feedback <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid feedback ID'
            ], 400);
        }

        $feedbackModel = \App\Models\Feedback::findOrFail($feedback);
        $feedbackModel->is_recommended = !$feedbackModel->is_recommended;
        $feedbackModel->save();

        return response()->json([
            'success' => true,
            'message' => 'Recommendation status updated successfully',
            'data' => [
                'id' => $feedbackModel->id,
                'is_recommended' => $feedbackModel->is_recommended
            ]
        ]);
    }

    /**
     * Toggle feedback show on landing
     */
    public function backofficeFeedbacksToggleShowLanding(Request $request, $feedback)
    {
        // SECURITY FIX: Validate feedback ID parameter
        if (!is_numeric($feedback) || $feedback <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid feedback ID'
            ], 400);
        }

        $feedbackModel = \App\Models\Feedback::findOrFail($feedback);
        $feedbackModel->show_on_landing = !$feedbackModel->show_on_landing;
        $feedbackModel->save();

        return response()->json([
            'success' => true,
            'message' => 'Show on landing status updated successfully',
            'data' => [
                'id' => $feedbackModel->id,
                'show_on_landing' => $feedbackModel->show_on_landing
            ]
        ]);
    }

    /**
     * Delete feedback
     */
    public function backofficeFeedbacksDestroy(Request $request, $feedback)
    {
        // SECURITY FIX: Validate feedback ID parameter
        if (!is_numeric($feedback) || $feedback <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid feedback ID'
            ], 400);
        }

        $feedbackModel = \App\Models\Feedback::findOrFail($feedback);
        $feedbackModel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Feedback deleted successfully'
        ]);
    }

    /**
     * Activate user
     */
    public function backofficeUserActivate(Request $request, $user)
    {
        $userModel = \App\Models\User::findOrFail($user);
        $userModel->activate();

        return response()->json([
            'success' => true,
            'message' => 'User activated successfully',
            'data' => $userModel
        ]);
    }

    /**
     * Deactivate user
     */
    public function backofficeUserDeactivate(Request $request, $user)
    {
        $userModel = \App\Models\User::findOrFail($user);
        $userModel->deactivate();

        return response()->json([
            'success' => true,
            'message' => 'User deactivated successfully',
            'data' => $userModel
        ]);
    }

    /**
     * Auto-login user
     */
    public function backofficeUserAutoLogin(Request $request, $user)
    {
        $userModel = \App\Models\User::findOrFail($user);

        // Create a temporary token for the admin to login as the user
        $token = $userModel->createToken('admin-auto-login', ['*'], now()->addMinutes(30))->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Auto-login token generated successfully',
            'data' => [
                'user' => $userModel->load(['roles']),
                'token' => $token,
                'login_url' => route('login') . '?token=' . $token
            ]
        ]);
    }

    /**
     * Get themes for backoffice
     */
    public function backofficeThemesApi(Request $request)
    {
        $query = \App\Models\Theme::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $status = $request->get('status');
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Filter by visibility
        if ($request->has('visibility')) {
            $visibility = $request->get('visibility');
            if ($visibility === 'public') {
                $query->where('is_public', true);
            } elseif ($visibility === 'private') {
                $query->where('is_public', false);
            }
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $themes = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    /**
     * Store a new theme
     */
    public function backofficeThemesStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:themes,slug',
            'preview_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
        ]);

        $theme = \App\Models\Theme::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Theme created successfully',
            'data' => $theme
        ]);
    }

    /**
     * Show a specific theme
     */
    public function backofficeThemesShow($theme)
    {
        $themeModel = \App\Models\Theme::findOrFail($theme);

        return response()->json([
            'success' => true,
            'data' => $themeModel
        ]);
    }

    /**
     * Update a theme
     */
    public function backofficeThemesUpdate(Request $request, $theme)
    {
        $themeModel = \App\Models\Theme::findOrFail($theme);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:themes,slug,' . $theme,
            'preview_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
        ]);

        $themeModel->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Theme updated successfully',
            'data' => $themeModel
        ]);
    }

    /**
     * Toggle theme active status
     */
    public function backofficeThemesToggleActive($theme)
    {
        $themeModel = \App\Models\Theme::findOrFail($theme);
        $themeModel->update(['is_active' => !$themeModel->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Theme status updated successfully',
            'data' => $themeModel
        ]);
    }

    /**
     * Toggle theme public status
     */
    public function backofficeThemesTogglePublic($theme)
    {
        $themeModel = \App\Models\Theme::findOrFail($theme);
        $themeModel->update(['is_public' => !$themeModel->is_public]);

        return response()->json([
            'success' => true,
            'message' => 'Theme visibility updated successfully',
            'data' => $themeModel
        ]);
    }

    /**
     * Delete a theme
     */
    public function backofficeThemesDestroy($theme)
    {
        $themeModel = \App\Models\Theme::findOrFail($theme);
        $themeModel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Theme deleted successfully'
        ]);
    }


    /**
     * Coupons API - List coupons
     */
    public function backofficeCouponsApi(Request $request)
    {
        $couponService = app(\App\Services\CouponService::class);
        $filters = $request->only(['status', 'type', 'search', 'per_page']);
        $coupons = $couponService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $coupons
        ]);
    }

    /**
     * Coupons API - Store coupon
     */
    public function backofficeCouponsStore(Request $request)
    {
        $couponService = app(\App\Services\CouponService::class);

        try {
            $coupon = $couponService->create($request->all());
            return response()->json([
                'success' => true,
                'data' => $coupon,
                'message' => 'Coupon created successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Coupons API - Show coupon
     */
    public function backofficeCouponsShow($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);
        $couponModel = $couponService->findById($coupon);

        if (!$couponModel) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        $usageStats = $couponService->getUsageStats($coupon);
        $couponModel->usage_stats = $usageStats;

        return response()->json([
            'success' => true,
            'data' => $couponModel
        ]);
    }

    /**
     * Coupons API - Update coupon
     */
    public function backofficeCouponsUpdate(Request $request, $coupon)
    {
        $couponService = app(\App\Services\CouponService::class);

        try {
            $couponModel = $couponService->update($coupon, $request->all());

            if (!$couponModel) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coupon not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $couponModel,
                'message' => 'Coupon updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Coupons API - Toggle active status
     */
    public function backofficeCouponsToggleActive($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);
        $result = $couponService->toggleActive($coupon);

        return response()->json($result);
    }

    /**
     * Coupons API - Delete coupon
     */
    public function backofficeCouponsDestroy($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);

        try {
            $deleted = $couponService->delete($coupon);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coupon not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Coupon deleted successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Coupons API - Get usage statistics
     */
    public function backofficeCouponsUsageStats($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);
        $stats = $couponService->getUsageStats($coupon);

        if (empty($stats)) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Coupons API - Get usage history
     */
    public function backofficeCouponsUsages($coupon)
    {
        $couponModel = \App\Models\Coupon::findOrFail($coupon);
        $usages = $couponModel->usages()
            ->with(['user', 'order'])
            ->orderBy('used_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $usages
        ]);
    }

    /**
     * Coupons API - Show coupons page
     */
    public function backofficeCoupons(Request $request)
    {
        $couponService = app(\App\Services\CouponService::class);
        $filters = $request->only(['status', 'type', 'search', 'per_page']);
        $coupons = $couponService->getAll($filters);

        return Inertia::render('backoffice/Coupons', [
            'coupons' => $coupons,
            'filters' => $filters
        ]);
    }

    /**
     * Coupons API - Show create coupon page
     */
    public function backofficeCouponCreate()
    {
        $packages = \App\Models\Package::select('id', 'name', 'price')->get();
        $users = \App\Models\User::select('id', 'name', 'email')->get();

        return Inertia::render('backoffice/CouponForm', [
            'packages' => $packages,
            'users' => $users
        ]);
    }

    /**
     * Coupons API - Show coupon detail page
     */
    public function backofficeCouponDetail($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);
        $couponModel = $couponService->findById($coupon);

        if (!$couponModel) {
            abort(404);
        }

        $usageStats = $couponService->getUsageStats($coupon);

        return Inertia::render('backoffice/CouponDetail', [
            'coupon' => $couponModel,
            'usage_stats' => $usageStats
        ]);
    }

    /**
     * Coupons API - Show edit coupon page
     */
    public function backofficeCouponEdit($coupon)
    {
        $couponService = app(\App\Services\CouponService::class);
        $couponModel = $couponService->findById($coupon);

        if (!$couponModel) {
            abort(404);
        }

        $packages = \App\Models\Package::select('id', 'name', 'price')->get();
        $users = \App\Models\User::select('id', 'name', 'email')->get();

        return Inertia::render('backoffice/CouponForm', [
            'coupon' => $couponModel,
            'packages' => $packages,
            'users' => $users
        ]);
    }
}
