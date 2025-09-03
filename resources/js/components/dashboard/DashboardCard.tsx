import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconVariant?: 'primary' | 'accent' | 'warm' | 'success' | 'warning' | 'info';
  href?: string;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const iconVariants = {
  primary: 'icon-gradient-1',
  accent: 'icon-gradient-2',
  warm: 'icon-gradient-3',
  success: 'icon-gradient-4',
  warning: 'icon-gradient-5',
  info: 'icon-gradient-6',
};

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  iconVariant = 'primary',
  href,
  buttonText,
  buttonVariant = 'outline',
  className,
  children,
  onClick,
  loading = false,
  disabled = false,
}: DashboardCardProps) {
  const cardContent = (
    <Card className={cn(
      "group relative overflow-hidden",
      "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      "rounded-2xl shadow-lg hover:shadow-2xl",
      "transition-all duration-500 ease-out",
      "hover:-translate-y-2 hover:border-primary/20",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent",
      "before:opacity-0 before:transition-opacity before:duration-500",
      "hover:before:opacity-100",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}>
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-start space-x-4">
          {/* Modern Icon Container */}
          <div className={cn(
            "relative flex-shrink-0",
            "w-14 h-14 rounded-2xl flex items-center justify-center",
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
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {children || (
          href && buttonText && (
            <Link href={href}>
              <Button
                variant={buttonVariant}
                className={cn(
                  "w-full h-11 font-medium transition-all duration-300",
                  "rounded-xl border-0",
                  buttonVariant === 'default' && [
                    "bg-gradient-to-r from-primary to-primary-glow text-white",
                    "shadow-lg hover:shadow-xl",
                    "hover:scale-105 hover:brightness-110",
                    "group-hover:from-primary-glow group-hover:to-primary"
                  ],
                  buttonVariant === 'outline' && [
                    "border-2 border-gray-200 bg-transparent text-gray-700",
                    "hover:border-primary hover:bg-primary/5 hover:text-primary",
                    "hover:scale-105 hover:shadow-md"
                  ],
                  buttonVariant === 'secondary' && [
                    "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    "hover:scale-105 hover:shadow-md"
                  ],
                  buttonVariant === 'ghost' && [
                    "text-gray-600 hover:text-primary hover:bg-primary/5",
                    "hover:scale-105"
                  ]
                )}
                disabled={disabled || loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  buttonText
                )}
              </Button>
            </Link>
          )
        )}
        {onClick && buttonText && (
          <Button
            variant={buttonVariant}
            className={cn(
              "w-full h-11 font-medium transition-all duration-300",
              "rounded-xl border-0",
              buttonVariant === 'default' && [
                "bg-gradient-to-r from-primary to-primary-glow text-white",
                "shadow-lg hover:shadow-xl",
                "hover:scale-105 hover:brightness-110",
                "group-hover:from-primary-glow group-hover:to-primary"
              ],
              buttonVariant === 'outline' && [
                "border-2 border-gray-200 bg-transparent text-gray-700",
                "hover:border-primary hover:bg-primary/5 hover:text-primary",
                "hover:scale-105 hover:shadow-md"
              ],
              buttonVariant === 'secondary' && [
                "bg-gray-100 text-gray-700 hover:bg-gray-200",
                "hover:scale-105 hover:shadow-md"
              ],
              buttonVariant === 'ghost' && [
                "text-gray-600 hover:text-primary hover:bg-primary/5",
                "hover:scale-105"
              ]
            )}
            onClick={onClick}
            disabled={disabled || loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              buttonText
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (href && !onClick) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
