<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class DisableActivityLogging extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'activity:disable {--enable : Enable activity logging instead}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Disable or enable activity logging to fix performance issues';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $enable = $this->option('enable');
        $action = $enable ? 'enable' : 'disable';

        $this->info("Attempting to {$action} activity logging...");

        try {
            // Update .env file
            $envPath = base_path('.env');

            if (!File::exists($envPath)) {
                $this->error('.env file not found!');
                return 1;
            }

            $envContent = File::get($envPath);

            if ($enable) {
                // Enable activity logging
                if (strpos($envContent, 'ACTIVITY_LOG_ENABLED=false') !== false) {
                    $envContent = str_replace('ACTIVITY_LOG_ENABLED=false', 'ACTIVITY_LOG_ENABLED=true', $envContent);
                    $this->info('Activity logging enabled in .env');
                } elseif (strpos($envContent, 'ACTIVITY_LOG_ENABLED') === false) {
                    $envContent .= "\nACTIVITY_LOG_ENABLED=true\n";
                    $this->info('Activity logging enabled in .env');
                } else {
                    $this->info('Activity logging already enabled');
                }
            } else {
                // Disable activity logging
                if (strpos($envContent, 'ACTIVITY_LOG_ENABLED=true') !== false) {
                    $envContent = str_replace('ACTIVITY_LOG_ENABLED=true', 'ACTIVITY_LOG_ENABLED=false', $envContent);
                    $this->info('Activity logging disabled in .env');
                } elseif (strpos($envContent, 'ACTIVITY_LOG_ENABLED') === false) {
                    $envContent .= "\nACTIVITY_LOG_ENABLED=false\n";
                    $this->info('Activity logging disabled in .env');
                } else {
                    $this->info('Activity logging already disabled');
                }
            }

            File::put($envPath, $envContent);

            // Clear config cache
            $this->call('config:clear');
            $this->call('cache:clear');

            $this->info("Activity logging {$action}d successfully!");
            $this->line('');
            $this->line('Next steps:');
            if ($enable) {
                $this->line('1. Start queue workers: php artisan queue:work --queue=activity-logs');
                $this->line('2. Monitor performance: php artisan activity:process --method=queue');
            } else {
                $this->line('1. Your application should now work without timeouts');
                $this->line('2. Re-enable when ready: php artisan activity:enable');
            }

            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to {$action} activity logging: " . $e->getMessage());
            return 1;
        }
    }
}
