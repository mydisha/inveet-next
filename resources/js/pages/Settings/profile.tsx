import DashboardLayout from '@/components/layout/DashboardLayout';
import StandardFormLayout, { StandardInput, StandardFormSection } from '@/components/dashboard/StandardFormLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Bell,
    Camera,
    Check,
    Edit3,
    Eye,
    EyeOff,
    Key,
    Save,
    Shield,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

interface ProfileProps {
  mustVerifyEmail: boolean;
  status?: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo_path?: string;
    created_at: string;
  };
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Profile({ mustVerifyEmail, status, user }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [showPhotoCropper, setShowPhotoCropper] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profileData, setData: setProfileData, patch: updateProfile, processing: profileProcessing, errors: profileErrors } = useForm({
    name: user.name || '',
    email: user.email || '',
    profile_photo: null as File | null,
  });

  const { data: passwordData, setData: setPasswordData, put: updatePassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const { data: preferencesData, setData: setPreferencesData, patch: updatePreferences, processing: preferencesProcessing } = useForm({
    email_notifications: true,
    marketing_emails: false,
    profile_visibility: 'private',
    language: 'en',
  });

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
        setShowPhotoCropper(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onCropComplete = useCallback((croppedArea: CropArea, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSavePhoto = useCallback(async () => {
    if (croppedAreaPixels && photoPreview) {
      // Here you would typically crop and upload the image
      // For now, we'll just close the cropper
      setShowPhotoCropper(false);
      setPhotoPreview('');
      // Update profile with new photo
      setProfileData('profile_photo', fileInputRef.current?.files?.[0] || null);
    }
  }, [croppedAreaPixels, photoPreview, setProfileData]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(route('profile.update'), {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(route('password.update'), {
      onSuccess: () => {
        resetPassword();
      },
    });
  };

  const handlePreferencesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(route('preferences.update'));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell },
  ];

  return (
    <>
      <Head title="Profile Settings" />

      <DashboardLayout user={user} currentPath="/settings/profile">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center relative overflow-hidden group">
                {user.profile_photo_path ? (
                  <img
                    src={user.profile_photo_path}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-primary/60" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              {user.email_verified_at ? (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 border-green-200">
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unverified
                </Badge>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="flex bg-muted/50 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'profile' && (
              <StandardFormLayout
                title="Personal Information"
                description="Update your personal details and profile information"
                onSubmit={isEditing ? handleProfileUpdate : undefined}
                onCancel={isEditing ? () => setIsEditing(false) : undefined}
                submitLabel="Save Changes"
                cancelLabel="Cancel"
                isSubmitting={profileProcessing}
                icon={User}
                maxWidth="2xl"
              >
                <div className="flex items-center justify-end mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="group"
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isEditing ? (
                    <>
                      <StandardInput
                        label="Full Name"
                        id="name"
                        value={profileData.name}
                        onChange={(value) => setProfileData('name', value)}
                        error={profileErrors.name}
                      />
                      <StandardInput
                        label="Email Address"
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(value) => setProfileData('email', value)}
                        error={profileErrors.email}
                      />
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Full Name</Label>
                        <div className="p-3 bg-muted/50 rounded-lg text-foreground">
                          {user.name}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Email Address</Label>
                        <div className="p-3 bg-muted/50 rounded-lg text-foreground">
                          {user.email}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </StandardFormLayout>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="w-5 h-5" />
                      <span>Change Password</span>
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
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
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
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
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
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
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                          >
                            {showPasswordConfirmation ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        {passwordErrors.password_confirmation && (
                          <p className="text-sm text-red-500">{passwordErrors.password_confirmation}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={passwordProcessing}
                        className="w-full group"
                      >
                        {passwordProcessing ? (
                          <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="card-elegant border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <Trash2 className="w-5 h-5" />
                      <span>Danger Zone</span>
                    </CardTitle>
                    <CardDescription>
                      Permanently delete your account and all associated data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="group">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'preferences' && (
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email_notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          id="email_notifications"
                          checked={preferencesData.email_notifications}
                          onChange={(e) => setPreferencesData('email_notifications', e.target.checked)}
                          className="w-4 h-4 text-primary bg-background border-input rounded focus:ring-primary"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing_emails">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional content and special offers
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          id="marketing_emails"
                          checked={preferencesData.marketing_emails}
                          onChange={(e) => setPreferencesData('marketing_emails', e.target.checked)}
                          className="w-4 h-4 text-primary bg-background border-input rounded focus:ring-primary"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="profile_visibility">Profile Visibility</Label>
                        <select
                          id="profile_visibility"
                          value={preferencesData.profile_visibility}
                          onChange={(e) => setPreferencesData('profile_visibility', e.target.value)}
                          className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                        >
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                          <option value="public">Public</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          value={preferencesData.language}
                          onChange={(e) => setPreferencesData('language', e.target.value)}
                          className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                        >
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={preferencesProcessing}
                      className="w-full group"
                    >
                      {preferencesProcessing ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Photo Cropper Modal */}
        {showPhotoCropper && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg p-6 max-w-md w-full">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Crop Profile Photo</h3>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                  <Cropper
                    image={photoPreview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    showGrid={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoom">Zoom</Label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowPhotoCropper(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSavePhoto}>
                    Save Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
