# Backoffice Feature Implementation

This document outlines the comprehensive backoffice feature that has been implemented for managing users and the entire application.

## Overview

The backoffice feature provides a complete administrative interface for managing:
- Users and their roles
- Orders and payments
- User feedbacks
- Wedding themes
- Website configurations

## Features Implemented

### 1. User Management
- **List Users**: View all registered users with search, filtering, and pagination
- **User Details**: View detailed user information including roles, weddings, and orders
- **Edit Users**: Update user information and roles
- **Auto Login**: Generate temporary login tokens for admin to login as any user
- **Activate/Deactivate**: Toggle user account status
- **Statistics**: View user statistics and metrics

### 2. Order Management
- **List Orders**: View all orders with comprehensive filtering options
- **Order Details**: View detailed order information
- **Status Management**: Mark orders as paid, void, or update status
- **Search & Filter**: Search by invoice number, customer, or transaction ID
- **Date Range Filter**: Filter orders by date range
- **Payment Type Filter**: Filter by payment method
- **Statistics**: View order statistics and revenue metrics

### 3. Feedback Management
- **List Feedbacks**: View all user feedbacks with filtering
- **Score Filtering**: Filter by rating (1-5 stars)
- **Recommendation Management**: Toggle feedback recommendations
- **Landing Page Display**: Control which feedbacks show on landing page
- **Search**: Search feedback content and user information
- **Statistics**: View feedback statistics and score distribution

### 4. Theme Management
- **List Themes**: View all wedding themes with filtering
- **Create Themes**: Add new themes with preview image upload
- **Edit Themes**: Update theme information and settings
- **Status Management**: Activate/deactivate themes
- **Visibility Control**: Make themes public or private
- **Package Association**: Link themes to packages
- **Image Upload**: Upload theme preview images
- **Statistics**: View theme usage statistics

### 5. Website Configuration
- **Configuration Management**: Manage all website settings
- **Group Organization**: Organize settings by groups (General, SEO, Social, Maintenance)
- **Type Support**: Support for string, integer, boolean, array, and JSON types
- **Bulk Updates**: Update multiple configurations at once
- **Default Initialization**: Initialize default configurations
- **Public/Private Settings**: Control which settings are public
- **Real-time Editing**: Edit configurations inline

## Technical Implementation

### Backend Structure

#### Models
- `Feedback.php` - User feedback model
- `WebsiteConfiguration.php` - Website settings model

#### Controllers
- `Backoffice/UserController.php` - User management
- `Backoffice/OrderController.php` - Order management
- `Backoffice/FeedbackController.php` - Feedback management
- `Backoffice/ThemeController.php` - Theme management
- `Backoffice/ConfigurationController.php` - Configuration management

#### Middleware
- `BackofficeAccess.php` - Ensures only admin/super-admin can access

#### Routes
- `routes/backoffice.php` - All backoffice API routes
- Added to `routes/web.php` - Frontend routes

### Frontend Structure

#### Pages
- `pages/backoffice/Dashboard.tsx` - Main dashboard
- `pages/backoffice/Users.tsx` - User management
- `pages/backoffice/Orders.tsx` - Order management
- `pages/backoffice/Feedbacks.tsx` - Feedback management
- `pages/backoffice/Themes.tsx` - Theme management
- `pages/backoffice/Configurations.tsx` - Configuration management

#### Components
- `components/backoffice/BackofficeLayout.tsx` - Main layout component

### Security Features

1. **Role-based Access Control**: Only users with 'admin' or 'super-admin' roles can access
2. **Middleware Protection**: All routes protected with backoffice middleware
3. **CSRF Protection**: All forms protected with CSRF tokens
4. **Input Validation**: Comprehensive validation on all inputs
5. **File Upload Security**: Secure image upload handling

### Database

#### New Tables
- `website_configurations` - Stores website settings
- Uses existing `feedbacks` table

#### Migrations
- `2025_09_04_065102_create_website_configurations_table.php`

## Usage

### Accessing the Backoffice

1. Login with an admin or super-admin account
2. Navigate to `/backoffice`
3. Use the sidebar to navigate between different sections

