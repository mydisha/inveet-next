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
        Schema::table('activity_logs', function (Blueprint $table) {
            // Add composite indexes for common queries
            $table->index(['log_name', 'created_at'], 'idx_log_name_created_at');
            $table->index(['event', 'created_at'], 'idx_event_created_at');
            $table->index(['subject_type', 'subject_id', 'created_at'], 'idx_subject_created_at');
            $table->index(['causer_type', 'causer_id', 'created_at'], 'idx_causer_created_at');

            // Add index for IP address filtering
            $table->index('ip_address', 'idx_ip_address');

            // Add index for URL filtering
            $table->index('url', 'idx_url');

            // Add index for method filtering
            $table->index('method', 'idx_method');

            // Add partial index for recent activities (last 30 days)
            $table->index(['created_at'], 'idx_created_at_recent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropIndex('idx_log_name_created_at');
            $table->dropIndex('idx_event_created_at');
            $table->dropIndex('idx_subject_created_at');
            $table->dropIndex('idx_causer_created_at');
            $table->dropIndex('idx_ip_address');
            $table->dropIndex('idx_url');
            $table->dropIndex('idx_method');
            $table->dropIndex('idx_created_at_recent');
        });
    }
};
