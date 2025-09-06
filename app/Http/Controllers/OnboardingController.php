<?php

namespace App\Http\Controllers;

use App\Services\WeddingOnboardingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OnboardingController extends BaseController
{
    protected WeddingOnboardingService $weddingOnboardingService;

    public function __construct(WeddingOnboardingService $weddingOnboardingService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->weddingOnboardingService = $weddingOnboardingService;
    }
    /**
     * Show the onboarding overview
     */
    public function index(Request $request)
    {
        $this->ensureFreshCsrfToken($request);

        return $this->renderWithUser('onboarding/index', [
            'currentStep' => 1,
        ], $request);
    }

    /**
     * Show the couple info step
     */
    public function coupleInfo(Request $request)
    {
        $user = $request->user();
        $wedding = $user->weddings()->first();
        $weddingDetails = [];

        if ($wedding) {
            $weddingDetails = $this->weddingOnboardingService->getWeddingDetails($wedding->id);
        }

        return $this->renderWithUser('onboarding/couple-info', [
            'weddingDetails' => $weddingDetails,
            'hasWedding' => $wedding !== null,
        ], $request);
    }

    /**
     * Store couple information
     */
    public function storeCoupleInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'groom_name' => 'required|string|max:255',
            'bride_name' => 'required|string|max:255',
            'groom_nickname' => 'nullable|string|max:255',
            'bride_nickname' => 'nullable|string|max:255',
            'groom_instagram' => 'nullable|string|max:255',
            'bride_instagram' => 'nullable|string|max:255',
            'groom_father_name' => 'nullable|string|max:255',
            'groom_mother_name' => 'nullable|string|max:255',
            'bride_father_name' => 'nullable|string|max:255',
            'bride_mother_name' => 'nullable|string|max:255',
            'groom_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'bride_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $user = $request->user();

            // Handle couple information
            $wedding = $this->weddingOnboardingService->handleCoupleInfo(
                $user->id,
                $request->only([
                    'groom_name', 'groom_nickname', 'groom_instagram',
                    'groom_father_name', 'groom_mother_name',
                    'bride_name', 'bride_nickname', 'bride_instagram',
                    'bride_father_name', 'bride_mother_name'
                ]),
                $request->file('groom_photo'),
                $request->file('bride_photo')
            );

            return redirect()->route('onboarding.wedding-location')
                ->with('success', 'Couple information saved successfully!');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to save couple information. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Show the wedding location step
     */
    public function weddingLocation(Request $request)
    {
        return $this->renderWithUser('onboarding/wedding-location', [], $request);
    }

    /**
     * Show the design selection step
     */
    public function designSelection(Request $request)
    {
        return $this->renderWithUser('design-selection', [], $request);
    }

    /**
     * Show the wedding URL step
     */
    public function weddingUrl(Request $request)
    {
        return $this->renderWithUser('onboarding/wedding-url', [], $request);
    }

    /**
     * Show the design configuration page
     */
    public function designConfiguration(Request $request, $id)
    {
        // Mock wedding data for now - in real app, fetch from database
        $wedding = (object) [
            'id' => $id,
            'title' => 'Sample Wedding',
            'slug' => 'sample-wedding',
            'cover_image' => null,
            'theme_id' => null,
            'color_palette' => null,
        ];

        return $this->renderWithUser('weddings/design-configuration', [
            'wedding' => $wedding,
        ], $request);
    }

    /**
     * Show the activation step
     */
    public function activation()
    {
        return Inertia::render('Onboarding/Activation');
    }
}
