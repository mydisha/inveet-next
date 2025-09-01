# App Name Configuration

This document explains how the app name is now configurable throughout the application instead of being hardcoded as "WeddingPro".

## Overview

The application now uses environment variables to dynamically set the app name, making it easy to rebrand or customize the application for different use cases.

## Configuration

### Environment Variables

The app name is controlled by the following environment variables:

- `APP_NAME` - Used by Laravel backend (defaults to "Laravel")
- `VITE_APP_NAME` - Used by the frontend React components (defaults to "WeddingPro")

### Setting the App Name

1. **For Development**: Update your `.env` file:
   ```bash
   APP_NAME=YourAppName
   VITE_APP_NAME=YourAppName
   ```

2. **For Production**: Set the environment variables in your deployment environment:
   ```bash
   export APP_NAME=YourAppName
   export VITE_APP_NAME=YourAppName
   ```

## Updated Components

The following components now use the configurable app name:

### Main Application Components
- `resources/js/components/Header.tsx` - Logo and branding
- `resources/js/components/Footer.tsx` - Footer branding and copyright
- `resources/js/app.tsx` - Page titles

### Landing Page Components
- `cobalt-canvas-landing-main/src/components/Header.tsx` - Landing page header
- `cobalt-canvas-landing-main/src/components/Footer.tsx` - Landing page footer
- `cobalt-canvas-landing-main/src/components/About.tsx` - About section
- `cobalt-canvas-landing-main/src/components/StepByStep.tsx` - Step-by-step guide
- `cobalt-canvas-landing-main/src/components/CTA.tsx` - Call-to-action section

## Static File Updates

### HTML Meta Tags

The `index.html` file in the landing page contains static meta tags that need to be updated during the build process. A script has been created to handle this:

```bash
npm run update-app-name
```

This script updates:
- Page title
- Meta author tag
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Email addresses

### Usage

```bash
# Update with default app name (WeddingPro)
npm run update-app-name

# Update with custom app name
VITE_APP_NAME=MyCustomApp npm run update-app-name
```

## Implementation Details

### Frontend Implementation

Each component that displays the app name now uses:

```typescript
const appName = (import.meta as any).env.VITE_APP_NAME || 'WeddingPro';
```

This pattern:
1. Reads the `VITE_APP_NAME` environment variable
2. Falls back to "WeddingPro" if not set
3. Uses TypeScript type assertion to avoid compilation errors

### Email Addresses

Email addresses are dynamically generated using the app name:

```typescript
// Example: hello@weddingpro.id
`hello@${appName.toLowerCase()}.id`
```

### URL Generation

URLs are also dynamically generated:

```typescript
// Example: https://weddingpro.id
`https://${appName.toLowerCase()}.id`
```

## Benefits

1. **Easy Rebranding**: Change the app name without touching code
2. **Multi-tenant Support**: Different app names for different deployments
3. **Consistent Branding**: All components use the same app name
4. **Environment-specific**: Different names for dev, staging, and production

## Migration Guide

If you're updating from a hardcoded app name:

1. Set the environment variables in your `.env` file
2. Run the update script: `npm run update-app-name`
3. Restart your development server
4. Verify that all components display the correct app name

## Troubleshooting

### App Name Not Updating

1. Check that `VITE_APP_NAME` is set in your environment
2. Restart the development server after changing environment variables
3. Clear browser cache if testing in browser

### TypeScript Errors

If you see TypeScript errors about `import.meta.env`, the type assertion `(import.meta as any).env` is used to bypass this issue.

### Static Files Not Updated

Run the update script manually:
```bash
VITE_APP_NAME=YourAppName npm run update-app-name
```

## Future Enhancements

Consider adding:
- Support for app logos/images
- Color scheme configuration
- Domain name configuration
- Multi-language support for app names