### Key Features

#### User Management
- Search users by name, email, or phone
- Filter by role or status
- Auto-login as any user for support
- View user statistics and activity

#### Order Management
- Comprehensive filtering and search
- Mark orders as paid or void
- View payment details and customer information
- Track revenue and order statistics

#### Theme Management
- Upload and manage theme preview images
- Control theme visibility and status
- Associate themes with packages
- Track theme usage statistics

#### Configuration Management
- Organize settings by groups
- Support for different data types
- Initialize default configurations
- Control public/private settings

## API Endpoints

### Users
- `GET /backoffice/users` - List users
- `GET /backoffice/users/{id}` - Get user details
- `PUT /backoffice/users/{id}` - Update user
- `POST /backoffice/users/{id}/auto-login` - Generate auto-login token
- `POST /backoffice/users/{id}/activate` - Activate user
- `POST /backoffice/users/{id}/deactivate` - Deactivate user
- `GET /backoffice/users/statistics` - Get user statistics

### Orders
- `GET /backoffice/orders` - List orders
- `GET /backoffice/orders/{id}` - Get order details
- `PUT /backoffice/orders/{id}` - Update order
- `POST /backoffice/orders/{id}/mark-paid` - Mark as paid
- `POST /backoffice/orders/{id}/mark-void` - Mark as void
- `GET /backoffice/orders/statistics` - Get order statistics

### Feedbacks
- `GET /backoffice/feedbacks` - List feedbacks
- `GET /backoffice/feedbacks/{id}` - Get feedback details
- `PUT /backoffice/feedbacks/{id}` - Update feedback
- `POST /backoffice/feedbacks/{id}/toggle-recommendation` - Toggle recommendation
- `POST /backoffice/feedbacks/{id}/toggle-show-landing` - Toggle show on landing
- `DELETE /backoffice/feedbacks/{id}` - Delete feedback
- `GET /backoffice/feedbacks/statistics` - Get feedback statistics

### Themes
- `GET /backoffice/themes` - List themes
- `POST /backoffice/themes` - Create theme
- `GET /backoffice/themes/{id}` - Get theme details
- `PUT /backoffice/themes/{id}` - Update theme
- `POST /backoffice/themes/{id}/toggle-active` - Toggle active status
- `POST /backoffice/themes/{id}/toggle-public` - Toggle public status
- `DELETE /backoffice/themes/{id}` - Delete theme
- `GET /backoffice/themes/statistics` - Get theme statistics

### Configurations
- `GET /backoffice/configurations` - List configurations
- `POST /backoffice/configurations` - Create configuration
- `GET /backoffice/configurations/{id}` - Get configuration details
- `PUT /backoffice/configurations/{id}` - Update configuration
- `POST /backoffice/configurations/update-multiple` - Update multiple configurations
- `DELETE /backoffice/configurations/{id}` - Delete configuration
- `GET /backoffice/configurations/groups` - Get configuration groups
- `GET /backoffice/configurations/group/{group}` - Get configurations by group
- `GET /backoffice/configurations/website-settings` - Get website settings
- `POST /backoffice/configurations/initialize-defaults` - Initialize default configurations

## Additional Suggestions

Based on the requirements, here are additional features that could be added:

1. **Analytics Dashboard**: More detailed analytics and reporting
2. **Email Templates**: Manage email templates for notifications
3. **Content Management**: Manage static pages and content
4. **Log Management**: View application logs and errors
5. **Backup Management**: Database backup and restore functionality
6. **API Key Management**: Manage API keys and integrations
7. **Notification Management**: Send notifications to users
8. **Audit Logs**: Track all administrative actions
9. **Bulk Operations**: Bulk actions for users, orders, etc.
10. **Export/Import**: Export and import data functionality

## Conclusion

The backoffice feature provides a comprehensive administrative interface that meets all the specified requirements. It includes user management with auto-login functionality, order management with filtering, feedback management, theme management with upload capabilities, and website configuration management. The implementation follows Laravel best practices and includes proper security measures, role-based access control, and a modern, responsive frontend interface.
