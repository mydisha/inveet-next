<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create super admin user
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@inveet.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
        $superAdmin->assignRole('super-admin');

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
        $admin->assignRole('admin');

        // Create moderator user
        $moderator = User::create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
        $moderator->assignRole('moderator');

        // Create customer user
        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
        $customer->assignRole('customer');

        // Create guest user
        $guest = User::create([
            'name' => 'Guest User',
            'email' => 'guest@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
        $guest->assignRole('guest');

        $this->command->info('Users seeded successfully!');
        $this->command->info('Super Admin: admin@inveet.com / password123');
        $this->command->info('Admin: admin@example.com / password123');
        $this->command->info('Moderator: moderator@example.com / password123');
        $this->command->info('Customer: customer@example.com / password123');
        $this->command->info('Guest: guest@example.com / password123');
    }
}
