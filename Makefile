# Inveet Wedding Invitation Platform - Makefile
# Usage: make <command>
# Example: make dev (runs both frontend and backend)

.PHONY: help install dev frontend backend build test clean migrate seed fresh

# Default target
help:
	@echo "🎉 Inveet Wedding Invitation Platform - Available Commands:"
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev          - Run both frontend and backend simultaneously"
	@echo "  make frontend     - Run only the frontend (Vite dev server)"
	@echo "  make backend      - Run only the backend (Laravel server)"
	@echo ""
	@echo "📦 Installation & Setup:"
	@echo "  make install      - Install all dependencies (PHP + Node.js)"
	@echo "  make setup        - Complete initial setup (env, key, migrate, seed)"
	@echo "  make migrate      - Run database migrations"
	@echo "  make seed         - Seed the database"
	@echo "  make fresh        - Fresh migrations with seeding"
	@echo ""
	@echo "🔨 Build & Production:"
	@echo "  make build        - Build frontend assets for production"
	@echo "  make build-ssr    - Build with SSR support"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test         - Run PHP tests"
	@echo "  make test-pest    - Run tests with Pest"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make clean        - Clean cache and temporary files"
	@echo "  make logs         - Show Laravel logs"
	@echo "  make status       - Show running processes status"
	@echo ""
	@echo "💡 Quick Start:"
	@echo "  make dev          # Start everything for development"

# Development - Run both frontend and backend
dev:
	@echo "🚀 Starting Inveet development environment..."
	@echo "📱 Frontend will be available at: http://localhost:5173"
	@echo "🔧 Backend will be available at: http://localhost:8000"
	@echo "⏳ Starting both servers... (Press Ctrl+C to stop both)"
	@echo ""
	@npx concurrently \
		--names "Frontend,Backend" \
		--prefix-colors "blue,green" \
		--kill-others \
		"make frontend" \
		"make backend"

# Run only frontend
frontend:
	@echo "🎨 Starting Vite development server..."
	@npm run dev

# Run only backend
backend:
	@echo "🔧 Starting Laravel development server..."
	@php artisan serve

# Install all dependencies
install:
	@echo "📦 Installing PHP dependencies..."
	@composer install
	@echo "📦 Installing Node.js dependencies..."
	@npm install
	@echo "✅ All dependencies installed successfully!"

# Complete initial setup
setup:
	@echo "⚙️ Setting up Inveet application..."
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env file..."; \
		cp .env.example .env; \
	fi
	@echo "🔑 Generating application key..."
	@php artisan key:generate
	@echo "🗄️ Running database migrations..."
	@php artisan migrate
	@echo "🌱 Seeding database..."
	@php artisan db:seed
	@echo "✅ Setup completed successfully!"
	@echo "🚀 Run 'make dev' to start development servers"

# Database migrations
migrate:
	@echo "🗄️ Running database migrations..."
	@php artisan migrate

# Database seeding
seed:
	@echo "🌱 Seeding database..."
	@php artisan db:seed

# Fresh migrations with seeding
fresh:
	@echo "🔄 Fresh migrations with seeding..."
	@php artisan migrate:fresh --seed

# Build frontend assets
build:
	@echo "🔨 Building frontend assets for production..."
	@npm run build

# Build with SSR support
build-ssr:
	@echo "🔨 Building with SSR support..."
	@npm run build:ssr

# Run PHP tests
test:
	@echo "🧪 Running PHP tests..."
	@php artisan test

# Run tests with Pest
test-pest:
	@echo "🧪 Running tests with Pest..."
	@./vendor/bin/pest

# Clean cache and temporary files
clean:
	@echo "🧹 Cleaning cache and temporary files..."
	@php artisan cache:clear
	@php artisan config:clear
	@php artisan route:clear
	@php artisan view:clear
	@rm -rf bootstrap/cache/*.php
	@rm -rf storage/logs/*.log
	@echo "✅ Cache cleaned successfully!"

# Show Laravel logs
logs:
	@echo "📋 Showing Laravel logs..."
	@tail -f storage/logs/laravel.log

# Show running processes status
status:
	@echo "📊 Checking running processes..."
	@echo "Frontend (Vite):"
	@lsof -ti:5173 > /dev/null 2>&1 && echo "✅ Running on port 5173" || echo "❌ Not running"
	@echo "Backend (Laravel):"
	@lsof -ti:8000 > /dev/null 2>&1 && echo "✅ Running on port 8000" || echo "❌ Not running"

# Install development tools
dev-tools:
	@echo "🛠️ Installing development tools..."
	@composer require --dev barryvdh/laravel-debugbar
	@composer require --dev barryvdh/laravel-ide-helper
	@echo "✅ Development tools installed!"

# Create new migration
migration:
	@echo "🗄️ Creating new migration..."
	@read -p "Enter migration name: " name; \
	php artisan make:migration $$name

# Create new model
model:
	@echo "📝 Creating new model..."
	@read -p "Enter model name: " name; \
	php artisan make:model $$name

# Create new controller
controller:
	@echo "🎮 Creating new controller..."
	@read -p "Enter controller name: " name; \
	php artisan make:controller $$name

# Show available routes
routes:
	@echo "🛣️ Available routes:"
	@php artisan route:list

# Show environment info
info:
	@echo "ℹ️ Environment Information:"
	@echo "PHP Version: $(shell php -v | head -n1)"
	@echo "Node Version: $(shell node -v)"
	@echo "NPM Version: $(shell npm -v)"
	@echo "Composer Version: $(shell composer -V | head -n1)"
	@echo "Laravel Version: $(shell php artisan --version)"

# Quick restart (stop and start both)
restart:
	@echo "🔄 Restarting development servers..."
	@make stop 2>/dev/null || true
	@sleep 2
	@make dev

# Stop all development servers
stop:
	@echo "🛑 Stopping development servers..."
	@lsof -ti:5173 | xargs kill -9 2>/dev/null || true
	@lsof -ti:8000 | xargs kill -9 2>/dev/null || true
	@echo "✅ All servers stopped"

# Production deployment preparation
deploy-prep:
	@echo "🚀 Preparing for production deployment..."
	@make build
	@make build-ssr
	@composer install --optimize-autoloader --no-dev
	@php artisan config:cache
	@php artisan route:cache
	@php artisan view:cache
	@echo "✅ Production build ready!"

# Development environment check
check:
	@echo "🔍 Checking development environment..."
	@echo "Checking PHP..."
	@php -v > /dev/null && echo "✅ PHP is available" || echo "❌ PHP not found"
	@echo "Checking Composer..."
	@composer -V > /dev/null && echo "✅ Composer is available" || echo "❌ Composer not found"
	@echo "Checking Node.js..."
	@node -v > /dev/null && echo "✅ Node.js is available" || echo "❌ Node.js not found"
	@echo "Checking NPM..."
	@npm -v > /dev/null && echo "✅ NPM is available" || echo "❌ NPM not found"
	@echo "Checking .env file..."
	@test -f .env && echo "✅ .env file exists" || echo "❌ .env file missing"
	@echo "Checking database connection..."
	@php artisan tinker --execute="echo 'Database connection: ' . (DB::connection()->getPdo() ? 'OK' : 'FAILED') . PHP_EOL;" 2>/dev/null || echo "❌ Database connection failed"

# Default target when no command specified
.DEFAULT_GOAL := help
