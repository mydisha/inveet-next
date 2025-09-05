import RoleBasedLayout from './RoleBasedLayout';

interface DashboardLayoutProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  children: React.ReactNode;
  currentPath?: string;
}

export default function DashboardLayout({ user, children, currentPath }: DashboardLayoutProps) {
  return (
    <RoleBasedLayout user={user} currentPath={currentPath}>
      {children}
    </RoleBasedLayout>
  );
}
