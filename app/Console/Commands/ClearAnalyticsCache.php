<?php

namespace App\Console\Commands;

use App\Services\AnalyticsService;
use Illuminate\Console\Command;

class ClearAnalyticsCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'analytics:clear-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear analytics cache to force refresh of dashboard data';

    /**
     * Execute the console command.
     */
    public function handle(AnalyticsService $analyticsService)
    {
        $analyticsService->clearCache();

        $this->info('Analytics cache cleared successfully.');

        return Command::SUCCESS;
    }
}
