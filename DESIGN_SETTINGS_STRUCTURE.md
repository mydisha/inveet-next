# Design Settings Structure

## Design Configuration Page Tabs

```
Design Configuration
├── Cover Image Tab
├── Design Template Tab
├── Color Palette Tab
└── Design Settings Tab (NEW)
    ├── Font Settings
    │   ├── Button Font Picker
    │   ├── Section Heading Font Picker
    │   └── Section Body Font Picker
    ├── Text Colors
    │   ├── Primary Text Color Picker
    │   ├── Secondary Text Color Picker
    │   └── Tertiary Text Color Picker
    ├── Button Colors
    │   ├── Primary Button Color Picker
    │   ├── Secondary Button Color Picker
    │   ├── Button Text Color Picker
    │   └── Button Preview
    ├── Text Preview
    │   ├── Heading Preview
    │   ├── Body Text Preview
    │   └── Tertiary Text Preview
    └── Custom CSS
        └── CSS Textarea
```

## Component Architecture

```
Design Configuration Page
├── ColorPicker Component
│   ├── Native HTML5 Color Input
│   ├── Text Input for Hex Codes
│   ├── Preset Color Palette
│   └── Mobile-Optimized Interface
├── FontPicker Component
│   ├── Font Categories (Serif, Sans Serif, Script, Display)
│   ├── Live Font Preview
│   ├── Google Fonts Integration
│   └── Responsive Design
├── FontLoader Component
│   ├── Dynamic Google Fonts Loading
│   ├── Duplicate Prevention
│   └── Performance Optimization
└── Design Customization State
    ├── Font Settings
    ├── Text Colors
    ├── Button Colors
    └── Custom CSS
```

## Data Flow

```
User Interaction
    ↓
Component State Update
    ↓
Real-time Preview Update
    ↓
Font Loading (if needed)
    ↓
Save Configuration
    ↓
Apply to Theme
```

## Mobile Optimization Features

- **Touch-Friendly Interface**: Large touch targets for mobile devices
- **Native Color Picker**: Uses HTML5 color input for better mobile experience
- **Responsive Grid**: Adapts to different screen sizes
- **Optimized Popovers**: Proper positioning for mobile viewports
- **Font Loading**: Efficient font loading to prevent performance issues
