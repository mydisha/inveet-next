import { Head } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useTheme } from '../../contexts/ThemeContext';

interface AppearanceProps {
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
}

export default function Appearance({ user }: AppearanceProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light',
      description: 'Always use light mode',
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      description: 'Always use dark mode',
      icon: Moon,
    },
    {
      value: 'system' as const,
      label: 'System',
      description: 'Use system preference',
      icon: Monitor,
    },
  ];

  return (
    <DashboardLayout user={user} currentPath="/settings/appearance">
      <Head title="Appearance Settings" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Appearance</h1>
          <p className="text-muted-foreground">
            Customize how the application looks and feels
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preference</CardTitle>
            <CardDescription>
              Choose your preferred theme. You can also use the toggle in the sidebar for quick access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;

                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-6 flex flex-col items-center space-y-3 ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setTheme(option.value)}
                  >
                    <Icon className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-70 mt-1">
                        {option.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Current theme:</span>
                <span className="font-medium capitalize">{resolvedTheme}</span>
                {theme === 'system' && (
                  <span className="text-xs">(following system preference)</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
