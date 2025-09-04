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
                'category' => 'Traditional',
                'colors' => ['#8B4513', '#DAA520', '#F5F5DC'],
                'features' => ['Elegant typography', 'Classic layout', 'Gold accents', 'Formal style'],
                'is_active' => true,
                'is_popular' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Modern Minimalist',
                'description' => 'Clean and contemporary design with focus on simplicity',
                'slug' => 'modern-minimalist',
                'category' => 'Contemporary',
                'colors' => ['#2C3E50', '#E74C3C', '#ECF0F1'],
                'features' => ['Clean lines', 'Modern typography', 'Minimal design', 'Contemporary feel'],
                'is_active' => true,
                'is_trending' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Rustic Charm',
                'description' => 'Warm and cozy design inspired by countryside weddings',
                'slug' => 'rustic-charm',
                'category' => 'Rustic',
                'colors' => ['#8D6E63', '#A1887F', '#EFEBE9'],
                'features' => ['Natural textures', 'Rustic elements', 'Warm colors', 'Charming style'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Tropical Paradise',
                'description' => 'Vibrant and colorful design perfect for beach weddings',
                'slug' => 'tropical-paradise',
                'category' => 'Tropical',
                'colors' => ['#4CAF50', '#FF9800', '#E1F5FE'],
                'features' => ['Tropical elements', 'Vibrant colors', 'Exotic feel', 'Paradise vibes'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Vintage Romance',
                'description' => 'Romantic and nostalgic design with retro elements',
                'slug' => 'vintage-romance',
                'category' => 'Vintage',
                'colors' => ['#5D4037', '#BCAAA4', '#F3E5F5'],
                'features' => ['Vintage typography', 'Classic elements', 'Elegant layout', 'Timeless style'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Bohemian Bliss',
                'description' => 'Free-spirited and artistic design with natural elements',
                'slug' => 'bohemian-bliss',
                'category' => 'Bohemian',
                'colors' => ['#E91E63', '#F8BBD9', '#FFF8E1'],
                'features' => ['Floral elements', 'Romantic colors', 'Soft typography', 'Elegant layout'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Industrial Chic',
                'description' => 'Urban and edgy design with modern industrial elements',
                'slug' => 'industrial-chic',
                'category' => 'Industrial',
                'colors' => ['#37474F', '#607D8B', '#CFD8DC'],
                'features' => ['Industrial elements', 'Urban feel', 'Modern design', 'Edgy style'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Garden Party',
                'description' => 'Fresh and natural design inspired by outdoor celebrations',
                'slug' => 'garden-party',
                'category' => 'Garden',
                'colors' => ['#4CAF50', '#8BC34A', '#DCEDC8'],
                'features' => ['Garden elements', 'Fresh colors', 'Natural feel', 'Outdoor vibes'],
                'is_active' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
            [
                'name' => 'Overlay Shadow 01',
                'description' => 'Elegant wedding invitation with overlay shadow effects, inspired by Luxee design. Features beautiful gradients, modern typography, and interactive elements.',
                'slug' => 'overlay-shadow-01',
                'category' => 'Elegant',
                'colors' => ['#667eea', '#764ba2', '#ffd700', '#ff6b6b', '#ffffff'],
                'features' => ['Responsive design', 'Countdown timer', 'RSVP form', 'Digital envelope', 'Gallery section', 'Smooth animations'],
                'is_active' => true,
                'is_popular' => true,
                'is_trending' => true,
                'user_id' => $adminUser ? $adminUser->id : 1,
            ],
        ];

        foreach ($themes as $themeData) {
            // Check if theme already exists by slug
            $existingTheme = Theme::where('slug', $themeData['slug'])->first();

            if ($existingTheme) {
                // Update existing theme with new fields
                $existingTheme->update([
                    'category' => $themeData['category'],
                    'colors' => $themeData['colors'],
                    'features' => $themeData['features'],
                    'is_popular' => $themeData['is_popular'] ?? false,
                    'is_trending' => $themeData['is_trending'] ?? false,
                ]);
            } else {
                // Create new theme
                Theme::create($themeData);
            }
        }

        $this->command->info('Themes seeded successfully!');
    }
}
