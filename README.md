# Inveet - Digital Wedding Invitation Platform

A comprehensive, modern digital wedding invitation platform built with Laravel 11, React 18, and Tailwind CSS. Create stunning, personalized wedding invitations with advanced features like guest management, RSVP tracking, and payment integration.

## ✨ Key Features

### 🎨 Design & Customization
- **100+ Premium Templates**: Traditional, Modern, Romantic, Vintage, Tropical, and Rustic styles
- **Fully Customizable**: Toggle features like countdown, RSVP, gallery, love story, and music
- **Mobile-First Design**: Responsive design optimized for all devices
- **Elegant Color Palette**: Rose gold, soft pink, cream, sage, lavender, and peach tones
- **Photo Management**: Upload and manage couple photos, individual photos, and couple shots

### 🚀 Core Functionality
- **User Authentication**: Secure login/signup with Google OAuth support
- **Role-Based Access Control**: Admin, customer, and reseller roles with Spatie Laravel Permission
- **Wedding Management**: Create, edit, publish, and manage multiple weddings
- **Onboarding Flow**: Step-by-step invitation creation process
- **Dashboard**: Comprehensive management interface with analytics

### 📱 Onboarding Process
1. **Couple Information**: Names, nicknames, Instagram handles, parent names, photos, love story
2. **Wedding Details**: Venue, location, date/time with Indonesian timezone support (WIB, WITA, WIT)
3. **Custom URL**: Choose your unique invitation link (xxxx.inveet.id)
4. **Design Selection**: Pick from beautiful templates with customizable features
5. **Activation**: Final setup with feedback collection

### 💰 Business Features
- **Package Management**: Multiple pricing tiers with discount system
- **Order Processing**: Complete order management with payment integration
- **Coupon System**: Discount codes and promotional offers
- **Payment Integration**: Multiple payment methods and virtual accounts
- **Wallet System**: Digital wallet for transactions and withdrawals
- **Reseller Program**: Multi-level reseller management system

### 🎵 Advanced Features
- **Background Music**: Upload custom music or choose from library
- **Guest Management**: Import/export guest lists with RSVP tracking
- **Analytics**: View count tracking and guest engagement metrics
- **Special Invitations**: VIP invitations with password protection
- **QR Code Integration**: Easy sharing and tracking
- **Activity Logging**: Comprehensive audit trail for all actions

## 🛠️ Technology Stack

### Backend
- **Laravel 11**: PHP framework with latest features
- **SQLite**: Lightweight database for development (easily switchable to MySQL/PostgreSQL)
- **Inertia.js**: Seamless SPA experience without API complexity
- **Laravel Sanctum**: API authentication
- **Spatie Laravel Permission**: Role and permission management
- **Laravel Socialite**: OAuth authentication

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 3**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Radix UI**: Headless UI primitives
- **Lucide React**: Consistent icon library
- **React Dropzone**: File upload handling
- **React Easy Crop**: Image cropping functionality

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint + Prettier**: Code quality and formatting
- **Pest**: Modern PHP testing framework
- **Laravel Pint**: Code style fixer
- **Concurrently**: Run multiple development servers

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inveet-next
   ```

2. **Install dependencies**
   ```bash
   # Install PHP dependencies
   composer install

   # Install Node.js dependencies
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Start development servers**
   ```bash
   # Option 1: Use the Makefile (recommended)
   make dev

   # Option 2: Manual start
   php artisan serve    # Backend on http://localhost:8000
   npm run dev         # Frontend on http://localhost:5173
   ```

### Using the Makefile

The project includes a comprehensive Makefile for easy development:

```bash
# Development
make dev          # Run both frontend and backend
make frontend     # Run only frontend
make backend      # Run only backend

# Setup
make install      # Install all dependencies
make setup        # Complete initial setup
make migrate      # Run database migrations
make seed         # Seed the database

# Testing
make test         # Run PHP tests
make test-pest    # Run tests with Pest

# Build
make build        # Build for production
make build-ssr    # Build with SSR support

# Maintenance
make clean        # Clean cache and temporary files
make logs         # Show Laravel logs
make status       # Show running processes
```

## 📁 Project Structure

