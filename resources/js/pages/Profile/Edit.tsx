import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import StandardFormLayout, { StandardFormSection } from '@/components/dashboard/StandardFormLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/ui/page-header';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, Key, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface EditProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles?: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function EditProfile({ user }: EditProfileProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Check if user has admin roles to determine which layout to use
  const hasAdminRole = user?.roles?.some(role =>
    ['super-admin', 'admin', 'moderator'].includes(role.name)
  ) || false;

  // Choose the appropriate layout component
  const LayoutComponent = hasAdminRole ? BackofficeLayout : DashboardLayout;

  const { data: profileData, setData: setProfileData, patch: updateProfile, processing: profileProcessing, errors: profileErrors } = useForm({
    name: user?.name || '',
  });

  const { data: passwordData, setData: setPasswordData, put: updatePassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(route('profile.update'), {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
      },
      onError: (errors) => {
        console.error('Profile update errors:', errors);
        toast.error('Failed to update profile. Please check the errors and try again.');
      },
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(route('password.update'), {
      onSuccess: () => {
        resetPassword();
        toast.success('Password updated successfully!');
      },
      onError: (errors) => {
        console.error('Password update errors:', errors);
        toast.error('Failed to update password. Please check the errors and try again.');
      },
    });
  };

  return (
    <>
      <Head title="Edit Profile" />

      <LayoutComponent user={user} currentPath="/profile/edit">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <PageHeader
              icon={User}
              title="Edit Profile"
              description="Update your personal information and security settings"
            />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Profile</span>
            <span>/</span>
            <span className="text-foreground font-medium">Edit</span>
          </div>

          <StandardFormLayout
            title="Edit Profile"
            description="Update your personal information and security settings"
            onSubmit={handleProfileSubmit}
            submitLabel="Save Profile"
            isSubmitting={profileProcessing}
            icon={User}
            maxWidth="4xl"
          >
            <div className="space-y-8">
              {/* Profile Information Section */}
              <StandardFormSection
                title="Profile Information"
                description="Update your personal information"
                icon={User}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData('name', e.target.value)}
                      className={profileErrors.name ? 'border-red-500' : ''}
                    />
                    {profileErrors.name && (
                      <p className="text-sm text-red-500">{profileErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed. Contact support if you need to update your email.
                    </p>
                  </div>
                </div>
              </StandardFormSection>

            </div>
          </StandardFormLayout>

          {/* Password Change Form */}
          <StandardFormLayout
            title="Change Password"
            description="Update your account password"
            onSubmit={handlePasswordSubmit}
            submitLabel="Update Password"
            isSubmitting={passwordProcessing}
            icon={Key}
            maxWidth="4xl"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                    className={passwordErrors.current_password ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordErrors.current_password && (
                  <p className="text-sm text-red-500">{passwordErrors.current_password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.password}
                    onChange={(e) => setPasswordData('password', e.target.value)}
                    className={passwordErrors.password ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordErrors.password && (
                  <p className="text-sm text-red-500">{passwordErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    value={passwordData.password_confirmation}
                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                    className={passwordErrors.password_confirmation ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordErrors.password_confirmation && (
                  <p className="text-sm text-red-500">{passwordErrors.password_confirmation}</p>
                )}
              </div>
            </div>
          </StandardFormLayout>
        </div>
      </LayoutComponent>
    </>
  );
}
