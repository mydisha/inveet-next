<?php

namespace App\Services;

use App\Constants\WeddingDetailKeys;
use App\Models\Wedding;
use App\Models\WeddingDetail;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class WeddingOnboardingService
{
    /**
     * Handle couple information step - create or update wedding and save details.
     */
    public function handleCoupleInfo(int $userId, array $data, ?UploadedFile $groomPhoto = null, ?UploadedFile $bridePhoto = null): Wedding
    {
        // Create or update wedding
        $wedding = Wedding::upsertForUser($userId);

        // Prepare wedding details using correct constants
        $weddingDetails = [
            WeddingDetailKeys::MALE_NAME => $data['groom_name'] ?? '',
            WeddingDetailKeys::MALE_NICKNAME => $data['groom_nickname'] ?? '',
            WeddingDetailKeys::MALE_INSTAGRAM => $data['groom_instagram'] ?? '',
            WeddingDetailKeys::MALE_FATHER_NAME => $data['groom_father_name'] ?? '',
            WeddingDetailKeys::MALE_MOTHER_NAME => $data['groom_mother_name'] ?? '',
            WeddingDetailKeys::FEMALE_NAME => $data['bride_name'] ?? '',
            WeddingDetailKeys::FEMALE_NICKNAME => $data['bride_nickname'] ?? '',
            WeddingDetailKeys::FEMALE_INSTAGRAM => $data['bride_instagram'] ?? '',
            WeddingDetailKeys::FEMALE_FATHER_NAME => $data['bride_father_name'] ?? '',
            WeddingDetailKeys::FEMALE_MOTHER_NAME => $data['bride_mother_name'] ?? '',
        ];

        // Handle image uploads
        if ($groomPhoto) {
            $weddingDetails[WeddingDetailKeys::MALE_PROFILE_PHOTO] = $this->uploadWeddingImage($groomPhoto, $wedding->wedding_uuid, 'groom');
        }

        if ($bridePhoto) {
            $weddingDetails[WeddingDetailKeys::FEMALE_PROFILE_PHOTO] = $this->uploadWeddingImage($bridePhoto, $wedding->wedding_uuid, 'bride');
        }

        // Save wedding details using optimized upsert
        $this->upsertWeddingDetails($wedding->id, $weddingDetails);

        return $wedding;
    }

    /**
     * Upload wedding image to S3 compatible storage.
     */
    public function uploadWeddingImage(UploadedFile $file, string $weddingUuid, string $type): string
    {
        $filename = $type . '_' . time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        $path = 'wedding/' . $weddingUuid . '/' . $filename;

        // Store the file in S3 compatible storage
        $storedPath = Storage::disk('s3')->putFileAs(
            'wedding/' . $weddingUuid,
            $file,
            $filename,
            'public'
        );

        return $storedPath;
    }

    /**
     * Optimized upsert for wedding details - batch operation.
     */
    public function upsertWeddingDetails(int $weddingId, array $details): void
    {
        // Get existing details to avoid unnecessary updates
        $existingDetails = WeddingDetail::forWedding($weddingId)
            ->pluck('value', 'key')
            ->toArray();

        $detailsToInsert = [];
        $detailsToUpdate = [];

        foreach ($details as $key => $value) {
            if (isset($existingDetails[$key])) {
                // Only update if value has changed
                if ($existingDetails[$key] !== $value) {
                    $detailsToUpdate[] = [
                        'wedding_id' => $weddingId,
                        'key' => $key,
                        'value' => $value,
                    ];
                }
            } else {
                // New detail to insert
                $detailsToInsert[] = [
                    'wedding_id' => $weddingId,
                    'key' => $key,
                    'value' => $value,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        }

        // Batch insert new details
        if (!empty($detailsToInsert)) {
            WeddingDetail::insert($detailsToInsert);
        }

        // Update changed details
        foreach ($detailsToUpdate as $detail) {
            WeddingDetail::where('wedding_id', $weddingId)
                ->where('key', $detail['key'])
                ->update(['value' => $detail['value'], 'updated_at' => Carbon::now()]);
        }
    }

    /**
     * Get wedding details for a specific wedding.
     */
    public function getWeddingDetails(int $weddingId): array
    {
        return WeddingDetail::getAllForWedding($weddingId);
    }

    /**
     * Get wedding details by wedding UUID.
     */
    public function getWeddingDetailsByUuid(string $weddingUuid): array
    {
        $wedding = Wedding::findByUuid($weddingUuid);

        if (!$wedding) {
            return [];
        }

        return $this->getWeddingDetails($wedding->id);
    }
}
