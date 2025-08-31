import { Check, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from './ui/button';

const Services = () => {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Digital Invitations',
      description: 'Beautiful, customizable e-invitations that match your wedding theme perfectly.',
      features: ['Multiple design templates', 'Custom branding', 'RSVP tracking', 'Social media sharing']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Guest Management',
      description: 'Easily manage your guest list, RSVPs, and communication all in one place.',
      features: ['Guest list organization', 'RSVP collection', 'Email notifications', 'Guest categories']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Automated Features',
      description: 'Save time with automated reminders, thank you messages, and follow-ups.',
      features: ['Auto-reminders', 'Thank you messages', 'Follow-up emails', 'Schedule management']
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for a
            <br />
            <span className="text-blue-600">Perfect Wedding</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From digital invitations to guest management, we provide comprehensive solutions 
            that make wedding planning effortless and enjoyable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group hover:border-blue-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 group-hover:scale-105 transition-transform duration-300">
                Learn More
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-100 to-yellow-100 rounded-3xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Wedding Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of happy couples who have made their special day unforgettable with our platform.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-lg px-8 py-4">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;