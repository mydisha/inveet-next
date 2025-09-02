import { Smartphone, Users, Calendar, Gift, Zap, HeartHandshake, Send, BarChart3, Music, MapPin, MessageCircle, Image } from 'lucide-react';
import { GradientCard } from './ui/card';

type CardGradient = 'card-gradient-1' | 'card-gradient-2' | 'card-gradient-3' | 'card-gradient-4' | 
                    'card-gradient-5' | 'card-gradient-6' | 'card-gradient-7' | 'card-gradient-8';

type IconGradient = 'icon-gradient-1' | 'icon-gradient-2' | 'icon-gradient-3' | 'icon-gradient-4' |
                    'icon-gradient-5' | 'icon-gradient-6' | 'icon-gradient-7' | 'icon-gradient-8';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cardGradient: CardGradient;
  iconGradient: IconGradient;
  featured?: boolean;
}

const Services = () => {
  const services: Service[] = [
    {
      icon: Smartphone,
      title: 'Undangan Digital',
      description: 'Undangan digital yang cantik dan interaktif yang bisa dibagikan langsung via WhatsApp, email, atau media sosial.',
      cardGradient: 'card-gradient-1',
      iconGradient: 'icon-gradient-1'
    },
    {
      icon: Send,
      title: 'Auto Send WhatsApp',
      description: 'Kirim undangan otomatis via WhatsApp dengan pesan yang dipersonalisasi untuk setiap tamu.',
      cardGradient: 'card-gradient-2',
      iconGradient: 'icon-gradient-2'
    },
    {
      icon: BarChart3,
      title: 'RSVP Tracking',
      description: 'Lacak RSVP tamu secara real-time dengan analytics lengkap dan manajemen respons tamu.',
      cardGradient: 'card-gradient-3',
      iconGradient: 'icon-gradient-3'
    },
    {
      icon: Users,
      title: 'Manajemen Tamu',
      description: 'Kelola daftar tamu dengan lengkap termasuk RSVP, preferensi makanan, dan informasi kontak.',
      cardGradient: 'card-gradient-4',
      iconGradient: 'icon-gradient-4'
    },
    {
      icon: Music,
      title: 'Background Music',
      description: 'Tambahkan musik latar yang romantis untuk membuat undangan lebih berkesan.',
      cardGradient: 'card-gradient-5',
      iconGradient: 'icon-gradient-5'
    },
    {
      icon: Image,
      title: 'Foto Galeri',
      description: 'Tampilkan galeri foto pre-wedding dan momen spesial dalam undangan digital.',
      cardGradient: 'card-gradient-6',
      iconGradient: 'icon-gradient-6'
    },
    {
      icon: MessageCircle,
      title: 'Ucapan & Doa',
      description: 'Kumpulkan ucapan dan doa dari tamu dalam satu tempat yang terorganisir.',
      cardGradient: 'card-gradient-7',
      iconGradient: 'icon-gradient-7'
    },
    {
      icon: MapPin,
      title: 'Peta Lokasi',
      description: 'Tampilkan lokasi acara dengan peta interaktif dan petunjuk arah yang mudah.',
      cardGradient: 'card-gradient-8',
      iconGradient: 'icon-gradient-8'
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
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">#bersamaInveet</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bagaimana Inveet bisa mempermudah pernikahanmu dari awal hingga akhir.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="stagger-animation comfort-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GradientCard
                  gradient={service.cardGradient}
                  featured={service.featured}
                  iconGradient={service.iconGradient}
                  icon={<IconComponent className="w-8 h-8 text-white" />}
                  title={service.title}
                  description={service.description}
                />
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
