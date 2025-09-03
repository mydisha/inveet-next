import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export default function DashboardSection({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
}: DashboardSectionProps) {
  return (
    <section className={cn("mb-10", className)}>
      {(title || description) && (
        <div className={cn("mb-8", headerClassName)}>
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={contentClassName}>
        {children}
      </div>
    </section>
  );
}
