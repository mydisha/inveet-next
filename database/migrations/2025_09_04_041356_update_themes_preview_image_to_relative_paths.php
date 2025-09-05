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
        $themes = DB::table('themes')
            ->whereNotNull('preview_image')
            ->where('preview_image', 'like', 'https://%')
            ->get();

        foreach ($themes as $theme) {
            $previewImage = $theme->preview_image;
            if (strpos($previewImage, '/themes/') !== false) {
                $relativePath = substr($previewImage, strpos($previewImage, '/themes/'));
                DB::table('themes')
                    ->where('id', $theme->id)
                    ->update(['preview_image' => $relativePath]);
            }
        }
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
