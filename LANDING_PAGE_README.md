# Landing Page Implementation

## Overview
This document describes the implementation of a modern, responsive landing page for the Inveet wedding platform, built using Laravel, Inertia.js, and React.

## Features Implemented

### 1. Header Component
- Fixed navigation with backdrop blur effect
- Responsive mobile menu
- Logo with gradient styling
- Navigation links and CTA buttons
- Mobile-friendly hamburger menu

### 2. Hero Section
- Full-screen hero with gradient background
- Animated geometric shapes
- Compelling headline in Indonesian
- Call-to-action buttons
- Statistics display (10K+ couples, 50K+ invitations, 4.9 rating)
- Phone mockup placeholder

### 3. Services Section
- 8 service cards with icons and descriptions
- Featured services highlighting
- Gradient backgrounds for visual appeal
- Hover effects and animations
- Bottom CTA section

### 4. Invitation Showcase
- Gallery of invitation designs
- Category filtering system
- Popular badges for featured designs
- Hover overlays with action buttons
- Responsive grid layout

### 5. Step-by-Step Process
- 4-step process explanation
- Visual step indicators
- Feature lists for each step
- Right-side visual card with stats
- Animated elements

### 6. Pricing Section
- 3 pricing tiers (Starter, Pro, Premium)
- Feature comparisons
- Popular plan highlighting
- CTA buttons for each tier
- Custom plan option

### 7. About Section
- Company statistics
- Team member profiles
- Company story and mission
- Visual elements and animations

### 8. Call-to-Action (CTA)
- Gradient background with floating elements
- Compelling headline
- Feature benefits list
- Trust indicators
- Multiple CTA buttons

### 9. Footer
- Comprehensive link organization
- Company information
- Social media links
- Contact details
- Legal links

## Technical Implementation

### Components Created
- `Header.tsx` - Navigation component
- `Hero.tsx` - Hero section
- `Services.tsx` - Services showcase
- `InvitationShowcase.tsx` - Design gallery
- `StepByStep.tsx` - Process explanation
- `Pricing.tsx` - Pricing plans
- `About.tsx` - Company information
- `CTA.tsx` - Call-to-action section
- `Footer.tsx` - Footer component

### UI Components
- `Button.tsx` - Reusable button component
- `Label.tsx` - Form label component
- `Input.tsx` - Input field component
- `Badge.tsx` - Badge component
- `Card.tsx` - Card components
- `Select.tsx` - Select dropdown component

### Styling
- Tailwind CSS with custom color variables
- Wedding-themed color palette
- Responsive design for all screen sizes
- Smooth animations and transitions
- Custom CSS classes for specific effects

### Integration
- Laravel backend with Inertia.js
- React frontend components
- Vite build system
- TypeScript support
- Responsive design

## File Structure
```
resources/js/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Header.tsx    # Navigation header
│   ├── Hero.tsx      # Hero section
│   ├── Services.tsx  # Services showcase
│   ├── InvitationShowcase.tsx
│   ├── StepByStep.tsx
│   ├── Pricing.tsx   # Pricing plans
│   ├── About.tsx     # Company info
│   ├── CTA.tsx       # Call-to-action
│   └── Footer.tsx    # Footer
├── pages/
│   └── Landing.tsx   # Main landing page
└── lib/
    └── utils.ts      # Utility functions
```

## Usage

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Access
The landing page is accessible at the root URL (`/`) and is handled by the `FrontendController::landing()` method.

## Customization

### Colors
The landing page uses a custom wedding-themed color palette defined in `resources/css/app.css`:
- Primary colors with glow effects
- Warm accent colors
- Background gradients
- Custom utility classes

### Content
All text content is in Indonesian and can be easily modified in the component files.

### Images
The components use placeholder images from Unsplash. Replace these with actual wedding invitation designs and company photos.

## Browser Support
- Modern browsers with ES6+ support
- Responsive design for mobile, tablet, and desktop
- Progressive enhancement approach

## Performance
- Optimized component structure
- Lazy loading for images
- Efficient CSS animations
- Minimal JavaScript bundle size

## Future Enhancements
- Add real wedding invitation templates
- Implement contact form functionality
- Add testimonials section
- Integrate with backend services
- Add analytics tracking
- Implement A/B testing capabilities
