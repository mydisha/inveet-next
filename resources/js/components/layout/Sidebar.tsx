import { Link } from '@inertiajs/react';
import {
    FileText,
    Heart,
    Home,
    Package,
    User,
    X
} from 'lucide-react';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/ThemeToggle';

interface SidebarProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath?: string;
}

export default function Sidebar({ user, sidebarOpen, setSidebarOpen, currentPath = '/dashboard' }: SidebarProps) {
  // Helper function to check if user has admin roles
  const hasAdminRole = () => {
    if (!user?.roles) return false;
    return user.roles.some(role => ['super-admin', 'admin', 'moderator'].includes(role.name));
  };

  // Base navigation items that are always visible
  const baseNavigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, requiresWedding: false },
  ];

  // Navigation items that require a wedding
  const weddingNavigationItems = [
    { name: 'My Weddings', href: '/my-weddings', icon: Heart, requiresWedding: true },
    { name: 'Packages', href: '/packages', icon: Package, requiresWedding: true },
    { name: 'Orders', href: '/orders', icon: FileText, requiresWedding: true },
  ];

  // Admin navigation items (only show if user has admin role)
  const adminNavigationItems = [
    { name: 'Backoffice', href: '/backoffice', icon: User, requiresWedding: false },
  ];

  // Filter navigation items based on user's wedding status and role
  const navigationItems = [
    ...baseNavigationItems,
    ...(user?.hasWedding ? weddingNavigationItems : []),
    ...(hasAdminRole() ? adminNavigationItems : [])
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center">
              <img
                src="/inveet-logo.png"
                alt="Inveet.Id"
                className="h-8 w-auto hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              />
            </Link>
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
              const isCurrent = currentPath === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-inter-medium transition-all duration-300 group ${
                    isCurrent
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    isCurrent ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-inter-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate font-inter-normal">
                  {user?.email}
                </p>
              </div>
              <ThemeToggle size="sm" />
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
    </>
  );
}
