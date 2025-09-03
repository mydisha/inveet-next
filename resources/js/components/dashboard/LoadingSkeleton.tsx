import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

// Enhanced shimmer animation
const shimmerClass = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/60",
      "rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-start space-x-4">
          <div className={cn("w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl", shimmerClass)}></div>
          <div className="flex-1 space-y-2">
            <div className={cn("h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg", shimmerClass)}></div>
            <div className={cn("h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-3/4", shimmerClass)}></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className={cn("h-11 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl", shimmerClass)}></div>
      </CardContent>
    </Card>
  );
}

export function TextSkeleton({ lines = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg",
            shimmerClass,
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
      "bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/60",
      "rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="space-y-2">
          <div className={cn("h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/3", shimmerClass)}></div>
          <div className={cn("h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/2", shimmerClass)}></div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50/80 to-white/60 rounded-xl border border-gray-100/40">
              <div className={cn("w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl", shimmerClass)}></div>
              <div className="flex-1 space-y-2">
                <div className={cn("h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg", shimmerClass)}></div>
                <div className={cn("h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-3/4", shimmerClass)}></div>
              </div>
              <div className={cn("h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-16", shimmerClass)}></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-10 bg-gradient-to-b from-transparent to-gray-50/30 p-6 rounded-3xl">
      {/* Welcome Section Skeleton */}
      <div className="space-y-4">
        <div className={cn("h-9 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/2", shimmerClass)}></div>
        <div className={cn("h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/3", shimmerClass)}></div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className={cn("h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/4", shimmerClass)}></div>
          <div className={cn("h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/2", shimmerClass)}></div>
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
