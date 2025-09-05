import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/ui/page-header';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    Camera,
    Check,
    Edit3,
    Heart,
    Settings,
    Star,
    User
} from 'lucide-react';

interface ProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
    email_verified_at?: string;
    created_at: string;
    roles?: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function Profile({ user }: ProfileProps) {
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : '';

  // Check if user has admin roles to determine which layout to use
  const hasAdminRole = user?.roles?.some(role =>
    ['super-admin', 'admin', 'moderator'].includes(role.name)
  ) || false;

  // Choose the appropriate layout component
  const LayoutComponent = hasAdminRole ? BackofficeLayout : DashboardLayout;

  // Check if user is active (has verified email)
  const isActive = !!user?.email_verified_at;

  return (
    <>
      <Head title="Profile" />

      <LayoutComponent user={user} currentPath="/profile">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <PageHeader
            icon={User}
            title="Profile"
            description="Manage your account information and preferences"
          />

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary-light/5 to-background p-8 border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center relative overflow-hidden border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-primary/60" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{user?.name}</h1>
                    <p className="text-muted-foreground text-lg">{user?.email}</p>
                  </div>
                  <div className="flex flex-col md:items-end space-y-2 mt-4 md:mt-0">
                    {isActive ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                    {user?.hasWedding && (
                      <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-pink-200">
                        <Heart className="w-3 h-3 mr-1" />
                        Has Wedding
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile/edit">
              <Button className="px-8 py-3 text-lg">
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Profile
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/profile/preferences">
              <Button variant="outline" className="px-8 py-3 text-lg">
                <Settings className="w-5 h-5 mr-2" />
                Preferences
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Account Information */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Status</span>
                <Badge variant="secondary" className={isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Email Status</span>
                <Badge variant="secondary" className={isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {isActive ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wedding Status</span>
                <Badge variant="secondary" className={user?.hasWedding ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-800"}>
                  {user?.hasWedding ? "Has Wedding" : "No Wedding"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Member Since</span>
                <span className="text-foreground font-medium">{memberSince}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutComponent>
    </>
  );
}
