import { Check, Star } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Gratis',
      price: 'Rp 0',
      description: 'Coba fitur dasar Wedew',
      features: [
        '1 Undangan Digital',
        'Template Dasar',
        'Share via WhatsApp',
        'Analytics Dasar',
        'Support Email'
      ],
      popular: false,
      cta: 'Mulai Gratis'
    },
    {
      name: 'Premium',
      price: 'Rp 99.000',
      period: '/bulan',
      description: 'Paket lengkap untuk pernikahanmu',
      features: [
        'Unlimited Undangan',
        'Template Premium',
        'Auto Send WhatsApp',
        'RSVP Tracking',
        'Manajemen Tamu',
        'Analytics Lengkap',
        'Support Prioritas',
        'Custom Domain',
        'Background Music',
        'Foto Galeri',
        'Ucapan & Doa',
        'Peta Lokasi'
      ],
      popular: true,
      cta: 'Mulai Premium'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Solusi khusus untuk event besar',
      features: [
        'Semua fitur Premium',
        'Custom Design',
        'White Label',
        'API Access',
        'Dedicated Manager',
        'Support 24/7',
        'Custom Integrations',
        'Advanced Security',
        'Multiple Events',
        'Branding Custom'
      ],
      popular: false,
      cta: 'Hubungi Kami'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Pilih Paket yang
            <br />
            <span className="text-gradient-primary">Sesuai Budget</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mulai dari gratis hingga fitur lengkap. Semua paket sudah termasuk hosting dan support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary ring-4 ring-primary/20'
                  : 'bg-card border border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-card-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground text-lg">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-glow'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-8 py-4 border border-primary/20">
            <span className="text-lg font-medium">Butuh paket khusus?</span>
            <Button variant="outline" className="rounded-full">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
