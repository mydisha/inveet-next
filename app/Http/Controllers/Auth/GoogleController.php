<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Check if user already exists
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // User exists, check if they have socialite_id
                if (!$user->socialite_id) {
                    // Update existing user with Google info
                    $user->update([
                        'socialite_id' => $googleUser->getId(),
                        'socialite_name' => $googleUser->getName(),
                        'socialite_avatar' => $googleUser->getAvatar(),
                    ]);
                }
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make(Str::random(16)), // Random password for social login
                    'socialite_id' => $googleUser->getId(),
                    'socialite_name' => $googleUser->getName(),
                    'socialite_avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => now(), // Google accounts are pre-verified
                    'is_active' => true,
                ]);

                // Assign default role if needed
                if (method_exists($user, 'assignRole')) {
                    $user->assignRole('user');
                }
            }

            // Login the user
            Auth::login($user);

            return redirect()->intended('/dashboard')->with('success', 'Welcome to Inveet! You have been logged in successfully.');

        } catch (\Exception $e) {
            return redirect('/login')->withErrors([
                'email' => 'Google authentication failed. Please try again.',
            ]);
        }
    }
}
