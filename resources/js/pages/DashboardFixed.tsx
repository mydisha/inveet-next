import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    Bell,
    Calendar,
    ChevronDown,
    FileText,
    Heart,
    Home,
    LogOut,
    Menu,
    Package,
    Plus,
    Settings,
    Sparkles,
    User,
    Users,
    X
} from 'lucide-react';
import { useState } from 'react';

interface DashboardFixedProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function DashboardFixed({ user }: DashboardFixedProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Inertia.js will handle the logout form submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = '_token';
      tokenInput.value = csrfToken;
      form.appendChild(tokenInput);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
    { name: 'My Weddings', href: '/my-weddings', icon: Heart, current: false },
    { name: 'Packages', href: '/packages', icon: Package, current: false },
    { name: 'Orders', href: '/orders', icon: FileText, current: false },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ];

  return (
    <>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Background decorative elements - matching landing page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-primary/20 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-primary/20">
              <div className="flex items-center">
                <img
                  src="/inveet-logo.png"
                  alt="Inveet.Id"
                  className="h-8 w-auto"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      item.current
                        ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-md'
                        : 'text-gray-600 hover:bg-primary/10 hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || 'Guest User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || 'guest@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Top Navigation */}
          <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="ml-4 text-xl font-bold text-gray-900">
                  Dashboard
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                </Button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 hover:bg-primary/10"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </Button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/20 py-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <User className="mr-3 h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <main className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome back, {user?.name || 'Guest'}! 👋
                </h2>
                <p className="text-lg text-gray-600">
                  Here's what's happening with your weddings today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-600">Total Weddings</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">0</div>
                    <p className="text-sm text-gray-500">
                      +0 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-600">Total Guests</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-glow/20 to-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-glow" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">0</div>
                    <p className="text-sm text-gray-500">
                      +0 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-600">RSVPs</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-light/30 to-primary/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary-light" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">0</div>
                    <p className="text-sm text-gray-500">
                      +0 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-600">Active Packages</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary/15 to-primary-glow/25 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">0</div>
                    <p className="text-sm text-gray-500">
                      +0 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-600">
                      Get started with your wedding planning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/onboarding">
                      <Button className="w-full justify-start h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white shadow-md hover:shadow-lg transition-all duration-200">
                        <Plus className="mr-3 h-5 w-5" />
                        Create New Wedding
                      </Button>
                    </Link>
                    <Link href="/packages">
                      <Button variant="outline" className="w-full justify-start h-12 border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
                        <Package className="mr-3 h-5 w-5" />
                        Browse Packages
                      </Button>
                    </Link>
                    <Link href="/my-weddings">
                      <Button variant="outline" className="w-full justify-start h-12 border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
                        <Heart className="mr-3 h-5 w-5" />
                        View My Weddings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-600">
                      Your latest wedding activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-lg font-medium">No recent activity</p>
                      <p className="text-sm">Start by creating your first wedding!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
