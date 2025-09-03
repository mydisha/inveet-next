# Dashboard Components

This directory contains reusable dashboard components that provide a consistent and elegant design system for the application.

## Components

### DashboardCard
A versatile card component for displaying actions, information, or content.

```tsx
import { DashboardCard } from '@/components/dashboard';
import { Plus, Calendar } from 'lucide-react';

<DashboardCard
  title="Create New Wedding"
  description="Start your wedding invitation journey"
  icon={Plus}
  iconVariant="primary"
  href="/onboarding"
  buttonText="Get Started"
  buttonVariant="default"
/>
```

**Props:**
- `title`: Card title
- `description`: Card description
- `icon`: Lucide icon component
- `iconVariant`: Icon color variant ('primary', 'accent', 'warm', 'success', 'warning', 'info')
- `href`: Link destination (optional)
- `buttonText`: Button text (optional)
- `buttonVariant`: Button style variant
- `onClick`: Click handler (optional)
- `loading`: Loading state
- `disabled`: Disabled state
- `children`: Custom content (optional)

### ActivityCard
Displays a list of activities with proper empty states.

```tsx
import { ActivityCard } from '@/components/dashboard';
import { Heart, Users } from 'lucide-react';

const activities = [
  {
    id: '1',
    icon: Heart,
    title: 'Wedding invitation created',
    description: 'Your beautiful invitation is ready to share',
    timestamp: '2 hours ago',
    status: 'success',
  },
];

<ActivityCard
  title="Recent Activity"
  description="Your latest wedding invitation activities"
  activities={activities}
  emptyStateTitle="No weddings yet"
  emptyStateDescription="Start creating your first wedding invitation to see your activity here."
  emptyStateActionText="Create Your First Wedding"
  emptyStateActionHref="/onboarding"
/>
```

### StatsCard
Displays statistics with optional trend indicators.

```tsx
import { StatsCard } from '@/components/dashboard';
import { TrendingUp } from 'lucide-react';

<StatsCard
  title="Total Weddings"
  value="12"
  description="Weddings created this month"
  icon={TrendingUp}
  iconVariant="success"
  trend={{
    value: 15,
    isPositive: true,
    label: 'vs last month'
  }}
/>
```

### DashboardSection
Provides consistent section layout with titles and descriptions.

```tsx
import { DashboardSection } from '@/components/dashboard';

<DashboardSection
  title="Quick Actions"
  description="Get started with your wedding invitation journey"
  contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {/* Your content here */}
</DashboardSection>
```

### DashboardGrid
Responsive grid layout for dashboard cards.

```tsx
import { DashboardGrid, DashboardCard } from '@/components/dashboard';

<DashboardGrid columns={3} gap="md">
  <DashboardCard title="Card 1" />
  <DashboardCard title="Card 2" />
  <DashboardCard title="Card 3" />
</DashboardGrid>
```

### LoadingSkeleton
Loading states for dashboard components.

```tsx
import { LoadingSkeleton, CardSkeleton, ActivitySkeleton } from '@/components/dashboard';

// Full dashboard skeleton
<LoadingSkeleton />

// Individual component skeletons
<CardSkeleton />
<ActivitySkeleton />
```

## Design System

### Icon Variants
- `primary`: Blue gradient (default)
- `accent`: Yellow/orange gradient
- `warm`: Warm color gradient
- `success`: Green gradient
- `warning`: Orange gradient
- `info`: Blue gradient

### Button Variants
- `default`: Primary button with hero styling
- `outline`: Outlined button
- `secondary`: Secondary button
- `ghost`: Ghost button

### Grid Options
- `columns`: 1, 2, 3, or 4 columns
- `gap`: 'sm', 'md', or 'lg'

## Best Practices

1. **Consistent Icons**: Use Lucide React icons for consistency
2. **Loading States**: Always provide loading states for async operations
3. **Empty States**: Use ActivityCard's built-in empty state handling
4. **Responsive Design**: Use DashboardGrid for responsive layouts
5. **Accessibility**: All components include proper ARIA labels and keyboard navigation
6. **Performance**: Components are optimized with proper will-change and backface-visibility properties

## Styling

The components use the existing design system with these CSS classes:
- `card-elegant`: Base card styling
- `icon-container`: Icon container styling
- `btn-hero`: Primary button styling
- `dashboard-card-hover`: Enhanced hover effects
- `loading-shimmer`: Loading animation effects

## TypeScript

All components are fully typed with proper interfaces. Import types as needed:

```tsx
import type { DashboardCardProps, ActivityItem } from '@/components/dashboard';
```
