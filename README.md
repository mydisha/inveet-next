# Inveet - Digital Wedding Invitation Platform

A beautiful, modern, and elegant digital wedding invitation platform built with Laravel, React, and Tailwind CSS. Create stunning wedding invitations that your guests will love.

## ✨ Features

### 🎨 Beautiful Design
- **Soft, Elegant Color Palette**: Rose gold, soft pink, cream, sage, lavender, and peach tones
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Mobile-First Design**: Responsive design that works perfectly on all devices
- **Wedding-Themed Elements**: Floating animations, sparkle effects, and elegant gradients

### 🚀 Core Functionality
- **Landing Page**: Beautiful marketing page with features showcase
- **User Authentication**: Secure login/signup with Google OAuth support
- **Dashboard**: User-friendly dashboard with wedding invitation management
- **Onboarding Flow**: Step-by-step invitation creation process

### 📱 Onboarding Steps
1. **Couple Information**: Names, nicknames, Instagram handles, parent names, photos, love story
2. **Wedding Details**: Venue, location, date/time with Indonesian timezone support (WIB, WITA, WIT)
3. **Custom URL**: Choose your unique invitation link (xxxx.inveet.id)
4. **Design Selection**: Pick from beautiful templates with customizable features
5. **Activation**: Final setup with feedback collection

### 🎯 Design Features
- **Template Variety**: Traditional, Modern, Romantic, Vintage, Tropical, Rustic styles
- **Customizable Elements**: Toggle couple photos, countdown, RSVP, gallery, love story, etc.
- **Photo Management**: Upload and manage couple photos, individual photos, and couple shots
- **Event Management**: Support for multiple events (Akad, Resepsi, Unduh Mantu, etc.)

## 🛠️ Technology Stack

### Backend
- **Laravel 11**: PHP framework for robust backend development
- **SQLite**: Lightweight database for development
- **Inertia.js**: Seamless SPA experience without API complexity

### Frontend
- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Lucide React**: Consistent icon library

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint + Prettier**: Code quality and formatting
- **Pest**: PHP testing framework

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inveet-next
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build assets**
   ```bash
   npm run build
   ```

7. **Start development server**
   ```bash
   php artisan serve
   npm run dev
   ```

## 📁 Project Structure

```
inveet-next/
├── app/                    # Laravel application logic
│   ├── Http/             # Controllers, Middleware, Requests
│   ├── Models/           # Eloquent models
│   ├── Services/         # Business logic services
│   └── Repositories/     # Data access layer
├── resources/
│   ├── js/              # React components and pages
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── ui/          # shadcn/ui components
│   └── css/             # Tailwind CSS and custom styles
├── routes/               # Application routes
└── database/             # Migrations and seeders
```

## 🎨 Design System

### Color Palette
- **Rose Gold**: Primary brand color (#D4A574)
- **Soft Pink**: Secondary accent (#F2E8E8)
- **Cream**: Background tones (#FAF9F6)
- **Sage**: Nature-inspired accents (#E1E8E1)
- **Lavender**: Subtle purple tones (#E6E6FA)
- **Peach**: Warm orange tones (#FFCBA4)
- **Mint**: Fresh green accents (#E8F5E8)
- **Gold**: Premium accents (#CC9933)

### Typography
- **Primary Font**: Instrument Sans (elegant, readable)
- **Fallback**: System UI fonts for consistency

### Components
- **Cards**: Clean, shadow-based design with rounded corners
- **Buttons**: Multiple variants with hover effects
- **Forms**: Consistent input styling with focus states
- **Navigation**: Intuitive breadcrumbs and progress indicators

## 📱 Pages & Components

### Landing Page (`/`)
- Hero section with call-to-action
- Features showcase
- How it works guide
- Social proof and testimonials

### Authentication
- **Login** (`/login`): Sign in with email or Google
- **Forgot Password** (`/forgot-password`): Password reset flow

### Dashboard (`/dashboard`)
- Welcome message
- Quick stats overview
- Onboarding call-to-action
- Wedding invitation management

### Onboarding Flow
- **Overview** (`/onboarding`): Step-by-step progress
- **Couple Info** (`/onboarding/couple-info`): Personal details and photos
- **Wedding Details** (`/onboarding/wedding-details`): Venue and event information
- **Custom URL** (`/onboarding/custom-url`): Unique invitation link
- **Design Selection** (`/onboarding/design-selection`): Template and feature choices
- **Activation** (`/onboarding/activation`): Final setup and launch

## 🔧 Customization

### Adding New Design Templates
1. Add template data to the designs array in `design-selection.tsx`
2. Include preview images and feature descriptions
3. Update category and styling options

### Modifying Color Scheme
1. Update CSS variables in `resources/css/app.css`
2. Modify Tailwind color classes throughout components
3. Ensure consistency across all UI elements

### Adding New Features
1. Extend the onboarding flow with new steps
2. Update progress tracking and navigation
3. Add corresponding form components and validation

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run with Pest
./vendor/bin/pest

# Run specific test file
./vendor/bin/pest tests/Feature/DashboardTest.php
```

## 📦 Deployment

### Production Build
```bash
npm run build
npm run build:ssr
```

### Environment Variables
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://yourdomain.com`
- Database credentials
- OAuth provider keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **Laravel** for robust backend framework
- **React** for modern frontend development

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Made with ❤️ for couples creating their perfect wedding invitations**
