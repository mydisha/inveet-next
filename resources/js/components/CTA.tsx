import { ArrowRight, Heart, Star, Users, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const CTA = () => {
  const benefits = [
    'Beautiful digital invitations',
    'Guest list management',
    'RSVP tracking',
    'WhatsApp integration',
    'Analytics dashboard',
    '24/7 support'
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Heart className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white/90 text-sm font-medium">
                Limited Time Offer
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Create Your
              <br />
              <span className="text-yellow-400">Perfect Wedding?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Join thousands of happy couples who have already made their special day 
              unforgettable with our digital wedding platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-4 group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 rating from 10K+ couples</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Trusted by 50K+ users worldwide</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              No Credit Card Required
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Start your free trial today and experience the difference. 
              You can upgrade or cancel anytime with no commitment.
            </p>
            <Button className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400/90 text-lg px-8 py-4">
              Get Started Now - It's Free!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;