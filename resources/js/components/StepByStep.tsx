import { CheckCircle, ArrowRight, Sparkles, Heart, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const StepByStep = () => {
  const steps = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Choose Your Design',
      description: 'Browse our collection of beautiful wedding invitation templates and select the one that matches your style.',
      duration: '5 minutes',
      features: ['100+ templates', 'Customizable colors', 'Preview mode', 'Instant download']
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Personalize Your Invitation',
      description: 'Add your personal details, wedding information, and customize the design to make it uniquely yours.',
      duration: '10 minutes',
      features: ['Personal details', 'Wedding info', 'Custom text', 'Photo uploads']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Manage Your Guest List',
      description: 'Import or create your guest list, organize contacts, and set up RSVP tracking for your special day.',
      duration: '15 minutes',
      features: ['Guest import', 'RSVP tracking', 'Contact management', 'Categories']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Send & Track',
      description: 'Send invitations via WhatsApp, email, or social media, and track responses in real-time.',
      duration: '5 minutes',
      features: ['Multi-platform sending', 'Real-time tracking', 'Auto-reminders', 'Analytics']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Steps to
            <br />
            <span className="text-blue-600">Perfect Invitations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Creating beautiful digital wedding invitations has never been easier. 
            Follow these simple steps and have your invitations ready in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                    {step.icon}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                    <span>⏱</span>
                    <span>{step.duration}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 text-sm text-gray-600">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2 z-20">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-100 to-yellow-100 rounded-3xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of couples who have already created their perfect wedding invitations with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-lg px-8 py-4">
                Start Creating Now
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 bg-transparent px-8 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepByStep;