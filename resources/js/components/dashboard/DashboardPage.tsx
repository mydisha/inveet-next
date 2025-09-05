import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import DashboardTemplate from './DashboardTemplate';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface DashboardPageProps {
  title: string;
  user: User | null;
  currentPath?: string;
  children: React.ReactNode;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  className?: string;
}

/**
 * Complete dashboard page wrapper that includes:
 * - Page title in document head
 * - Dashboard layout with sidebar and header
 * - Dashboard template with background styling
 * - Loading state handling
 */
export default function DashboardPage({
  title,
  user,
  currentPath,
  children,
  loading = false,
  loadingComponent,
  className,
}: DashboardPageProps) {
  return (
    <>
      <Head title={title} />
      <DashboardLayout user={user} currentPath={currentPath}>
        <DashboardTemplate className={className}>
          {loading ? (
            loadingComponent || (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            )
          ) : (
            children
          )}
        </DashboardTemplate>
      </DashboardLayout>
    </>
  );
}
