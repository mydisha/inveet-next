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
        Schema::table('themes', function (Blueprint $table) {
            $table->string('category')->nullable()->after('description');
            $table->json('colors')->nullable()->after('category');
            $table->json('features')->nullable()->after('colors');
            $table->boolean('is_popular')->default(false)->after('is_recommended');
            $table->boolean('is_trending')->default(false)->after('is_popular');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->dropColumn(['category', 'colors', 'features', 'is_popular', 'is_trending']);
        });
    }
};
