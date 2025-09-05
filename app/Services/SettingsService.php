<?php

namespace App\Services;

use App\Models\WebsiteConfiguration;

class SettingsService
{
    /**
     * Get title settings
     */
    public function getTitleSettings()
    {
        return [
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
    }

    /**
     * Update title settings
     */
    public function updateTitleSettings(array $settings)
    {
        // In a real implementation, you would save these to database
        // For now, we'll just return the settings
        return $settings;
    }

    /**
     * Get website configuration
     */
    public function getWebsiteConfiguration()
    {
        return WebsiteConfiguration::first() ?? new WebsiteConfiguration();
    }

    /**
     * Update website configuration
     */
    public function updateWebsiteConfiguration(array $data)
    {
        $config = WebsiteConfiguration::first();

        if ($config) {
            $config->update($data);
        } else {
            $config = WebsiteConfiguration::create($data);
        }

        return $config;
    }

    /**
     * Get app settings
     */
    public function getAppSettings()
    {
        return [
            'app_name' => config('app.name'),
            'app_url' => config('app.url'),
            'app_env' => config('app.env'),
            'app_debug' => config('app.debug'),
        ];
    }
}
