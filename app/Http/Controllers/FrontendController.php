<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
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
        // Get user data if authenticated, otherwise provide mock data for testing
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('DashboardFixed', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show the onboarding overview
     */
    public function onboarding(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('onboarding/index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'currentStep' => 1,
        ]);
    }

    /**
     * Show the couple info step
     */
    public function coupleInfo(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('onboarding/couple-info', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show the wedding location step
     */
    public function weddingLocation(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('onboarding/wedding-location', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show the design selection step
     */
    public function designSelection(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/design-selection', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('Profile/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show settings
     */
    public function settings(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('Settings/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show user's orders
     */
    public function orders(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'orders' => $orders,
        ]);
    }

    /**
     * Show gallery page
     */
    public function gallery(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('Gallery', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show analytics dashboard
     */
    public function analytics(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'weddings' => $weddings,
        ]);
    }

    /**
     * Show wedding detail page
     */
    public function weddingDetail(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show wedding invitation configuration
     */
    public function weddingConfiguration(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show the music library page
     */
    public function music(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('Music/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

        return Inertia::render('Music/Upload', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
        ]);
    }

    /**
     * Show the checkout page
     */
    public function checkout(Request $request)
    {
        $user = $request->user();
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

        if (!$user) {
            // Mock user data for testing without authentication
            $user = (object) [
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com',
                'hasWedding' => false,
            ];
        }

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
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->hasWedding ?? false,
            ],
            'wedding' => $wedding,
        ]);
    }
}
