import { Check, X, Star, Crown, Gift, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface Feature {
  name: string;
  description?: string;
  free: boolean;
  silver: boolean;
  diamond: boolean;
  highlight?: boolean;
}

const ComparisonTable = () => {
  const features: Feature[] = [
    {
      name: 'Edit Tanpa Batas',
      description: 'Ubah konten undangan kapan saja tanpa batas',
      free: true,
      silver: true,
      diamond: true,
      highlight: true
    },
    {
      name: 'Template Desain',
      description: 'Pilihan template yang bisa dikustomisasi',
      free: true,
      silver: true,
      diamond: true
    },
    {
      name: 'Background Music',
      description: 'Tambahkan musik latar romantis',
      free: true,
      silver: true,
      diamond: true
    },
    {
      name: 'Hitung Mundur',
      description: 'Countdown timer otomatis',
      free: true,
      silver: true,
      diamond: true
    },
    {
      name: 'Quotes & Caption',
      description: 'Tambah kata-kata romantis',
      free: true,
      silver: true,
      diamond: true
    },
    {
      name: 'Amplop Digital',
      description: 'Terima hadiah dari tamu',
      free: true,
      silver: true,
      diamond: true
    },
    {
      name: 'Google Maps',
      description: 'Peta lokasi acara dengan petunjuk arah',
      free: false,
      silver: true,
      diamond: true,
      highlight: true
    },
    {
      name: 'Galeri Foto',
      description: 'Tampilkan foto pre-wedding dan momen spesial',
      free: false,
      silver: false,
      diamond: true,
      highlight: true
    },
    {
      name: 'Buku Tamu',
      description: 'Kumpulkan ucapan dan doa dari tamu',
      free: false,
      silver: false,
      diamond: true,
      highlight: true
    },
    {
      name: 'Nama Tamu Undangan',
      description: 'Personalized undangan dengan nama tamu',
      free: false,
      silver: false,
      diamond: true
    },
    {
      name: 'Share ke WhatsApp',
      description: 'Bagikan undangan via WhatsApp',
      free: false,
      silver: false,
      diamond: true
    },
    {
      name: 'Live Streaming',
      description: 'Live streaming acara pernikahan',
      free: false,
      silver: false,
      diamond: true
    },
    {
      name: 'Embed Video YouTube',
      description: 'Tampilkan video pre-wedding dari YouTube',
      free: false,
      silver: false,
      diamond: true
    },
    {
      name: 'Compress Foto Otomatis',
      description: 'Optimasi foto otomatis untuk loading cepat',
      free: false,
      silver: false,
      diamond: true
    },
    {
      name: 'Masa Aktif',
      description: 'Durasi undangan bisa diakses',
      free: '2 Hari',
      silver: 'Selamanya',
      diamond: 'Selamanya',
      highlight: true
    }
  ];

  const plans = [
    {
      name: 'Gratis',
      price: 'Rp. 0',
      description: 'Paket gratis untuk mencoba fitur dasar',
      popular: false,
      color: 'from-gray-400 to-gray-500',
      icon: Gift
    },
    {
      name: 'Silver',
      price: 'Rp. 79.000',
      description: 'Paket lengkap untuk pernikahanmu',
      popular: false,
      color: 'from-gray-300 to-gray-400',
      icon: Zap
    },
    {
      name: 'Diamond',
      price: 'Rp. 125.000',
      description: 'Paket premium dengan fitur terlengkap',
      popular: true,
      color: 'from-yellow-400 to-yellow-500',
      icon: Crown
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold">Perbandingan Fitur</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Bandingkan{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Semua Fitur</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pilih paket yang paling sesuai dengan kebutuhan undangan pernikahanmu
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] bg-card rounded-2xl border border-border shadow-xl">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-0 border-b border-border">
              <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Fitur</h3>
                <p className="text-sm text-muted-foreground">Semua fitur yang tersedia</p>
              </div>
              {plans.map((plan, index) => (
                <div key={plan.name} className={`p-6 text-center relative ${
                  plan.popular ? 'bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-primary/20' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-medium">
                      ⭐ Diminati
                    </div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-card-foreground mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary-glow text-white' 
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    Pilih Paket
                  </Button>
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <div key={feature.name} className={`grid grid-cols-4 gap-0 border-b border-border/50 ${
                index % 2 === 0 ? 'bg-card' : 'bg-card/50'
              }`}>
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <h4 className={`font-semibold text-card-foreground ${
                      feature.highlight ? 'text-primary' : ''
                    }`}>
                      {feature.name}
                    </h4>
                    {feature.highlight && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  )}
                </div>
                
                {/* Free Plan */}
                <div className="p-6 text-center">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-primary">{feature.free}</span>
                  )}
                </div>

                {/* Silver Plan */}
                <div className="p-6 text-center">
                  {typeof feature.silver === 'boolean' ? (
                    feature.silver ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-primary">{feature.silver}</span>
                  )}
                </div>

                {/* Diamond Plan */}
                <div className="p-6 text-center">
                  {typeof feature.diamond === 'boolean' ? (
                    feature.diamond ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-primary">{feature.diamond}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-card-foreground">Tidak Ada Biaya Tersembunyi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-card-foreground">Upgrade Kapan Saja</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-card-foreground">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
