import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconVariant?: 'primary' | 'accent' | 'warm' | 'success' | 'warning' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  className?: string;
  loading?: boolean;
}

const iconVariants = {
  primary: 'icon-gradient-1',
  accent: 'icon-gradient-2',
  warm: 'icon-gradient-3',
  success: 'icon-gradient-4',
  warning: 'icon-gradient-5',
  info: 'icon-gradient-6',
};

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
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="h-10 bg-gray-200 animate-pulse rounded mb-3"></div>
          {trend && <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>}
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
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center",
            "transition-all duration-500 ease-out",
            "group-hover:scale-110 group-hover:rotate-3",
            "shadow-lg group-hover:shadow-xl",
            // Icon variant styling
            iconVariant === 'primary' && "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
            iconVariant === 'accent' && "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
            iconVariant === 'warm' && "bg-gradient-to-br from-rose-400 to-pink-500 text-white",
            iconVariant === 'success' && "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
            iconVariant === 'warning' && "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
            iconVariant === 'info' && "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
          )}>
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-gray-600 text-sm leading-relaxed">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          <div className="text-4xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
            {value}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center space-x-2 text-sm font-medium",
              trend.isPositive ? "text-emerald-600" : "text-red-500"
            )}>
              <div className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full",
                trend.isPositive ? "bg-emerald-100" : "bg-red-100"
              )}>
                <span className={cn(
                  "text-xs font-bold",
                  trend.isPositive ? "rotate-0" : "rotate-180"
                )}>
                  ↗
                </span>
              </div>
              <span>{trend.value}%</span>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
