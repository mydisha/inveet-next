# 🚀 Frontend-Backend Integration Guide

## Overview

Your Inveet wedding invitation application now has a **fully integrated frontend and backend**! The React frontend communicates seamlessly with your existing Laravel API backend.

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Inertia.js    │    │   Laravel API   │
│   (Frontend)    │◄──►│   (Bridge)      │◄──►│   (Backend)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 **File Structure**

```
resources/js/
├── routes.tsx              # Frontend route definitions
├── services/
│   └── api.ts             # API service layer
├── config/
│   └── env.ts             # Frontend configuration
├── pages/                  # React page components
│   ├── landing.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── forgot-password.tsx
│   ├── dashboard.tsx
│   └── onboarding/
│       ├── index.tsx
│       ├── couple-info.tsx
│       ├── wedding-details.tsx
│       ├── custom-url.tsx
│       ├── design-selection.tsx
│       └── activation.tsx
└── components/ui/          # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...

app/Http/Controllers/
└── FrontendController.php  # Serves React pages

routes/
├── web.php                 # Frontend routes
├── api.php                 # Backend API routes
└── auth.php                # Authentication routes
```

## 🔗 **How Routing Works**

### **Frontend Routes** (React)
- **Landing Page**: `/` → `Landing.tsx`
- **Login**: `/login` → `Login.tsx`
- **Dashboard**: `/dashboard` → `Dashboard.tsx`
- **Onboarding**: `/onboarding/*` → Various onboarding steps

### **Backend API Routes** (Laravel)
- **Authentication**: `/api/login`, `/api/register`, `/api/logout`
- **Weddings**: `/api/weddings/*`
- **Packages**: `/api/packages/*`
- **Orders**: `/api/orders/*`
- **Invitations**: `/api/invitations/*`

### **Integration Flow**
1. User visits `/dashboard`
2. Laravel `FrontendController@dashboard` renders React component
3. React component uses `ApiService` to fetch data from `/api/user/weddings`
4. Data is displayed in the React component

## 🛠️ **Key Components**

### **1. Routes Configuration** (`routes.tsx`)
```typescript
export const routes = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  // ... more routes
};

export const apiEndpoints = {
  auth: {
    login: '/api/login',
    register: '/api/register',
    // ... more endpoints
  },
  // ... more API sections
};
```

### **2. API Service Layer** (`services/api.ts`)
```typescript
export class ApiService {
  static async login(credentials) {
    const response = await api.post(apiEndpoints.auth.login, credentials);
    return response.data;
  }
  
  static async createWedding(weddingData) {
    const response = await api.post(apiEndpoints.weddings.store, weddingData);
    return response.data;
  }
  // ... more methods
}
```

### **3. Frontend Controller** (`FrontendController.php`)
```php
public function dashboard(Request $request)
{
    $user = $request->user();
    
    return Inertia::render('Dashboard', [
        'user' => $user ? [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'hasWedding' => $user->weddings()->exists(),
        ] : null,
    ]);
}
```

## 🔄 **Data Flow Examples**

### **Creating a Wedding**
1. User fills out onboarding forms
2. React component calls `ApiService.createWedding(data)`
3. Request goes to `/api/weddings` (Laravel API)
4. Laravel creates wedding and returns response
5. React component receives confirmation and redirects

### **Fetching User's Weddings**
1. User visits dashboard
2. Laravel renders `Dashboard` component with initial data
3. React component calls `ApiService.getUserWeddings()`
4. Request goes to `/api/user/weddings` (Laravel API)
5. Laravel returns user's weddings
6. React component displays the data

## 🎨 **UI Integration**

### **Wedding Theme Colors**
- **Rose Gold**: Primary brand color
- **Soft Pink**: Secondary accent
- **Cream**: Background tones
- **Sage**: Nature-inspired accents
- **Lavender**: Subtle purple tones
- **Peach**: Warm orange tones

### **Responsive Design**
- Mobile-first approach
- Tailwind CSS for styling
- shadcn/ui components for consistency
- Beautiful animations and transitions

## 🚀 **Running the Application**

### **1. Start Both Servers**
```bash
make dev
```

### **2. Access Points**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001
- **Landing Page**: http://localhost:5173/
- **Dashboard**: http://localhost:5173/dashboard

### **3. Test Integration**
1. Visit the landing page
2. Try the login form
3. Go through the onboarding flow
4. Check that data is being saved to your database

## 🔧 **Customization**

### **Adding New API Endpoints**
1. Add to `routes/api.php` (Laravel)
2. Add to `apiEndpoints` in `routes.tsx`
3. Add method to `ApiService` class
4. Use in React components

### **Adding New Frontend Pages**
1. Create React component in `pages/`
2. Add route to `routes/web.php`
3. Add method to `FrontendController`
4. Update navigation as needed

### **Modifying API Responses**
1. Update Laravel controllers/services
2. React components automatically receive new data
3. No frontend changes needed for data structure updates

## 🧪 **Testing the Integration**

### **API Health Check**
```bash
curl http://localhost:8001/api/health
```

### **Frontend-Backend Communication**
1. Open browser dev tools
2. Go to Network tab
3. Navigate through the app
4. Verify API calls are being made

### **Database Integration**
1. Check that onboarding data is saved
2. Verify user authentication works
3. Confirm wedding creation flow

## 🎯 **Benefits of This Integration**

✅ **Seamless Communication**: Frontend and backend work together perfectly
✅ **Existing API**: Uses your already-developed Laravel API
✅ **Type Safety**: TypeScript interfaces for all API calls
✅ **Error Handling**: Centralized error handling and user feedback
✅ **Authentication**: Laravel Sanctum integration
✅ **Real-time Updates**: Can easily add WebSocket support later
✅ **Scalable**: Easy to add new features and endpoints

## 🚨 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**: Check Laravel CORS configuration
2. **Authentication Issues**: Verify Sanctum setup
3. **Route Not Found**: Check both Laravel and React routes
4. **API Errors**: Check Laravel logs and API responses

### **Debug Commands**
```bash
# Check Laravel routes
php artisan route:list

# Check frontend build
npm run build

# Check API health
curl http://localhost:8001/api/health

# View Laravel logs
tail -f storage/logs/laravel.log
```

## 🎉 **What's Working Now**

✅ **Complete Frontend**: All pages and components
✅ **Backend Integration**: Full API communication
✅ **Authentication Flow**: Login, register, password reset
✅ **Onboarding System**: 5-step wedding creation process
✅ **Database Integration**: Data persistence
✅ **Responsive Design**: Mobile and desktop optimized
✅ **Beautiful UI**: Wedding-themed design system

Your Inveet wedding invitation platform is now a **fully functional, integrated application**! 🎊💍
