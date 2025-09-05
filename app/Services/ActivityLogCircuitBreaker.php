<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ActivityLogCircuitBreaker
{
    protected $failureThreshold = 5;
    protected $timeout = 60; // seconds
    protected $halfOpenMaxCalls = 3;
    protected $cacheKey = 'activity_log_circuit_breaker';

    const STATE_CLOSED = 'closed';
    const STATE_OPEN = 'open';
    const STATE_HALF_OPEN = 'half_open';

    /**
     * Check if activity logging is allowed.
     */
    public function isAllowed(): bool
    {
        $state = $this->getState();

        switch ($state) {
            case self::STATE_CLOSED:
                return true;
            case self::STATE_OPEN:
                return $this->shouldAttemptReset();
            case self::STATE_HALF_OPEN:
                return $this->getHalfOpenCalls() < $this->halfOpenMaxCalls;
            default:
                return true;
        }
    }

    /**
     * Record a successful activity log.
     */
    public function recordSuccess(): void
    {
        $this->reset();
    }

    /**
     * Record a failed activity log.
     */
    public function recordFailure(): void
    {
        $failures = $this->getFailureCount() + 1;
        $this->setFailureCount($failures);

        if ($failures >= $this->failureThreshold) {
            $this->open();
        }
    }

    /**
     * Get current circuit breaker state.
     */
    protected function getState(): string
    {
        return Cache::get($this->cacheKey . '_state', self::STATE_CLOSED);
    }

    /**
     * Set circuit breaker state.
     */
    protected function setState(string $state): void
    {
        Cache::put($this->cacheKey . '_state', $state, $this->timeout);
    }

    /**
     * Get failure count.
     */
    protected function getFailureCount(): int
    {
        return Cache::get($this->cacheKey . '_failures', 0);
    }

    /**
     * Set failure count.
     */
    protected function setFailureCount(int $count): void
    {
        Cache::put($this->cacheKey . '_failures', $count, $this->timeout);
    }

    /**
     * Get half-open calls count.
     */
    protected function getHalfOpenCalls(): int
    {
        return Cache::get($this->cacheKey . '_half_open_calls', 0);
    }

    /**
     * Increment half-open calls.
     */
    protected function incrementHalfOpenCalls(): void
    {
        $calls = $this->getHalfOpenCalls() + 1;
        Cache::put($this->cacheKey . '_half_open_calls', $calls, $this->timeout);
    }

    /**
     * Open the circuit breaker.
     */
    protected function open(): void
    {
        $this->setState(self::STATE_OPEN);
        $this->setFailureCount(0);
        $this->setHalfOpenCalls(0);

        Log::warning('Activity log circuit breaker opened due to failures');
    }

    /**
     * Reset the circuit breaker.
     */
    protected function reset(): void
    {
        $this->setState(self::STATE_CLOSED);
        $this->setFailureCount(0);
        $this->setHalfOpenCalls(0);
    }

    /**
     * Set half-open calls count.
     */
    protected function setHalfOpenCalls(int $count): void
    {
        Cache::put($this->cacheKey . '_half_open_calls', $count, $this->timeout);
    }

    /**
     * Check if circuit breaker should attempt reset.
     */
    protected function shouldAttemptReset(): bool
    {
        $lastFailureTime = Cache::get($this->cacheKey . '_last_failure_time');

        if (!$lastFailureTime || (time() - $lastFailureTime) >= $this->timeout) {
            $this->setState(self::STATE_HALF_OPEN);
            $this->setHalfOpenCalls(0);
            return true;
        }

        return false;
    }

    /**
     * Get circuit breaker status for monitoring.
     */
    public function getStatus(): array
    {
        return [
            'state' => $this->getState(),
            'failure_count' => $this->getFailureCount(),
            'half_open_calls' => $this->getHalfOpenCalls(),
            'is_allowed' => $this->isAllowed(),
        ];
    }
}
