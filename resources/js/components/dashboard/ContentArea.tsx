import { cn } from '@/lib/utils';
import React from 'react';

interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const maxWidthClasses = {
  none: '',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

/**
 * Content area wrapper that provides consistent spacing and max-width constraints
 * for dashboard page content
 */
export default function ContentArea({
  children,
  className,
  padding = 'md',
  maxWidth = 'full',
  centered = false,
}: ContentAreaProps) {
  return (
    <div className={cn(
      paddingClasses[padding],
      maxWidthClasses[maxWidth],
      centered && 'mx-auto',
      className
    )}>
      {children}
    </div>
  );
}
