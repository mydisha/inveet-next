<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends BaseController
{
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
        return $this->renderWithUser('onboarding/couple-info', [], $request);
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
