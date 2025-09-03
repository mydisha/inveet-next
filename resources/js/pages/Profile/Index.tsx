import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    Calendar,
    Camera,
    Check,
    Edit3,
    Heart,
    Mail,
    Settings,
    Shield,
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
  } | null;
}

export default function Profile({ user }: ProfileProps) {
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : '';

  return (
    <>
      <Head title="Profile" />

      <DashboardLayout user={user} currentPath="/profile">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary-light/5 to-background p-8 border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center relative overflow-hidden border-4 border-white shadow-lg">
                  {user?.email_verified_at ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  ) : (
                    <User className="w-16 h-16 text-primary/60" />
                  )}
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
                    {user?.email_verified_at ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <Check className="w-3 h-3 mr-1" />
                        Verified Account
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
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-container icon-gradient-2 group-hover:scale-110 transition-transform">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-container icon-gradient-3 group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Security</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-container icon-gradient-4 group-hover:scale-110 transition-transform">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Preferences</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    <Bell className="w-4 h-4 mr-2" />
                    Preferences
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email Status</span>
                  <Badge variant="secondary" className={user?.email_verified_at ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {user?.email_verified_at ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wedding Status</span>
                  <Badge variant="secondary" className={user?.hasWedding ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-800"}>
                    {user?.hasWedding ? "Has Wedding" : "No Wedding"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Quick Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile Information
                  </Button>
                </Link>
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </Link>
                <Link href="/settings/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
