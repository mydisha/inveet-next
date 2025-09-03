<?php

namespace App\Http\Controllers;

use App\Models\SpecialInvitation;
use App\Models\Wedding;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReceptionController extends Controller
{
    /**
     * Scan QR code and return guest information
     */
    public function scanQrCode(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'qr_code' => 'required|string|max:255',
            ]);

            $qrCode = $request->input('qr_code');

            // Parse QR code data (assuming it contains invitation slug or ID)
            $invitationData = $this->parseQrCode($qrCode);

            if (!$invitationData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid QR code format'
                ], 400);
            }

            // Find the invitation
            $invitation = SpecialInvitation::with(['wedding.user', 'wedding.theme'])
                ->where('slug', $invitationData['slug'])
                ->where('is_active', true)
                ->first();

            if (!$invitation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invitation not found or inactive'
                ], 404);
            }

            // Check if wedding is active
            if (!$invitation->wedding->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Wedding is not active'
                ], 403);
            }

            // Log the scan for analytics
            $this->logGuestScan($invitation, $request);

            // Get guest information (you might need to create a guests table)
            $guestData = $this->getGuestData($invitation, $qrCode);

            return response()->json([
                'success' => true,
                'guest' => $guestData,
                'invitation' => [
                    'id' => $invitation->id,
                    'name' => $invitation->name,
                    'description' => $invitation->description,
                ],
                'wedding' => [
                    'id' => $invitation->wedding->id,
                    'slug' => $invitation->wedding->slug,
                    'wedding_start' => $invitation->wedding->wedding_start,
                    'wedding_end' => $invitation->wedding->wedding_end,
                    'theme' => $invitation->wedding->theme,
                    'user' => $invitation->wedding->user,
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('QR Code scan error: ' . $e->getMessage(), [
                'qr_code' => $request->input('qr_code'),
                'error' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the QR code'
            ], 500);
        }
    }

    /**
     * Get guest greeting page data
     */
    public function getGuestGreeting(Request $request, $guestId): JsonResponse
    {
        try {
            // This would typically fetch from a guests table
            // For now, we'll return mock data based on the invitation
            $guestData = [
                'id' => $guestId,
                'name' => 'Guest Name', // This should come from your guests table
                'isVip' => false,
                'tableNumber' => 'A1',
                'seatNumber' => '12',
            ];

            return response()->json([
                'success' => true,
                'guest' => $guestData
            ]);

        } catch (\Exception $e) {
            Log::error('Guest greeting error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to load guest information'
            ], 500);
        }
    }

    /**
     * Get reception statistics
     */
    public function getStats(): JsonResponse
    {
        try {
            // This would typically query your database for actual stats
            $stats = [
                'totalScanned' => 0, // Count from guest_scans table
                'todayScanned' => 0, // Count from today's scans
                'vipGuests' => 0,    // Count of VIP guests scanned
            ];

            return response()->json([
                'success' => true,
                'stats' => $stats
            ]);

        } catch (\Exception $e) {
            Log::error('Reception stats error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to load statistics'
            ], 500);
        }
    }

    /**
     * Get recent guest scans for monitor display
     */
    public function getRecentScans(): JsonResponse
    {
        try {
            // This would typically query your database for recent scans
            // For now, return mock data
            $recentScans = [];

            return response()->json([
                'success' => true,
                'guests' => $recentScans
            ]);

        } catch (\Exception $e) {
            Log::error('Recent scans error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to load recent scans'
            ], 500);
        }
    }

    /**
     * Parse QR code data
     */
    private function parseQrCode(string $qrCode): ?array
    {
        // QR code format: "invite:{slug}" or just the slug
        if (str_starts_with($qrCode, 'invite:')) {
            $slug = substr($qrCode, 7);
        } else {
            $slug = $qrCode;
        }

        // Validate slug format
        if (empty($slug) || !preg_match('/^[a-z0-9\-]+$/', $slug)) {
            return null;
        }

        return [
            'slug' => $slug,
            'type' => 'invitation'
        ];
    }

    /**
     * Get guest data for the invitation
     */
    private function getGuestData(SpecialInvitation $invitation, string $qrCode): array
    {
        // This is a placeholder - you'll need to implement based on your guest data structure
        // You might have a separate guests table or store guest info in the invitation

        return [
            'id' => $invitation->id,
            'name' => 'Guest Name', // This should come from your guests table
            'isVip' => false, // This should come from your guests table
            'tableNumber' => 'A1', // This should come from your guests table
            'seatNumber' => '12', // This should come from your guests table
        ];
    }

    /**
     * Log guest scan for analytics
     */
    private function logGuestScan(SpecialInvitation $invitation, Request $request): void
    {
        try {
            // You might want to create a guest_scans table to track this
            DB::table('guest_scans')->insert([
                'invitation_id' => $invitation->id,
                'wedding_id' => $invitation->wedding_id,
                'scanned_at' => now(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            Log::warning('Failed to log guest scan: ' . $e->getMessage());
        }
    }
}
