# Design Settings Feature

This document describes the new design settings feature added to the wedding invitation design configuration page.

## Overview

The design settings feature allows customers to customize various aspects of their wedding invitation themes, including fonts, text colors, and button colors. This provides more flexibility and personalization options for couples.

## Features

### 1. Font Customization
- **Button Font**: Choose the font family for all buttons in the invitation
- **Section Heading Font**: Select the font for section headings and titles
- **Section Body Font**: Pick the font for body text and descriptions

### 2. Text Color Customization
- **Primary Text Color**: Main text color for headings and important content
- **Secondary Text Color**: Secondary text color for descriptions and subheadings
- **Tertiary Text Color**: Tertiary text color for additional details and fine print

### 3. Button Color Customization
- **Primary Button Color**: Background color for primary action buttons
- **Secondary Button Color**: Background color for secondary buttons
- **Button Text Color**: Text color for all buttons

### 4. Additional Features
- **Live Preview**: Real-time preview of how changes will look
- **Mobile-Friendly Color Picker**: Easy-to-use color picker optimized for mobile devices
- **Font Preview**: See how different fonts will look with sample text
- **Custom CSS**: Advanced users can add custom CSS for further customization

## Components

### ColorPicker Component
Located at: `resources/js/components/ui/color-picker.tsx`

Features:
- Native HTML5 color input
- Text input for hex color codes
- Preset color palette
- Mobile-optimized interface
- Real-time validation

### FontPicker Component
Located at: `resources/js/components/ui/font-picker.tsx`

Features:
- Organized font categories (Serif, Sans Serif, Script, Display)
- Live font preview
- Google Fonts integration
- Responsive design

### FontLoader Component
Located at: `resources/js/components/ui/font-loader.tsx`

Features:
- Dynamic Google Fonts loading
- Prevents duplicate font loading
- Optimized for performance

## Usage

### Accessing Design Settings
1. Navigate to the wedding design configuration page
2. Click on the "Design Settings" tab
3. Customize fonts, colors, and other settings
4. Use the preview sections to see changes in real-time
5. Save your configuration

### Mobile Optimization
- Color pickers use native HTML5 color inputs for better mobile experience
- Touch-friendly interface with appropriate sizing
- Responsive grid layouts that adapt to screen size
- Optimized popover positioning for mobile devices

## Technical Implementation

### State Management
The design customization state is managed using React's `useState` hook:

```typescript
const [designCustomization, setDesignCustomization] = useState<DesignCustomization>({
  buttonFont: 'Source Sans Pro',
  sectionHeadingFont: 'Playfair Display',
  sectionBodyFont: 'Source Sans Pro',
  primaryTextColor: '#2C3E50',
  secondaryTextColor: '#7F8C8D',
  tertiaryTextColor: '#95A5A6',
  buttonPrimaryColor: '#2C3E50',
  buttonSecondaryColor: '#E8F4FD',
  buttonTextColor: '#FFFFFF',
  customCSS: ''
});
```

### Type Definitions
New types are defined in `resources/js/invitation-themes/types.ts`:

- `DesignCustomization`: Interface for design customization options
- Extended `ThemeConfig` interface with new color and font properties

### Integration with Themes
The design settings integrate with the existing theme system by:
- Extending the `ThemeConfig` interface
- Providing fallback values for theme compatibility
- Supporting both predefined themes and custom settings

## Future Enhancements

Potential future improvements could include:
- More font options and categories
- Advanced color palette suggestions
- Theme-specific customization presets
- Export/import of design settings
- Collaborative editing features
- A/B testing for design variations

## Browser Support

The design settings feature supports:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Fonts are loaded dynamically to avoid unnecessary requests
- Color picker uses native HTML5 inputs for better performance
- Preview updates are optimized to prevent excessive re-renders
- Custom CSS is validated before application
