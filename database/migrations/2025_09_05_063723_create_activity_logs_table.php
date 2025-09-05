<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('log_name')->index(); // e.g., 'user', 'wedding', 'order'
            $table->string('event')->index(); // e.g., 'created', 'updated', 'deleted', 'published'
            $table->string('subject_type')->index(); // Model class name
            $table->unsignedBigInteger('subject_id')->index(); // Model ID
            $table->string('causer_type')->nullable()->index(); // User model class
            $table->unsignedBigInteger('causer_id')->nullable()->index(); // User ID
            $table->json('properties')->nullable(); // Additional data
            $table->string('description')->nullable(); // Human readable description
            $table->string('ip_address', 45)->nullable(); // IP address
            $table->string('user_agent')->nullable(); // User agent
            $table->string('url')->nullable(); // Request URL
            $table->string('method', 10)->nullable(); // HTTP method
            $table->timestamps();

            // Indexes for better performance
            $table->index(['log_name', 'event']);
            $table->index(['subject_type', 'subject_id']);
            $table->index(['causer_type', 'causer_id']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
