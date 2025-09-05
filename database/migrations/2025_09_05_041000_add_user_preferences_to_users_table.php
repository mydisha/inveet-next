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
        Schema::table('users', function (Blueprint $table) {
            $table->string('language', 5)->default('en')->after('is_active');
            $table->enum('theme', ['light', 'dark', 'system'])->default('system')->after('language');
            $table->boolean('email_notifications')->default(true)->after('theme');
            $table->boolean('marketing_emails')->default(false)->after('email_notifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['language', 'theme', 'email_notifications', 'marketing_emails']);
        });
    }
};
