import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import StandardFormLayout, { StandardFormSection } from '@/components/dashboard/StandardFormLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Globe, Moon, Settings, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PreferencesProps {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    language?: string;
    theme?: 'light' | 'dark' | 'system';
    roles?: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function Preferences({ user }: PreferencesProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if user has admin roles to determine which layout to use
  const hasAdminRole = user?.roles?.some(role =>
    ['super-admin', 'admin', 'moderator'].includes(role.name)
  ) || false;

  // Choose the appropriate layout component
  const LayoutComponent = hasAdminRole ? BackofficeLayout : DashboardLayout;

  const { data: preferencesData, setData: setPreferencesData, patch: updatePreferences, processing: preferencesProcessing } = useForm({
    language: user?.language || 'en',
    theme: user?.theme || 'system',
  });

  // Initialize dark mode from user preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setPreferencesData('theme', checked ? 'dark' : 'light');
  };

  const handleLanguageChange = (value: string) => {
    setPreferencesData('language', value);
  };

  const handlePreferencesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(route('preferences.update'), {
      onSuccess: () => {
        // Preferences updated successfully
      },
    });
  };

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
    { value: 'ms', label: 'Bahasa Malaysia', flag: '🇲🇾' },
  ];

  return (
    <>
      <Head title="User Preferences" />

      <LayoutComponent user={user} currentPath="/profile/preferences">
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
              icon={Settings}
              title="User Preferences"
              description="Customize your experience and application settings"
            />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Profile</span>
            <span>/</span>
            <span className="text-foreground font-medium">Preferences</span>
          </div>

          <StandardFormLayout
            key={`preferences-${isDarkMode ? 'dark' : 'light'}`}
            title="User Preferences"
            description="Customize your experience and application settings"
            onSubmit={handlePreferencesUpdate}
            submitLabel="Save Preferences"
            isSubmitting={preferencesProcessing}
            icon={Settings}
            maxWidth="4xl"
          >
            <div className="space-y-8">
              {/* Language Settings Section */}
              <StandardFormSection
                key={`language-${isDarkMode ? 'dark' : 'light'}`}
                title="Language Settings"
                description="Choose your preferred language for the interface"
                icon={Globe}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={preferencesData.language} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <div className="flex items-center space-x-2">
                              <span>{lang.flag}</span>
                              <span>{lang.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </StandardFormSection>

              {/* Theme Settings Section */}
              <StandardFormSection
                key={`theme-${isDarkMode ? 'dark' : 'light'}`}
                title="Theme Settings"
                description="Customize the appearance of your interface"
                icon={isDarkMode ? Moon : Sun}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={isDarkMode}
                      onCheckedChange={handleThemeToggle}
                    />
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 border border-muted">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Current Theme</p>
                      <p className="text-sm text-muted-foreground">
                        {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isDarkMode ? (
                        <Moon className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              </StandardFormSection>

              {/* Additional Settings Section */}
              <StandardFormSection
                key={`additional-${isDarkMode ? 'dark' : 'light'}`}
                title="Additional Settings"
                description="More customization options for your account"
                icon={Settings}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      defaultChecked={true}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional content and updates
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </StandardFormSection>
            </div>
          </StandardFormLayout>
        </div>
      </LayoutComponent>
    </>
  );
}
