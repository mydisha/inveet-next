import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm sm:text-base text-muted-foreground truncate">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  children,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground truncate">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  subtitle,
  children,
  className = ''
}: CardHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${className}`}>
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-medium text-foreground truncate">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground truncate">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

// Default export for backward compatibility
export default PageHeader;
