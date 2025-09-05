<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupons = [
            [
                'code' => 'WELCOME10',
                'name' => 'Welcome Discount',
                'description' => '10% off for new customers',
                'type' => 'percentage',
                'value' => 10,
                'minimum_amount' => 100000, // 100k minimum
                'usage_limit' => 100,
                'user_limit' => 1,
                'starts_at' => now(),
                'expires_at' => now()->addMonths(3),
                'is_active' => true,
            ],
            [
                'code' => 'SAVE50K',
                'name' => 'Fixed Amount Discount',
                'description' => 'Save 50,000 IDR on any order',
                'type' => 'fixed',
                'value' => 50000,
                'minimum_amount' => 200000, // 200k minimum
                'usage_limit' => 50,
                'user_limit' => 2,
                'starts_at' => now(),
                'expires_at' => now()->addMonths(1),
                'is_active' => true,
            ],
            [
                'code' => 'PREMIUM20',
                'name' => 'Premium Package Discount',
                'description' => '20% off on premium packages',
                'type' => 'percentage',
                'value' => 20,
                'minimum_amount' => 500000, // 500k minimum
                'maximum_discount' => 200000, // Max 200k discount
                'usage_limit' => 25,
                'user_limit' => 1,
                'starts_at' => now(),
                'expires_at' => now()->addWeeks(2),
                'is_active' => true,
            ],
            [
                'code' => 'EARLYBIRD',
                'name' => 'Early Bird Special',
                'description' => '15% off for early bookings',
                'type' => 'percentage',
                'value' => 15,
                'minimum_amount' => 300000, // 300k minimum
                'usage_limit' => 75,
                'user_limit' => 1,
                'starts_at' => now(),
                'expires_at' => now()->addDays(30),
                'is_active' => true,
            ],
            [
                'code' => 'FREESHIP',
                'name' => 'Free Shipping',
                'description' => 'Free shipping on orders over 150k',
                'type' => 'fixed',
                'value' => 25000, // Shipping cost
                'minimum_amount' => 150000, // 150k minimum
                'usage_limit' => 200,
                'user_limit' => 3,
                'starts_at' => now(),
                'expires_at' => now()->addMonths(6),
                'is_active' => true,
            ],
            [
                'code' => 'EXPIRED',
                'name' => 'Expired Coupon',
                'description' => 'This coupon has expired',
                'type' => 'percentage',
                'value' => 10,
                'minimum_amount' => 100000,
                'usage_limit' => 10,
                'user_limit' => 1,
                'starts_at' => now()->subMonths(1),
                'expires_at' => now()->subDays(1),
                'is_active' => false,
            ],
        ];

        foreach ($coupons as $couponData) {
            Coupon::create($couponData);
        }
    }
}
