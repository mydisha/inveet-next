import { Head, Link } from '@inertiajs/react';
import {
  Heart,
  Plus,
  Settings,
  User,
  LogOut,
  Calendar,
  Users,
  Sparkles,
  Menu,
  X,
  Home,
  Package,
  FileText,
  BarChart3,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface DashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function Dashboard({ user }: DashboardProps) {
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
        {/* Background decorative elements matching landing page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
          <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
          <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
          <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
          <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
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
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      item.current
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top Header */}
          <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Search bar */}
                <div className="flex-1 max-w-lg mx-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search weddings, packages..."
                      className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                  </Button>

                  {/* Profile dropdown */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-foreground">
                        {user?.name}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>

                    {/* Dropdown menu */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg z-50">
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <User className="mr-3 h-4 w-4" />
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              handleLogout();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                          >
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to create your perfect wedding invitation?
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Create New Wedding</CardTitle>
                      <CardDescription>Start your wedding invitation journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/onboarding">
                    <Button className="btn-hero w-full group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-2 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">My Weddings</CardTitle>
                      <CardDescription>Manage your existing weddings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/my-weddings">
                    <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent transition-all duration-300">
                      View All
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-3 group-hover:scale-110 transition-transform">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Settings</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                      Configure
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Your latest wedding invitation activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.hasWedding ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Wedding invitation created</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No weddings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start creating your first wedding invitation to see your activity here.
                    </p>
                    <Link href="/onboarding">
                      <Button className="btn-hero">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Wedding
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
}
