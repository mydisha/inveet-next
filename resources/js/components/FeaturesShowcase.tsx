import {
    BarChart3,
    CheckCircle,
    Clock,
    Gift,
    Image,
    MapPin,
    MessageCircle,
    Music,
    Palette,
    Send,
    Share2,
    Shield,
    Smartphone,
    Star,
    Users,
    Zap
} from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: 'core' | 'premium' | 'social';
  highlight?: boolean;
}

const FeaturesShowcase = () => {
  const features: Feature[] = [
    // Core Features (Inspired by Inveet.id)
    {
      icon: Smartphone,
      title: 'Undangan Digital Responsif',
      description: 'Tampil sempurna di semua device - desktop, tablet, dan mobile',
      category: 'core',
      highlight: true
    },
    {
      icon: Palette,
      title: 'Template Premium',
      description: '100+ desain eksklusif yang bisa dikustomisasi sesuai tema pernikahan',
      category: 'core',
      highlight: true
    },
    {
      icon: Clock,
      title: 'Hitung Mundur Otomatis',
      description: 'Countdown timer yang update real-time hingga hari pernikahan',
      category: 'core'
    },
    {
      icon: Music,
      title: 'Background Music',
      description: 'Pilih dari ratusan lagu romantis atau upload musik favorit',
      category: 'core'
    },

    // Premium Features (Inspired by Wedew.id)
    {
      icon: Users,
      title: 'Manajemen Tamu Pintar',
      description: 'Kelola daftar tamu, RSVP, dan preferensi makanan dengan mudah',
      category: 'premium',
      highlight: true
    },
    {
      icon: Send,
      title: 'Auto-Send WhatsApp',
      description: 'Kirim undangan otomatis via WhatsApp dengan pesan personal',
      category: 'premium',
      highlight: true
    },
    {
      icon: BarChart3,
      title: 'Analytics Lengkap',
      description: 'Pantau siapa yang sudah buka undangan dan RSVP real-time',
      category: 'premium'
    },
    {
      icon: Gift,
      title: 'Amplop Digital',
      description: 'Terima hadiah dan amplop langsung dari tamu undangan',
      category: 'premium'
    },

    // Social Features (Inspired by Katsudoto.id)
    {
      icon: Image,
      title: 'Galeri Foto Interaktif',
      description: 'Bagikan momen pre-wedding dan story cinta kalian',
      category: 'social',
      highlight: true
    },
    {
      icon: MessageCircle,
      title: 'Buku Tamu Digital',
      description: 'Kumpulkan ucapan, doa, dan foto dari tamu undangan',
      category: 'social'
    },
    {
      icon: MapPin,
      title: 'Peta Lokasi Pintar',
      description: 'Integrasi Google Maps dengan petunjuk arah yang akurat',
      category: 'social'
    },
    {
      icon: Share2,
      title: 'Share ke Social Media',
      description: 'Bagikan undangan ke Instagram, Facebook, dan Twitter',
      category: 'social'
    }
  ];

  const categories = [
    { key: 'core', label: 'Fitur Utama', color: 'from-blue-500 to-blue-600' },
    { key: 'premium', label: 'Fitur Premium', color: 'from-purple-500 to-purple-600' },
    { key: 'social', label: 'Fitur Sosial', color: 'from-green-500 to-green-600' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary-light/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold">Fitur Lengkap & Modern</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Semua yang Kamu Butuhkan untuk{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Undangan Digital</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gabungkan keindahan desain dengan teknologi canggih untuk undangan pernikahan yang tak terlupakan
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 ${
                category.key === 'core'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-primary'
              }`}
            >
              {category.label}
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const category = categories.find(cat => cat.key === feature.category);

            return (
              <div
                key={feature.title}
                className={`stagger-animation comfort-card group relative bg-card rounded-2xl p-8 border border-border ${
                  feature.highlight
                    ? 'hover:border-primary/50 ring-2 ring-primary/20 rounded-2xl'
                    : 'hover:border-border/80'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Highlight Badge */}
                {feature.highlight && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary-glow text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-bounce-gentle">
                    ⭐ Premium
                  </div>
                )}

                {/* Icon with Category Color */}
                <div className={`w-16 h-16 bg-gradient-to-br ${category?.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out animate-float-gentle`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Category Indicator */}
                <div className="absolute bottom-4 right-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category?.color} animate-pulse-gentle`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-card-foreground">100+ Fitur Lengkap</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-card-foreground">100% Aman & Terpercaya</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-card-foreground">Setup dalam 5 Menit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
