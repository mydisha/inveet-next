import {
    ActivityCard,
    DashboardCard,
    DashboardGrid,
    DashboardPage,
    DashboardSection,
    PageHeader,
    StatsCard
} from '@/components/dashboard';
import {
    BarChart3,
    Calendar,
    Heart,
    Plus,
    Settings,
    TrendingUp,
    Users
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface ExamplePageProps {
  user: User | null;
  loading?: boolean;
}

/**
 * Example page demonstrating how to use the dashboard template system
 * This shows various patterns and components that can be easily reused
 */
export default function ExamplePage({ user, loading = false }: ExamplePageProps) {
  // Mock data for demonstration
  const stats = {
    users: 1234,
    events: 56,
    engagement: 94,
    growth: 24,
  };

  const activities = [
    {
      id: '1',
      icon: Users,
      title: 'New user registered',
      description: 'John Doe joined the platform',
      timestamp: '2 hours ago',
      status: 'success' as const,
    },
    {
      id: '2',
      icon: Calendar,
      title: 'Event created',
      description: 'Wedding invitation created successfully',
      timestamp: '4 hours ago',
      status: 'info' as const,
    },
    {
      id: '3',
      icon: Heart,
      title: 'High engagement',
      description: 'Event received 50+ views',
      timestamp: '1 day ago',
      status: 'success' as const,
    },
  ];

  return (
    <DashboardPage
      title="Example Dashboard"
      user={user}
      currentPath="/example"
      loading={loading}
    >
      {/* Page Header with Actions */}
      <PageHeader
        title="Example Dashboard"
        subtitle="Template System Demo"
        description="This page demonstrates how to use the dashboard template system for consistent, reusable layouts."
        actions={
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export Data
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
              Create New
            </button>
          </div>
        }
      />

      {/* Statistics Section */}
      <DashboardSection
        title="Key Metrics"
        description="Overview of your platform performance"
      >
        <DashboardGrid columns={4} gap="md">
          <StatsCard
            title="Total Users"
            value={stats.users.toLocaleString()}
            description="Active users this month"
            icon={Users}
            iconVariant="primary"
            trend={{
              value: 12,
              label: "vs last month",
              positive: true,
            }}
          />
          <StatsCard
            title="Events Created"
            value={stats.events}
            description="Wedding invitations created"
            icon={Calendar}
            iconVariant="accent"
            trend={{
              value: 8,
              label: "vs last month",
              positive: true,
            }}
          />
          <StatsCard
            title="Engagement Rate"
            value={`${stats.engagement}%`}
            description="Average user engagement"
            icon={Heart}
            iconVariant="warm"
            trend={{
              value: 3,
              label: "vs last month",
              positive: true,
            }}
          />
          <StatsCard
            title="Growth Rate"
            value={`+${stats.growth}%`}
            description="Monthly growth"
            icon={TrendingUp}
            iconVariant="success"
            trend={{
              value: stats.growth,
              label: "vs last month",
              positive: true,
            }}
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Quick Actions Section */}
      <DashboardSection
        title="Quick Actions"
        description="Common tasks and shortcuts"
      >
        <DashboardGrid columns={3} gap="md">
          <DashboardCard
            title="Create New Event"
            description="Start a new wedding invitation project"
            icon={Plus}
            iconVariant="primary"
            href="/events/create"
            buttonText="Get Started"
            buttonVariant="default"
          />
          <DashboardCard
            title="Analytics"
            description="View detailed analytics and reports"
            icon={BarChart3}
            iconVariant="accent"
            href="/analytics"
            buttonText="View Reports"
            buttonVariant="outline"
          />
          <DashboardCard
            title="Settings"
            description="Manage your account and preferences"
            icon={Settings}
            iconVariant="warm"
            href="/settings"
            buttonText="Configure"
            buttonVariant="outline"
          />
        </DashboardGrid>
      </DashboardSection>

      {/* Recent Activity Section */}
      <DashboardSection
        title="Recent Activity"
        description="Latest platform activities and updates"
      >
        <ActivityCard
          title="Platform Activity"
          description="Recent user actions and system events"
          activities={activities}
          emptyStateTitle="No activity yet"
          emptyStateDescription="Activity will appear here as users interact with the platform"
          emptyStateActionText="View All Activity"
          emptyStateActionHref="/activity"
        />
      </DashboardSection>

      {/* Empty State Example (commented out, but shows how to use) */}
      {/*
      <DashboardSection title="Empty State Example">
        <EmptyState
          icon={FileText}
          title="No documents found"
          description="Get started by uploading your first document"
          actionText="Upload Document"
          actionHref="/documents/upload"
        />
      </DashboardSection>
      */}
    </DashboardPage>
  );
}
