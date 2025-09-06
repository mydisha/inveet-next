<?php

namespace App\Http\Controllers;

use App\Models\Wedding;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display wedding invitation with specific theme
     */
    public function showWithTheme(Request $request, $slug, $themeId)
    {
        $wedding = Wedding::where('slug', $slug)
            ->with(['galleries', 'comments', 'user', 'theme'])
            ->firstOrFail();

        // Get invitation if provided
        $invitation = null;
        if ($request->has('invitation_id')) {
            $invitation = Invitation::where('id', $request->invitation_id)
                ->where('wedding_id', $wedding->id)
                ->with('session')
                ->first();
        }

        // Transform wedding data for frontend
        $weddingData = $this->transformWeddingData($wedding);

        // Transform invitation data if exists
        $invitationData = $this->transformInvitationData($invitation);

        return Inertia::render('Wedding/InvitationPage', [
            'wedding' => $weddingData,
            'invitation' => $invitationData,
            'themeId' => $themeId,
            'isPreview' => $request->has('preview'),
        ]);
    }

    /**
     * Display sample invitation for testing themes
     */
    public function showSample(Request $request, $themeId)
    {
        // Create sample wedding data for testing
        $sampleWedding = [
            'id' => 1,
            'slug' => 'sample-wedding',
            'title' => 'Sample Wedding Invitation',
            'groom_name' => 'John',
            'bride_name' => 'Jane',
            'groom_photo' => '/api/placeholder/300/300?text=John',
            'bride_photo' => '/api/placeholder/300/300?text=Jane',
            'groom_instagram' => 'john_doe',
            'bride_instagram' => 'jane_smith',
            'groom_father_name' => 'Robert Doe',
            'groom_mother_name' => 'Mary Doe',
            'bride_father_name' => 'David Smith',
            'bride_mother_name' => 'Sarah Smith',
            'wedding_quotes' => 'Two souls, one heart. Two hearts, one soul. Together forever.',
            'cover_title' => 'Undangan Pernikahan',
            'cover_photo' => '/api/placeholder/1200/800?text=Wedding+Cover',
            'reception_date' => '2024-12-25',
            'reception_time' => '18:00',
            'reception_place_name' => 'Grand Ballroom Hotel',
            'reception_location' => 'Jl. Sudirman No. 123, Jakarta',
            'reception_latitude' => -6.2088,
            'reception_longitude' => 106.8456,
            'ceremony_date' => '2024-12-25',
            'ceremony_time' => '14:00',
            'ceremony_place_name' => 'St. Mary Church',
            'ceremony_location' => 'Jl. Thamrin No. 456, Jakarta',
            'ceremony_latitude' => -6.1944,
            'ceremony_longitude' => 106.8229,
            'youtube_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'wedding_music' => '/audio/sample-wedding-song.mp3',
            'galleries' => [
                [
                    'id' => 1,
                    'filename' => '/api/placeholder/400/600?text=Gallery+1',
                    'alt_text' => 'Pre-wedding photo 1',
                    'order' => 1,
                ],
                [
                    'id' => 2,
                    'filename' => '/api/placeholder/600/400?text=Gallery+2',
                    'alt_text' => 'Pre-wedding photo 2',
                    'order' => 2,
                ],
                [
                    'id' => 3,
                    'filename' => '/api/placeholder/500/500?text=Gallery+3',
                    'alt_text' => 'Pre-wedding photo 3',
                    'order' => 3,
                ],
            ],
            'comments' => [
                [
                    'id' => 1,
                    'name' => 'Alice Johnson',
                    'comment' => 'Congratulations on your special day! Wishing you both a lifetime of happiness and love.',
                    'created_at' => '2024-01-15T10:30:00Z',
                    'is_present' => true,
                    'guest_count' => 2,
                ],
                [
                    'id' => 2,
                    'name' => 'Bob Wilson',
                    'comment' => 'So happy for you both! Can\'t wait to celebrate with you.',
                    'created_at' => '2024-01-15T14:20:00Z',
                    'is_present' => true,
                    'guest_count' => 1,
                ],
            ],
            'is_countdown_enabled' => true,
            'is_music_enabled' => true,
            'is_donation_enabled' => true,
            'is_show_comment' => true,
            'is_show_reception' => true,
            'is_show_ceremony' => true,
            'is_navigation_enabled' => true,
            'is_enable_photo' => true,
            'is_enable_maps' => true,
            'show_covid_protocol' => true,
            'covid_protocol_text' => '<p>Please follow health protocols during the event:</p><ul><li>Wear masks at all times</li><li>Maintain social distancing</li><li>Wash hands frequently</li></ul>',
            'donation_type' => 'modal',
            'default_wallet' => 'bank',
            'max_rsvp' => 5,
            'name_position' => 'male',
            'date_format' => 'd F Y',
            'timezone' => 'WIB',
            'section_couple' => 'The Happy Couple',
            'section_location' => 'Wedding Location',
            'section_gallery' => 'Our Gallery',
            'section_donation' => 'Wedding Gift',
            'section_guestbook' => 'Guest Book',
            'section_countdown' => 'Countdown to Our Wedding',
            'section_navigate_to' => 'Get Directions',
            'popup_title' => 'Wedding Invitation',
            'popup_for' => 'Dear',
            'popup_footer' => 'You are cordially invited to celebrate our special day with us.',
            'popup_button' => 'Open Invitation',
            'popup_photo' => '/api/placeholder/200/200?text=Invitation',
            'livestream_title' => 'Live Streaming',
            'livestream_description' => 'Join us virtually for our wedding ceremony',
            'livestream_button' => 'Watch Live',
            'information_title' => 'Health Protocol',
            'section_guestbook_title' => 'Leave a Message',
            'section_guestbook_name' => 'Your Name',
            'section_guestbook_content' => 'Your Message',
            'section_guestbook_present' => 'Will Attend',
            'section_guestbook_no_present' => 'Cannot Attend',
            'section_guestbook_person' => 'Person(s)',
            'section_guestbook_send_button' => 'Send Message',
            'section_guestbook_button' => 'Leave a Message',
            'section_donation_sub' => 'Your presence is the greatest gift, but if you wish to give something more, we would be honored to receive your blessing.',
            'section_countdown_days' => 'Days',
            'section_countdown_hours' => 'Hours',
            'section_countdown_minutes' => 'Minutes',
            'section_countdown_seconds' => 'Seconds',
            'reception_type' => 'Wedding Reception',
            'ceremony_type' => 'Wedding Ceremony',
            'reception_start_time' => '18:00',
            'reception_end_time' => '22:00',
            'ceremony_start_time' => '14:00',
            'ceremony_end_time' => '16:00',
            'reception_timezone' => 'WIB',
            'ceremony_timezone' => 'WIB',
            'is_show_date_cover' => true,
            'is_invitation_enabled' => true,
            'is_navbar_enabled' => true,
            'is_show_optional_one' => false,
            'is_show_optional_two' => false,
            'optional_one_type' => null,
            'optional_one_place_name' => null,
            'optional_one_location' => null,
            'optional_one_date' => null,
            'optional_one_start_time' => null,
            'optional_one_end_time' => null,
            'optional_one_timezone' => null,
            'optional_two_type' => null,
            'optional_two_place_name' => null,
            'optional_two_location' => null,
            'optional_two_date' => null,
            'optional_two_start_time' => null,
            'optional_two_end_time' => null,
            'optional_two_timezone' => null,
            'information_type' => 'covid_protocol',
        ];

        // Create sample invitation data
        $sampleInvitation = [
            'name' => 'Guest Name',
            'is_vip' => false,
            'session' => [
                'session_name' => 'Evening Session',
                'start_time' => '18:00',
                'end_time' => '22:00',
            ],
        ];

        return Inertia::render('Wedding/InvitationPage', [
            'wedding' => $sampleWedding,
            'invitation' => $sampleInvitation,
            'themeId' => $themeId,
            'isPreview' => true,
        ]);
    }

    /**
     * Display wedding invitation with theme
     */
    public function show(Request $request, $slug)
    {
        $wedding = Wedding::where('slug', $slug)
            ->with(['galleries', 'comments', 'user', 'theme'])
            ->firstOrFail();

        // Get invitation if provided
        $invitation = null;
        if ($request->has('invitation_id')) {
            $invitation = Invitation::where('id', $request->invitation_id)
                ->where('wedding_id', $wedding->id)
                ->with('session')
                ->first();
        }

        // Get theme ID from wedding or default to autumn
        $themeId = $wedding->theme?->slug ?? 'autumn';

        // Transform wedding data for frontend
        $weddingData = $this->transformWeddingData($wedding);

        // Transform invitation data if exists
        $invitationData = $this->transformInvitationData($invitation);

        return Inertia::render('Wedding/InvitationPage', [
            'wedding' => $weddingData,
            'invitation' => $invitationData,
            'themeId' => $themeId,
            'isPreview' => $request->has('preview'),
        ]);
    }

    /**
     * Handle RSVP submission
     */
    public function submitRSVP(Request $request)
    {
        $request->validate([
            'wedding_id' => 'required|exists:weddings,id',
            'name' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
            'is_present' => 'boolean',
            'guest_count' => 'integer|min:1|max:10',
        ]);

        // Create or update comment
        $comment = \App\Models\Comment::create([
            'wedding_id' => $request->wedding_id,
            'name' => $request->name,
            'comment' => $request->comment,
            'is_present' => $request->is_present ?? true,
            'guest_count' => $request->guest_count ?? 1,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'RSVP submitted successfully',
            'comment' => $comment,
        ]);
    }

    /**
     * Handle comment submission
     */
    public function submitComment(Request $request)
    {
        $request->validate([
            'wedding_id' => 'required|exists:weddings,id',
            'name' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
        ]);

        $comment = \App\Models\Comment::create([
            'wedding_id' => $request->wedding_id,
            'name' => $request->name,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Comment submitted successfully',
            'comment' => $comment,
        ]);
    }

    /**
     * Transform wedding data for frontend
     */
    private function transformWeddingData($wedding)
    {
        return [
            'id' => $wedding->id,
            'slug' => $wedding->slug,
            'title' => $wedding->title,
            'groom_name' => $wedding->groom_name,
            'bride_name' => $wedding->bride_name,
            'groom_photo' => $wedding->groom_photo,
            'bride_photo' => $wedding->bride_photo,
            'groom_instagram' => $wedding->groom_instagram,
            'bride_instagram' => $wedding->bride_instagram,
            'groom_father_name' => $wedding->groom_father_name,
            'groom_mother_name' => $wedding->groom_mother_name,
            'bride_father_name' => $wedding->bride_father_name,
            'bride_mother_name' => $wedding->bride_mother_name,
            'wedding_quotes' => $wedding->wedding_quotes,
            'cover_title' => $wedding->cover_title,
            'cover_photo' => $wedding->cover_photo,
            'reception_date' => $wedding->reception_date?->format('Y-m-d'),
            'reception_time' => $wedding->reception_time,
            'reception_place_name' => $wedding->reception_place_name,
            'reception_location' => $wedding->reception_location,
            'reception_latitude' => $wedding->reception_latitude,
            'reception_longitude' => $wedding->reception_longitude,
            'ceremony_date' => $wedding->ceremony_date?->format('Y-m-d'),
            'ceremony_time' => $wedding->ceremony_time,
            'ceremony_place_name' => $wedding->ceremony_place_name,
            'ceremony_location' => $wedding->ceremony_location,
            'ceremony_latitude' => $wedding->ceremony_latitude,
            'ceremony_longitude' => $wedding->ceremony_longitude,
            'youtube_url' => $wedding->youtube_url,
            'wedding_music' => $wedding->wedding_music,
            'galleries' => $wedding->galleries->map(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'filename' => $gallery->filename,
                    'alt_text' => $gallery->alt_text,
                    'order' => $gallery->order,
                ];
            }),
            'comments' => $wedding->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'name' => $comment->name,
                    'comment' => $comment->comment,
                    'created_at' => $comment->created_at->toISOString(),
                    'is_present' => $comment->is_present,
                    'guest_count' => $comment->guest_count,
                ];
            }),
            'is_countdown_enabled' => $wedding->is_countdown_enabled,
            'is_music_enabled' => $wedding->is_music_enabled,
            'is_donation_enabled' => $wedding->is_donation_enabled,
            'is_show_comment' => $wedding->is_show_comment,
            'is_show_reception' => $wedding->is_show_reception,
            'is_show_ceremony' => $wedding->is_show_ceremony,
            'is_navigation_enabled' => $wedding->is_navigation_enabled,
            'is_enable_photo' => $wedding->is_enable_photo,
            'is_enable_maps' => $wedding->is_enable_maps,
            'show_covid_protocol' => $wedding->show_covid_protocol,
            'covid_protocol_text' => $wedding->covid_protocol_text,
            'donation_type' => $wedding->donation_type,
            'default_wallet' => $wedding->default_wallet,
            'max_rsvp' => $wedding->max_rsvp,
            'name_position' => $wedding->name_position,
            'date_format' => $wedding->date_format,
            'timezone' => $wedding->timezone,
            'section_couple' => $wedding->section_couple,
            'section_location' => $wedding->section_location,
            'section_gallery' => $wedding->section_gallery,
            'section_donation' => $wedding->section_donation,
            'section_guestbook' => $wedding->section_guestbook,
            'section_countdown' => $wedding->section_countdown,
            'section_navigate_to' => $wedding->section_navigate_to,
            'popup_title' => $wedding->popup_title,
            'popup_for' => $wedding->popup_for,
            'popup_footer' => $wedding->popup_footer,
            'popup_button' => $wedding->popup_button,
            'popup_photo' => $wedding->popup_photo,
            'livestream_title' => $wedding->livestream_title,
            'livestream_description' => $wedding->livestream_description,
            'livestream_button' => $wedding->livestream_button,
            'information_title' => $wedding->information_title,
            'section_guestbook_title' => $wedding->section_guestbook_title,
            'section_guestbook_name' => $wedding->section_guestbook_name,
            'section_guestbook_content' => $wedding->section_guestbook_content,
            'section_guestbook_present' => $wedding->section_guestbook_present,
            'section_guestbook_no_present' => $wedding->section_guestbook_no_present,
            'section_guestbook_person' => $wedding->section_guestbook_person,
            'section_guestbook_send_button' => $wedding->section_guestbook_send_button,
            'section_guestbook_button' => $wedding->section_guestbook_button,
            'section_donation_sub' => $wedding->section_donation_sub,
            'section_countdown_days' => $wedding->section_countdown_days,
            'section_countdown_hours' => $wedding->section_countdown_hours,
            'section_countdown_minutes' => $wedding->section_countdown_minutes,
            'section_countdown_seconds' => $wedding->section_countdown_seconds,
            'reception_type' => $wedding->reception_type,
            'ceremony_type' => $wedding->ceremony_type,
            'reception_start_time' => $wedding->reception_start_time,
            'reception_end_time' => $wedding->reception_end_time,
            'ceremony_start_time' => $wedding->ceremony_start_time,
            'ceremony_end_time' => $wedding->ceremony_end_time,
            'reception_timezone' => $wedding->reception_timezone,
            'ceremony_timezone' => $wedding->ceremony_timezone,
            'is_show_date_cover' => $wedding->is_show_date_cover,
            'is_invitation_enabled' => $wedding->is_invitation_enabled,
            'is_navbar_enabled' => $wedding->is_navbar_enabled,
            'is_show_optional_one' => $wedding->is_show_optional_one,
            'is_show_optional_two' => $wedding->is_show_optional_two,
            'optional_one_type' => $wedding->optional_one_type,
            'optional_one_place_name' => $wedding->optional_one_place_name,
            'optional_one_location' => $wedding->optional_one_location,
            'optional_one_date' => $wedding->optional_one_date?->format('Y-m-d'),
            'optional_one_start_time' => $wedding->optional_one_start_time,
            'optional_one_end_time' => $wedding->optional_one_end_time,
            'optional_one_timezone' => $wedding->optional_one_timezone,
            'optional_two_type' => $wedding->optional_two_type,
            'optional_two_place_name' => $wedding->optional_two_place_name,
            'optional_two_location' => $wedding->optional_two_location,
            'optional_two_date' => $wedding->optional_two_date?->format('Y-m-d'),
            'optional_two_start_time' => $wedding->optional_two_start_time,
            'optional_two_end_time' => $wedding->optional_two_end_time,
            'optional_two_timezone' => $wedding->optional_two_timezone,
            'information_type' => $wedding->information_type,
        ];
    }

    /**
     * Transform invitation data for frontend
     */
    private function transformInvitationData($invitation)
    {
        if (!$invitation) {
            return null;
        }

        return [
            'name' => $invitation->name,
            'is_vip' => $invitation->is_vip,
            'session' => $invitation->session ? [
                'session_name' => $invitation->session->session_name,
                'start_time' => $invitation->session->start_time,
                'end_time' => $invitation->session->end_time,
            ] : null,
        ];
    }
}
