<?php

namespace App\Repositories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;

class GuestRepository extends BaseRepository
{
    public function __construct(Comment $model)
    {
        parent::__construct($model);
    }

    /**
     * Get guests by wedding ID (using comments as guest entries)
     */
    public function getByWeddingId(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)->get();
    }

    /**
     * Get VIP guests by wedding ID (using is_approved as VIP indicator)
     */
    public function getVipByWeddingId(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)
                          ->where('is_approved', true)
                          ->get();
    }

    /**
     * Get guests by invitation code (using name as identifier)
     */
    public function getByInvitationCode(string $invitationCode)
    {
        return $this->model->where('name', $invitationCode)->first();
    }

    /**
     * Get guests by QR code (using name as identifier)
     */
    public function getByQrCode(string $qrCode)
    {
        return $this->model->where('name', $qrCode)->first();
    }

    /**
     * Get attending guests by wedding ID (using is_approved as attendance indicator)
     */
    public function getAttendingByWeddingId(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)
                          ->where('is_approved', true)
                          ->get();
    }

    /**
     * Get guest statistics for wedding
     */
    public function getStatisticsForWedding(int $weddingId)
    {
        $totalGuests = $this->model->where('wedding_id', $weddingId)->count();
        $attendingGuests = $this->model->where('wedding_id', $weddingId)
                                     ->where('is_approved', true)
                                     ->count();
        $vipGuests = $this->model->where('wedding_id', $weddingId)
                                ->where('is_approved', true)
                                ->count();

        return [
            'total_guests' => $totalGuests,
            'attending_guests' => $attendingGuests,
            'not_attending_guests' => $totalGuests - $attendingGuests,
            'vip_guests' => $vipGuests,
        ];
    }

    /**
     * Mark guest as attended (using is_approved)
     */
    public function markAsAttended(int $guestId)
    {
        return $this->update($guestId, [
            'is_approved' => true,
        ]);
    }

    /**
     * Update guest attendance status (using is_approved)
     */
    public function updateAttendance(int $guestId, bool $isAttending)
    {
        return $this->update($guestId, [
            'is_approved' => $isAttending,
        ]);
    }
}
