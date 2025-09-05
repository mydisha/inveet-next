import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Home, Shield } from 'lucide-react';

interface ForbiddenProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  message?: string;
  requiredRole?: string;
  currentRole?: string;
}

export default function Forbidden({
  user,
  message = "You don't have permission to access this page.",
  requiredRole,
  currentRole
}: ForbiddenProps) {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'Super Administrator';
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      case 'customer':
        return 'Customer';
      case 'guest':
        return 'Guest';
      default:
        return role;
    }
  };

  const getRedirectPath = () => {
    if (!user) return '/login';

    const userRoles = user.roles?.map(role => role.name) || [];

    // If user has admin roles, redirect to backoffice
    if (userRoles.some(role => ['super-admin', 'admin', 'moderator'].includes(role))) {
      return '/backoffice';
    }

    // If user has customer role, redirect to dashboard
    if (userRoles.includes('customer')) {
      return '/dashboard';
    }

    // Default fallback
    return '/dashboard';
  };

  return (
    <>
      <Head title="Access Forbidden" />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-red-100/20 font-inter flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="shape-float-1 top-20 right-20 w-32 h-32 bg-red-100/30" style={{ animationDelay: '0s' }}></div>
          <div className="shape-float-2 bottom-32 left-16 w-24 h-24 bg-red-200/20" style={{ animationDelay: '2s' }}></div>
          <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16 bg-red-300/20" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Card className="card-elegant border-red-200/50 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-inter-bold text-foreground">
                Access Forbidden
              </CardTitle>
              <CardDescription className="text-muted-foreground font-inter-normal">
                {message}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Information */}
              {(requiredRole || currentRole) && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-inter-medium text-foreground">Access Information</span>
                  </div>

                  {currentRole && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Your role: </span>
                      <span className="font-inter-medium text-foreground">
                        {getRoleDisplayName(currentRole)}
                      </span>
                    </div>
                  )}

                  {requiredRole && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Required role: </span>
                      <span className="font-inter-medium text-red-600">
                        {getRoleDisplayName(requiredRole)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href={getRedirectPath()}>
                    <Home className="w-4 h-4 mr-2" />
                    Go to {user?.roles?.[0]?.name === 'customer' ? 'Dashboard' : 'Backoffice'}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  If you believe this is an error, please contact your administrator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
