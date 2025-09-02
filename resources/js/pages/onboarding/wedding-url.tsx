import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check, Globe, Link as LinkIcon, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeddingUrlProps {
  user?: {
    id: number;
    name: string;
    email: string;
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
      checkAvailability(data.wedding_slug);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [data.wedding_slug]);

  const generateSuggestions = () => {
    const suggestions = [
      'john-and-jane-2024',
      'alex-sarah-wedding',
      'mike-lisa-forever',
      'david-emily-2024',
      'tom-sophie-love',
    ];
    return suggestions;
  };

  return (
    <>
      <Head title="Wedding URL - Onboarding" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/inveet-logo.png"
                  alt="Inveet.Id"
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Wedding URL 🌐
              </h1>
              <p className="text-lg text-gray-600">
                Choose a unique URL for your wedding invitation
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Couple Info</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Location</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Design</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">URL</span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary mr-2" />
                  Wedding URL Setup
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your guests will access your invitation at this URL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL Input */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="wedding_slug" className="text-sm font-medium text-gray-700">
                        Wedding URL *
                      </Label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            https://
                          </span>
                          <Input
                            id="wedding_slug"
                            type="text"
                            value={data.wedding_slug}
                            onChange={(e) => setData('wedding_slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            className="rounded-l-none border-l-0"
                            placeholder="john-and-jane-2024"
                            required
                          />
                          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            .inveet.id
                          </span>
                        </div>

                        {/* Availability Status */}
                        {data.wedding_slug && (
                          <div className="mt-2 flex items-center">
                            {isChecking ? (
                              <div className="flex items-center text-sm text-gray-500">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                                Checking availability...
                              </div>
                            ) : isAvailable === true ? (
                              <div className="flex items-center text-sm text-green-600">
                                <Check className="h-4 w-4 mr-1" />
                                Available!
                              </div>
                            ) : isAvailable === false ? (
                              <div className="flex items-center text-sm text-red-600">
                                <span className="mr-1">✗</span>
                                Not available
                              </div>
                            ) : null}
                          </div>
                        )}

                        {errors.wedding_slug && (
                          <p className="mt-1 text-sm text-red-600">{errors.wedding_slug}</p>
                        )}
                      </div>
                    </div>

                    {/* URL Preview */}
                    {data.wedding_slug && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <LinkIcon className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Your invitation URL:</span>
                        </div>
                        <div className="text-sm text-primary font-mono">
                          https://{data.wedding_slug}.inveet.id
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Suggestions:
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {generateSuggestions().map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setData('wedding_slug', suggestion)}
                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom_message" className="text-sm font-medium text-gray-700">
                        Welcome Message
                      </Label>
                      <Input
                        id="custom_message"
                        type="text"
                        value={data.custom_message}
                        onChange={(e) => setData('custom_message', e.target.value)}
                        className="mt-1"
                        placeholder="Welcome to our special day!"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        This message will appear on your invitation page
                      </p>
                      {errors.custom_message && (
                        <p className="mt-1 text-sm text-red-600">{errors.custom_message}</p>
                      )}
                    </div>
                  </div>

                  {/* URL Guidelines */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">URL Guidelines:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Use only lowercase letters, numbers, and hyphens</li>
                          <li>• Must be at least 3 characters long</li>
                          <li>• Cannot start or end with a hyphen</li>
                          <li>• Choose something memorable for your guests</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-6">
                    <Link
                      href="/onboarding/design-selection"
                      className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Link>

                    <Button
                      type="submit"
                      disabled={processing || !data.wedding_slug || isAvailable === false}
                      className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Creating...' : 'Complete Setup'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Need help? Contact our support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
