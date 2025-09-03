import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ActivityCard from '@/components/dashboard/ActivityCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import LoadingSkeleton from '@/components/dashboard/LoadingSkeleton';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Heart,
    Plus,
    Settings,
    Users,
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface DashboardProps {
  user: User | null;
  loading?: boolean;
}

export default function Dashboard({ user, loading = false }: DashboardProps) {
  // Mock data for demonstration - in real app, this would come from props or API
  const recentActivities = user?.hasWedding ? [
    {
      id: '1',
      icon: Heart,
      title: 'Wedding invitation created',
      description: 'Your beautiful invitation is ready to share',
      timestamp: '2 hours ago',
      status: 'success' as const,
    },
    {
      id: '2',
      icon: Users,
      title: 'Guest list updated',
      description: 'Added 15 new guests to your list',
      timestamp: '1 day ago',
      status: 'info' as const,
    },
  ] : [];

  if (loading) {
    return (
      <>
        <Head title="Dashboard" />
        <DashboardLayout user={user} currentPath="/dashboard">
          <LoadingSkeleton />
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <Head title="Dashboard" />

      <DashboardLayout user={user} currentPath="/dashboard">
        {/* Welcome Section */}
        <DashboardSection
          title={`Welcome back, ${user?.name}! 👋`}
          description="Ready to create your perfect wedding invitation?"
          className="mb-8"
        />

        {/* Quick Actions */}
        <DashboardSection
          title="Quick Actions"
          description="Get started with your wedding invitation journey"
        >
          <DashboardGrid columns={3} gap="md">
            <DashboardCard
              title="Create New Wedding"
              description="Start your wedding invitation journey"
              icon={Plus}
              iconVariant="primary"
              href="/onboarding"
              buttonText="Get Started"
              buttonVariant="default"
            />

            <DashboardCard
              title="My Weddings"
              description="Manage your existing weddings"
              icon={Calendar}
              iconVariant="accent"
              href="/my-weddings"
              buttonText="View All"
              buttonVariant="outline"
            />

            <DashboardCard
              title="Settings"
              description="Manage your account settings"
              icon={Settings}
              iconVariant="warm"
              href="/settings"
              buttonText="Configure"
              buttonVariant="outline"
            />
          </DashboardGrid>
        </DashboardSection>

        {/* Recent Activity */}
        <DashboardSection>
          <ActivityCard
            title="Recent Activity"
            description="Your latest wedding invitation activities"
            activities={recentActivities}
            emptyStateTitle="No weddings yet"
            emptyStateDescription="Start creating your first wedding invitation to see your activity here."
            emptyStateActionText="Create Your First Wedding"
            emptyStateActionHref="/onboarding"
          />
        </DashboardSection>
      </DashboardLayout>
    </>
  );
}
