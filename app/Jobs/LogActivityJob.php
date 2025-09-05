<?php

namespace App\Jobs;

use App\Models\ActivityLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Request;

class LogActivityJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 30;
    public $tries = 3;

    protected $logName;
    protected $event;
    protected $subjectType;
    protected $subjectId;
    protected $causerType;
    protected $causerId;
    protected $properties;
    protected $description;
    protected $ipAddress;
    protected $userAgent;
    protected $url;
    protected $method;

    /**
     * Create a new job instance.
     */
    public function __construct(
        string $logName,
        string $event,
        string $subjectType,
        int $subjectId,
        ?string $causerType,
        ?int $causerId,
        array $properties,
        string $description,
        ?string $ipAddress,
        ?string $userAgent,
        ?string $url,
        ?string $method
    ) {
        $this->logName = $logName;
        $this->event = $event;
        $this->subjectType = $subjectType;
        $this->subjectId = $subjectId;
        $this->causerType = $causerType;
        $this->causerId = $causerId;
        $this->properties = $properties;
        $this->description = $description;
        $this->ipAddress = $ipAddress;
        $this->userAgent = $userAgent;
        $this->url = $url;
        $this->method = $method;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        ActivityLog::create([
            'log_name' => $this->logName,
            'event' => $this->event,
            'subject_type' => $this->subjectType,
            'subject_id' => $this->subjectId,
            'causer_type' => $this->causerType,
            'causer_id' => $this->causerId,
            'properties' => $this->properties,
            'description' => $this->description,
            'ip_address' => $this->ipAddress,
            'user_agent' => $this->userAgent,
            'url' => $this->url,
            'method' => $this->method,
        ]);
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        // Log the failure or send to monitoring service
        \Log::error('Activity log job failed', [
            'exception' => $exception->getMessage(),
            'job_data' => $this->toArray()
        ]);
    }
}
