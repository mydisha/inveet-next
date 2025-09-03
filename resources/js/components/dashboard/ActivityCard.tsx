import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityCardProps {
  title: string;
  description: string;
  activities: ActivityItem[];
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateActionText?: string;
  emptyStateActionHref?: string;
  className?: string;
}

const statusColors = {
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

export default function ActivityCard({
  title,
  description,
  activities,
  emptyStateTitle = "No activity yet",
  emptyStateDescription = "Your recent activities will appear here.",
  emptyStateActionText,
  emptyStateActionHref,
  className,
}: ActivityCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      "rounded-2xl shadow-lg hover:shadow-xl",
      "transition-all duration-500 ease-out",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-1">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="group/activity flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/70 transition-all duration-300 hover:shadow-sm"
              >
                <div className={cn(
                  "relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  "transition-all duration-300 group-hover/activity:scale-110",
                  "shadow-sm group-hover/activity:shadow-md",
                  activity.status ? statusColors[activity.status] : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                )}>
                  <activity.icon className="w-5 h-5" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 group-hover/activity:text-primary transition-colors duration-300">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{emptyStateTitle}</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">{emptyStateDescription}</p>
            {emptyStateActionText && emptyStateActionHref && (
              <Link href={emptyStateActionHref}>
                <Button className="bg-gradient-to-r from-primary to-primary-glow text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {emptyStateActionText}
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
