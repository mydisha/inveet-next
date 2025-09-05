<?php

namespace App\Services;

use App\Repositories\GuestRepository;
use Illuminate\Support\Str;

class GuestService
{
    protected $guestRepository;

    public function __construct(GuestRepository $guestRepository)
    {
        $this->guestRepository = $guestRepository;
    }

    /**
     * Get guests by wedding ID
     */
    public function getByWeddingId(int $weddingId)
    {
        return $this->guestRepository->getByWeddingId($weddingId);
    }

    /**
     * Get guest by invitation code
     */
    public function getByInvitationCode(string $invitationCode)
    {
        return $this->guestRepository->getByInvitationCode($invitationCode);
    }

    /**
     * Get guest by QR code
     */
    public function getByQrCode(string $qrCode)
    {
        return $this->guestRepository->getByQrCode($qrCode);
    }

    /**
     * Create a new guest
     */
    public function create(array $data)
    {
        // Generate invitation code if not provided
        if (!isset($data['invitation_code'])) {
            $data['invitation_code'] = $this->generateInvitationCode();
        }

        // Generate QR code if not provided
        if (!isset($data['qr_code'])) {
            $data['qr_code'] = $this->generateQrCode();
        }

        // Set default values
        $data['is_attending'] = $data['is_attending'] ?? null;
        $data['is_vip'] = $data['is_vip'] ?? false;
        $data['is_attended'] = $data['is_attended'] ?? false;

        return $this->guestRepository->create($data);
    }

    /**
     * Update guest
     */
    public function update(int $guestId, array $data)
    {
        return $this->guestRepository->update($guestId, $data);
    }

    /**
     * Mark guest as attended
     */
    public function markAsAttended(int $guestId)
    {
        return $this->guestRepository->markAsAttended($guestId);
    }

    /**
     * Update guest attendance status
     */
    public function updateAttendance(int $guestId, bool $isAttending)
    {
        return $this->guestRepository->updateAttendance($guestId, $isAttending);
    }

    /**
     * Get guest statistics for wedding
     */
    public function getStatisticsForWedding(int $weddingId)
    {
        return $this->guestRepository->getStatisticsForWedding($weddingId);
    }

    /**
     * Get VIP guests by wedding ID
     */
    public function getVipByWeddingId(int $weddingId)
    {
        return $this->guestRepository->getVipByWeddingId($weddingId);
    }

    /**
     * Generate unique invitation code
     */
    private function generateInvitationCode()
    {
        do {
            $code = Str::random(32);
        } while ($this->guestRepository->getByInvitationCode($code));

        return $code;
    }

    /**
     * Generate unique QR code
     */
    private function generateQrCode()
    {
        do {
            $code = Str::random(16);
        } while ($this->guestRepository->getByQrCode($code));

        return $code;
    }
}
