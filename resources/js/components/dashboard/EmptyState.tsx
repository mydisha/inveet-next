import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  actionVariant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}

/**
 * Reusable empty state component for dashboard pages
 * Provides consistent styling for when there's no content to display
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  actionVariant = 'default',
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  actionClassName,
}: EmptyStateProps) {
  const actionButton = actionText && (
    <Button
      variant={actionVariant}
      className={cn(
        "px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
        actionVariant === 'default' && "bg-gradient-to-r from-primary to-primary-glow text-white",
        actionClassName
      )}
      onClick={onActionClick}
    >
      {actionText}
    </Button>
  );

  return (
    <div className={cn("text-center py-12", className)}>
      {Icon && (
        <div className={cn(
          "w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm",
          iconClassName
        )}>
          <Icon className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <h3 className={cn(
        "text-lg font-semibold text-gray-900 mb-2",
        titleClassName
      )}>
        {title}
      </h3>
      <p className={cn(
        "text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed",
        descriptionClassName
      )}>
        {description}
      </p>
      {actionText && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              {actionButton}
            </Link>
          ) : (
            actionButton
          )}
        </>
      )}
    </div>
  );
}
