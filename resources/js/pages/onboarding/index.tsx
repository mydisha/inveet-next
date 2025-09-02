import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Globe, Heart, MapPin, Palette, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface OnboardingIndexProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  currentStep?: number;
}

export default function OnboardingIndex({ user, currentStep = 1 }: OnboardingIndexProps) {
  useEffect(() => {
    // Auto-redirect to the appropriate step if user has already started onboarding
    if (currentStep > 1) {
      const steps = [
        '/onboarding/couple-info',
        '/onboarding/wedding-location',
        '/onboarding/design-selection',
        '/onboarding/wedding-url'
      ];
      window.location.href = steps[currentStep - 1];
    }
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: 'Couple Information',
      description: 'Tell us about the bride and groom',
      icon: Heart,
      href: '/onboarding/couple-info',
      color: 'text-primary'
    },
    {
      id: 2,
      title: 'Wedding Location',
      description: 'Where will your special day take place?',
      icon: MapPin,
      href: '/onboarding/wedding-location',
      color: 'text-primary'
    },
    {
      id: 3,
      title: 'Design Selection',
      description: 'Choose your perfect invitation design',
      icon: Palette,
      href: '/onboarding/design-selection',
      color: 'text-primary'
    },
    {
      id: 4,
      title: 'Wedding URL',
      description: 'Create your unique invitation link',
      icon: Globe,
      href: '/onboarding/wedding-url',
      color: 'text-primary'
    }
  ];

  return (
    <>
      <Head title="Welcome to Inveet - Onboarding" />

      <DashboardLayout user={user || null} currentPath="/onboarding">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Inveet! 🎉
          </h1>
          <p className="text-muted-foreground">
            Let's create your beautiful wedding invitation. We'll guide you through a few simple steps to get started.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex flex-col items-center text-center">
                    <div className={`icon-container mx-auto mb-4 ${
                      currentStep >= step.id
                        ? 'icon-gradient-1 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={step.href}>
                    <Button
                      variant={currentStep > step.id ? "outline" : "default"}
                      className="w-full group-hover:scale-105 transition-transform"
                    >
                      {currentStep > step.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : currentStep === step.id ? (
                        <>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Start Step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="text-center mb-8">
          <Link href="/onboarding/couple-info">
            <Button className="btn-hero">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Creating Your Invitation
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 text-center group">
            <CardHeader className="pb-3">
              <div className="icon-container icon-gradient-2 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Easy Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Simple step-by-step process to create your invitation</CardDescription>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 text-center group">
            <CardHeader className="pb-3">
              <div className="icon-container icon-gradient-3 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Palette className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Beautiful Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Choose from our collection of stunning templates</CardDescription>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 text-center group">
            <CardHeader className="pb-3">
              <div className="icon-container icon-gradient-4 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Custom URL</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get your own personalized invitation link</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team
          </p>
        </div>
      </DashboardLayout>
    </>
  );
}
