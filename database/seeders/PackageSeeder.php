<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Basic Wedding Package',
                'description' => 'Perfect for intimate weddings with essential features',
                'price' => 500000,
                'discount' => 0,
                'is_recommended' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Premium Wedding Package',
                'description' => 'Our most popular package with advanced features and customization',
                'price' => 1000000,
                'discount' => 10,
                'is_recommended' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Luxury Wedding Package',
                'description' => 'Ultimate wedding experience with premium themes and unlimited features',
                'price' => 2000000,
                'discount' => 15,
                'is_recommended' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Budget Wedding Package',
                'description' => 'Affordable option for couples on a budget',
                'price' => 250000,
                'discount' => 20,
                'is_recommended' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Destination Wedding Package',
                'description' => 'Special package for destination weddings with travel features',
                'price' => 1500000,
                'discount' => 5,
                'is_recommended' => false,
                'is_active' => true,
            ],
        ];

        foreach ($packages as $packageData) {
            Package::create($packageData);
        }

        $this->command->info('Packages seeded successfully!');
    }
}
