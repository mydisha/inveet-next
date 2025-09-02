# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Inveet application.

## Prerequisites

1. A Google Cloud Platform account
2. Laravel Socialite package (already installed)
3. Access to your application's environment configuration

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type
   - Add your application's domain to "Authorized JavaScript origins":
     - `http://localhost:8000` (for local development)
     - `https://yourdomain.com` (for production)
   - Add your callback URL to "Authorized redirect URIs":
     - `http://localhost:8000/auth/google/callback` (for local development)
     - `https://yourdomain.com/auth/google/callback` (for production)
5. Copy the Client ID and Client Secret

## Step 2: Configure Environment Variables

Add the following variables to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

**Note:** For production, update the `GOOGLE_REDIRECT_URI` to use your actual domain.

## Step 3: Verify Configuration

The application is already configured with:

- ✅ Laravel Socialite package installed
- ✅ Google OAuth routes configured (`/auth/google` and `/auth/google/callback`)
- ✅ Google OAuth controller created
- ✅ Frontend integration with Google sign-in buttons
- ✅ User model updated to support social authentication

## Step 4: Test the Integration

1. Start your Laravel development server:
   ```bash
   php artisan serve
   ```

2. Visit `/login` or `/register` page
3. Click the "Continue with Google" button
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to your application

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Ensure the redirect URI in Google Console matches exactly with your `.env` file
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found" error**
   - Verify your `GOOGLE_CLIENT_ID` is correct in the `.env` file
   - Ensure the Google+ API is enabled in your Google Cloud project

3. **"Redirect URI mismatch" error**
   - Double-check the authorized redirect URIs in Google Console
   - Make sure the callback URL in your `.env` matches exactly

### Debug Mode

If you encounter issues, enable debug mode in your `.env` file:

```env
APP_DEBUG=true
```

This will provide more detailed error messages to help diagnose problems.

## Security Considerations

1. **Never commit your OAuth credentials to version control**
2. **Use environment variables for all sensitive configuration**
3. **Implement proper CSRF protection** (already included with Laravel)
4. **Consider implementing rate limiting** for OAuth endpoints
5. **Validate and sanitize all user data** received from Google

## Production Deployment

When deploying to production:

1. Update the `GOOGLE_REDIRECT_URI` to use HTTPS
2. Ensure your domain is added to authorized origins in Google Console
3. Consider using a more restrictive OAuth consent screen
4. Monitor OAuth usage and implement logging if needed

## Additional Features

The current implementation includes:

- ✅ Google OAuth login and registration
- ✅ Automatic user creation for new Google users
- ✅ Linking existing accounts with Google OAuth
- ✅ Password reset functionality
- ✅ Form validation and error handling
- ✅ Responsive design with modern UI components

## Support

If you encounter any issues or need assistance:

1. Check the Laravel Socialite documentation
2. Review the Google OAuth 2.0 documentation
3. Check your application logs for detailed error messages
4. Ensure all required packages are properly installed and configured
