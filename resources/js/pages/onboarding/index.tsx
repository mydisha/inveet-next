import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Clock, Globe, Heart, Palette, Shield, Sparkles, Star, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Auto-redirect to the appropriate step if user has already started onboarding
    if (currentStep > 1) {
      const steps = [
        '/onboarding/couple-info',
        '/onboarding/design-selection',
        '/onboarding/wedding-url'
      ];
      window.location.href = steps[currentStep - 1];
    }

    // Trigger entrance animations
    setTimeout(() => setIsLoaded(true), 100);
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: 'Couple & Wedding Details',
      description: 'Tell us about the couple and wedding information',
      icon: Heart,
      href: '/onboarding/couple-info',
      color: 'text-primary',
      gradient: 'card-gradient-1',
      iconGradient: 'icon-gradient-1',
      estimatedTime: '4 min'
    },
    {
      id: 2,
      title: 'Design Selection',
      description: 'Choose your perfect invitation design',
      icon: Palette,
      href: '/onboarding/design-selection',
      color: 'text-primary',
      gradient: 'card-gradient-2',
      iconGradient: 'icon-gradient-2',
      estimatedTime: '3 min'
    },
    {
      id: 3,
      title: 'Wedding URL',
      description: 'Create your unique invitation link',
      icon: Globe,
      href: '/onboarding/wedding-url',
      color: 'text-primary',
      gradient: 'card-gradient-3',
      iconGradient: 'icon-gradient-3',
      estimatedTime: '1 min'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create your invitation in under 10 minutes',
      gradient: 'icon-gradient-1'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security',
      gradient: 'icon-gradient-2'
    },
    {
      icon: Users,
      title: 'Guest Management',
      description: 'Track RSVPs and manage your guest list effortlessly',
      gradient: 'icon-gradient-3'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Beautiful designs that impress your guests',
      gradient: 'icon-gradient-4'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Couples' },
    { number: '50K+', label: 'Invitations Sent' },
    { number: '4.9★', label: 'User Rating' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <>
      <Head title="Welcome to Inveet - Onboarding" />

      <DashboardLayout user={user || null} currentPath="/onboarding">
        {/* Modern Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
            <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
            <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
            <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-10" style={{ animationDelay: '1s' }}></div>
            <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-10" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Hero Content */}
          <div className={`relative z-10 text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="icon-container icon-gradient-1 mr-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
                Welcome to Inveet
              </h1>
            </div>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's create your beautiful wedding invitation together. Our guided process makes it simple and enjoyable.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps Grid with Modern Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.id}
                className={`${step.gradient} card-elegant comfort-card cursor-pointer group relative overflow-hidden transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className={`icon-container mx-auto mb-4 ${step.iconGradient} group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg mb-2 font-semibold">{step.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.estimatedTime}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <Link href={step.href}>
                    <Button
                      variant={currentStep > step.id ? "outline" : "default"}
                      className="w-full comfort-button group-hover:scale-105 transition-all duration-300"
                    >
                      {currentStep > step.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : currentStep === step.id ? (
                        <>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          Start Step
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main CTA */}
        <div className={`text-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <Link href="/onboarding/couple-info">
            <Button className="btn-hero comfort-button text-lg px-12 py-6">
              <Sparkles className="w-5 h-5 mr-3" />
              Start Creating Your Invitation
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Takes less than 10 minutes • No credit card required
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <div className={`text-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Choose Inveet?</h2>
            <p className="text-muted-foreground">Everything you need to create the perfect wedding invitation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="card-elegant comfort-card text-center group relative overflow-hidden transition-all duration-500"
                  style={{
                    transitionDelay: `${800 + index * 100}ms`,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-3 relative z-10">
                    <div className={`icon-container ${feature.gradient} mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1200ms' }}>
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">10K+ Happy Couples</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className={`text-center mt-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1400ms' }}>
          <p className="text-sm text-muted-foreground mb-2">
            Need help getting started?
          </p>
          <Link href="/support" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Contact our support team
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}
