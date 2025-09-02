import * as React from "react"

import { cn } from "../../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// NEW: Optimized gradient card component
interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: 'card-gradient-1' | 'card-gradient-2' | 'card-gradient-3' | 'card-gradient-4' | 
            'card-gradient-5' | 'card-gradient-6' | 'card-gradient-7' | 'card-gradient-8';
  featured?: boolean;
  iconGradient?: 'icon-gradient-1' | 'icon-gradient-2' | 'icon-gradient-3' | 'icon-gradient-4' |
                 'icon-gradient-5' | 'icon-gradient-6' | 'icon-gradient-7' | 'icon-gradient-8';
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ 
    className, 
    gradient = 'card-gradient-1', 
    featured = false, 
    iconGradient,
    icon,
    title,
    description,
    children,
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(
        "card-elegant gradient-card-optimized group cursor-pointer relative overflow-hidden",
        gradient,
        featured && "ring-2 ring-accent ring-offset-2",
        className
      )}
      {...props}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
          ✨ Featured
        </div>
      )}
      
      {/* Icon with optimized gradient */}
      {icon && iconGradient && (
        <div className={cn("icon-container mb-6", iconGradient)}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="space-y-4 relative z-10">
        {title && (
          <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Enhanced hover effect using CSS pseudo-element */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
)
GradientCard.displayName = "GradientCard"

// NEW: Icon component with optimized gradients
interface GradientIconProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: 'icon-gradient-1' | 'icon-gradient-2' | 'icon-gradient-3' | 'icon-gradient-4' |
             'icon-gradient-5' | 'icon-gradient-6' | 'icon-gradient-7' | 'icon-gradient-8';
  children: React.ReactNode;
}

const GradientIcon = React.forwardRef<HTMLDivElement, GradientIconProps>(
  ({ className, gradient = 'icon-gradient-1', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("icon-container", gradient, className)}
      {...props}
    >
      {children}
    </div>
  )
)
GradientIcon.displayName = "GradientIcon"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  GradientCard,
  GradientIcon
}
