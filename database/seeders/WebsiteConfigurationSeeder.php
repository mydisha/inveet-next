<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteConfiguration;

class WebsiteConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configurations = [
            // General Settings
            ['key' => 'site_name', 'value' => 'Inveet', 'type' => 'string', 'group' => 'general', 'description' => 'Website name', 'is_public' => true],
            ['key' => 'site_tagline', 'value' => 'Beautiful Wedding Invitations', 'type' => 'string', 'group' => 'general', 'description' => 'Website tagline', 'is_public' => true],
            ['key' => 'site_url', 'value' => config('app.url'), 'type' => 'string', 'group' => 'general', 'description' => 'Website URL', 'is_public' => true],
            ['key' => 'contact_email', 'value' => 'info@inveet.com', 'type' => 'string', 'group' => 'general', 'description' => 'Contact email', 'is_public' => true],
            ['key' => 'contact_phone', 'value' => '+62 123 456 789', 'type' => 'string', 'group' => 'general', 'description' => 'Contact phone', 'is_public' => true],

            // SEO Settings
            ['key' => 'meta_title', 'value' => 'Inveet - Beautiful Wedding Invitations', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta title', 'is_public' => true],
            ['key' => 'meta_description', 'value' => 'Create beautiful and personalized wedding invitations with Inveet. Easy to use, professional designs.', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta description', 'is_public' => true],
            ['key' => 'meta_keywords', 'value' => 'wedding invitations, digital invitations, wedding cards, online invitations', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta keywords', 'is_public' => true],

            // Social Media
            ['key' => 'facebook_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Facebook page URL', 'is_public' => true],
            ['key' => 'instagram_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Instagram profile URL', 'is_public' => true],
            ['key' => 'twitter_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Twitter profile URL', 'is_public' => true],

            // Maintenance Mode
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean', 'group' => 'maintenance', 'description' => 'Enable maintenance mode', 'is_public' => false],
            ['key' => 'maintenance_message', 'value' => 'We are currently performing maintenance. Please check back later.', 'type' => 'string', 'group' => 'maintenance', 'description' => 'Maintenance mode message', 'is_public' => false],
        ];

        foreach ($configurations as $config) {
            WebsiteConfiguration::updateOrCreate(
                ['key' => $config['key']],
                $config
            );
        }
    }
}
