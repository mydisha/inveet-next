<?php

namespace Database\Seeders;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::where('email', 'admin@inveet.com')->first();

        $themes = [
            [
                'name' => 'Classic Elegance',
                'description' => 'Timeless and sophisticated design for traditional weddings',
                'slug' => 'classic-elegance',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Modern Minimalist',
                'description' => 'Clean and contemporary design with focus on simplicity',
                'slug' => 'modern-minimalist',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Rustic Charm',
                'description' => 'Warm and cozy design inspired by countryside weddings',
                'slug' => 'rustic-charm',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Tropical Paradise',
                'description' => 'Vibrant and colorful design perfect for beach weddings',
                'slug' => 'tropical-paradise',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Vintage Romance',
                'description' => 'Romantic and nostalgic design with retro elements',
                'slug' => 'vintage-romance',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Bohemian Bliss',
                'description' => 'Free-spirited and artistic design with natural elements',
                'slug' => 'bohemian-bliss',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Industrial Chic',
                'description' => 'Urban and edgy design with modern industrial elements',
                'slug' => 'industrial-chic',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Garden Party',
                'description' => 'Fresh and natural design inspired by outdoor celebrations',
                'slug' => 'garden-party',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Overlay Shadow 01',
                'description' => 'Elegant wedding invitation with overlay shadow effects, inspired by Luxee design. Features beautiful gradients, modern typography, and interactive elements.',
                'slug' => 'overlay-shadow-01',
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
        ];

        foreach ($themes as $themeData) {
            Theme::create($themeData);
        }

        $this->command->info('Themes seeded successfully!');
    }
}
