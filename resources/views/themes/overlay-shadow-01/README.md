# Overlay Shadow 01 Theme

A beautiful and elegant wedding invitation theme inspired by the Luxee "Overlay Shadow 01" design.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Countdown Timer**: Interactive countdown to the wedding date
- **RSVP Form**: Built-in RSVP form for guest responses
- **Digital Envelope**: Digital gift/cashless payment section
- **Gallery Section**: Photo gallery with hover effects
- **Social Media Integration**: Social media links for the couple
- **Smooth Animations**: CSS animations and transitions
- **Modern Typography**: Beautiful typography using Google Fonts
- **Gradient Backgrounds**: Elegant gradient color schemes

## Design Elements

### Color Palette
- Primary: `#667eea` (Blue gradient)
- Secondary: `#764ba2` (Purple gradient)
- Accent: `#ffd700` (Gold)
- Highlight: `#ff6b6b` (Coral)
- Background: `#ffffff` (White)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body Text**: Inter (Sans-serif)

### Sections
1. **Hero Section**: Full-screen background with couple names
2. **Quote Section**: Islamic verse (QS Ar-rum 21)
3. **Couple Section**: Bride and groom information with photos
4. **Countdown Section**: Timer to wedding date
5. **Event Section**: Wedding ceremony and reception details
6. **Gallery Section**: Photo gallery with quotes
7. **RSVP Section**: Guest response form
8. **Digital Envelope**: Bank account information
9. **Footer**: Family information and acknowledgments

## Usage

### Template Variables
The theme expects the following wedding data:

```php
$wedding = [
    'title' => 'Wedding Title',
    'groom_name' => 'Groom Name',
    'bride_name' => 'Bride Name',
    'groom_father_name' => 'Groom Father',
    'groom_mother_name' => 'Groom Mother',
    'bride_father_name' => 'Bride Father',
    'bride_mother_name' => 'Bride Mother',
    'akad_date' => '2024-12-12',
    'akad_time' => '08.00 AM',
    'akad_location' => 'Ceremony Location',
    'reception_date' => '2024-12-13',
    'reception_time' => '02.00 - 05.00 PM',
    'reception_location' => 'Reception Location',
];
```

### Route Usage
```php
Route::get('/invitation/{slug}', [FrontendController::class, 'showWeddingInvitation']);
```

### Controller Method
```php
public function showWeddingInvitation(Request $request, $slug)
{
    $wedding = Wedding::where('slug', $slug)->first();
    return view('themes.overlay-shadow-01.index', compact('wedding'));
}
```

## Assets

The theme includes the following assets:
- `hero-bg.jpg`: Hero section background image
- `bride.jpg`: Bride's photo
- `groom.jpg`: Groom's photo
- `gallery-1.jpg` to `gallery-4.jpg`: Gallery images
- `og-image.jpg`: Open Graph image for social sharing

## Customization

### Colors
Modify the CSS custom properties in the `<style>` section to change colors:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
    --highlight-color: #ff6b6b;
}
```

### Fonts
Change fonts by updating the Google Fonts import and CSS font-family declarations.

### Layout
The theme uses CSS Grid and Flexbox for responsive layouts. Modify the grid templates and flex properties to adjust spacing and layout.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Optimized images with proper sizing
- CSS animations use transform and opacity for better performance
- Lazy loading for gallery images (can be implemented)
- Minimal JavaScript for enhanced functionality

## SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card meta tags
- Proper heading hierarchy
- Alt text for images
- Canonical URLs

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- Semantic HTML elements

## License

This theme is part of the Inveet wedding invitation platform.
