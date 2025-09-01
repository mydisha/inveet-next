import { Smartphone, Users, Calendar, Gift, Zap, HeartHandshake, Send, BarChart3, Music, MapPin, MessageCircle, Image } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: 'Undangan Digital',
      description: 'Undangan digital yang cantik dan interaktif yang bisa dibagikan langsung via WhatsApp, email, atau media sosial.',
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Send,
      title: 'Auto Send WhatsApp',
      description: 'Kirim undangan otomatis via WhatsApp dengan pesan yang dipersonalisasi untuk setiap tamu.',
      gradient: 'from-accent to-warm',
      featured: true
    },
    {
      icon: BarChart3,
      title: 'RSVP Tracking',
      description: 'Lacak RSVP tamu secara real-time dengan analytics lengkap dan manajemen respons tamu.',
      gradient: 'from-warm to-primary',
      featured: true
    },
    {
      icon: Users,
      title: 'Manajemen Tamu',
      description: 'Kelola daftar tamu dengan lengkap termasuk RSVP, preferensi makanan, dan informasi kontak.',
      gradient: 'from-primary-glow to-accent'
    },
    {
      icon: Music,
      title: 'Background Music',
      description: 'Tambahkan musik latar yang romantis untuk membuat undangan lebih berkesan.',
      gradient: 'from-accent to-primary-glow'
    },
    {
      icon: Image,
      title: 'Foto Galeri',
      description: 'Tampilkan galeri foto pre-wedding dan momen spesial dalam undangan digital.',
      gradient: 'from-primary to-warm'
    },
    {
      icon: MessageCircle,
      title: 'Ucapan & Doa',
      description: 'Kumpulkan ucapan dan doa dari tamu dalam satu tempat yang terorganisir.',
      gradient: 'from-warm to-accent'
    },
    {
      icon: MapPin,
      title: 'Peta Lokasi',
      description: 'Tampilkan lokasi acara dengan peta interaktif dan petunjuk arah yang mudah.',
      gradient: 'from-primary-glow to-primary'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Fitur Unggulan</span>
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
            <span className="text-lg font-medium">Siap untuk memulai?</span>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-glow transition-colors duration-300">
              Jelajahi Semua Fitur
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
