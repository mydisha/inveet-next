import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/ui/page-header';
import { Head, Link } from '@inertiajs/react';
import { Bell, Settings, Shield } from 'lucide-react';

interface SettingsProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
    roles?: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function Settings({ user }: SettingsProps) {
  // Check if user has admin roles to determine which layout to use
  const hasAdminRole = user?.roles?.some(role =>
    ['super-admin', 'admin', 'moderator'].includes(role.name)
  ) || false;

  // Choose the appropriate layout component
  const LayoutComponent = hasAdminRole ? BackofficeLayout : DashboardLayout;

  return (
    <>
      <Head title="Settings" />

      <LayoutComponent user={user} currentPath="/settings">
        <PageHeader
          icon={Settings}
          title="Settings"
          description="Manage your account settings and preferences"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Title Settings</CardTitle>
                  <CardDescription>Customize invitation labels and titles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/settings/title">
                <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  Configure Titles
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-3 group-hover:scale-110 transition-transform">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                Configure Notifications
              </Button>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy and security settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutComponent>
    </>
  );
}
