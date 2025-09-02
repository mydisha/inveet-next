import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { User } from 'lucide-react';

interface ProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <Head title="Profile" />

      <DashboardLayout user={user} currentPath="/profile">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        <div className="max-w-2xl">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-2">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <p className="text-muted-foreground p-3 bg-muted/50 rounded-lg">{user?.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <p className="text-muted-foreground p-3 bg-muted/50 rounded-lg">{user?.email}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" className="group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
