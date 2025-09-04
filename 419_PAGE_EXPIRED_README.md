# 419 Page Expired Error Page

## Overview
This document describes the 419 Page Expired error page implementation for the Inveet wedding invitation platform.

## Features
- **Design System Compliance**: Follows the established design system with consistent colors, typography, and animations
- **Responsive Design**: Works perfectly on all device sizes
- **User-Friendly**: Clear messaging and helpful actions for users
- **Security Information**: Explains why the session expired for better user understanding
- **Multiple Actions**: Provides refresh, home, and back navigation options

## Implementation

### Files Created/Modified
1. **Component**: `resources/js/pages/PageExpired.tsx`
2. **Controller**: Added `pageExpired()` method to `app/Http/Controllers/FrontendController.php`
3. **Route**: Added `/419` route in `routes/web.php`
4. **Routes Config**: Added `pageExpired: '/419'` to `resources/js/routes.tsx`

### Usage

#### Direct Access
Users can access the 419 page directly via:
```
http://your-domain.com/419
```

#### Programmatic Redirect
In your application code, you can redirect users to the 419 page:
```php
return redirect()->route('page.expired');
```

#### JavaScript/React
```javascript
import { router } from '@inertiajs/react';
router.visit('/419');
```

### Design System Elements Used

#### Colors
- **Primary**: `hsl(var(--primary))` - Main brand blue (#165d99)
- **Primary Glow**: `hsl(var(--primary-glow))` - Lighter blue for gradients
- **Accent**: `hsl(var(--accent))` - Warm yellow/gold
- **Background**: `hsl(var(--background))` - Clean white/light gray

#### Typography
- **Font Family**: Inter (system font stack)
- **Headings**: Bold, large sizes with proper hierarchy
- **Body Text**: Readable sizes with good contrast

#### Animations
- **Floating Shapes**: Subtle background animations
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Gentle animations for better UX

#### Components
- **Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Icons**: Lucide React icons with consistent styling

### Customization

#### Changing Messages
Edit the props in `FrontendController.php`:
```php
return Inertia::render('PageExpired', [
    'status' => 419,
    'message' => 'Your custom message here'
]);
```

#### Modifying Actions
Update the action buttons in `PageExpired.tsx`:
```tsx
// Add new action button
<Link
  href="/custom-action"
  className="group inline-flex items-center px-8 py-4..."
>
  <CustomIcon className="w-5 h-5 mr-2" />
  Custom Action
</Link>
```

#### Styling Changes
The component uses Tailwind CSS classes that follow the design system. Modify classes in `PageExpired.tsx` to change:
- Colors: Use CSS custom properties from `app.css`
- Spacing: Adjust padding/margin classes
- Animations: Modify animation classes

### Testing

#### Manual Testing
1. Visit `http://localhost:8000/419` directly
2. Verify the page loads correctly
3. Test all action buttons
4. Check responsive design on different screen sizes

#### Automated Testing
```php
// In your test file
public function test_419_page_loads()
{
    $response = $this->get('/419');
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) =>
        $page->component('PageExpired')
             ->has('status', 419)
             ->has('message', 'Sesi Anda telah berakhir')
    );
}
```

### Error Handling
The 419 page is designed to handle:
- CSRF token expiration
- Session timeout
- Security-related page expiration
- General "page expired" scenarios

### Accessibility
- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: Meets WCAG guidelines
- **Focus Management**: Clear focus indicators

### Performance
- **Optimized Animations**: Uses `will-change` and `transform3d` for smooth performance
- **Lazy Loading**: Images and heavy components load efficiently
- **Minimal Bundle**: Only includes necessary dependencies

## Maintenance

### Regular Updates
- Review and update error messages periodically
- Test with new browser versions
- Update dependencies as needed
- Monitor user feedback for improvements

### Monitoring
- Track 419 page visits in analytics
- Monitor user actions after visiting the page
- Check for any JavaScript errors
- Verify mobile performance

## Support
For issues or questions regarding the 419 page implementation, please refer to the main project documentation or contact the development team.
