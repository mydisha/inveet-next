<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class OptimizeDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:optimize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize database performance by running VACUUM and ANALYZE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting database optimization...');

        try {
            // For SQLite, run VACUUM to reclaim space and optimize
            if (config('database.default') === 'sqlite') {
                $this->info('Running VACUUM on SQLite database...');
                DB::statement('VACUUM');

                $this->info('Running ANALYZE on SQLite database...');
                DB::statement('ANALYZE');

                $this->info('Database optimization completed successfully.');
            } else {
                $this->warn('Database optimization is only supported for SQLite.');
            }
        } catch (\Exception $e) {
            $this->error('Database optimization failed: ' . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }
}
