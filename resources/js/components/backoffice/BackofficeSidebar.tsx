import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    MessageSquare,
    Palette,
    Settings,
    ShoppingCart,
    User,
    UserCircle,
    Users,
    X
} from 'lucide-react';
import { Button } from '../ui/button';

interface BackofficeSidebarProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath?: string;
}

export default function BackofficeSidebar({ user, sidebarOpen, setSidebarOpen, currentPath = '/backoffice' }: BackofficeSidebarProps) {
  // Helper function to check if user has required role
  const hasRole = (requiredRoles: string[]): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(role => requiredRoles.includes(role.name));
  };

  // Helper function to check if user has required permission
  const hasPermission = (permission: string): boolean => {
    // For now, we'll use role-based checking
    // In the future, this could be enhanced with actual permission checking
    return hasRole(['super-admin', 'admin']);
  };

  // Define navigation items with role requirements
  const allNavigationItems = [
    {
      name: 'Dashboard',
      href: '/backoffice',
      icon: LayoutDashboard,
      roles: ['super-admin', 'admin', 'moderator'],
      permissions: ['view-dashboard']
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserCircle,
      roles: ['super-admin', 'admin', 'moderator'],
      permissions: ['view-profile']
    },
    {
      name: 'Users',
      href: '/backoffice/users',
      icon: Users,
      roles: ['super-admin', 'admin'],
      permissions: ['view-users']
    },
    {
      name: 'Orders',
      href: '/backoffice/orders',
      icon: ShoppingCart,
      roles: ['super-admin', 'admin', 'moderator'],
      permissions: ['view-orders']
    },
    {
      name: 'Feedbacks',
      href: '/backoffice/feedbacks',
      icon: MessageSquare,
      roles: ['super-admin', 'admin', 'moderator'],
      permissions: ['view-feedbacks']
    },
    {
      name: 'Themes',
      href: '/backoffice/themes',
      icon: Palette,
      roles: ['super-admin', 'admin'],
      permissions: ['view-themes']
    },
    {
      name: 'User Settings',
      href: '/settings',
      icon: Settings,
      roles: ['super-admin', 'admin', 'moderator'],
      permissions: ['view-settings']
    },
    {
      name: 'System Settings',
      href: '/backoffice/configurations',
      icon: Settings,
      roles: ['super-admin'],
      permissions: ['manage-settings']
    },
  ];

  // Filter navigation items based on user role
  const navigationItems = allNavigationItems.filter(item => {
    return hasRole(item.roles) || hasPermission(item.permissions[0]);
  });

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
            <Link href="/backoffice" className="flex flex-col items-center">
              <img
                src="/inveet-logo.png"
                alt="Inveet.Id Backoffice"
                className="h-8 w-auto hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              />
              <span className="text-xs font-inter-bold text-foreground mt-1">backoffice</span>
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
              // Improved path matching - check if current path starts with the item href
              // Special handling for settings page mapping
              let isCurrent = currentPath === item.href ||
                (item.href !== '/backoffice' && currentPath.startsWith(item.href));

              // Special case: if we're on /settings and the item is /settings (User Settings)
              if (currentPath === '/settings' && item.href === '/settings') {
                isCurrent = true;
              }

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
                <p className="text-xs text-primary truncate font-inter-normal">
                  {user?.roles?.[0]?.name || 'Admin'}
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
    </>
  );
}
