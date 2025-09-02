import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Globe, Heart, MapPin, Palette } from 'lucide-react';
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

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/inveet-logo.png"
                  alt="Inveet.Id"
                  className="h-16 w-auto"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Inveet! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Let's create your beautiful wedding invitation
              </p>
              <p className="text-lg text-gray-500">
                We'll guide you through a few simple steps to get started
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="relative"
                  >
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: 'calc(100% - 2rem)' }}>
                        <div className="absolute top-0 left-0 w-0 h-full bg-primary transition-all duration-500" style={{ width: currentStep > step.id ? '100%' : '0%' }}></div>
                      </div>
                    )}

                    <div className="relative z-10 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group cursor-pointer">
                      <div className="mb-4">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary-glow/30 transition-all duration-300`}>
                          <Icon className={`h-8 w-8 ${step.color}`} />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4">
                        {step.description}
                      </p>

                      <div className="flex items-center justify-center">
                        <span className="text-xs font-medium text-primary group-hover:text-primary-glow transition-colors">
                          Step {step.id}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start Button */}
            <div className="text-center">
              <Link
                href="/onboarding/couple-info"
                className="inline-flex items-center bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Creating Your Invitation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Setup</h3>
                <p className="text-gray-600">Simple step-by-step process to create your invitation</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Beautiful Designs</h3>
                <p className="text-gray-600">Choose from our collection of stunning templates</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom URL</h3>
                <p className="text-gray-600">Get your own personalized invitation link</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12">
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
