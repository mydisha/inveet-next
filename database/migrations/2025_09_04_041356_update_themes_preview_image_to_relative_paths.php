<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update preview_image to store only relative paths
        DB::table('themes')
            ->whereNotNull('preview_image')
            ->where('preview_image', 'like', 'https://%')
            ->update([
                'preview_image' => DB::raw("SUBSTRING(preview_image, LOCATE('/themes/', preview_image))")
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration is not easily reversible as we don't know the original full URLs
        // In practice, you would need to restore from backup if you need to reverse this
    }
};