```
inveet-next/
├── app/
│   ├── Console/Commands/          # Artisan commands
│   ├── Events/                    # Event classes
│   ├── Http/
│   │   ├── Controllers/           # API and web controllers
│   │   ├── Middleware/            # Custom middleware
│   │   └── Requests/              # Form request validation
│   ├── Jobs/                      # Queue jobs
│   ├── Listeners/                 # Event listeners
│   ├── Models/                    # Eloquent models
│   │   ├── User.php              # User model with roles
│   │   ├── Wedding.php           # Wedding management
│   │   ├── Order.php             # Order processing
│   │   ├── Package.php           # Package management
│   │   ├── Theme.php             # Template themes
│   │   └── SpecialInvitation.php # VIP invitations
│   ├── Repositories/              # Data access layer
│   ├── Services/                  # Business logic services
│   └── Traits/                    # Reusable traits
├── database/
│   ├── migrations/                # Database migrations
│   ├── seeders/                   # Database seeders
│   └── factories/                 # Model factories
├── resources/
│   ├── js/
│   │   ├── components/            # React components
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── Header.tsx        # Navigation
│   │   │   ├── Footer.tsx        # Footer
│   │   │   └── About.tsx         # About section
│   │   ├── pages/                # Page components
│   │   │   ├── onboarding/       # Onboarding flow
│   │   │   └── dashboard/        # Dashboard pages
│   │   └── app.tsx               # Main app component
│   └── css/
│       └── app.css               # Tailwind CSS and custom styles
├── routes/
│   ├── web.php                   # Web routes
│   ├── api.php                   # API routes
│   ├── auth.php                  # Authentication routes
│   └── backoffice.php            # Admin routes
├── public/
│   └── themes/                   # Theme assets
├── storage/
│   └── app/                      # File storage
├── tests/                        # Test files
├── Makefile                      # Development commands
├── package.json                  # Node.js dependencies
├── composer.json                 # PHP dependencies
├── vite.config.ts               # Vite configuration
└── tailwind.config.ts           # Tailwind configuration
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

## 📱 Key Pages & Features

### Landing Page (`/`)
- Hero section with compelling call-to-action
- Features showcase with interactive elements
- Step-by-step process explanation
- Pricing plans comparison
- Social proof and testimonials

### Authentication System
- **Login** (`/login`): Email/password and Google OAuth
- **Registration** (`/register`): User signup with validation
- **Forgot Password** (`/forgot-password`): Password reset flow
- **Email Verification**: Secure account activation

### Dashboard (`/dashboard`)
- Welcome message with user stats
- Wedding invitation management
- Quick actions and shortcuts
- Recent activity feed
- Onboarding progress tracking

### Onboarding Flow
- **Overview** (`/onboarding`): Step-by-step progress indicator
- **Couple Info** (`/onboarding/couple-info`): Personal details and photos
- **Wedding Details** (`/onboarding/wedding-details`): Venue and event information
- **Custom URL** (`/onboarding/custom-url`): Unique invitation link selection
- **Design Selection** (`/onboarding/design-selection`): Template and feature choices
- **Activation** (`/onboarding/activation`): Final setup and launch

### Admin Panel (`/backoffice`)
- User management with role assignment
- Wedding invitation oversight
- Order and payment management
- Theme and package management
- Analytics and reporting

## 🔧 Development

### Code Quality
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run PHP code style fixer
./vendor/bin/pint

# Run tests
make test
```

### Database Management
```bash
# Create new migration
php artisan make:migration create_table_name

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

### Adding New Features
1. Create model, migration, and factory
2. Implement repository and service layers
3. Add controller with proper validation
4. Create React components
5. Add routes and middleware
6. Write tests
7. Update documentation

## 🧪 Testing

```bash
# Run all tests
make test

# Run specific test file
./vendor/bin/pest tests/Feature/DashboardTest.php

# Run tests with coverage
./vendor/bin/pest --coverage
```

## 📦 Deployment

### Production Build
```bash
# Build frontend assets
npm run build

# Build with SSR support
npm run build:ssr

# Optimize for production
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Run the test suite (`make test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Laravel** for the robust PHP framework
- **React** for the modern frontend library
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful component library
- **Spatie** for excellent Laravel packages
- **Inertia.js** for seamless SPA experience

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Made with ❤️ for couples creating their perfect wedding invitations**
