import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      "rounded-2xl shadow-lg",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="h-11 bg-gray-200 animate-pulse rounded-xl"></div>
      </CardContent>
    </Card>
  );
}

export function TextSkeleton({ lines = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-muted animate-pulse rounded",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

export function ActivitySkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      "rounded-2xl shadow-lg",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-1"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4"></div>
              </div>
              <div className="h-3 bg-gray-200 animate-pulse rounded w-16"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-10">
      {/* Welcome Section Skeleton */}
      <div className="space-y-3">
        <div className="h-9 bg-gray-200 animate-pulse rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3"></div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Activity Skeleton */}
      <ActivitySkeleton />
    </div>
  );
}
