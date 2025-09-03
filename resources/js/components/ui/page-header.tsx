import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Consistent page header component with icon, title, and description
 * Matches the design pattern shown in the attachment
 */
export default function PageHeader({
  icon: Icon,
  title,
  description,
  children,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {Icon && (
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h1>
          </div>
          {description && (
            <p className="text-muted-foreground text-sm sm:text-base ml-0 sm:ml-13">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex-shrink-0 ml-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
