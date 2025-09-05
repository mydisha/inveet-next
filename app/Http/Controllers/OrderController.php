<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends BaseController
{
    protected $orderService;
    protected $packageService;

    public function __construct(OrderService $orderService, PackageService $packageService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->orderService = $orderService;
        $this->packageService = $packageService;
    }

    /**
     * Show user's orders
     */
    public function index(Request $request)
    {
        $this->ensureFreshCsrfToken($request);

        $user = $this->getUser($request);
        $orders = $this->orderService->findByUserId($user->id);

        return $this->renderWithUser('Order/Index', [
            'orders' => $orders,
        ], $request);
    }

    /**
     * Show the checkout page
     */
    public function checkout(Request $request, $package = null)
    {
        $user = $this->getUser($request);

        if ($package) {
            // Show specific package checkout
            $packageModel = $this->packageService->findById($package);
            return Inertia::render('Checkout', [
                'package' => $packageModel,
                'user' => $this->getUserData($user),
            ]);
        }

        // Show all packages (existing behavior)
        $packages = $this->packageService->findActivePackages();

        // Calculate discounted prices for each package
        $packagesWithDiscounts = $packages->map(function ($package) {
            $package->discounted_price = $package->discounted_price;
            $package->discount_amount = $package->discount_amount;
            return $package;
        });

        return Inertia::render('Checkout', [
            'user' => $this->getUserData($user),
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
        $user = $this->getUser($request);

        if (!$packageId) {
            return redirect('/checkout');
        }

        $package = $this->packageService->findById($packageId);

        if (!$package) {
            return redirect('/checkout');
        }

        // Calculate discounted prices
        $package->discounted_price = $package->discounted_price;
        $package->discount_amount = $package->discount_amount;

        return Inertia::render('CheckoutPayment', [
            'user' => $this->getUserData($user),
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
                $order = $this->orderService->findById($orderId);
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
}
