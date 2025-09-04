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
            if (!Schema::hasColumn('users', 'socialite_id')) {
                $table->string('socialite_id')->nullable()->after('password');
            }
            if (!Schema::hasColumn('users', 'socialite_name')) {
                $table->string('socialite_name')->nullable()->after('socialite_id');
            }
            if (!Schema::hasColumn('users', 'socialite_avatar')) {
                $table->string('socialite_avatar')->nullable()->after('socialite_name');
            }
            if (!Schema::hasColumn('users', 'phone_number')) {
                $table->string('phone_number')->nullable()->after('socialite_avatar');
            }
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('phone_number');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'socialite_id',
                'socialite_name',
                'socialite_avatar',
                'phone_number',
                'is_active'
            ]);
        });
    }
};
