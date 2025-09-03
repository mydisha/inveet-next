# Dashboard Template System

A comprehensive set of reusable components for creating consistent dashboard pages throughout the application.

## Overview

The dashboard template system provides:
- **Consistent styling** across all dashboard pages
- **Reusable components** for common dashboard patterns
- **Built-in loading states** and empty states
- **Responsive design** that works on all screen sizes
- **Accessibility features** built-in

## Quick Start

### Basic Dashboard Page

```tsx
import { DashboardPage, PageHeader, DashboardSection } from '@/components/dashboard';

export default function MyDashboardPage({ user, loading }) {
  return (
    <DashboardPage
      title="My Dashboard"
      user={user}
      currentPath="/my-dashboard"
      loading={loading}
    >
      <PageHeader
        title="Welcome to My Dashboard"
        description="Manage your account and settings"
      />

      <DashboardSection title="Overview">
        {/* Your content here */}
      </DashboardSection>
    </DashboardPage>
  );
}
```

## Components

### Core Template Components

#### `DashboardPage`
Complete page wrapper with layout, loading states, and document head management.

```tsx
<DashboardPage
  title="Page Title"
  user={user}
  currentPath="/current-path"
  loading={loading}
  loadingComponent={<CustomLoadingComponent />}
>
  {/* Page content */}
</DashboardPage>
```

#### `DashboardTemplate`
Background wrapper with decorative elements and consistent styling.

```tsx
<DashboardTemplate>
  {/* Content with dashboard background */}
</DashboardTemplate>
```

### Layout Components

#### `PageHeader`
Standardized page header with title, description, and optional actions.

```tsx
<PageHeader
  title="Page Title"
  subtitle="Optional subtitle"
  description="Page description"
  actions={<Button>Action</Button>}
/>
```

#### `ContentArea`
Content wrapper with consistent spacing and max-width constraints.

```tsx
<ContentArea
  padding="md"
  maxWidth="2xl"
  centered
>
  {/* Content */}
</ContentArea>
```

#### `EmptyState`
Reusable empty state component for when there's no content.

```tsx
<EmptyState
  icon={Users}
  title="No users found"
  description="Get started by creating your first user"
  actionText="Create User"
  actionHref="/users/create"
/>
```

### Card Components

#### `DashboardCard`
Feature card with icon, title, description, and action button.

```tsx
<DashboardCard
  title="Create Wedding"
  description="Start your wedding invitation journey"
  icon={Plus}
  iconVariant="primary"
  href="/onboarding"
  buttonText="Get Started"
  buttonVariant="default"
/>
```

#### `DashboardSection`
Section wrapper with optional title and description.

```tsx
<DashboardSection
  title="Section Title"
  description="Section description"
>
  {/* Section content */}
</DashboardSection>
```

#### `DashboardGrid`
Responsive grid layout for cards.

```tsx
<DashboardGrid columns={3} gap="md">
  <DashboardCard {...props} />
  <DashboardCard {...props} />
  <DashboardCard {...props} />
</DashboardGrid>
```

#### `ActivityCard`
Card for displaying activity feeds.

```tsx
<ActivityCard
  title="Recent Activity"
  description="Your latest activities"
  activities={activities}
  emptyStateTitle="No activity yet"
  emptyStateDescription="Activities will appear here"
  emptyStateActionText="Get Started"
  emptyStateActionHref="/onboarding"
/>
```

#### `StatsCard`
Card for displaying statistics and metrics.

```tsx
<StatsCard
  title="Total Users"
  value="1,234"
  description="Active users this month"
  icon={Users}
  iconVariant="primary"
  trend={{
    value: 12,
    label: "vs last month",
    positive: true
  }}
/>
```

### Loading Components

#### `LoadingSkeleton`
Complete page loading skeleton.

```tsx
<LoadingSkeleton />
```

#### Individual Skeleton Components
```tsx
<CardSkeleton />
<TextSkeleton lines={3} />
<ActivitySkeleton />
```

## Usage Patterns

