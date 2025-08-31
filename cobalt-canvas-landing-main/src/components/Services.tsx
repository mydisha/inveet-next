import { Smartphone, Users, Calendar, Gift, Zap, HeartHandshake, Send, BarChart3 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: 'Digital Invitations',
      description: 'Beautiful, interactive digital wedding invitations that can be shared instantly via WhatsApp, email, or social media.',
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Send,
      title: 'Auto Send',
      description: 'Automated invitation delivery via WhatsApp, email, and social media with personalized messages.',
      gradient: 'from-accent to-warm',
      featured: true
    },
    {
      icon: BarChart3,
      title: 'RSVP Track',
      description: 'Real-time RSVP tracking with comprehensive analytics and guest response management.',
      gradient: 'from-warm to-primary',
      featured: true
    },
    {
      icon: Users,
      title: 'Guest Management',
      description: 'Comprehensive guest list management with RSVP tracking, dietary preferences, and contact information.',
      gradient: 'from-primary-glow to-accent'
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'Complete wedding timeline management with vendor coordination and milestone tracking.',
      gradient: 'from-accent to-primary-glow'
    },
    {
      icon: Gift,
      title: 'Gift Registry',
      description: 'Modern gift registry system with wish lists, thank you note automation, and gift tracking.',
      gradient: 'from-primary to-warm'
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automated reminders, follow-ups, and notifications to keep your wedding planning stress-free.',
      gradient: 'from-warm to-accent'
    },
    {
      icon: HeartHandshake,
      title: 'Guest Experience',
      description: 'Enhanced guest experience with interactive features, photo sharing, and real-time updates.',
      gradient: 'from-primary-glow to-primary'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Semua lebih praktis
            <br />
            <span className="text-gradient-primary">#bersamaWedew</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bagaimana Wedew bisa mempermudah pernikahanmu dari awal hingga akhir.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`card-elegant group cursor-pointer ${service.featured ? 'ring-2 ring-accent' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    ✨ Featured
                  </div>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-8 py-4 border border-primary/20">
            <span className="text-lg font-medium">Ready to get started?</span>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-glow transition-colors duration-300">
              Explore All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;