<?php

namespace App\Services;

use App\Models\Music;
use Illuminate\Support\Facades\Storage;

class MusicService
{
    /**
     * Get all music files
     */
    public function getAll()
    {
        return Music::all();
    }

    /**
     * Get music by ID
     */
    public function findById(int $id)
    {
        return Music::find($id);
    }

    /**
     * Upload music file
     */
    public function upload(array $data)
    {
        $file = $data['file'];
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('music', $filename, 'public');

        return Music::create([
            'title' => $data['title'] ?? $file->getClientOriginalName(),
            'filename' => $filename,
            'path' => $path,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'user_id' => $data['user_id'] ?? auth()->id(),
        ]);
    }

    /**
     * Delete music file
     */
    public function delete(int $id)
    {
        $music = Music::find($id);

        if ($music) {
            // Delete file from storage
            Storage::disk('public')->delete($music->path);

            // Delete record from database
            return $music->delete();
        }

        return false;
    }

    /**
     * Get music statistics
     */
    public function getStatistics()
    {
        return [
            'total_files' => Music::count(),
            'total_size' => Music::sum('size'),
            'files_this_month' => Music::whereMonth('created_at', now()->month)->count(),
        ];
    }
}
