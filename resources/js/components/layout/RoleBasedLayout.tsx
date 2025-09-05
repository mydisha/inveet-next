import { useState } from 'react';
import { useCurrentPath } from '../../hooks/useCurrentPath';
import BackofficeSidebar from '../backoffice/BackofficeSidebar';
import FlashMessageHandler from '../FlashMessageHandler';
import Header from './Header';
import Sidebar from './Sidebar';

interface RoleBasedLayoutProps {
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
  children: React.ReactNode;
}

export default function RoleBasedLayout({ user, children }: RoleBasedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Automatically detect current path from browser URL
  const currentPath = useCurrentPath();

  // Determine user role and appropriate layout
  const getUserRole = () => {
    if (!user?.roles || user.roles.length === 0) return 'customer';
    return user.roles[0].name;
  };

  const userRole = getUserRole();
  const isAdmin = ['super-admin', 'admin', 'moderator'].includes(userRole);
  const isCustomer = userRole === 'customer';

  // Determine if we should show backoffice layout
  const shouldShowBackofficeLayout = isAdmin && currentPath?.startsWith('/backoffice');

  return (
    <>
      <FlashMessageHandler />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10 font-inter">
      {/* Background decorative elements matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Sidebar - Show appropriate sidebar based on role and current path */}
      {shouldShowBackofficeLayout ? (
        <BackofficeSidebar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      ) : (
        <Sidebar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPath={currentPath}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64 relative z-20">
        {/* Top Header */}
        <Header user={user} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
