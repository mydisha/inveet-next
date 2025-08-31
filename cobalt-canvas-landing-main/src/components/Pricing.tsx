import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Gratis',
      originalPrice: null,
      description: 'Perfect untuk pernikahan intimate',
      icon: Star,
      popular: false,
      features: [
        'Basic digital invitation template',
        'Up to 50 guests',
        'RSVP tracking',
        'Basic guest management',
        'WhatsApp sharing',
        'Mobile responsive design'
      ],
      buttonText: 'Mulai Gratis',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Premium',
      price: 'Rp 299K',
      originalPrice: 'Rp 499K',
      description: 'Most popular untuk pernikahan modern',
      icon: Crown,
      popular: true,
      features: [
        'All Starter features',
        'Up to 200 guests',
        'Premium design templates',
        'Custom branding & colors',
        'Gift registry integration',
        'Auto reminder notifications',
        'Guest photo gallery',
        'Analytics dashboard',
        'Priority support'
      ],
      buttonText: 'Pilih Premium',
      buttonVariant: 'default' as const
    },
    {
      name: 'Ultimate',
      price: 'Rp 599K',
      originalPrice: 'Rp 899K',
      description: 'Complete solution untuk grand wedding',
      icon: Zap,
      popular: false,
      features: [
        'All Premium features',
        'Unlimited guests',
        'Custom invitation design',
        'Multiple event management',
        'Advanced RSVP options',
        'Seating arrangement tools',
        'Live streaming integration',
        'Wedding website builder',
        'Vendor management system',
        'Dedicated wedding planner'
      ],
      buttonText: 'Pilih Ultimate',
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Pilih paket yang
            <br />
            <span className="text-gradient-primary">sesuai bugetmu</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Harga transparan tanpa biaya tersembunyi. Upgrade atau downgrade kapan saja.
          </p>
          
          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-accent/20 to-warm/20 border border-accent/30 rounded-2xl p-4 max-w-md mx-auto mt-8">
            <div className="text-accent-foreground text-sm font-medium">
              🎉 Early Bird Special - Save up to 40%
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative card-elegant ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center space-y-4 mb-8">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${plan.popular ? 'from-primary to-primary-glow' : 'from-accent to-warm'} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                      )}
                    </div>
                    {plan.price !== 'Gratis' && (
                      <div className="text-muted-foreground text-sm">Per pernikahan</div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-glow' : ''}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                {/* Background Gradient */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Tim customer service kami siap membantu kamu 24/7
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;