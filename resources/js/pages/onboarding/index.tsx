import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'couple-info',
      title: 'Couple Information',
      description: 'Tell us about yourselves',
      icon: '👰‍♀️🤵‍♂️',
      path: '/onboarding/couple-info'
    },
    {
      id: 'wedding-details',
      title: 'Wedding Details',
      description: 'Venue, date, and time',
      icon: '🏛️',
      path: '/onboarding/wedding-details'
    },
    {
      id: 'custom-url',
      title: 'Custom URL',
      description: 'Choose your invitation link',
      icon: '🔗',
      path: '/onboarding/custom-url'
    },
    {
      id: 'design-selection',
      title: 'Design Selection',
      description: 'Pick your perfect template',
      icon: '🎨',
      path: '/onboarding/design-selection'
    },
    {
      id: 'activation',
      title: 'Activation',
      description: 'Final setup and launch',
      icon: '✨',
      path: '/onboarding/activation'
    }
  ];

  return (
    <div className="min-h-screen bg-wedding-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <img
              src="/inveet-logo.png"
              alt="Inveet.Id"
              className="h-10 w-auto"
            />
          </div>

          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Let's Create Your Wedding Invitation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'll guide you through each step to create a beautiful, personalized digital invitation for your special day.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep
                      ? 'bg-rose-gold text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="text-lg">{step.icon}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index < currentStep ? 'bg-rose-gold' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`border-2 transition-all hover:shadow-lg ${
                index === currentStep
                  ? 'border-rose-gold bg-rose-gold/5'
                  : index < currentStep
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      index === currentStep
                        ? 'bg-rose-gold text-white'
                        : index < currentStep
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <span>{step.icon}</span>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${
                        index === currentStep ? 'text-rose-gold' : 'text-gray-800'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {index < currentStep && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                    {index === currentStep && (
                      <span className="text-rose-gold text-sm font-medium">Current Step</span>
                    )}
                    {index > currentStep && (
                      <span className="text-gray-400 text-sm">Upcoming</span>
                    )}

                    <Link href={step.path}>
                      <Button
                        variant={index === currentStep ? "default" : "outline"}
                        className={index === currentStep
                          ? 'bg-rose-gold hover:bg-rose-gold/90'
                          : 'border-gray-300 text-gray-600 hover:border-rose-gold hover:text-rose-gold'
                        }
                        disabled={index > currentStep}
                      >
                        {index < currentStep ? 'Edit' : index === currentStep ? 'Start' : 'Locked'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-soft-pink/20 to-sage/20 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Begin with the first step to create your beautiful wedding invitation.
                You can always come back and edit any section later.
              </p>
              <Link href="/onboarding/couple-info">
                <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-4">
                  Start with Couple Information
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
