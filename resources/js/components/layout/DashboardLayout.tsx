import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  children: React.ReactNode;
  currentPath?: string;
}

export default function DashboardLayout({ user, children, currentPath }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10 font-inter">
      {/* Background decorative elements matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={currentPath}
      />

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
  );
}
