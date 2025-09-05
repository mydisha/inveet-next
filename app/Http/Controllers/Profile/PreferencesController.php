<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PreferencesController extends Controller
{
    /**
     * Show the user preferences page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Preferences', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update user preferences.
     */
    public function update(Request $request)
    {
        $request->validate([
            'language' => ['required', 'string', Rule::in(['en', 'id', 'ms'])],
            'theme' => ['required', 'string', Rule::in(['light', 'dark', 'system'])],
            'email_notifications' => ['boolean'],
            'marketing_emails' => ['boolean'],
        ]);

        $user = $request->user();
        $user->update($request->only([
            'language',
            'theme',
            'email_notifications',
            'marketing_emails',
        ]));

        return redirect()->back()->with('success', 'Preferences updated successfully');
    }
}
