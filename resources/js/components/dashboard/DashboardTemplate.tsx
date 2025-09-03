import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardTemplateProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Main dashboard template wrapper that provides consistent styling and layout
 * for all dashboard pages. Includes the gradient background and decorative elements.
 */
export default function DashboardTemplate({
  children,
  className,
  contentClassName,
}: DashboardTemplateProps) {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10",
      className
    )}>
      {/* Background decorative elements matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main content area */}
      <div className={cn("relative z-10", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
