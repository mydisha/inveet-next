import { cn } from '@/lib/utils';
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
}

/**
 * Standardized page header component for dashboard pages
 * Provides consistent typography and spacing for page titles and descriptions
 */
export default function PageHeader({
  title,
  subtitle,
  description,
  actions,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  actionsClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          {subtitle && (
            <p className={cn(
              "text-sm font-medium text-primary mb-2",
              subtitleClassName
            )}>
              {subtitle}
            </p>
          )}
          <h1 className={cn(
            "text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent",
            titleClassName
          )}>
            {title}
          </h1>
          {description && (
            <p className={cn(
              "text-muted-foreground text-lg leading-relaxed max-w-2xl",
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className={cn("flex-shrink-0", actionsClassName)}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
