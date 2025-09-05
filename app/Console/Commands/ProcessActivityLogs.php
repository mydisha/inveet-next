<?php

namespace App\Console\Commands;

use App\Services\BatchActivityLogger;
use App\Services\RedisActivityLogger;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Queue;

class ProcessActivityLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'activity:process
                            {--method=queue : Processing method (queue, batch, redis)}
                            {--batch-size=100 : Batch size for processing}
                            {--timeout=300 : Maximum execution time in seconds}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process activity logs using various methods for optimal performance';

    protected $batchLogger;
    protected $redisLogger;

    public function __construct(BatchActivityLogger $batchLogger, RedisActivityLogger $redisLogger)
    {
        parent::__construct();
        $this->batchLogger = $batchLogger;
        $this->redisLogger = $redisLogger;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $method = $this->option('method');
        $batchSize = (int) $this->option('batch-size');
        $timeout = (int) $this->option('timeout');

        $this->info("Starting activity log processing with method: {$method}");

        $startTime = time();
        $processed = 0;

        while ((time() - $startTime) < $timeout) {
            switch ($method) {
                case 'queue':
                    $processed += $this->processQueue();
                    break;
                case 'batch':
                    $this->batchLogger->processBatch();
                    $processed += $batchSize;
                    break;
                case 'redis':
                    $processed += $this->redisLogger->processBatch();
                    break;
                default:
                    $this->error("Unknown method: {$method}");
                    return 1;
            }

            // Small delay to prevent excessive CPU usage
            usleep(100000); // 0.1 second
        }

        $this->info("Processed {$processed} activity logs in " . (time() - $startTime) . " seconds");
        return 0;
    }

    /**
     * Process queue-based activity logs.
     */
    protected function processQueue(): int
    {
        $queueSize = Queue::size('activity-logs');

        if ($queueSize > 0) {
            $this->info("Processing {$queueSize} items from queue...");
            // Queue processing is handled by Laravel's queue worker
            return $queueSize;
        }

        return 0;
    }
}
