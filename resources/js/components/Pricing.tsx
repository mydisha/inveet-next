import { Check, Star } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'GRATIS',
      price: 'Rp. 0',
      description: 'Paket gratis untuk mencoba fitur dasar',
      features: [
        'Edit Tanpa Batas',
        'Amplop Digital',
        'Hitung Mundur',
        'Quotes',
        'Background Music',
        'Masa Aktif 2 Hari'
      ],
      popular: false,
      cta: 'Pilih Paket',
      cardGradient: 'card-gradient-1'
    },
    {
      name: 'DIAMOND',
      price: 'Rp. 125.000',
      period: '',
      description: 'Paket premium dengan fitur terlengkap',
      features: [
        'Edit Tanpa Batas',
        'Amplop Digital',
        'Google Maps',
        'Compress Foto Otomatis',
        'Buku Tamu',
        'Nama Tamu Undangan',
        'Galeri Foto',
        'Share ke Whatsapp',
        'Live Streaming',
        'Embed Video Youtube',
        'Hitung Mundur',
        'Quotes',
        'Background Music',
        'Aktif Selamanya'
      ],
      popular: true,
      cta: 'Pilih Paket',
      cardGradient: 'card-gradient-2'
    },
    {
      name: 'PAKET SILVER',
      price: 'Rp. 79.000',
      period: '',
      description: 'Paket lengkap untuk pernikahanmu',
      features: [
        'Edit Tanpa Batas',
        'Amplop Digital',
        'Google Maps',
        'Hitung Mundur',
        'Quotes',
        'Background Music',
        'Aktif Selamanya'
      ],
      popular: false,
      cta: 'Pilih Paket',
      cardGradient: 'card-gradient-3'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Harga Undangan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Pilih paket undangan pernikahan online sesuai dengan kebutuhanmu
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tenang harganya terjangkau banget 😉 Mulai dari gratis hingga fitur lengkap
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`stagger-animation comfort-card relative rounded-3xl p-6 md:p-8 gradient-card-optimized w-full ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary ring-4 ring-primary/20 shadow-2xl animate-glow-pulse'
                  : `${plan.cardGradient} border border-border shadow-lg`
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-medium flex items-center justify-center space-x-2 shadow-lg z-10 animate-bounce-gentle">
                  <Star className="w-4 h-4 fill-current animate-wiggle" />
                  <span>Diminati</span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-card-foreground">
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
                className={`w-full comfort-button ${
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
