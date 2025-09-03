import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconVariant?: 'primary' | 'accent' | 'warm' | 'success' | 'warning' | 'info';
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
  loading?: boolean;
}

/**
 * Statistics card component for displaying key metrics
 * Provides consistent styling for dashboard statistics
 */
export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconVariant = 'primary',
  trend,
  className,
  loading = false,
}: StatsCardProps) {
  if (loading) {
    return (
      <Card className={cn(
        "group relative overflow-hidden",
        "bg-white/80 backdrop-blur-sm border border-gray-200/50",
        "rounded-2xl shadow-lg",
        className
      )}>
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2"></div>
            {Icon && <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-lg"></div>}
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      "rounded-2xl shadow-lg hover:shadow-xl",
      "transition-all duration-500 ease-out",
      "hover:-translate-y-1 hover:border-primary/20",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent",
      "before:opacity-0 before:transition-opacity before:duration-500",
      "hover:before:opacity-100",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          {Icon && (
            <div className={cn(
              "relative flex-shrink-0",
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "transition-all duration-500 ease-out",
              "group-hover:scale-110 group-hover:rotate-3",
              "shadow-sm group-hover:shadow-md",
              // Icon variant styling
              iconVariant === 'primary' && "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
              iconVariant === 'accent' && "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
              iconVariant === 'warm' && "bg-gradient-to-br from-rose-400 to-pink-500 text-white",
              iconVariant === 'success' && "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
              iconVariant === 'warning' && "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
              iconVariant === 'info' && "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
            )}>
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-xs font-medium",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-gray-500">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
