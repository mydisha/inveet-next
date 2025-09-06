# Wedding Invitation Themes

A modern, maintainable system for wedding invitation templates built with React, TypeScript, and Tailwind CSS.

## Overview

This system replaces the old Bootstrap/jQuery-based templates with modern React components that are:
- **Maintainable**: Clean, well-structured code with TypeScript
- **Customizable**: Easy to create new themes with consistent structure
- **Responsive**: Mobile-first design with modern CSS
- **Performant**: Optimized for fast loading and smooth animations
- **Accessible**: Built with accessibility best practices

## Structure

```
invitation-themes/
├── components/
│   └── BaseComponents.tsx    # Reusable components for all themes
├── themes/
│   ├── autumn.ts            # Autumn theme configuration
│   ├── AutumnTheme.tsx      # Autumn theme implementation
│   ├── classy-flower.ts     # Classy Flower theme configuration
│   ├── ClassyFlowerTheme.tsx # Classy Flower theme implementation
│   ├── classy-gold-blue.ts  # Classy Gold Blue theme configuration
│   └── dark-flower.ts       # Dark Flower theme configuration
├── types.ts                 # TypeScript type definitions
├── ThemeRegistry.tsx        # Theme management and routing
├── index.ts                 # Main exports
└── README.md               # This file
```

## Available Themes

### 1. Autumn Elegance
- **Colors**: Warm browns and golds (#C07D37, #8B4513, #DAA520)
- **Fonts**: Satisfy (headings), Poppins (body)
- **Style**: Classic, warm, sophisticated
- **Best for**: Traditional weddings, autumn ceremonies

### 2. Classy Flower
- **Colors**: Soft pastels (#A6C5B6, #8B7D6B, #D4AF37)
- **Fonts**: Merienda (headings), Montserrat (body)
- **Style**: Romantic, floral, elegant
- **Best for**: Garden weddings, romantic ceremonies

### 3. Classy Gold Blue
- **Colors**: Navy blue and gold (#1E3A8A, #D97706, #F59E0B)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Style**: Luxurious, sophisticated, modern
- **Best for**: Formal weddings, luxury ceremonies

### 4. Dark Flower
- **Colors**: Purple and pink (#7C3AED, #EC4899, #F59E0B)
- **Fonts**: Crimson Text (headings), Source Sans Pro (body)
- **Style**: Mysterious, elegant, modern
- **Best for**: Evening weddings, unique ceremonies

## Components

### Base Components
All themes use these reusable components:

- **MusicPlayer**: Floating music control
- **Countdown**: Wedding countdown timer
- **LocationCard**: Venue information with maps
- **CoupleInfo**: Bride and groom information
- **Gallery**: Photo gallery with lightbox
- **Guestbook**: RSVP and comments system
- **Donation**: Gift/donation section

### Theme Structure
Each theme follows this structure:

1. **Cover Section**: Hero image with couple names
2. **Quote Section**: Optional wedding quotes
3. **Couple Section**: Bride and groom photos and info
4. **Countdown Section**: Optional countdown timer
5. **Location Section**: Venue details with maps
6. **Gallery Section**: Photo gallery
7. **Donation Section**: Gift/donation options
8. **Guestbook Section**: RSVP and comments
9. **Footer**: Thank you message

## Usage

### Basic Usage
```tsx
import { ThemeRegistry } from './invitation-themes';

<ThemeRegistry
  themeId="autumn"
  wedding={weddingData}
  invitation={invitationData}
  onOpenInvitation={handleOpenInvitation}
  onMusicToggle={handleMusicToggle}
  onRSVPSubmit={handleRSVPSubmit}
  onCommentSubmit={handleCommentSubmit}
  onDonationClick={handleDonationClick}
  isPreview={false}
/>
```

### Creating a New Theme

1. **Create theme configuration** (`themes/my-theme.ts`):
```typescript
export const myTheme: ThemeConfig = {
  id: 'my-theme',
  name: 'My Theme',
  description: 'A beautiful theme',
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    background: '#FFFFFF',
    text: '#2C3E50',
    textLight: '#6C757D'
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Open Sans, sans-serif',
    script: 'Dancing Script, cursive'
  },
  // ... other config
};
```

2. **Create theme styles** (`themes/my-theme.ts`):
```typescript
export const myThemeStyles = `
  .my-theme {
    --primary-color: #FF6B6B;
    // ... CSS custom properties
  }

  .my-theme .btn-primary {
    background: var(--primary-color);
    // ... styles
  }
`;
```

3. **Create theme component** (`themes/MyTheme.tsx`):
```tsx
import React from 'react';
import { InvitationThemeProps } from '../types';
import { myTheme, myThemeStyles } from './my-theme';
import { BaseComponents } from '../components/BaseComponents';

const MyTheme: React.FC<InvitationThemeProps> = (props) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: myThemeStyles }} />
      <div className="my-theme">
        {/* Theme implementation */}
      </div>
    </>
  );
};

export default MyTheme;
```

4. **Register theme** in `ThemeRegistry.tsx`:
```typescript
import MyTheme from './themes/MyTheme';
import { myTheme } from './themes/my-theme';

const themeComponents = {
  // ... existing themes
  'my-theme': MyTheme,
};

const themeConfigs = {
  // ... existing configs
  'my-theme': myTheme,
};
```

## Data Structure

### Wedding Data
```typescript
interface WeddingData {
  id: number;
  slug: string;
  title: string;
  groom_name: string;
  bride_name: string;
  // ... see types.ts for complete interface
}
```

### Invitation Data
```typescript
interface InvitationData {
  name: string;
  is_vip?: boolean;
  session?: {
    session_name: string;
    start_time: string;
    end_time: string;
  };
}
```

## API Integration

The system integrates with Laravel backend through:

- **GET** `/invitation/{slug}` - Display invitation
- **POST** `/api/weddings/rsvp` - Submit RSVP
- **POST** `/api/weddings/comments` - Submit comment

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Performance
- Lazy loading for images
- Optimized animations
- Minimal bundle size
- Fast rendering

### Customization
- CSS custom properties for easy theming
- Modular component structure
- Configurable layouts
- Extensible architecture

## Migration from Old Templates

The new system replaces these old templates:
- `resources/js/convert/autumn/`
- `resources/js/convert/classy_flower/`
- `resources/js/convert/classy_gold_blue/`
- `resources/js/convert/dark_flower/`

### Benefits of Migration
1. **Maintainability**: Clean, typed code
2. **Performance**: Faster loading and rendering
3. **Consistency**: Unified component structure
4. **Extensibility**: Easy to add new themes
5. **Modern UX**: Better user experience

## Development

### Prerequisites
- Node.js 18+
- React 18+
- TypeScript 4+
- Tailwind CSS 3+

### Setup
1. Install dependencies: `npm install`
2. Build assets: `npm run build`
3. Start development: `npm run dev`

### Testing
- Run tests: `npm test`
- Type checking: `npm run type-check`
- Linting: `npm run lint`

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Write responsive, accessible components
4. Test on multiple devices and browsers
5. Document new features and themes

## License

This project is part of the Inveet wedding invitation platform.
