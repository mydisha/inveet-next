import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ user, setSidebarOpen }: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout({
        useApi: true,
        redirectTo: '/login',
        showFeedback: true
      });
    } catch (error) {
      // Fallback to form-based logout
      await logout({
        useApi: false,
        redirectTo: '/login',
        showFeedback: false
      });
    }
  };

  return (
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

          {/* Spacer to push right side actions to the right */}
          <div className="flex-1"></div>

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
                className="flex items-center space-x-1"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="hidden sm:block text-sm font-inter-medium text-foreground">
                  {user?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>

              {/* Dropdown menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 group font-inter-medium"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      disabled={isLoading}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-700 transition-all duration-200 group font-inter-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-500 group-hover:text-red-600 transition-colors" />
                      {isLoading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
