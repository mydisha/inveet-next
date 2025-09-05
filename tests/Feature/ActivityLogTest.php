<?php

use App\Models\User;
use App\Models\Wedding;
use App\Models\Order;
use App\Models\ActivityLog;
use App\Services\ActivityLogService;

test('user model logs activities on create', function () {
    $user = User::factory()->create();

    $activity = ActivityLog::where('subject_type', User::class)
        ->where('subject_id', $user->id)
        ->where('event', 'created')
        ->first();

    expect($activity)->not->toBeNull();
    expect($activity->log_name)->toBe('user');
    expect($activity->event)->toBe('created');
});

test('wedding model logs activities on create', function () {
    $user = User::factory()->create();
    $wedding = Wedding::factory()->create(['user_id' => $user->id]);

    $activity = ActivityLog::where('subject_type', Wedding::class)
        ->where('subject_id', $wedding->id)
        ->where('event', 'created')
        ->first();

    expect($activity)->not->toBeNull();
    expect($activity->log_name)->toBe('wedding');
    expect($activity->event)->toBe('created');
});

test('order model logs activities on create', function () {
    $user = User::factory()->create();
    $order = Order::factory()->create(['user_id' => $user->id]);

    $activity = ActivityLog::where('subject_type', Order::class)
        ->where('subject_id', $order->id)
        ->where('event', 'created')
        ->first();

    expect($activity)->not->toBeNull();
    expect($activity->log_name)->toBe('order');
    expect($activity->event)->toBe('created');
});

test('activity log service can log custom activities', function () {
    $user = User::factory()->create();
    $wedding = Wedding::factory()->create(['user_id' => $user->id]);

    $activityLogService = new ActivityLogService();
    $activity = $activityLogService->log(
        'wedding',
        'published',
        $wedding,
        ['custom_data' => 'test'],
        'Wedding was published',
        $user
    );

    expect($activity)->not->toBeNull();
    expect($activity->log_name)->toBe('wedding');
    expect($activity->event)->toBe('published');
    expect($activity->causer_id)->toBe($user->id);
    expect($activity->properties['custom_data'])->toBe('test');
});

test('activity log service can search activities', function () {
    $user = User::factory()->create();
    $wedding = Wedding::factory()->create(['user_id' => $user->id]);

    $activityLogService = new ActivityLogService();
    $activities = $activityLogService->searchActivities([
        'log_name' => 'wedding',
        'event' => 'created'
    ]);

    expect($activities)->toHaveCount(1);
    expect($activities->first()->log_name)->toBe('wedding');
});

test('activity log service can get user activities', function () {
    $user = User::factory()->create();
    $wedding = Wedding::factory()->create(['user_id' => $user->id]);

    $activityLogService = new ActivityLogService();
    $activities = $activityLogService->getUserActivities($user);

    expect($activities)->toHaveCount(1); // user created only
});

test('activity log service can get model activities', function () {
    $user = User::factory()->create();
    $wedding = Wedding::factory()->create(['user_id' => $user->id]);

    $activityLogService = new ActivityLogService();
    $activities = $activityLogService->getModelActivities($wedding);

    expect($activities)->toHaveCount(1); // wedding created only
    expect($activities->first()->subject_type)->toBe(Wedding::class);
});
