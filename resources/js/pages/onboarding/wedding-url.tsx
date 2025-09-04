import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Check, Globe, Link as LinkIcon, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeddingUrlProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function WeddingUrl({ user }: WeddingUrlProps) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    wedding_slug: '',
    custom_message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/onboarding/wedding-url', {
      onSuccess: () => {
        // Navigate to dashboard or success page
        window.location.href = '/dashboard';
      },
    });
  };

  const checkAvailability = async (slug: string) => {
    if (!slug || slug.length < 3) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    try {
      // Simulate API call to check availability
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock availability check - in real app, this would be an API call
      const unavailableSlugs = ['admin', 'api', 'www', 'test', 'demo', 'sample'];
      const isUnavailable = unavailableSlugs.includes(slug.toLowerCase());
      setIsAvailable(!isUnavailable);
    } catch (error) {
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data.wedding_slug) {
        checkAvailability(data.wedding_slug);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [data.wedding_slug]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSlugChange = (value: string) => {
    const slug = generateSlug(value);
    setData('wedding_slug', slug);
  };

  return (
    <OnboardingLayout
      title="Your Wedding URL 🌐"
      description="Create your personalized wedding invitation link"
      icon={Globe}
      steps={ONBOARDING_STEPS.main}
      currentStep="wedding-url"
      user={user}
      onSubmit={handleSubmit}
      submitLabel="Create Invitation"
      isSubmitting={processing}
      showBackButton={true}
      onBackClick={() => window.location.href = '/onboarding/design-selection'}
      maxWidth="2xl"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="card-elegant hover:shadow-2xl transition-all duration-300 mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="icon-container icon-gradient-4">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Wedding URL</CardTitle>
                <CardDescription>Create your personalized invitation link</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wedding_slug">Wedding URL *</Label>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center px-3 py-2 bg-muted border border-border rounded-l-md text-sm text-muted-foreground">
                        inveet.id/
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          id="wedding_slug"
                          type="text"
                          value={data.wedding_slug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          placeholder="john-and-jane"
                          className="rounded-l-none"
                        />
                        {isChecking && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        {!isChecking && data.wedding_slug && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {isAvailable === true && (
                              <Check className="w-4 h-4 text-green-600" />
                            )}
                            {isAvailable === false && (
                              <span className="text-red-600 text-sm">✗</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.wedding_slug && (
                      <p className="text-sm text-destructive">{errors.wedding_slug}</p>
                    )}
                    {data.wedding_slug && isAvailable === false && (
                      <p className="text-sm text-destructive">This URL is not available. Please try another one.</p>
                    )}
                    {data.wedding_slug && isAvailable === true && (
                      <p className="text-sm text-green-600">Great! This URL is available.</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Your invitation will be available at: <span className="font-mono text-primary">inveet.id/{data.wedding_slug || 'your-url'}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom_message">Custom Welcome Message</Label>
                    <Textarea
                      id="custom_message"
                      value={data.custom_message}
                      onChange={(e) => setData('custom_message', e.target.value)}
                      placeholder="Write a personal message for your guests..."
                      className="w-full min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      This message will appear on your invitation page
                    </p>
                  </div>
                </div>

                {/* URL Preview */}
                {data.wedding_slug && (
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Preview URL:</span>
                    </div>
                    <p className="font-mono text-sm text-primary break-all">
                      https://inveet.id/{data.wedding_slug}
                    </p>
                  </div>
                )}

            </form>
          </CardContent>
        </Card>

        {/* URL Tips */}
        <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="icon-container icon-gradient-5">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">URL Tips</CardTitle>
                <CardDescription>Make your URL memorable and easy to share</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Good Examples:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• john-and-jane</li>
                  <li>• sarah-mike-2024</li>
                  <li>• wedding-anna-david</li>
                  <li>• lisa-chris-celebration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use lowercase letters</li>
                  <li>• Use hyphens instead of spaces</li>
                  <li>• Keep it short and memorable</li>
                  <li>• Avoid special characters</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </OnboardingLayout>
  );
}