### Simple Dashboard Page
```tsx
import { DashboardPage, PageHeader, DashboardSection, DashboardGrid, DashboardCard } from '@/components/dashboard';
import { Plus, Settings, Users } from 'lucide-react';

export default function SimpleDashboard({ user, loading }) {
  return (
    <DashboardPage
      title="Dashboard"
      user={user}
      currentPath="/dashboard"
      loading={loading}
    >
      <PageHeader
        title="Welcome back!"
        description="Manage your account and settings"
      />

      <DashboardSection title="Quick Actions">
        <DashboardGrid columns={3}>
          <DashboardCard
            title="Create New"
            description="Start something new"
            icon={Plus}
            href="/create"
            buttonText="Get Started"
          />
          <DashboardCard
            title="Settings"
            description="Manage settings"
            icon={Settings}
            href="/settings"
            buttonText="Configure"
          />
          <DashboardCard
            title="Users"
            description="Manage users"
            icon={Users}
            href="/users"
            buttonText="View All"
          />
        </DashboardGrid>
      </DashboardSection>
    </DashboardPage>
  );
}
```

### Dashboard with Statistics
```tsx
import { DashboardPage, PageHeader, DashboardGrid, StatsCard } from '@/components/dashboard';
import { Users, Calendar, Heart, TrendingUp } from 'lucide-react';

export default function StatsDashboard({ user, stats, loading }) {
  return (
    <DashboardPage
      title="Analytics"
      user={user}
      currentPath="/analytics"
      loading={loading}
    >
      <PageHeader
        title="Analytics Dashboard"
        description="Track your performance metrics"
      />

      <DashboardGrid columns={4}>
        <StatsCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          iconVariant="primary"
          trend={{ value: 12, label: "vs last month", positive: true }}
        />
        <StatsCard
          title="Events"
          value={stats.events}
          icon={Calendar}
          iconVariant="accent"
          trend={{ value: 8, label: "vs last month", positive: true }}
        />
        <StatsCard
          title="Engagement"
          value="94%"
          icon={Heart}
          iconVariant="warm"
          trend={{ value: 3, label: "vs last month", positive: true }}
        />
        <StatsCard
          title="Growth"
          value="+24%"
          icon={TrendingUp}
          iconVariant="success"
          trend={{ value: 24, label: "vs last month", positive: true }}
        />
      </DashboardGrid>
    </DashboardPage>
  );
}
```

### Dashboard with Empty State
```tsx
import { DashboardPage, PageHeader, EmptyState } from '@/components/dashboard';
import { Plus } from 'lucide-react';

export default function EmptyDashboard({ user, loading }) {
  return (
    <DashboardPage
      title="My Projects"
      user={user}
      currentPath="/projects"
      loading={loading}
    >
      <PageHeader
        title="My Projects"
        description="Manage your projects and tasks"
      />

      <EmptyState
        icon={Plus}
        title="No projects yet"
        description="Get started by creating your first project"
        actionText="Create Project"
        actionHref="/projects/create"
      />
    </DashboardPage>
  );
}
```

## Styling

All components use Tailwind CSS classes and follow the design system established in the application. Key styling features:

- **Consistent spacing** using the spacing scale
- **Responsive design** with mobile-first approach
- **Hover effects** and smooth transitions
- **Gradient backgrounds** and modern card designs
- **Icon variants** with different color schemes
- **Loading states** with skeleton animations

## Accessibility

Components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly text
- Focus management
- Color contrast compliance

## Customization

All components accept `className` props for custom styling:

```tsx
<DashboardCard
  className="custom-card-styles"
  title="Custom Card"
  // ... other props
/>
```

Icon variants available:
- `primary` - Blue gradient
- `accent` - Amber/Orange gradient
- `warm` - Rose/Pink gradient
- `success` - Green gradient
- `warning` - Yellow/Orange gradient
- `info` - Cyan/Blue gradient

Button variants available:
- `default` - Primary button with gradient
- `outline` - Outlined button
- `secondary` - Secondary button
- `ghost` - Ghost button
