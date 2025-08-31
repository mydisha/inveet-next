import { Check, Star, Zap, Crown, Heart } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for couples just getting started',
      icon: <Heart className="w-6 h-6" />,
      features: [
        '1 wedding invitation',
        'Basic templates',
        'Guest list (up to 50)',
        'Basic RSVP tracking',
        'Email support'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Premium',
      price: '$29',
      period: '/month',
      description: 'Most popular choice for modern couples',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Unlimited invitations',
        'Premium templates',
        'Guest list (up to 500)',
        'Advanced RSVP tracking',
        'WhatsApp integration',
        'Analytics dashboard',
        'Priority support'
      ],
      popular: true,
      cta: 'Start Premium Trial'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large weddings and events',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'Everything in Premium',
        'Unlimited guest list',
        'Custom branding',
        'White-label options',
        'API access',
        'Dedicated manager',
        '24/7 phone support'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the Perfect
            <br />
            <span className="text-yellow-600">Plan for Your Wedding</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as you need. All plans include our core features 
            with no hidden fees or surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ring-4 ring-yellow-300' 
                  : 'bg-white border border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-medium">
                  ✨ Most Popular
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto ${
                  plan.popular 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      plan.popular ? 'text-white' : 'text-blue-600'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-white text-blue-600 hover:bg-white/90' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-blue-100 rounded-3xl p-8 border border-yellow-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-lg px-8 py-4">
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 bg-transparent px-8 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
              >
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;